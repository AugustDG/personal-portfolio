'use client';

import { useEffect, useState } from 'react';

interface ClientDateTimeProps {
  isoDate: string;
  className?: string;
}

export function ClientDateTime({ isoDate, className }: ClientDateTimeProps) {
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    const d = new Date(isoDate);

    if (isNaN(d.getTime())) {
      setFormattedDate('');

      return;
    }

    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const mon = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();

    setFormattedDate(`${hh}:${mm} ${day}/${mon}/${yyyy}`);
  }, [isoDate]);

  if (!formattedDate) return null;

  return <span className={className}>{formattedDate}</span>;
}
