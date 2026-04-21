import { OnboardingLayout } from "./OnboardingLayout";
import { onboardingContent, OnboardingRole } from "./onboardingContent";

interface UnifiedStep1Props {
  role: OnboardingRole;
}

export function UnifiedStep1({ role }: UnifiedStep1Props) {
  const content = onboardingContent[role].step1;

  return (
    <OnboardingLayout 
      step={1}
      title={content.title}
      checklistItems={content.checklistItems}
      nextRoute={content.nextRoute}
      role={role}
    >
      <div>{/* Content for step 1 */}</div>
    </OnboardingLayout>
  );
}

export default UnifiedStep1;