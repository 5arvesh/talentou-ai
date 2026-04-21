import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "./OnboardingLayout";
import { onboardingContent, OnboardingRole } from "./onboardingContent";

interface UnifiedStep4Props {
  role: OnboardingRole;
}

export function UnifiedStep4({ role }: UnifiedStep4Props) {
  const navigate = useNavigate();
  const content = onboardingContent[role].step4;

  const handleFinish = () => {
    navigate(content.nextRoute);
  };

  return (
    <OnboardingLayout 
      step={4}
      title={content.title}
      checklistItems={content.checklistItems}
      nextRoute={content.nextRoute}
      role={role}
      isLastStep={content.isLastStep}
      onNext={handleFinish}
    >
      <div>{/* Content for step 4 */}</div>
    </OnboardingLayout>
  );
}

export default UnifiedStep4;