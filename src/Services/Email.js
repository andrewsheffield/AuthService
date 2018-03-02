/* @flow */
import sgMail from '@sendgrid/mail';
import { load as loadEnv } from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
  loadEnv();
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function VerifyEmail(to: string, key: string) {
  const url = `http://localhost:3000/Login/VerifyEmail?email=${to}&key=${encodeURI(
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
    console.log('Email Sent!', sentEmail.toJSON());
  } else {
    console.warn('Email had issues', sentEmail.toJSON());
  }

  return sentEmail;
}
