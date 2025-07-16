// pages/api/send-email.ts
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

export const dynamic = "force-dynamic";

export async function GET() {

  const currentMonth = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });
  //const logoUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/cannabis.svg`;

  const subject = `Monthly Deposit Reminder - ${currentMonth} from Green Leaf`;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #2e7d32;">Hello!</h2>
      <p>This is your monthly update for <strong>${currentMonth}</strong> from Green Leaf.</p>
      <p>Stay green and keep growing!<br /><em>– Team Green Leaf</em></p>
    </div>
  `;

  try {
    const snapshot = await db.collection('users').get();
    const toList: string[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.email) {
        toList.push(data.email);
      }
    });

    if (toList.length === 0) {
      return NextResponse.json({ message: 'No user emails found.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Green Leaf" <${process.env.EMAIL_USER}>`,
      bcc: toList.join(','),
      subject,
      html,
    });
   return NextResponse.json({ message: `Email sent to ${toList.length} users.` });
  } catch (error) {
    console.error('Email sending failed:', error);
    return NextResponse.json({ message: 'Email sending failed.', error }, { status: 500 });
  }
}
