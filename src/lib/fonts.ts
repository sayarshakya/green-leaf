// app/fonts.ts
import { Roboto_Mono } from 'next/font/google';

export const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  weight: ['400', '500', '700'], // optional: adjust based on needs
});
