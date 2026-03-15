"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  start: number;
  end: number;
  durationMs?: number;
  suffix?: string;
  className?: string;
};

export default function CountUp({
  start,
  end,
  durationMs = 3000,
  suffix = "",
  className,
}: CountUpProps) {
  const [value, setValue] = useState<number>(start);
  const elRef = useRef<HTMLSpanElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!elRef.current) return;

    const runAnimation = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setValue(end);
        return;
      }

      const from = start;
      const to = end;
      const delta = to - from;
      const t0 = performance.now();

      const step = (now: number) => {
        const progress = Math.min((now - t0) / durationMs, 1);
        setValue(Math.round(from + delta * progress));
        if (progress < 1) rafRef.current = requestAnimationFrame(step);
      };

      rafRef.current = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        runAnimation();
        observer.disconnect();
      },
      { threshold: 0.3 }
    );

    observer.observe(elRef.current);

    return () => {
      observer.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [durationMs, end, start]);

  return (
    <span ref={elRef} className={className}>
      {value}
      {suffix}
    </span>
  );
}
