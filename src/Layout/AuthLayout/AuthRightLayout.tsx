import { authImg } from "@/constants/Constant";

export function AuthRightLayout() {
  return (
    <div className="hidden lg:flex lg:w-1/2 flex-col justify-between min-h-screen relative overflow-hidden" style={{ background: "linear-gradient(45deg, #7E00FC, #0A92FE)" }}>
        <div className="max-w-full mx-auto px-8 pt-11 res-1200:pt-8 res-1400:pt-10 res-1400:px-8 res-1600:pt-3">
          <h2 className="text-5xl font-bold text-white res-1200:text-3xl res-1400:text-4xl res-1600:text-[43px] res-1600:pt-8">
            Smarter Hiring Starts with Talentou AI
          </h2>
          
          <p className="text-white text-lg pt-2 res-1200:text-xs res-1400:mt-2 res-1600:pt-4 res-1400:text-sm res-1600:text-sm res-1600:pb-2">
            Right-fit candidates. Smarter planning. Faster hires.
            From strategic planning to final selection, Talentou streamlines every step,
            so you can focus less on administration and more on building winning teams.
          </p>
          </div>
          
          {/* Main image */}
          <div>
            <div className="relative overflow-hidden w-full flex justify-center px-4">
            <img 
              src={authImg} 
              alt="Talent Acquisition Professional with Analytics" 
              className="w-full object-cover"
            />
          </div>
      
      {/* Background patterns */}
      <div className="absolute top-20 right-20">
        <div className="w-20 h-20 border-2 border-white/20 rounded-full"></div>
      </div>
      <div className="absolute bottom-40 left-20">
        <div className="w-32 h-32 border-2 border-white/20 rounded-full"></div>
      </div>
      <div className="absolute top-1/3 right-1/4">
        <div className="w-10 h-10 bg-white/5 rounded-full"></div>
      </div>
      <div className="absolute top-2/3 right-1/2">
        <div className="w-24 h-24 border border-white/10 rounded-full"></div>
      </div>
          </div>
          
    </div>
  );
}
