import { OnboardingLayout } from "./OnboardingLayout";
import { onboardingContent, OnboardingRole } from "./onboardingContent";

interface UnifiedStep2Props {
  role: OnboardingRole;
}

export function UnifiedStep2({ role }: UnifiedStep2Props) {
  const content = onboardingContent[role].step2;

  return (
    <OnboardingLayout 
      step={2}
      title={content.title}
      checklistItems={content.checklistItems}
      nextRoute={content.nextRoute}
      role={role}
    >
      <div className="mt-4">
        {/* Content area is now empty after removing the table */}
      </div>
    </OnboardingLayout>
  );
}

export default UnifiedStep2;