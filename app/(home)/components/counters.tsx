// components/StatsSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useCountUp } from "../../../hooks/useCountup";
import Image from "next/image";

type Stat = {
  icon: string;
  value: number;
  suffix?: string;
  label: string;
};

const stats: Stat[] = [
  {
    icon: "/clinics.svg",
    value: 2000,
    suffix: "+",
    label: "Clinics",
  },
  {
    icon: "/devices.svg",
    value: 5752,
    suffix: "+",
    label: "Active Devices",
  },
  {
    icon: "/patients.svg",
    value: 16,
    suffix: "M+",
    label: "Patients",
  },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  const [startCounting, setStartCounting] = useState(false);

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
    <section className="bg-teal py-9" ref={sectionRef}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 text-white px-6">
        {stats.map((stat, index) => {
          const animatedValue = useCountUp(
            startCounting ? stat.value : 0,
            1500
          );
          return (
            <div key={index} className="flex justify-center  items-center gap-4 ">
              <Image src={stat.icon} alt={stat.label} width={60} height={60} />
              <div className="grow-1">
                <p className="text-4xl font-semibold min-w-[120px] ">
                  {animatedValue}
                  {stat.suffix}
                </p>
                <div className="text-lg font-medium">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
