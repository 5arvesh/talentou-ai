
import { CompletedCardsTAAssociate } from '../Reuseable/CompletedCardsTAAssociate';

interface CompletedMarketCardProps_TA_Associate {
  className?: string;
  path?: string;
}

export const CompletedMarketCard_TA_Associate = ({ className, path }: CompletedMarketCardProps_TA_Associate) => {
  return (
    <CompletedCardsTAAssociate
      title="Talent Pool"
      description={[
        "Target profiles defined",
        "Skill requirements set",
        "Market segments identified"
      ]}
      className={className}
      path={path}
    />
  );
};
