import { useState, useEffect } from "react";
import { authImg } from "@/constants/Constant";

const ROLES = ["Recruiters", "TA Leaders", "Hiring Teams", "Interviewers"];

export function AuthRightLayout() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setRoleIndex(prev => (prev + 1) % ROLES.length);
    }, 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="hidden lg:flex lg:w-1/2 flex-col justify-between min-h-screen relative overflow-hidden"
      style={{ background: "hsl(var(--nav-bg))" }}
    >
      <div className="max-w-full mx-auto px-8 pt-11 res-1200:pt-8 res-1400:pt-10 res-1400:px-8 res-1600:pt-3">
        <h2 className="text-5xl font-bold text-white res-1200:text-3xl res-1400:text-4xl res-1600:text-[43px] res-1600:pt-8">
          Smarter Hiring Starts with Talentou AI
        </h2>

        {/* Built For chip */}
        <div className="flex items-center gap-2.5 mt-4 res-1200:mt-2">
          <span className="text-white/80 font-semibold text-sm res-1200:text-xs">Built For</span>
          <span
            key={roleIndex}
            className="bg-white rounded-full px-3 py-1 text-primary font-bold text-sm res-1200:text-xs animate-in fade-in duration-500"
          >
            {ROLES[roleIndex]}
          </span>
        </div>
      </div>

      {/* Hero image */}
      <div>
        <div className="relative overflow-hidden w-full flex justify-center px-4">
          <img
            src={authImg}
            alt="Talent Acquisition Professional with Analytics"
            className="w-full object-cover"
          />
        </div>

        {/* Stat callouts */}
        <div className="absolute top-16 right-8 bg-white/15 backdrop-blur-sm rounded-card px-5 py-3 text-white">
          <p className="text-2xl font-bold">87%</p>
          <p className="text-xs text-white/80 mt-0.5">Faster Screening</p>
        </div>
        <div className="absolute top-1/2 right-6 -translate-y-1/2 bg-white/15 backdrop-blur-sm rounded-card px-5 py-3 text-white">
          <p className="text-2xl font-bold">4.2×</p>
          <p className="text-xs text-white/80 mt-0.5">More Interviews</p>
        </div>
        <div className="absolute bottom-24 left-8 bg-white/15 backdrop-blur-sm rounded-card px-5 py-3 text-white">
          <p className="text-2xl font-bold">60%</p>
          <p className="text-xs text-white/80 mt-0.5">Reduced Time-to-Hire</p>
        </div>
      </div>
    </div>
  );
}
