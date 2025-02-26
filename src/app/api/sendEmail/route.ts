import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';

export async function POST(request: Request) {
  const { email, data } = await request.json();

  // Create a PDF document
  const doc = new PDFDocument();
  let buffers: Buffer[] = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {});

  // Add content to the PDF
  doc.fontSize(18).text('Your Self-Assessment Results:', 100, 100);
  let yPosition = 150;
  Object.entries(data).forEach(([key, value]) => {
    doc.fontSize(12).text(`${key}: ${Array.isArray(value) ? value.join(', ') : String(value)}`, 100, yPosition);
    yPosition += 20;
  });

  // Finalize the PDF and create a buffer
  doc.end();
  const pdfBuffer = Buffer.concat(buffers);

  const transporter = nodemailer.createTransport({
    // Your email service configuration
    host: "smtp.example.com",
    port: 587,
    secure: false, // Use TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: 'Your Career Plan <augustinfinite@gmail.com>',
      to: email,
      subject: "Your Self-Assessment Results",
      text: "Please find your self-assessment results attached.",
      attachments: [
        {
          filename: 'self-assessment-results.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    });

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error sending email' }, { status: 500 });
  }
}
