import { CompletedCards } from '../Reuseable/CompletedCards';

interface CompletedMarketCardProps {
  score?: number;
  className?: string;
}

export const CompletedMarketCard = ({ score = 78, className }: CompletedMarketCardProps) => {
  return (
    <CompletedCards
      title="Talent Pool"
      description="The right candidates, the right results. Identify your target profiles and ensure your team is focused on the highest-impact talent segments."
      score={score}
      viewPlanPath="/sales-plan/market-database"
      enhanceScorePath="/sales-plan/market-database-chat"
      className={className}
    />
  );
};

export default CompletedMarketCard;
