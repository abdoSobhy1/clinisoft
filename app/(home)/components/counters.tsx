"use client";

import { useEffect, useRef, useState } from "react";
import StatCounter from "@/components/stat-counter";
type Stat = {
  icon: string;
  value: number;
  suffix?: string;
  label: string;
  finish: string;
};




const stats: Stat[] = [
  { icon: "/images/clinics.svg", value: 2000, finish: "2,000", suffix: "+", label: "Clinics" },
  { icon: "/images/devices.svg", value: 5752, finish: "5,752", suffix: "+", label: "Active Devices" },
  { icon: "/images/patients.svg", value: 16, finish: "16", suffix: "M+", label: "Patients" },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [startCounting, setStartCounting] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isAnimated) {
          setStartCounting(true);
          setIsAnimated(true);
        }
      },
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [isAnimated]);

  return (
    <section className="bg-teal py-9 w-[calc(100%-2rem)]  mx-auto rounded-3xl md:rounded-none md:w-full" ref={sectionRef}>
      <div className="max-w-100 md:max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10 text-white px-6">
        {stats.map((stat, index) => (
          <StatCounter key={index} stat={stat} shouldCount={startCounting} finish={stat.finish} />
        ))}
      </div>
    </section>
  );
}