import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { NumericInput } from "./NumericInput";
import {
  Link2,
  Clock,
  Mic,
  ShieldCheck,
  Brain,
  Bell,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from "lucide-react";

interface SectionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function SettingsSection({ icon, title, description, children, defaultOpen = true }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <button
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#ebdbfc] flex items-center justify-center text-[#7800D3]">
            {icon}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          </div>
        </div>
        {open ? (
          <ChevronUp className="h-4 w-4 text-gray-400 shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-400 shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-gray-100">
          <div className="pt-4 space-y-5">{children}</div>
        </div>
      )}
    </div>
  );
}

interface ToggleRowProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  badge?: { label: string; variant: "critical" | "warning" | "info" };
}

function ToggleRow({ label, description, checked, onChange, badge }: ToggleRowProps) {
  const badgeColors = {
    critical: "bg-red-50 text-red-600 border-red-200",
    warning: "bg-amber-50 text-amber-600 border-amber-200",
    info: "bg-blue-50 text-blue-600 border-blue-200",
  };

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-800">{label}</span>
          {badge && (
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${badgeColors[badge.variant]}`}>
              {badge.label}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

export function InterviewSettings() {
  // ── Link & Access ──────────────────────────────────────────────
  const [linkExpiry, setLinkExpiry] = useState(7);
  const [maxAttempts, setMaxAttempts] = useState(1);
  const [candidateReminders, setCandidateReminders] = useState(true);
  const [reminderHours, setReminderHours] = useState(24);

  // ── Timing ────────────────────────────────────────────────────
  const [maxDuration, setMaxDuration] = useState(60);
  const [readingTime, setReadingTime] = useState(30);
  const [thinkingTime, setThinkingTime] = useState(30);
  const [maxWaitTime, setMaxWaitTime] = useState(30);

  // ── Answer Settings ───────────────────────────────────────────
  const [defaultAnswerMode, setDefaultAnswerMode] = useState("voice");
  const [allowReattempt, setAllowReattempt] = useState(true);
  const [maxReattempts, setMaxReattempts] = useState(2);
  const [allowSkip, setAllowSkip] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(true);
  const [resendOTPLimit, setResendOTPLimit] = useState(3);
  const [allowTestRun, setAllowTestRun] = useState(true);

  // ── Proctoring ────────────────────────────────────────────────
  const [faceDetection, setFaceDetection] = useState(true);
  const [multipleFacesDetection, setMultipleFacesDetection] = useState(true);
  const [eyeTracking, setEyeTracking] = useState(true);
  const [tabSwitchDetection, setTabSwitchDetection] = useState(true);
  const [backgroundVoiceDetection, setBackgroundVoiceDetection] = useState(false);
  const [clipboardDetection, setClipboardDetection] = useState(true);
  const [autoFlagSuspicious, setAutoFlagSuspicious] = useState(true);

  // ── AI Evaluation ─────────────────────────────────────────────
  const [aiScoring, setAiScoring] = useState(true);
  const [aiEvalCriteria, setAiEvalCriteria] = useState("balanced");
  const [requireReviewBeforeShortlist, setRequireReviewBeforeShortlist] = useState(true);
  const [autoGenerateAnswerKeys, setAutoGenerateAnswerKeys] = useState(true);
  const [aiQuestionSuggestions, setAiQuestionSuggestions] = useState(true);
  const [defaultQuestionCount, setDefaultQuestionCount] = useState(5);

  // ── Notifications ─────────────────────────────────────────────
  const [notifyOnCompletion, setNotifyOnCompletion] = useState(true);
  const [notifyHiringTeam, setNotifyHiringTeam] = useState(true);
  const [sendCandidateReport, setSendCandidateReport] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  const handleSave = () => {
    toast.success("Interview settings saved successfully");
  };

  const handleReset = () => {
    toast.info("Settings reset to defaults");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Interview Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Configure default settings for all AI-led interviews. These apply globally and can be overridden per questionnaire.
        </p>
      </div>

      {/* ── 1. Link & Access ─────────────────────────────────────── */}
      <SettingsSection
        icon={<Link2 className="h-4 w-4" />}
        title="Link & Access"
        description="Control how candidates access and interact with the interview link"
      >
        <NumericInput
          label="Interview link expiry"
          description="Days before the interview link expires and becomes inaccessible"
          value={linkExpiry}
          onChange={setLinkExpiry}
          min={1}
          max={30}
        />

        <NumericInput
          label="Max attempts per candidate"
          description="How many times a candidate can attempt the interview before the link is locked"
          value={maxAttempts}
          onChange={setMaxAttempts}
          min={1}
          max={5}
        />

        <NumericInput
          label="Resend OTP limit"
          description="Maximum number of times a candidate can request a new OTP"
          value={resendOTPLimit}
          onChange={setResendOTPLimit}
          min={1}
          max={10}
        />

        <ToggleRow
          label="Candidate reminder notifications"
          description="Send automated email reminders to candidates who haven't completed the interview"
          checked={candidateReminders}
          onChange={setCandidateReminders}
        />

        {candidateReminders && (
          <NumericInput
            label="Reminder lead time (hours before expiry)"
            description="Send the reminder this many hours before the link expires"
            value={reminderHours}
            onChange={setReminderHours}
            min={1}
            max={72}
          />
        )}
      </SettingsSection>

      {/* ── 2. Timing ────────────────────────────────────────────── */}
      <SettingsSection
        icon={<Clock className="h-4 w-4" />}
        title="Timing"
        description="Set default time limits for interviews and per-question phases"
      >
        <NumericInput
          label="Max interview duration (minutes)"
          description="Total time allowed for the entire interview session"
          value={maxDuration}
          onChange={setMaxDuration}
          min={5}
          max={180}
          step={5}
        />

        <NumericInput
          label="Reading time per question (seconds)"
          description="Time given to the candidate to read the question before recording begins"
          value={readingTime}
          onChange={setReadingTime}
          min={5}
          max={120}
          step={5}
        />

        <NumericInput
          label="Thinking / preparation time (seconds)"
          description="Optional time for candidate to prepare after reading, before the answer timer starts"
          value={thinkingTime}
          onChange={setThinkingTime}
          min={0}
          max={120}
          step={5}
        />

        <NumericInput
          label="Max wait time after reading question (seconds)"
          description="Time the system waits for the candidate to start answering before marking as skipped"
          value={maxWaitTime}
          onChange={setMaxWaitTime}
          min={5}
          max={120}
          step={5}
        />
      </SettingsSection>

      {/* ── 3. Answer Settings ───────────────────────────────────── */}
      <SettingsSection
        icon={<Mic className="h-4 w-4" />}
        title="Answer Settings"
        description="Configure how candidates submit their answers and the default answer format"
      >
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-800">Default answer mode</label>
          <p className="text-xs text-muted-foreground">
            The recording mode applied to all questions unless overridden in a questionnaire
          </p>
          <Select value={defaultAnswerMode} onValueChange={setDefaultAnswerMode}>
            <SelectTrigger className="max-w-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="voice">Voice only</SelectItem>
              <SelectItem value="text">Text only</SelectItem>
              <SelectItem value="both">Voice & Text (candidate chooses)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <NumericInput
          label="Default number of questions per interview"
          description="Used when AI generates a questionnaire automatically"
          value={defaultQuestionCount}
          onChange={setDefaultQuestionCount}
          min={1}
          max={20}
        />

        <ToggleRow
          label="Allow re-recording"
          description="Candidates can discard and re-record their answer before submitting"
          checked={allowReattempt}
          onChange={setAllowReattempt}
        />

        {allowReattempt && (
          <NumericInput
            label="Max re-recording attempts per question"
            description="Limit how many times a candidate can re-record a single answer"
            value={maxReattempts}
            onChange={setMaxReattempts}
            min={1}
            max={5}
          />
        )}

        <ToggleRow
          label="Allow candidates to skip questions"
          description="If enabled, candidates can skip a question and move on without answering"
          checked={allowSkip}
          onChange={setAllowSkip}
        />

        <ToggleRow
          label="Show progress bar to candidate"
          description="Display a step indicator so candidates know how many questions remain"
          checked={showProgressBar}
          onChange={setShowProgressBar}
        />

        <ToggleRow
          label="Allow test environment check"
          description="Candidates complete a short camera/mic test before the interview begins"
          checked={allowTestRun}
          onChange={setAllowTestRun}
        />
      </SettingsSection>

      {/* ── 4. Proctoring & Security ─────────────────────────────── */}
      <SettingsSection
        icon={<ShieldCheck className="h-4 w-4" />}
        title="Proctoring & Security"
        description="Configure integrity checks to detect suspicious behaviour during interviews"
      >
        <ToggleRow
          label="Face detection"
          description="Flag when no face is visible in the camera frame"
          checked={faceDetection}
          onChange={setFaceDetection}
          badge={{ label: "Critical", variant: "critical" }}
        />

        <ToggleRow
          label="Multiple faces detection"
          description="Flag when more than one face appears — potential impersonation"
          checked={multipleFacesDetection}
          onChange={setMultipleFacesDetection}
          badge={{ label: "Critical", variant: "critical" }}
        />

        <ToggleRow
          label="Eye tracking"
          description="Flag when the candidate looks away from the screen for extended periods"
          checked={eyeTracking}
          onChange={setEyeTracking}
          badge={{ label: "Warning", variant: "warning" }}
        />

        <ToggleRow
          label="Tab / window switch detection"
          description="Flag when the candidate navigates away from the interview tab"
          checked={tabSwitchDetection}
          onChange={setTabSwitchDetection}
          badge={{ label: "Critical", variant: "critical" }}
        />

        <ToggleRow
          label="Background voice detection"
          description="Flag when additional voices are detected in the candidate's audio"
          checked={backgroundVoiceDetection}
          onChange={setBackgroundVoiceDetection}
          badge={{ label: "Warning", variant: "warning" }}
        />

        <ToggleRow
          label="Clipboard activity detection"
          description="Flag copy/paste events that may indicate use of external references"
          checked={clipboardDetection}
          onChange={setClipboardDetection}
          badge={{ label: "Info", variant: "info" }}
        />

        <Separator />

        <ToggleRow
          label="Auto-flag suspicious moments"
          description="Automatically mark important timestamps in the recording review for quick access"
          checked={autoFlagSuspicious}
          onChange={setAutoFlagSuspicious}
        />
      </SettingsSection>

      {/* ── 5. AI Evaluation ─────────────────────────────────────── */}
      <SettingsSection
        icon={<Brain className="h-4 w-4" />}
        title="AI Evaluation"
        description="Control how Talentou AI scores and evaluates candidate responses"
      >
        <ToggleRow
          label="Enable AI scoring"
          description="Automatically generate a score (0–100) with reasoning, strengths, and improvement areas for each candidate"
          checked={aiScoring}
          onChange={setAiScoring}
        />

        {aiScoring && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-800">AI evaluation criteria</label>
            <p className="text-xs text-muted-foreground">
              Adjust the weighting of how candidates are evaluated
            </p>
            <Select value={aiEvalCriteria} onValueChange={setAiEvalCriteria}>
              <SelectTrigger className="max-w-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="balanced">Balanced (technical + communication)</SelectItem>
                <SelectItem value="technical">Technical accuracy focused</SelectItem>
                <SelectItem value="communication">Communication & clarity focused</SelectItem>
                <SelectItem value="behavioral">Behavioural & cultural fit focused</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <ToggleRow
          label="Require review before shortlisting"
          description="Interviewers must review the AI evaluation before a candidate can be shortlisted for F2F"
          checked={requireReviewBeforeShortlist}
          onChange={setRequireReviewBeforeShortlist}
        />

        <ToggleRow
          label="Auto-generate answer keys"
          description="AI automatically creates expected answer benchmarks for technical questions"
          checked={autoGenerateAnswerKeys}
          onChange={setAutoGenerateAnswerKeys}
        />

        <ToggleRow
          label="AI question suggestions"
          description="AI suggests relevant questions when creating a new questionnaire based on the job description"
          checked={aiQuestionSuggestions}
          onChange={setAiQuestionSuggestions}
        />
      </SettingsSection>

      {/* ── 6. Notifications ─────────────────────────────────────── */}
      <SettingsSection
        icon={<Bell className="h-4 w-4" />}
        title="Notifications"
        description="Choose who gets notified and when during the interview lifecycle"
        defaultOpen={false}
      >
        <ToggleRow
          label="Notify interviewer on completion"
          description="Send an email to the assigned interviewer when a candidate finishes their interview"
          checked={notifyOnCompletion}
          onChange={setNotifyOnCompletion}
        />

        <ToggleRow
          label="Notify hiring team"
          description="Copy the hiring lead and recruiter on completion notifications"
          checked={notifyHiringTeam}
          onChange={setNotifyHiringTeam}
        />

        <ToggleRow
          label="Send completion report to candidate"
          description="Automatically email candidates a summary report after their interview is reviewed"
          checked={sendCandidateReport}
          onChange={setSendCandidateReport}
        />

        <ToggleRow
          label="Weekly interview digest"
          description="Send a weekly summary of interview activity to the hiring team"
          checked={weeklyDigest}
          onChange={setWeeklyDigest}
        />
      </SettingsSection>

      {/* Save / Reset */}
      <div className="flex items-center gap-3 pt-2">
        <Button
          onClick={handleSave}
          style={{ backgroundColor: "#4ead3b", color: "black" }}
          className="hover:opacity-90 font-medium"
        >
          <CheckCircle2 className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
        <Button variant="outline" onClick={handleReset} className="text-gray-600">
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
}
