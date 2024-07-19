import { render } from '@react-email/render'
import nodemailer from 'nodemailer'

import { SMTP_PASS, SMTP_USER } from '@/domain/constants/app'
import { VerifyEmailTemplate } from './template/verify-email/VerifyEmailTemplate'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  port: 465,
  secureConnection: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
} as any)

export const sendVerifyEmail = async (data: Record<string, any>) => {
  const { email, username, token } = data

  try {
    await transporter.sendMail({
      from: `Mindflics <${SMTP_USER}>`,
      to: email,
      subject: 'Welcome to Mindflics',
      html: render(VerifyEmailTemplate({ username, token })),
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}
