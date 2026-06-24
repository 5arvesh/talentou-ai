import { getInitials } from '@/lib/avatar';

export type Flag = 'incomplete' | 'duplicate';
export type Tier = 'high' | 'medium' | 'none';
export type RowStatus = 'pending' | 'confirmed' | 'skipped';

export const NO_MATCH = 'No clear match (Unassigned)';

export const OPEN_POSITIONS: string[] = [
  'Senior React Developer',
  'UX Designer',
  'Data Analyst',
  'Backend Engineer',
  'QA Engineer',
  'Product Manager',
  'Frontend Engineer',
  'DevOps Engineer',
];

// Configurable cutoff for "high-confidence, eligible for bulk-confirm" (spec §10.1).
export const HIGH_CONFIDENCE_THRESHOLD = 80;

export function confidenceTier(score: number | null): Tier {
  if (score === null || score < 50) return 'none';
  if (score >= HIGH_CONFIDENCE_THRESHOLD) return 'high';
  return 'medium';
}

export interface ParsedCandidate {
  id: string;
  name: string;
  initials: string;
  summary: string;
  flags: Flag[];
  missingFields?: string[];
  suggestedTitle: string | null;
  score: number | null;
  assignedTitle: string; // editable; NO_MATCH sentinel when no usable position
  status: RowStatus;
}

interface PoolEntry {
  summary: string;
  suggestedTitle: string | null;
  score: number | null;
  flags: Flag[];
  missingFields?: string[];
  fallbackName: string;
}

// Mock attribute pool — index-mapped onto the uploaded files (order matches mockup 03).
const POOL: PoolEntry[] = [
  { fallbackName: 'Rahul Sharma', summary: '4y exp · React, Node.js · Bangalore', suggestedTitle: 'Senior React Developer', score: 92, flags: [] },
  { fallbackName: 'Priya Nair', summary: '3y exp · Figma, UX research · Pune', suggestedTitle: 'UX Designer', score: 88, flags: ['duplicate'] },
  { fallbackName: 'Anil Verma', summary: 'Backend Engineer · Java, Spring', suggestedTitle: null, score: null, flags: ['incomplete'], missingFields: ['phone', 'experience'] },
  { fallbackName: 'Sneha Kapoor', summary: '5y exp · SQL, Power BI, Python · Hyderabad', suggestedTitle: 'Data Analyst', score: 67, flags: [] },
  { fallbackName: 'Vikram Patel', summary: '6y exp · Python, Django · Remote', suggestedTitle: 'Backend Engineer', score: 84, flags: [] },
  { fallbackName: 'Deepa Menon', summary: '2y exp · Manual & automation QA · Chennai', suggestedTitle: 'QA Engineer', score: 71, flags: ['duplicate'] },
  { fallbackName: 'Karan Singh', summary: '8y exp · Product strategy, roadmaps · Bangalore', suggestedTitle: 'Product Manager', score: 90, flags: [] },
  { fallbackName: 'Meera Joshi', summary: 'Mobile dev · React Native', suggestedTitle: null, score: null, flags: ['incomplete'], missingFields: ['email'] },
];

export function prettifyName(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, '');
  const cleaned = base
    .replace(/[_-]+/g, ' ')
    .replace(/\b(cv|resume|final|updated|v\d+)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
  return cleaned
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function buildParsedCandidates(files: File[]): ParsedCandidate[] {
  return files.map((file, i) => {
    const p = POOL[i % POOL.length];
    const derived = prettifyName(file.name);
    const name = derived.length >= 3 ? derived : p.fallbackName;
    return {
      id: `pc-${i}-${file.name}`,
      name,
      initials: getInitials(name),
      summary: p.summary,
      flags: [...p.flags],
      missingFields: p.missingFields ? [...p.missingFields] : undefined,
      suggestedTitle: p.suggestedTitle,
      score: p.score,
      assignedTitle: p.suggestedTitle ?? NO_MATCH,
      status: 'pending',
    };
  });
}

/** A row is confirmable when it has a real (non-sentinel) position assigned. */
export function isConfirmable(c: ParsedCandidate): boolean {
  return !!c.assignedTitle && c.assignedTitle !== NO_MATCH;
}
