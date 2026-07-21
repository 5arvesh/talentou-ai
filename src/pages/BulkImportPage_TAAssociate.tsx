import React, { useMemo, useRef } from 'react';
import { UploadCloud } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { BulkImportScreen, BulkImportScreenHandle } from '@/components/candidates/bulk-import/BulkImportScreen';
import { useScreenTour } from '@/hooks/useScreenTour';
import { TourStep } from '@/store/tour-store';
import { RECRUITER_TOUR_SCREEN_SEQUENCE } from '@/constants/tourScreens';

function buildBulkImportTourSteps(screenRef: React.RefObject<BulkImportScreenHandle>): TourStep[] {
  return [
    {
      variant: 'intro',
      icon: UploadCloud,
      screenSequence: RECRUITER_TOUR_SCREEN_SEQUENCE,
      screenKey: 'bulk-import',
      title: "Batch source, not one-by-one",
      description: "Upload a folder of resumes and let the AI match each candidate to the best-fitting open role. This is how you source at scale.",
    },
    {
      variant: 'intro',
      icon: UploadCloud,
      screenSequence: RECRUITER_TOUR_SCREEN_SEQUENCE,
      screenKey: 'bulk-import',
      title: "Four stages, one review",
      description: "Upload, parsing, review, done. The AI does the matching — you just confirm or reassign during review.",
      onEnter: () => screenRef.current?.jumpToStage('upload'),
    },
    {
      targetSelector: '[data-tour-id="bulk-import-stepper"]',
      title: "Four stages",
      description: "Upload, parsing, review, and complete. You're always on this screen during review — no popup to lose track of.",
    },
    {
      targetSelector: '[data-tour-id="bulk-import-source-selector"]',
      title: "Where did these come from?",
      description: "Set the source for the whole batch — LinkedIn, referral, job board, or direct sourcing. You can override it for individual candidates below if the batch is mixed.",
    },
    {
      targetSelector: '[data-tour-id="bulk-import-stat-cards"]',
      title: "Your batch at a glance",
      description: "Total parsed, how many are high-confidence matches, how many need a closer look, and any incomplete or possible-duplicate candidates.",
      onEnter: () => screenRef.current?.jumpToStage('review'),
    },
    {
      targetSelector: '[data-tour-id="bulk-import-confidence-banner"]',
      title: "Bulk confirm the easy ones",
      description: "When a match is this strong, you likely don't need to double-check it. Confirm all of them in one click, or review individually if you'd rather.",
    },
    {
      targetSelector: '[data-tour-id="bulk-import-row-high"]',
      title: "Above 80 percent, trust it",
      description: "The AI pre-fills its top suggestion. Confirm with the checkmark, or change it if you know better.",
    },
    {
      targetSelector: '[data-tour-id="bulk-import-row-medium"]',
      title: "Between 40 and 80, it's a suggestion",
      description: "The AI has a guess, but it's not confident enough to pre-fill. Click the chip to accept it, or pick a different role from the dropdown.",
    },
    {
      targetSelector: '[data-tour-id="bulk-import-row-low"]',
      title: "Below 40, you're on your own",
      description: "Nothing scored well enough for the AI to suggest. Pick a position manually, or leave it — it'll land in the Unassigned pool.",
    },
    {
      targetSelector: '[data-tour-id="bulk-import-flags-column"]',
      title: "Watch for these",
      description: "Incomplete means required fields are missing. Possible duplicate means the email or phone matches an existing candidate. AI-refined means a deeper check already ran to break a tie — a candidate can carry more than one flag at once.",
    },
    {
      targetSelector: '[data-tour-id="bulk-import-import-button"]',
      title: "Nothing gets lost",
      description: "Confirmed candidates get imported now. Anything you skip or leave unconfirmed goes to the Unassigned pool — come back and assign it later.",
    },
  ];
}

export function BulkImportPage_TAAssociate() {
  const screenRef = useRef<BulkImportScreenHandle>(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tourSteps = useMemo(() => buildBulkImportTourSteps(screenRef), []);
  useScreenTour('recruiter', 'bulk-import', tourSteps);

  return (
    <AppLayout>
      <BulkImportScreen ref={screenRef} />
    </AppLayout>
  );
}

export default BulkImportPage_TAAssociate;
