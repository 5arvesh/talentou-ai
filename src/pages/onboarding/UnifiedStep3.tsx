import { OnboardingLayout } from "./OnboardingLayout";
import { onboardingContent, OnboardingRole } from "./onboardingContent";

interface UnifiedStep3Props {
  role: OnboardingRole;
}

export function UnifiedStep3({ role }: UnifiedStep3Props) {
  const content = onboardingContent[role].step3;

  return (
    <OnboardingLayout 
      step={3}
      title={content.title}
      checklistItems={content.checklistItems}
      nextRoute={content.nextRoute}
      role={role}
    >
      <div>{/* Content for step 3 */}</div>
    </OnboardingLayout>
  );
}

export default UnifiedStep3;