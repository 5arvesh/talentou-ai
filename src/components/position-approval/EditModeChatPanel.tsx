import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ArrowUp, ChevronDown, ListOrdered, MapPin, Radio, Sparkles, Target, UserCheck } from 'lucide-react';
import { usePositionApproval } from '@/context/PositionApprovalContext';
import type { ChatMessage } from '@/context/PositionApprovalContext';

function formatTime(d: Date) {
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function CollapsedPill({ brief, expanded, onToggle }: {
  brief: NonNullable<ReturnType<typeof usePositionApproval>['brief']>;
  expanded: boolean;
  onToggle: () => void;
}) {
  const { recruiter, targets } = brief;
  const planRows = [
    { Icon: UserCheck, text: `${recruiter.name} · ${recruiter.bandwidthPct}% bandwidth · ${recruiter.closesCount} React closes` },
    { Icon: MapPin, text: `${brief.talentPool.locations.slice(0, 3).join(', ')} · ${brief.talentPool.industries.slice(0, 2).join(', ')}` },
    { Icon: Radio, text: brief.channels.filter((c) => c.yield === 'high').map((c) => c.name).join(' + ') },
    { Icon: Target, text: `${targets.closeDays}d to close · ${targets.dailySourcingGoal}/day · ${targets.confidence}% confidence` },
    { Icon: ListOrdered, text: recruiter.planSteps[0]?.split('.')[0] + '…' },
  ];
  const pillLabel = `Plan: ${recruiter.name} · ${targets.closeDays}d close · ${targets.dailySourcingGoal}/day · ${targets.confidence}% confidence`;

  return (
    <div className="shrink-0 px-[14px] py-[10px] border-b border-border">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-2 w-full px-[10px] py-[7px] bg-[#0e0020] rounded-[99px] cursor-pointer"
      >
        <Sparkles className="h-3 w-3 text-[#c084fc] shrink-0" />
        <span className="text-[10px] text-white/80 flex-1 min-w-0 truncate">{pillLabel}</span>
        <ChevronDown
          className="h-[11px] w-[11px] text-[#c084fc] shrink-0 transition-transform"
          style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      {expanded && (
        <div className="bg-[#0e0020] rounded-b-[12px] pt-2.5 pb-3 px-3 mt-[-2px] flex flex-col gap-[6px]">
          {planRows.map(({ Icon, text }, i) => (
            <div key={i} className="flex gap-[7px]">
              <Icon className="h-[11px] w-[11px] text-[#c084fc] shrink-0 mt-[2px]" />
              <span className="text-[10px] text-white/75 leading-[1.4]">{text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AIMessageBubble({ msg }: { msg: ChatMessage }) {
  return (
    <div className="flex flex-col items-start" style={{ maxWidth: '88%' }}>
      <div className="flex items-center gap-[6px] mb-[4px]">
        <div className="w-4 h-4 rounded-full bg-[#0e0020] flex items-center justify-center shrink-0">
          <Sparkles className="h-[9px] w-[9px] text-[#c084fc]" />
        </div>
        <span className="text-[9px] text-muted-foreground">Talentou AI</span>
      </div>
      <div className="bg-background border-[0.5px] border-border rounded-[4px_12px_12px_12px] px-3 py-[9px] text-[12px] leading-[1.5] text-foreground">
        {msg.content}
      </div>
      <span className="text-[9px] text-muted-foreground mt-[3px] ml-1">{formatTime(msg.timestamp)}</span>
    </div>
  );
}

function UserMessageBubble({ msg }: { msg: ChatMessage }) {
  return (
    <div className="flex flex-col items-end self-end" style={{ maxWidth: '88%' }}>
      <div className="bg-[#7800D3] text-white rounded-[12px_4px_12px_12px] px-3 py-[9px] text-[12px] leading-[1.5]">
        {msg.content}
      </div>
      <span className="text-[9px] text-muted-foreground mt-[3px] mr-1">{formatTime(msg.timestamp)}</span>
    </div>
  );
}

const DEFAULT_OPENING =
  "I've opened the full plan on the right. Want me to adjust anything — the close date, channels, or who's assigned? Just tell me what you'd like to change.";

export function EditModeChatPanel() {
  const { brief, chatMessages, sendChatMessage, appliedPlaybookName, appliedPlaybookNote } = usePositionApproval();
  const [inputValue, setInputValue] = useState('');
  const [expanded, setExpanded] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const openingMsg: ChatMessage = useMemo(() => ({
    id: 'msg-opening',
    role: 'ai',
    content: appliedPlaybookName
      ? `I've started this plan from your "${appliedPlaybookName}" Playbook. ${appliedPlaybookNote ?? ''} It's loaded on the right — tell me what to tweak for this role and I'll update it.`.trim()
      : DEFAULT_OPENING,
    timestamp: new Date(),
  }), [appliedPlaybookName, appliedPlaybookNote]);

  const allMessages: ChatMessage[] = chatMessages.length === 0
    ? [openingMsg]
    : [openingMsg, ...chatMessages];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSend = () => {
    const val = inputValue.trim();
    if (!val) return;
    sendChatMessage(val);
    setInputValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  if (!brief) return null;

  return (
    <div className="flex flex-col overflow-hidden border-r border-border" style={{ flex: 1, maxWidth: '380px' }}>
      <CollapsedPill brief={brief} expanded={expanded} onToggle={() => setExpanded((v) => !v)} />

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-[10px] px-4 py-[14px]">
        {allMessages.map((msg) =>
          msg.role === 'ai'
            ? <AIMessageBubble key={msg.id} msg={msg} />
            : <UserMessageBubble key={msg.id} msg={msg} />
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Chat input */}
      <div className="shrink-0 border-t border-border px-4 py-3 flex gap-2 items-end bg-background">
        <textarea
          ref={textareaRef}
          rows={1}
          value={inputValue}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Ask the AI to change anything in the plan..."
          className="flex-1 px-3 py-[9px] border-[0.5px] border-border rounded-[10px] text-[12px] resize-none outline-none bg-muted/30 leading-[1.45] focus:border-[#7800D3] focus:bg-background transition-colors"
          style={{ minHeight: '38px', maxHeight: '120px' }}
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={!inputValue.trim()}
          className="shrink-0 w-[34px] h-[34px] rounded-[9px] bg-[#7800D3] text-white flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default EditModeChatPanel;
