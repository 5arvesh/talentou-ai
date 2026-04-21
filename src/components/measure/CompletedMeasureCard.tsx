import clsx from 'clsx';
import { CompletedCards } from '../Reuseable/CompletedCards';

interface CompletedMeasureCardProps {
  score?: number;
  className?: string;
}

export const CompletedMeasureCard = ({ score = 85, className }: CompletedMeasureCardProps) => {
  return (
    <CompletedCards
      title="Success Metrics"
      description="What gets tracked, gets optimized. Define TA Team KPIs that drive progress, turning consistent efforts into repeatable hiring success"
      score={score}
      viewPlanPath="/sales-plan/success-metrics"
      enhanceScorePath="/sales-plan/measure-kpi-chat"
      className={clsx("h-[40px]", className)}
    />
  );
};

export default CompletedMeasureCard;
