import { NextResponse } from 'next/server';
import Mailjet from 'node-mailjet';

interface SelfAssesmentData {
  introspective: string;
  strengths: string;
  wkExp_values: string;
  motivation: string;
  next_career: string;
  dream_acc: string;
  career_concerns: string;
  industry_pref: string;
}

const generateEmailHtmlContent = (data: SelfAssesmentData): string => {
  let htmlContent = `
    <div style="font-family: 'Inter', sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
      <h1 style="color: #4A00B0; text-align: center; margin-bottom: 30px;">Your Self-Assessment Results:</h1>
  `;

  if (data) {
    const displayTitles: Record<keyof SelfAssesmentData, string> = {
      introspective: "Your Introspection",
      strengths: "Your Strengths",
      wkExp_values: "Core Values & Work Experience",
      motivation: "Your Motivation",
      next_career: "What's Next for Your Career?",
      dream_acc: "Celebrating Your Dream Accomplishment",
      career_concerns: "Career Concerns & Challenges",
      industry_pref: "Your Industry Preferences",
    };

    Object.entries(data).forEach(([key, value]) => {
      const title = displayTitles[key as keyof SelfAssesmentData] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      htmlContent += `
        <h2 style="color: #6A00FF; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-top: 25px;">${title}:</h2>
        <p style="margin-bottom: 10px; line-height: 1.6;">${Array.isArray(value) ? value.join(', ') : String(value)}</p>
      `;
    });
  } else {
    htmlContent += '<p>No assessment data available.</p>';
  }
  htmlContent += `
      <p style="margin-top: 30px; text-align: center; color: #777;">Thank you for completing your self-assessment!</p>
    </div>
  `;
  return htmlContent;
};

interface MailjetEmailOptions {
  apiKey: string;
  secretKey: string;
  fromEmail: string;
  fromName: string;
  toEmail: string;
  subject: string;
  textPart: string;
  htmlPart: string;
}

const sendEmail = async (options: MailjetEmailOptions): Promise<void> => {
  try {
    const mailjet = Mailjet.apiConnect(options.apiKey, options.secretKey);

    const result = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: options.fromEmail,
            Name: options.fromName,
          },
          To: [{ Email: options.toEmail }],
          Subject: options.subject,
          TextPart: options.textPart,
          HtmlPart: options.htmlPart,
        },
      ],
    });

    console.log('Mailjet: Email sent successfully. Response status:', result.response.status);
  } catch (error: any) {
    console.error('Mailjet: Error sending email via Mailjet:', error);
    if (error.statusCode) console.error('Mailjet: Status Code:', error.statusCode);
    if (error.response && error.response.body && error.response.body.Messages) {
      console.error('Mailjet: Error Messages:', JSON.stringify(error.response.body.Messages, null, 2));
    }
    throw new Error(`Email sending failed: ${error?.message || 'Unknown Mailjet error'}.`);
  }
};

export async function POST(request: Request) {
  try {
    const { email, data }: { email: string; data: SelfAssesmentData } = await request.json();

    if (!email) {
      console.log('API Route: Email validation failed: Email is required.');
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const requiredEnvVars = {
      MAILJET_API_KEY: process.env.MAILJET_API_KEY,
      MAILJET_SECRET_KEY: process.env.MAILJET_SECRET_KEY,
      EMAIL_FROM: process.env.EMAIL_FROM,
    };

    const missingVars = Object.entries(requiredEnvVars)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingVars.length > 0) {
      console.error('API Route: Missing environment variables:', missingVars.join(', '));
      return NextResponse.json({
        message: 'Server configuration error: Missing environment variables',
        missingVars
      }, { status: 500 });
    }

    const htmlContent = generateEmailHtmlContent(data);

    await sendEmail({
      apiKey: process.env.MAILJET_API_KEY!,
      secretKey: process.env.MAILJET_SECRET_KEY!,
      fromEmail: process.env.EMAIL_FROM!,
      fromName: 'Your Career Plan',
      toEmail: email,
      subject: 'Your Self-Assessment Results',
      textPart: 'Please find your self-assessment results below.',
      htmlPart: htmlContent,
    });

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('API Route: === DETAILED ERROR LOG ===');
    console.error('API Route: Error type:', typeof error);
    console.error('API Route: Error name:', error?.name);
    console.error('API Route: Error message:', error?.message);
    console.error('API Route: Error stack:', error?.stack);
    console.error('API Route: Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    console.error('API Route: ========================');

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred on server.';
    return NextResponse.json({
      message: 'Error processing request',
      error: errorMessage,
      errorType: typeof error,
      errorName: error?.name,
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
