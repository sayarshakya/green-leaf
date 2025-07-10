'use client';

import React from 'react';

interface StatusLabelProps {
  status: string;
}

const statusColors: Record<string, string> = {
  Done: 'bg-green-300',
  Pending: 'bg-red-300',
};

export default function StatusLabel({ status }: StatusLabelProps) {
  const colorClasses = statusColors[status] ?? 'text-gray-800 bg-gray-200';

  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${colorClasses}`}
    >
      {status}
    </span>
  );
}
