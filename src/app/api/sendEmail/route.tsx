import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';

export async function POST(request: Request) {
  const { email, data } = await request.json();

  // PDF document
  const doc = new PDFDocument();
  let buffers: Buffer[] = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => { });

  // PDF content
  doc.fontSize(18).text('Your Self-Assessment Results:', 100, 100);
  let yPosition = 150;
  if (data) { // Check if data exists
    Object.entries(data).forEach(([key, value]) => {
      doc.fontSize(12).text(`${key}: ${Array.isArray(value) ? value.join(', ') : String(value)}`, 100, yPosition);
      yPosition += 20;
    });
  } else {
    doc.fontSize(12).text("No assessment data available.", 100, yPosition);
  }

  // PDF final
  doc.end();
  const pdfBuffer = Buffer.concat(buffers);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    console.log("Attempting to send email..."); // Debug log

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'Your Career Plan <augustinfinite@gmail.com>',
      to: email,
      subject: "Your Self-Assessment Results",
      text: "Please find your self-assessment results attached.",
      attachments: [
        {
          filename: 'self-assessment-results.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    });

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error sending email' }, { status: 500 });
  }
}