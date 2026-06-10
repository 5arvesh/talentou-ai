
import { AppLayout } from "@/components/layout/AppLayout";
import { LeadTracker } from "../lead-tracker/LeadTracker";

export function DatabaseBuilder() {
  return (
    <AppLayout>
      <LeadTracker />
    </AppLayout>
  );
}
