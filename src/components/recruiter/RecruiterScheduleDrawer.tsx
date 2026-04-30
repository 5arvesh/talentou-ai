import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Clock, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CandidateSummary {
  id: string | number;
  name: string;
  jobTitle?: string;
}

interface RecruiterScheduleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  candidates: CandidateSummary[];
  technicalMins: number;
  totalDurationMins: number;
  onSubmit: (data: ScheduleData) => void;
}

export interface ScheduleData {
  candidateIds: Array<string | number>;
  expiryDate: Date;
  expiryTime: string;
  sendDelay: SendDelay;
}

type SendDelay = 'now' | '1h' | '2h' | '4h' | '8h';

const SEND_OPTIONS: { value: SendDelay; label: string }[] = [
  { value: 'now', label: 'Send Now' },
  { value: '1h', label: 'Send in 1 hour' },
  { value: '2h', label: 'Send in 2 hours' },
  { value: '4h', label: 'Send in 4 hours' },
  { value: '8h', label: 'Send in 8 hours' },
];

export function RecruiterScheduleDrawer({
  isOpen,
  onClose,
  candidates,
  technicalMins,
  totalDurationMins,
  onSubmit,
}: RecruiterScheduleDrawerProps) {
  const isBulk = candidates.length > 1;

  const [expiryDate, setExpiryDate] = useState<Date | undefined>(undefined);
  const [expiryTime, setExpiryTime] = useState('');
  const [sendDelay, setSendDelay] = useState<SendDelay>('now');

  const resetState = () => {
    setExpiryDate(undefined);
    setExpiryTime('');
    setSendDelay('now');
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleSubmit = () => {
    if (!expiryDate || !expiryTime) return;
    onSubmit({
      candidateIds: candidates.map(c => c.id),
      expiryDate,
      expiryTime,
      sendDelay,
    });
    handleClose();
  };

  const drawerTitle = isBulk
    ? `Bulk Schedule — ${candidates.length} candidates`
    : 'Schedule Interview';

  const drawerDescription = isBulk
    ? 'All selected candidates will receive an interview link'
    : candidates[0]?.name
    ? `for ${candidates[0].name}${candidates[0].jobTitle ? ` · ${candidates[0].jobTitle}` : ''}`
    : '';

  return (
    <Sheet open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <SheetContent side="right" className="w-[520px] sm:max-w-[520px] flex flex-col p-0">
        {/* Header */}
        <SheetHeader className="px-6 py-5 border-b border-border">
          <SheetTitle className="text-lg font-bold text-[#7800D3]">{drawerTitle}</SheetTitle>
          {drawerDescription && (
            <SheetDescription className="text-sm text-muted-foreground mt-0.5">
              {drawerDescription}
            </SheetDescription>
          )}
        </SheetHeader>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Candidate / Interview summary */}
          {isBulk ? (
            <Card className="p-3 bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500 shrink-0" />
                <p className="text-sm text-blue-800">
                  Scheduling for <span className="font-semibold">{candidates.length} candidates</span>
                  {totalDurationMins > 0 && ` · ~${totalDurationMins} min interview each`}
                </p>
              </div>
            </Card>
          ) : (
            <Card className="p-3 bg-muted/20 border border-border/60">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Interview Summary
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                {technicalMins > 0 && (
                  <span>
                    <span className="text-muted-foreground">Preset Questions: </span>
                    <span className="font-semibold text-blue-600">~{technicalMins} min</span>
                  </span>
                )}
                {totalDurationMins > 0 && (
                  <span>
                    <span className="text-muted-foreground">Total Duration: </span>
                    <span className="font-semibold text-foreground">~{totalDurationMins} min</span>
                  </span>
                )}
              </div>
            </Card>
          )}

          {/* Expiry Date */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Interview Link Expiry Date <span className="text-destructive">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal h-11',
                    !expiryDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {expiryDate ? format(expiryDate, 'PPP') : 'Select expiry date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={expiryDate}
                  onSelect={setExpiryDate}
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <p className="text-xs text-muted-foreground">The interview link will expire on this date</p>
          </div>

          {/* Expiry Time */}
          <div className="space-y-2">
            <Label htmlFor="expiry-time" className="text-sm font-medium text-foreground">
              Expiry Time <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                id="expiry-time"
                type="time"
                value={expiryTime}
                onChange={(e) => setExpiryTime(e.target.value)}
                className="h-11 pl-9"
              />
            </div>
          </div>

          {/* Send delay */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">When to send the interview link</Label>
            <RadioGroup
              value={sendDelay}
              onValueChange={(v) => setSendDelay(v as SendDelay)}
              className="space-y-2"
            >
              {SEND_OPTIONS.map(({ value, label }) => (
                <div
                  key={value}
                  className={cn(
                    'flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors',
                    sendDelay === value
                      ? 'border-[#7800D3] bg-[#faf5ff]'
                      : 'border-border hover:bg-muted/30'
                  )}
                  onClick={() => setSendDelay(value)}
                >
                  <RadioGroupItem value={value} id={`delay-${value}`} />
                  <Label htmlFor={`delay-${value}`} className="cursor-pointer text-sm">
                    {label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        {/* Footer */}
        <SheetFooter className="px-6 py-4 border-t border-border">
          <div className="flex gap-3 w-full">
            <SheetClose asChild>
              <Button variant="outline" className="flex-1" onClick={handleClose}>
                Cancel
              </Button>
            </SheetClose>
            <Button
              className="flex-1 bg-[#4ead3b] hover:bg-[#3e8a2f] text-white disabled:opacity-50"
              disabled={!expiryDate || !expiryTime}
              onClick={handleSubmit}
            >
              {isBulk ? `Schedule ${candidates.length} Interviews` : 'Send Interview Link'}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
