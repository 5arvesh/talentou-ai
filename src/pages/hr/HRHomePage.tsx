import { HRLayout } from "@/components/layout/HRLayout";
import { HRDashboard } from "@/components/hr/HRDashboard";

export function HRHomePage() {
  return (
    <HRLayout>
      <HRDashboard />
    </HRLayout>
  );
}

export default HRHomePage;