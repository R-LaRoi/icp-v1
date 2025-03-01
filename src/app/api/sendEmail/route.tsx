import { NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';
import Mailjet from 'node-mailjet';

// Helper function to generate PDF
const generatePDF = (data: Record<string, any>): Buffer => {
  const doc = new PDFDocument();
  const buffers: Buffer[] = [];

  doc.on('data', (chunk) => buffers.push(chunk));
  doc.on('end', () => { });

  // PDF Content
  doc.fontSize(18).text('Your Self-Assessment Results:', 100, 100);
  let yPosition = 150;

  if (data) {
    Object.entries(data).forEach(([key, value]) => {
      doc.fontSize(12).text(`${key}: ${Array.isArray(value) ? value.join(', ') : String(value)}`, 100, yPosition);
      yPosition += 20;
    });
  } else {
    doc.fontSize(12).text('No assessment data available.', 100, yPosition);
  }

  doc.end();
  return Buffer.concat(buffers);
};

const sendEmail = async (email: string, pdfBuffer: Buffer) => {
  const mailjet = Mailjet.apiConnect(
    process.env.MAILJET_API_KEY!,
    process.env.MAILJET_SECRET_KEY!
  );

  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: process.env.EMAIL_FROM || 'your-email@example.com',
          Name: 'Your Career Plan',
        },
        To: [
          {
            Email: email,
          },
        ],
        Subject: 'Your Self-Assessment Results',
        TextPart: 'Please find your self-assessment results attached.',
        Attachments: [
          {
            ContentType: 'application/pdf',
            Filename: 'self-assessment-results.pdf',
            Base64Content: pdfBuffer.toString('base64'),
          },
        ],
      },
    ],
  });

  await request;
};

// Main POST handler
export async function POST(request: Request) {
  try {
    const { email, data } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    // Generate PDF
    const pdfBuffer = generatePDF(data);

    // Send email
    console.log('Attempting to send email...'); // Debug log
    await sendEmail(email, pdfBuffer);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: 'Error sending email', error: errorMessage }, { status: 500 });
  }
}