'use server'

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function sendContactEmail(formData: FormData) {
  try {
    const data = {
      companyName: formData.get('companyName'),
      personInCharge: formData.get('personInCharge'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    }

    const destinationEmail = process.env.EMAIL_DESTINATION

    const response = await transporter.sendMail({
      from: `"Rakudash Contact" <${process.env.GMAIL_USER}>`,
      to: destinationEmail,
      replyTo: data.email as string,
      subject: `[Rakudash LP] Novo Contato: ${data.subject}`,
      html: `
        <h2>Novo Contato via Landing Page - Rakudash</h2>
        <p><strong>Empresa:</strong> ${data.companyName}</p>
        <p><strong>Pessoa Responsável:</strong> ${data.personInCharge}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Telefone:</strong> ${data.phone}</p>
        <br />
        <p><strong>Assunto:</strong> ${data.subject}</p>
        <p><strong>Mensagem:</strong></p>
        <p style="white-space: pre-wrap; background: #f4f4f4; padding: 12px; border-radius: 8px;">${data.message}</p>
      `,
    })

    if (!response.accepted || response.accepted.length === 0) {
      console.error('Gmail SMTP error:', response)
      return { success: false, error: 'Failed to send e-mail' }
    }

    return { success: true }
  } catch (error) {
    console.error('Server Action Error:', error)
    return { success: false, error: 'An unexpected error has occurred' }
  }
}
