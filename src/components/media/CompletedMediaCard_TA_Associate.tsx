
import { CompletedCardsTAAssociate } from '../Reuseable/CompletedCardsTAAssociate';

interface CompletedMediaCardProps_TA_Associate {
  className?: string;
  path?: string;
}

export const CompletedMediaCard_TA_Associate = ({ className, path }: CompletedMediaCardProps_TA_Associate) => {
  return (
    <CompletedCardsTAAssociate
      title="Recruitment Channels"
      description={[
        "Multi-channel strategy set",
        "Outreach cadences defined",
        "Templates ready to use"
      ]}
      className={className}
      path={path}
    />
  );
};
