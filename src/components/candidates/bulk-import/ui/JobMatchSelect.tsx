import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OPEN_POSITIONS, NO_MATCH } from '../data';

interface JobMatchSelectProps {
  value: string;
  onChange: (title: string) => void;
}

export function JobMatchSelect({ value, onChange }: JobMatchSelectProps) {
  const isNoMatch = value === NO_MATCH;
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className="h-9 text-[12px] bg-white"
        style={{ border: '1.5px solid #D8CDEE', color: isNoMatch ? '#9A6A0A' : '#1A0B2E' }}
      >
        <SelectValue placeholder="Select a position" />
      </SelectTrigger>
      <SelectContent>
        {OPEN_POSITIONS.map((p) => (
          <SelectItem key={p} value={p} className="text-[12px]">{p}</SelectItem>
        ))}
        <SelectItem value={NO_MATCH} className="text-[12px] text-[#9A6A0A]">{NO_MATCH}</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default JobMatchSelect;
