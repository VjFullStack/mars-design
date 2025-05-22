import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Log environment variables for debugging (remove sensitive info in production)
    console.log('Email config:', {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE,
      user: process.env.EMAIL_USER,
      // Don't log password
      to: process.env.CAREERS_EMAIL,
    });
    
    const { fullName, email, phone, position, portfolio, message } = req.body;
    console.log('Received application data:', { fullName, email, position });
    
    // For file uploads, you would need to use a middleware like multer
    // or next-connect to handle multipart form data. For now, we'll
    // assume the resume file is not being uploaded directly

    // Create a reusable transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      // Gmail specific settings
      requireTLS: true,
      debug: true, // Enable debug logs
    });

    // Email content
    const mailOptions = {
      from: `"MARS Design Careers" <${process.env.EMAIL_USER}>`,
      to: process.env.CAREERS_EMAIL || process.env.EMAIL_USER,
      replyTo: email,
      subject: `Job Application: ${position || 'General Application'}`,
      html: `
        <h2>New Job Application</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Position:</strong> ${position || 'Not specified'}</p>
        <p><strong>Portfolio URL:</strong> ${portfolio || 'Not provided'}</p>
        <p><strong>Cover Letter / Additional Information:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <p><em>Note: For resume uploads, you'll need to configure file upload handling.</em></p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error sending application:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      response: error.response,
    });
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to submit application', 
      error: error.message,
      code: error.code, 
      responseCode: error.responseCode
    });
  }
}
