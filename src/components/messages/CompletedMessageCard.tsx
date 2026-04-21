import { CompletedCards } from '../Reuseable/CompletedCards';

interface CompletedMessageCardProps {
  score?: number;
  className?: string;
}

export const CompletedMessageCard = ({ score = 75, className }: CompletedMessageCardProps) => {
  return (
    <CompletedCards
      title="Company USP"
      description="Your employer brand deserves the spotlight. Align recruitment messaging to showcase what makes your company stand out and attract top talent."
      score={score}
      viewPlanPath="/ta-associate-plan/view-companyusp"
      enhanceScorePath="/sales-plan/message-plan-chat"
      className={className}
    />
  );
};

export default CompletedMessageCard;
