
import { CompletedCardsTAAssociate } from '../Reuseable/CompletedCardsTAAssociate';

interface CompletedMessageCardProps_TA_Associate {
  className?: string;
  path?: string;
}

export const CompletedMessageCard_TA_Associate = ({ className, path }: CompletedMessageCardProps_TA_Associate) => {
  return (
    <CompletedCardsTAAssociate
      title="Company USP"
      description={[
        "Value proposition messages created",
        "Recruitment collaterals ready",
        "All templates approved"
      ]}
      className={className}
      path={path}
    />
  );
};
