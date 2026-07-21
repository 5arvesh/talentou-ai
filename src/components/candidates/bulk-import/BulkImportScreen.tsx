import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { UploadStage } from './UploadStage';
import { ParsingStage } from './ParsingStage';
import { ReviewAssignStage } from './ReviewAssignStage';
import { CompleteStage } from './CompleteStage';
import { ImportStepper } from './ui/ImportStepper';
import { BatchSourceSelector } from './ui/BatchSourceSelector';
import {
  buildParsedCandidates, confidenceTier, isConfirmable, NO_MATCH, type ParsedCandidate, type SourceChannel,
} from './data';
import { useMatchingSettingsStore } from '@/store/matching-settings-store';

export type Stage = 'upload' | 'parsing' | 'review' | 'complete';

export interface BulkImportScreenHandle {
  jumpToStage: (stage: Stage) => void;
}

// Order matters: index-mapped onto data.ts's POOL, chosen so the tour can reliably target one
// high-tier, one medium-tier (clean), one incomplete, and one multi-flag (duplicate + ai-refined) row.
const MOCK_TOUR_FILE_NAMES = [
  'Rahul_Sharma_CV.pdf', 'Priya_Nair_Resume.pdf', 'Anil_Verma_CV.pdf',
  'Sneha_Kapoor_CV.pdf', 'Vikram_Patel_CV.pdf', 'Deepa_Menon_CV.pdf',
];

export const BulkImportScreen = forwardRef<BulkImportScreenHandle, object>(function BulkImportScreen(_props, ref) {
  const navigate = useNavigate();
  const { highThreshold, lowThreshold } = useMatchingSettingsStore();

  const [stage, setStage] = useState<Stage>('upload');
  const [files, setFiles] = useState<File[]>([]);
  const [candidates, setCandidates] = useState<ParsedCandidate[]>([]);
  const [batchSource, setBatchSource] = useState<SourceChannel>('LinkedIn');

  const reset = useCallback(() => {
    setStage('upload');
    setFiles([]);
    setCandidates([]);
  }, []);

  useImperativeHandle(ref, () => ({
    jumpToStage: (target: Stage) => {
      if (target === 'upload') {
        reset();
        return;
      }
      const mockFiles = MOCK_TOUR_FILE_NAMES.map((name) => new File([], name, { type: 'application/pdf' }));
      const parsed = buildParsedCandidates(mockFiles, batchSource);
      setFiles(mockFiles);
      if (target === 'complete') {
        setCandidates(parsed.map((c, i) => (i < 2 && isConfirmable(c) ? { ...c, status: 'confirmed' as const } : c)));
      } else {
        setCandidates(parsed);
      }
      setStage(target);
    },
  }));

  const startParse = () => {
    setCandidates(buildParsedCandidates(files, batchSource));
    setStage('parsing');
  };

  const setStatus = (id: string, status: ParsedCandidate['status']) =>
    setCandidates((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));

  const changePosition = (id: string, title: string) =>
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, assignedTitle: title, status: title === NO_MATCH && c.status === 'confirmed' ? 'pending' : c.status }
          : c
      )
    );

  const changeSource = (id: string, source: SourceChannel) =>
    setCandidates((prev) => prev.map((c) => (c.id === id ? { ...c, source } : c)));

  const confirmAllHigh = () =>
    setCandidates((prev) =>
      prev.map((c) =>
        confidenceTier(c.score, highThreshold, lowThreshold) === 'high' && isConfirmable(c) ? { ...c, status: 'confirmed' } : c
      )
    );

  const confirmed = candidates.filter((c) => c.status === 'confirmed');
  const unassigned = candidates.length - confirmed.length;

  const handleDone = () => {
    toast.success(`${confirmed.length} candidates imported${unassigned > 0 ? ` · ${unassigned} sent to Unassigned` : ''}.`);
    navigate('/ta-associate/candidates');
  };

  const handleSaveAndExit = () => {
    // Front-end-only mock: no draft persistence exists yet — this leaves the flow, same as closing.
    navigate('/ta-associate/candidates');
  };

  return (
    <div className="flex flex-col gap-5 px-6 py-5 max-w-[1100px] mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[18px] font-medium text-text-primary">Bulk import candidates</h1>
          <p className="text-[13px] text-text-secondary mt-0.5">Senior React Developer pipeline · 14 days open</p>
        </div>
        <button
          type="button"
          onClick={handleSaveAndExit}
          className="shrink-0 rounded-[var(--radius)] px-3.5 py-2 text-[13px] font-medium text-text-secondary border border-border hover:bg-surface-1 transition-colors"
        >
          Save and exit
        </button>
      </div>

      <ImportStepper stage={stage} />

      {(stage === 'upload' || stage === 'review') && (
        <BatchSourceSelector value={batchSource} onChange={setBatchSource} />
      )}

      {stage === 'upload' && (
        <UploadStage files={files} onFilesChange={setFiles} onParse={startParse} />
      )}
      {stage === 'parsing' && (
        <ParsingStage total={candidates.length} onDone={() => setStage('review')} />
      )}
      {stage === 'review' && (
        <ReviewAssignStage
          candidates={candidates}
          onConfirm={(id) => setStatus(id, 'confirmed')}
          onSkip={(id) => setStatus(id, 'skipped')}
          onChangePosition={changePosition}
          onChangeSource={changeSource}
          onConfirmAllHigh={confirmAllHigh}
          onImport={() => setStage('complete')}
        />
      )}
      {stage === 'complete' && (
        <CompleteStage candidates={candidates} onDone={handleDone} />
      )}
    </div>
  );
});

export default BulkImportScreen;
