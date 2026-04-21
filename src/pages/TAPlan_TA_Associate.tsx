
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/header/Header";
import { TalentPlanContent_TA_Associate } from "@/components/TA-plan/TalentPlanContent_TA_Associate";

export function TAPlan_TA_Associate() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Sidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto dark:text-gray-100 ">
          <TalentPlanContent_TA_Associate />
        </main>
      </div>
    </div>
  );
}

export default TAPlan_TA_Associate;
