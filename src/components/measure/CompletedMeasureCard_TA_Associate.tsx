
import { CompletedCardsTAAssociate } from '../Reuseable/CompletedCardsTAAssociate';

interface CompletedMeasureCardProps_TA_Associate {
  className?: string;
  path?: string;
}

export const CompletedMeasureCard_TA_Associate = ({ className, path }: CompletedMeasureCardProps_TA_Associate) => {
  return (
    <CompletedCardsTAAssociate
      title="Success Metrics"
      description={[
        "KPIs established",
        "Target metrics set",
        "Tracking system ready"
      ]}
      className={className}
      path={path}
    />
  );
};
