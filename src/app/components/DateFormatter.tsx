// components/DateFormatter.tsx
'use client';

import { format } from 'date-fns';
import { Timestamp } from 'firebase/firestore';

interface DateFormatterProps {
  value: Date | string | number | Timestamp | null | undefined;
  className?: string;
}

export default function DateFormatter({ value, className }: DateFormatterProps) {
  if (!value) return null;

  let date: Date;

  try {
    if (value instanceof Timestamp) {
      date = value.toDate();
    } else if (value instanceof Date) {
      date = value;
    } else if (typeof value === 'string' || typeof value === 'number') {
      date = new Date(value);
    } else {
      return <span className={className}>Invalid date</span>;
    }
  } catch {
    return <span className={className}>Invalid date</span>;
  }

  if (isNaN(date.getTime())) {
    return <span className={className}>Invalid date</span>;
  }

  return <span className={className}>{format(date, 'yyyy/MM/dd')}</span>;
}
