import React, { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

interface InterviewSchedulingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  candidateName: string;
  technicalMins: number;
  behavioralMins: number;
  onSubmit: () => void;
}

type SendOption = 'now' | '2h' | '4h' | '8h';

export function InterviewSchedulingDrawer({
  isOpen,
  onClose,
  candidateName,
  technicalMins,
  behavioralMins,
  onSubmit,
}: InterviewSchedulingDrawerProps) {
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(undefined);
  const [expiryTime, setExpiryTime] = useState('');
  const [sendOption, setSendOption] = useState<SendOption>('now');

  const totalShown = technicalMins + behavioralMins;

  const handleSubmit = () => {
    onSubmit();
    // Reset form
    setExpiryDate(undefined);
    setExpiryTime('');
    setSendOption('now');
  };

  const handleClose = () => {
    setExpiryDate(undefined);
    setExpiryTime('');
    setSendOption('now');
    onClose();
  };

  const sendOptionLabels: Record<SendOption, string> = {
    now: 'Send Now',
    '2h': 'Send in 2 hours',
    '4h': 'Send in 4 hours',
    '8h': 'Send in 8 hours',
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <SheetContent side="right" className="w-[460px] sm:max-w-[460px] flex flex-col p-0">
        <SheetHeader className="px-6 py-5 border-b border-border">
          <SheetTitle className="text-lg font-bold text-[#7800D3]">Schedule Interview</SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            for <span className="font-medium text-foreground">{candidateName}</span>
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Time Summary */}
          <Card className="p-4 bg-muted/30 border border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Interview Time Summary
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span>
                <span className="text-muted-foreground">Technical: </span>
                <span className="font-semibold text-blue-600">~{technicalMins} min</span>
              </span>
              {behavioralMins > 0 && (
                <>
                  <span className="text-muted-foreground">|</span>
                  <span>
                    <span className="text-muted-foreground">Behavioral: </span>
                    <span className="font-semibold text-orange-600">~{behavioralMins} min</span>
                  </span>
                </>
              )}
              <span className="text-muted-foreground">|</span>
              <span>
                <span className="text-muted-foreground">Total: </span>
                <span className="font-semibold text-foreground">~{totalShown} min</span>
              </span>
            </div>
          </Card>

          {/* Expiry Date */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Interview Link Expiry Date
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
                  {expiryDate ? format(expiryDate, 'PPP') : 'Pick a date'}
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
          </div>

          {/* Expiry Time */}
          <div className="space-y-2">
            <Label htmlFor="expiry-time" className="text-sm font-medium text-foreground">
              Expiry Time
            </Label>
            <Input
              id="expiry-time"
              type="time"
              value={expiryTime}
              onChange={(e) => setExpiryTime(e.target.value)}
              className="h-11"
            />
          </div>

          {/* Send Options */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">When to send the link</Label>
            <RadioGroup
              value={sendOption}
              onValueChange={(v) => setSendOption(v as SendOption)}
              className="space-y-2"
            >
              {(Object.keys(sendOptionLabels) as SendOption[]).map((key) => (
                <div
                  key={key}
                  className={cn(
                    'flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors',
                    sendOption === key
                      ? 'border-[#7800D3] bg-[#faf5ff]'
                      : 'border-border hover:bg-muted/30'
                  )}
                  onClick={() => setSendOption(key)}
                >
                  <RadioGroupItem value={key} id={`send-${key}`} />
                  <Label htmlFor={`send-${key}`} className="cursor-pointer text-sm">
                    {sendOptionLabels[key]}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <SheetFooter className="px-6 py-4 border-t border-border flex gap-3">
          <SheetClose asChild>
            <Button variant="outline" className="flex-1" onClick={handleClose}>
              Cancel
            </Button>
          </SheetClose>
          <Button
            disabled={!expiryDate || !expiryTime}
            onClick={handleSubmit}
            className="flex-1 bg-[#4ead3b] hover:bg-[#8FD378] text-white disabled:opacity-50"
          >
            Schedule Interview & Send Link
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
