/* @flow */
import sgMail from '@sendgrid/mail';
import { load as loadEnv } from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
  loadEnv();
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function VerifyEmail(request: Object, to: string, key: string) {
  const uri: string = process.env.HOST || 'http://localhost:3000';
  const url: string = `${uri}/Login/VerifyEmail?email=${to}&key=${encodeURI(
    key
  )}`;

  const msg = {
    to: to,
    from: 'service@authapi.com',
    subject: 'Validate your email.',
    text: `Copy and paste this url into the browsers address bar: ${url}`,
    html: `<a href="${url}">Verify Email</a>`,
    mailSettings: {
      sandboxMode: {
        enable: true
      }
    }
  };

  const [sentEmail] = await sgMail.send(msg);
  const statusCode = sentEmail.statusCode;
  if (statusCode >= 200 && statusCode < 300) {
    console.log('Email sent successfully!');
  } else {
    console.warn('Sending email error', sentEmail.body);
  }

  return sentEmail;
}

export async function ResetPasswordEmail(
  request: Object,
  to: string,
  key: string
) {
  const uri: string = process.env.HOST || 'http://localhost:3000';
  const url: string = `${uri}/Login/ResetPassword?email=${to}&key=${encodeURI(
    key
  )}`;

  const msg = {
    to: to,
    from: 'service@authapi.com',
    subject: 'Reset your password.',
    text: `Copy and paste this url into the browsers address bar: ${url}`,
    html: `<a href="${url}">Reset Password</a>`,
    mailSettings: {
      sandboxMode: {
        enable: true
      }
    }
  };

  const [sentEmail] = await sgMail.send(msg);
  const statusCode = sentEmail.statusCode;
  if (statusCode >= 200 && statusCode < 300) {
    console.log('Email sent successfully!');
  } else {
    console.warn('Sending email error', sentEmail.body);
  }

  return sentEmail;
}
