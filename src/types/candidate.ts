
export interface Candidate {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentLocation: string;
  skills: string[];
  experience: string;
  currentPosition?: string;
  education?: string;
  status: string;
  statusTooltip: string;
  hiringLead: string;
  interviewer?: string;
}

export interface ParsedCVData {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  currentLocation?: string;
  skills?: string[];
  experience?: string;
  currentPosition?: string;
  education?: string;
}
