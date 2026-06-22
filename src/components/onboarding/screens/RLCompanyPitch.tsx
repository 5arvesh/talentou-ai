import React, { useRef, useState } from 'react';
import { ArrowRight, FileText, Loader2, PenLine, Paperclip, Sparkles, X } from 'lucide-react';
import { HorizontalStepper } from '../HorizontalStepper';

type StepState = { label: string; status: 'done' | 'current' | 'locked' };

interface PitchStepProps {
  onBack: () => void;
  onNext: () => void;
  steps?: StepState[];
}

const DEFAULT_USP =
  `We're a team that moves fast, ships impactful work, and genuinely cares about the people we hire. Our culture is built on transparency, ownership, and continuous learning. We believe great talent deserves great opportunities — and we work hard to make sure every new hire feels that from day one.`;

// Mock "AI parse" result — what the doc-reading step produces.
const ENHANCED_USP =
  `We move fast and ship work that matters, but never at the expense of the people who build it. Our culture runs on transparency, real ownership, and a genuine commitment to growth — mentorship is built into how we work, not bolted on. We invest in our people with clear career paths, flexible ways of working, and the trust to do their best work. Every new hire feels that from day one: this is a place where great talent is given great opportunities, and where your work is seen.`;

export function PitchStep({ onBack, onNext, steps }: PitchStepProps) {
  const domain = localStorage.getItem('onboardingDomain') || 'yourcompany.com';
  const [usp, setUsp] = useState(DEFAULT_USP);
  const [docName, setDocName] = useState<string | null>(null);
  const [parsing, setParsing] = useState(false);
  const [appliedDoc, setAppliedDoc] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setDocName(file.name);
    setAppliedDoc(null);
    setParsing(true);
    // Mock AI parse: read the culture doc and enrich the pitch.
    setTimeout(() => {
      setUsp(ENHANCED_USP);
      setParsing(false);
      setAppliedDoc(file.name);
    }, 1300);
    e.target.value = '';
  };

  const clearDoc = () => {
    setDocName(null);
    setAppliedDoc(null);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center px-8 py-8">
      {steps && (
        <div className="w-full max-w-[640px] mb-8">
          <HorizontalStepper steps={steps} />
        </div>
      )}
      <div className="w-full max-w-[560px]">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="font-sora text-[22px] font-semibold text-[#0e0020] mb-1">Your company pitch</h1>
          <p className="text-[13px] text-[#888]">
            AI generated this from <span className="font-medium text-[#0e0020]">{domain}</span> — it'll appear in every recruitment brief your team sends. Edit it to match your voice.
          </p>
        </div>

        {/* Pitch card (full border, no side-stripe) */}
        <div className="border border-[#e8e4f0] rounded-[12px] p-[14px_16px] bg-[#faf8ff]">
          <div className="flex items-center gap-1 mb-[6px]">
            <Sparkles className="h-3 w-3 text-[#7800D3]" />
            <span className="text-[10px] font-semibold text-[#7800D3] uppercase tracking-[0.06em]">
              {appliedDoc ? `AI-generated from ${domain} + your doc` : `AI-generated from ${domain}`}
            </span>
          </div>
          <textarea
            value={usp}
            onChange={(e) => setUsp(e.target.value)}
            rows={6}
            disabled={parsing}
            className="w-full border-none bg-transparent text-[13px] text-[#444] italic leading-[1.65] resize-none outline-none min-h-[120px] disabled:opacity-60"
            placeholder="Describe what makes your company a great place to work — this will appear in every brief your recruiters send."
          />
        </div>

        <div className="flex items-center justify-between gap-2 mt-2">
          <div className="flex items-center gap-1 text-[#888]">
            <PenLine className="h-3 w-3" />
            <span className="text-[11px]">Click the text above to edit</span>
          </div>

          {/* Culture-doc attach */}
          <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.txt,.md" className="hidden" onChange={handleFile} />
          {!docName && (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-1.5 border border-[#e4ddff] bg-white text-[#7800D3] rounded-[9px] px-3 py-[7px] text-[11px] font-medium hover:bg-[#f6f4ff] transition-colors"
            >
              <Paperclip className="h-3 w-3" />
              Attach a culture doc
            </button>
          )}
        </div>

        {/* Doc status chip */}
        {docName && (
          <div className="mt-2 flex items-center gap-2 bg-white border border-[#e8e4f0] rounded-[9px] px-3 py-[7px]">
            {parsing ? (
              <Loader2 className="h-3.5 w-3.5 text-[#7800D3] animate-spin shrink-0" />
            ) : (
              <FileText className="h-3.5 w-3.5 text-[#7800D3] shrink-0" />
            )}
            <span className="text-[12px] text-[#444] flex-1 truncate">{docName}</span>
            <span className="text-[11px] text-[#888] shrink-0">
              {parsing ? 'Reading your document…' : 'Pitch updated from this doc'}
            </span>
            {!parsing && (
              <button type="button" onClick={clearDoc} className="text-[#ccc] hover:text-[#A32D2D] transition-colors shrink-0">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        )}

        {/* Where this appears */}
        <div className="mt-4 bg-[#faf8ff] border border-[#e8e4f0] rounded-[10px] p-3">
          <p className="text-[11px] font-semibold text-[#7800D3] uppercase tracking-[0.05em] mb-[5px]">Where this appears</p>
          <p className="text-[12px] text-[#888] leading-[1.55]">
            This pitch is shown to candidates in every AI-generated recruitment brief. You can update it anytime in Settings → Company.
          </p>
        </div>

        {/* Centered actions */}
        <div className="flex items-center justify-center gap-3 mt-7">
          <button
            type="button"
            onClick={onBack}
            className="border border-[#ddd] rounded-[10px] px-5 py-[10px] text-[13px] text-[#888] bg-transparent hover:bg-[#fafafa] transition-colors"
          >
            Back
          </button>
          <button
            type="button"
            onClick={onNext}
            className="bg-[#7800D3] text-white rounded-[10px] px-6 py-[10px] text-[13px] font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-1.5"
          >
            Looks good
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PitchStep;
