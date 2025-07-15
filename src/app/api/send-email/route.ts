// pages/api/send-email.ts
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

export const dynamic = "force-dynamic";

export async function GET() {

  const subject = 'Monthly Deposit Reminder from Green Leaf';
  const text = `Hello!

    This is your monthly update from Green Leaf.

    Stay green and keep growing!,
    Team Green Leaf`;

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
      text,
    });
   return NextResponse.json({ message: `Email sent to ${toList.length} users.` });
  } catch (error) {
    console.error('Email sending failed:', error);
    return NextResponse.json({ message: 'Email sending failed.', error }, { status: 500 });
  }
}
