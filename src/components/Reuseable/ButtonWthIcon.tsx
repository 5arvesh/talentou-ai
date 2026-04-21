import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface buttonProps {
  path?: string;
  text?: string;
}


export const ButtonWthIcon : React.FC<buttonProps> = ({ path, text }) =>{

    const navigate = useNavigate();

    return(
         <Button
            onClick={() => navigate(path)}
            className="bg-[#7800D3] justify-between text-white text-xs px-2 py-1 h-8 hover:bg-[#5D00A4] hover:text-white res-1200:text-[12px]"
       
          >
            {text} <ArrowRight className="ml-1 h-3 w-3 res-1200:h-2 res-1200:w-2 res-1200:-ml-0.5" />
          </Button>
    )
}