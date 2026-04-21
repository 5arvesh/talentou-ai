
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Confetti } from "./Confetti";

export function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center relative">
      <Confetti />
      
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-orange-500 dark:text-orange-400 mb-6">You're Set. Strategy is Locked. Let's Build.</h1>
        
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg mb-8">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            You've done what most skip - aligning your outbound with a clear strategy. The 4Ms are your
            starting point, and you've nailed each one.
          </p>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            From here, it's about speed, precision, and volume - all powered by Piqual AI. Ready to let the
            AI take it from here and build a database that works as hard as you do?
          </p>
        </div>
        
        <Button 
          onClick={() => navigate("/chat")} 
          className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-800 text-white px-10 py-6 text-lg"
        >
          Build Database
        </Button>
      </div>
    </div>
  );
}
