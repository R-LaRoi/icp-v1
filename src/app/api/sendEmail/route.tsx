// /src/app/api/sendEmail/route.tsx
import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import Mailjet from 'node-mailjet';

const generatePDF = async (data: Record<string, any>): Promise<Buffer> => {
  try {
    let htmlContent = '<h1>Your Self-Assessment Results:</h1>';
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        htmlContent += `<p><strong>${key}:</strong> ${Array.isArray(value) ? value.join(', ') : String(value)}</p>`;
      });
    } else {
      htmlContent += '<p>No assessment data available.</p>';
    }

    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdfUint8Array = await page.pdf();
    await browser.close();

    const pdfBuffer = Buffer.from(pdfUint8Array);

    return pdfBuffer;
  } catch (error) {
    console.error('Error generating PDF with Puppeteer:', error);
    throw error;
  }
};

interface MailjetEmailOptions {
  apiKey: string;
  secretKey: string;
  fromEmail: string;
  fromName: string;
  toEmail: string;
  subject: string;
  textPart: string;
  attachmentFilename: string;
  attachmentContent: Buffer;
}

const sendEmail = async (options: MailjetEmailOptions): Promise<void> => {
  try {
    const mailjet = Mailjet.apiConnect(options.apiKey, options.secretKey);

    await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: options.fromEmail,
            Name: options.fromName,
          },
          To: [{ Email: options.toEmail }],
          Subject: options.subject,
          TextPart: options.textPart,
          Attachments: [
            {
              ContentType: 'application/pdf',
              Filename: options.attachmentFilename,
              Base64Content: options.attachmentContent.toString('base64'),
            },
          ],
        },
      ],
    });

    console.log('Email sent successfully via Mailjet');
  } catch (error) {
    console.error('Error sending email via Mailjet:', error);
    throw error;
  }
};

export async function POST(request: Request) {
  try {
    const { email, data } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    if (!process.env.MAILJET_API_KEY || !process.env.MAILJET_SECRET_KEY || !process.env.EMAIL_FROM) {
      console.error('Missing Mailjet or Email From environment variables');
      return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
    }

    const pdfBuffer = await generatePDF(data);

    await sendEmail({
      apiKey: process.env.MAILJET_API_KEY,
      secretKey: process.env.MAILJET_SECRET_KEY,
      fromEmail: process.env.EMAIL_FROM,
      fromName: 'Your Career Plan',
      toEmail: email,
      subject: 'Your Self-Assessment Results',
      textPart: 'Please find your self-assessment results attached.',
      attachmentFilename: 'self-assessment-results.pdf',
      attachmentContent: pdfBuffer,
    });

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error in POST handler:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: 'Error sending email', error: errorMessage }, { status: 500 });
  }
}