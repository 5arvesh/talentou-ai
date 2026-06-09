// Canonical status vocabulary for Talnto ATS
// All components must import from here — do not define local getStatusColor functions

// ─── Candidate status API values ─────────────────────────────────────────────

export const CANDIDATE_STATUS = {
  SOURCED:              'sourced',
  APPLIED:              'applied',
  UNDER_REVIEW:         'under_review',
  SHORTLISTED:          'shortlisted',
  PHONE_SCREEN:         'phone_screen',
  ASSESSMENT:           'assessment',
  INTERVIEW_SCHEDULED:  'interview_scheduled',
  INTERVIEWED:          'interviewed',
  OFFERED:              'offered',
  OFFER_ACCEPTED:       'offer_accepted',
  HIRED:                'hired',
  REJECTED:             'rejected',
  OFFER_DECLINED:       'offer_declined',
  WITHDRAWN:            'withdrawn',
  ON_HOLD:              'on_hold',
} as const;

export type CandidateStatusValue = typeof CANDIDATE_STATUS[keyof typeof CANDIDATE_STATUS];

// ─── Job status API values ────────────────────────────────────────────────────

export const JOB_STATUS = {
  DRAFT:      'draft',
  IN_REVIEW:  'in_review',
  APPROVED:   'approved',
  ON_HOLD:    'on_hold',
  FILLED:     'filled',
  CLOSED:     'closed',
  REJECTED:   'rejected',
  CANCELLED:  'cancelled',
} as const;

export type JobStatusValue = typeof JOB_STATUS[keyof typeof JOB_STATUS];

// ─── Display labels ───────────────────────────────────────────────────────────

export const CANDIDATE_STATUS_LABEL: Record<string, string> = {
  sourced:              'Sourced',
  applied:              'Applied',
  under_review:         'Under Review',
  shortlisted:          'Shortlisted',
  phone_screen:         'Phone Screen',
  assessment:           'Assessment',
  interview_scheduled:  'Interview Scheduled',
  interviewed:          'Interviewed',
  offered:              'Offered',
  offer_accepted:       'Offer Accepted',
  hired:                'Hired',
  rejected:             'Rejected',
  offer_declined:       'Offer Declined',
  withdrawn:            'Withdrawn',
  on_hold:              'On Hold',
};

export const JOB_STATUS_LABEL: Record<string, string> = {
  draft:      'Draft',
  in_review:  'In Review',
  approved:   'Active',
  on_hold:    'On Hold',
  filled:     'Filled',
  closed:     'Closed',
  rejected:   'Rejected',
  cancelled:  'Cancelled',
};

// ─── Color functions ──────────────────────────────────────────────────────────

/**
 * Returns Tailwind badge classes for a candidate status.
 * Accepts canonical API values (under_review) AND legacy display labels
 * (review, under review, interview, decline, accepted) for backward compat.
 */
export function getCandidateStatusColor(status: string): string {
  const s = status.toLowerCase().trim();

  // Canonical API values
  if (s === 'sourced')             return 'bg-purple-50 text-purple-700 border-purple-200';
  if (s === 'applied')             return 'bg-blue-50 text-blue-700 border-blue-200';
  if (s === 'under_review')        return 'bg-amber-50 text-amber-700 border-amber-200';
  if (s === 'shortlisted')         return 'bg-teal-50 text-teal-700 border-teal-200';
  if (s === 'phone_screen')        return 'bg-purple-50 text-purple-700 border-purple-200';
  if (s === 'assessment')          return 'bg-yellow-50 text-yellow-700 border-yellow-200';
  if (s === 'interview_scheduled') return 'bg-orange-50 text-orange-700 border-orange-200';
  if (s === 'interviewed')         return 'bg-indigo-50 text-indigo-700 border-indigo-200';
  if (s === 'offered')             return 'bg-green-50 text-green-700 border-green-200';
  if (s === 'offer_accepted')      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (s === 'hired')               return 'bg-emerald-100 text-emerald-800 border-emerald-300';
  if (s === 'rejected')            return 'bg-red-50 text-red-700 border-red-200';
  if (s === 'offer_declined')      return 'bg-red-50 text-red-700 border-red-200';
  if (s === 'withdrawn')           return 'bg-gray-100 text-gray-600 border-gray-200';
  if (s === 'on_hold')             return 'bg-gray-100 text-gray-600 border-gray-200';

  // Legacy display-label variants (backward compat with un-migrated mock data)
  if (s === 'review' || s === 'under review') return 'bg-amber-50 text-amber-700 border-amber-200';
  if (s === 'interview' || s === 'interview scheduled') return 'bg-orange-50 text-orange-700 border-orange-200';
  if (s === 'decline')             return 'bg-red-50 text-red-700 border-red-200';
  if (s === 'accepted' || s === 'offer accepted') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (s === 'phone screen')        return 'bg-purple-50 text-purple-700 border-purple-200';
  if (s === 'offer declined')      return 'bg-red-50 text-red-700 border-red-200';

  return 'bg-gray-100 text-gray-600 border-gray-200';
}

/**
 * Returns Tailwind badge classes for a job status.
 * Accepts canonical API values and legacy display labels.
 */
export function getJobStatusColor(status: string): string {
  const s = status.toLowerCase().trim();

  if (s === 'approved' || s === 'active') return 'bg-green-50 text-green-700 border-green-200';
  if (s === 'on_hold' || s === 'on hold') return 'bg-amber-50 text-amber-700 border-amber-200';
  if (s === 'filled')                     return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (s === 'in_review' || s === 'in review' || s === 'pending' || s.includes('pending') || s.includes('hold'))
                                          return 'bg-amber-50 text-amber-700 border-amber-200';
  if (s === 'rejected' || s === 'cancelled' || s === 'canceled')
                                          return 'bg-red-50 text-red-700 border-red-200';
  if (s === 'draft' || s === 'closed' || s.includes('closed') || s.includes('cancel') || s.includes('draft'))
                                          return 'bg-gray-100 text-gray-600 border-gray-200';

  return 'bg-gray-100 text-gray-600 border-gray-200';
}

// ─── Dropdown option arrays ───────────────────────────────────────────────────

export const CANDIDATE_STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: 'Applied',              label: 'Applied' },
  { value: 'Under Review',         label: 'Under Review' },
  { value: 'Shortlisted',          label: 'Shortlisted' },
  { value: 'Phone Screen',         label: 'Phone Screen' },
  { value: 'Assessment',           label: 'Assessment' },
  { value: 'Interview Scheduled',  label: 'Interview Scheduled' },
  { value: 'Interviewed',          label: 'Interviewed' },
  { value: 'Offered',              label: 'Offered' },
  { value: 'Offer Accepted',       label: 'Offer Accepted' },
  { value: 'Hired',                label: 'Hired' },
  { value: 'Rejected',             label: 'Rejected' },
  { value: 'Offer Declined',       label: 'Offer Declined' },
  { value: 'Withdrawn',            label: 'Withdrawn' },
  { value: 'Sourced',              label: 'Sourced' },
  { value: 'On Hold',              label: 'On Hold' },
];

export const JOB_STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: 'Draft',      label: 'Draft' },
  { value: 'In Review',  label: 'In Review' },
  { value: 'Active',     label: 'Active' },
  { value: 'On Hold',    label: 'On Hold' },
  { value: 'Filled',     label: 'Filled' },
  { value: 'Closed',     label: 'Closed' },
  { value: 'Rejected',   label: 'Rejected' },
  { value: 'Cancelled',  label: 'Cancelled' },
];
