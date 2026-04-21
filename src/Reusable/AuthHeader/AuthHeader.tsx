


export function AuthHeader() {
  return (
    <>
      {/* Logo */}
      <div className="absolute top-6 left-7">
        <img 
          src="/lovable-uploads/fc09b064-a33c-4b64-be7e-a900883b5ff9.png" 
          alt="Talentou BETA" 
          className="h-12 res-1200:h-8"
        />
      </div>

      {/* Mascot with speech bubble - updated layout */}
      <div className="relative mb-8 max-w-md mx-auto flex items-center res-1200:max-w-xs res-1200:mb-4">
        {/* Chat bubble with arrow on right side */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 relative mr-2">
          <p className="text-center text-gray-800 font-medium res-1200:text-xs res-1400:text-[13px]">
            Meet Talentou AI<br />
            Where every great hire begins with a trusted partner.<br />
            Always present. Always precise.
          </p>
          <div className="absolute w-4 h-4 bg-white transform rotate-316 right-[-8px] top-1/2 -translate-y-1/2 border-r border-b border-gray-200"></div>
        </div>
        
        {/* New mascot image */}
        <img 
          src="/lovable-uploads/55397514-dfbc-457f-bb12-e169562a72c5.png" 
          alt="Robot assistant" 
          className="h-[160px] w-auto z-10 res-1200:h-40 res-1400:h-48"
        />
      </div>
    </>
  );
}


