import React, { useState, useEffect } from 'react';
import { parseReleaseDate } from '../utils/helpers';

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number } | null>(null);

  useEffect(() => {
    const calculate = () => {
      const date = parseReleaseDate(targetDate);
      const difference = date.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft(null);
      }
    };

    const timer = setInterval(calculate, 1000);
    calculate();
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) return <span className="text-gold">ESTRENO INMINENTE</span>;

  return (
    <div className="flex gap-4">
      {[
        { label: 'D', val: timeLeft.days },
        { label: 'H', val: timeLeft.hours },
        { label: 'M', val: timeLeft.minutes },
        { label: 'S', val: timeLeft.seconds }
      ].map((item, i) => (
        <div key={i} className="text-center">
          <p className="text-xl md:text-2xl font-display text-white leading-none">{item.val.toString().padStart(2, '0')}</p>
          <p className="text-[6px] text-gold font-black uppercase mt-1">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
