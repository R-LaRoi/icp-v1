import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import Mailjet from 'node-mailjet';

const generatePDF = async (data: Record<string, any>): Promise<Buffer> => {
  let browser: any;
  try {
    let htmlContent = '<h1>Your Self-Assessment Results:</h1>';
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        htmlContent += `<p><strong>${key}:</strong> ${Array.isArray(value) ? value.join(', ') : String(value)}</p>`;
      });
    } else {
      htmlContent += '<p>No assessment data available.</p>';
    }

    // Configure for serverless environment
    const isDev = process.env.NODE_ENV === 'development';

    if (isDev) {
      // Local development - use regular puppeteer
      const puppeteerRegular = await import('puppeteer');
      browser = await puppeteerRegular.default.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    } else {
      // Production/Vercel - use puppeteer-core with chromium
      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: {
          width: 1920,
          height: 1080,
        },
        executablePath: await chromium.executablePath(),
        headless: true,
      });
    }

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    const pdfUint8Array = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    return Buffer.from(pdfUint8Array);
  } catch (error: any) {
    console.error('Error generating PDF with Puppeteer:', error);
    throw new Error(`PDF generation failed: ${error?.message || 'Unknown error'}`);
  } finally {
    if (browser) {
      await browser.close();
    }
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

    console.log('Email sent successfully via Mailjet:', result.body);
  } catch (error: any) {
    console.error('Mailjet error details:', error);
    throw new Error(`Email sending failed: ${error?.message || 'Unknown error'}`);
  }
};

export async function POST(request: Request) {
  try {
    const { email, data } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    // Check all required environment variables
    const requiredEnvVars = {
      MAILJET_API_KEY: process.env.MAILJET_API_KEY,
      MAILJET_SECRET_KEY: process.env.MAILJET_SECRET_KEY,
      EMAIL_FROM: process.env.EMAIL_FROM,
    };

    const missingVars = Object.entries(requiredEnvVars)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingVars.length > 0) {
      console.error('Missing environment variables:', missingVars);
      return NextResponse.json({
        message: 'Server configuration error',
        missingVars
      }, { status: 500 });
    }

    console.log('Generating PDF...');
    const pdfBuffer = await generatePDF(data);
    console.log('PDF generated successfully, size:', pdfBuffer.length, 'bytes');

    console.log('Sending email...');
    await sendEmail({
      apiKey: process.env.MAILJET_API_KEY!,
      secretKey: process.env.MAILJET_SECRET_KEY!,
      fromEmail: process.env.EMAIL_FROM!,
      fromName: 'Your Career Plan',
      toEmail: email,
      subject: 'Your Self-Assessment Results',
      textPart: 'Please find your self-assessment results attached.',
      attachmentFilename: 'self-assessment-results.pdf',
      attachmentContent: pdfBuffer,
    });

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error in POST handler:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({
      message: 'Error processing request',
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}