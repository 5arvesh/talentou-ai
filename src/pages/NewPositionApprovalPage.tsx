import { AppLayout } from "@/components/layout/AppLayout";
import { NewPositionConversation } from "@/components/notifications/NewPositionConversation";

export function NewPositionApprovalPage() {
  return (
    <AppLayout>
      <NewPositionConversation />
    </AppLayout>
  );
}

export default NewPositionApprovalPage;
