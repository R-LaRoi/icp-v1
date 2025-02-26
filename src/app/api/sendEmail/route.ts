import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email, data } = req.body;

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

      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
