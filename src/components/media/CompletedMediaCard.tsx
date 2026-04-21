import { CompletedCards } from '../Reuseable/CompletedCards';

interface CompletedMediaCardProps {
  score?: number;
  className?: string;
}

export const CompletedMediaCard = ({ score = 82, className }: CompletedMediaCardProps) => {
  return (
    <CompletedCards
      title="Recruitment Channels"
      description="Multi-channel, maximum results. Set the right outreach cadence using email, LinkedIn, and calls to engage and convert top candidates."
      score={score}
      viewPlanPath="/sales-plan/media-outreach"
      enhanceScorePath="/sales-plan/media-outreach-chat"
      className={className}
    />
  );
};

export default CompletedMediaCard;
