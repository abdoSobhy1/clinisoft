"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import StatCounter from "@/components/stat-counter";
type Stat = {
  icon: string;
  value: number;
  suffix?: string;
  label: string;
  finish: string;
};

const stats: Stat[] = [
  { icon: "/images/clinics.svg", value: 2000, finish: "2,000", suffix: "+", label: "clinics" },
  { icon: "/images/devices.svg", value: 5752, finish: "5,752", suffix: "+", label: "devices" },
  { icon: "/images/patients.svg", value: 16, finish: "16", suffix: "M+", label: "patients" },
];

const StatsSection = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>((_, ref) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [startCounting, setStartCounting] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isAnimated) {
          setStartCounting(true);
          setIsAnimated(true);
        }
      },
      { threshold: 0.4 }
    );
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [isAnimated]);

  return (
    <div ref={sectionRef} className={`bg-teal py-9 w-[calc(100%-2rem)]  mx-auto rounded-3xl md:rounded-none md:w-full`}>
      <div ref={ref} className="max-w-100 md:max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10 text-white px-6">
        {stats.map((stat, index) => (
          <StatCounter key={index} stat={stat} shouldCount={startCounting} finish={stat.finish} />
        ))}
      </div>
    </div>
  );
});

StatsSection.displayName = "StatsSection";

export default StatsSection;