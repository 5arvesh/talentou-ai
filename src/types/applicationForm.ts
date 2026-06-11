export type FieldType =
  | 'text'
  | 'email'
  | 'phone'
  | 'number'
  | 'date'
  | 'dropdown'
  | 'url'
  | 'long_text'
  | 'yes_no'
  | 'file';

export interface FormField {
  id: string;
  label: string;
  fieldType: FieldType;
  visible: boolean;
  required: boolean;
  /** Always visible + required, recruiter cannot change */
  locked: boolean;
  sectionId: string;
  order: number;
  /** Only used when fieldType === 'dropdown' */
  options?: string[];
  /** True when added by a recruiter — can be renamed/deleted */
  isCustom?: boolean;
}

export interface FormSection {
  id: string;
  label: string;
  /** Lucide icon name, e.g. 'User' */
  icon: string;
  order: number;
}

export interface ApplicationFormTemplate {
  id: string;
  name: string;
  isDefault: boolean;
  sections: FormSection[];
  fields: FormField[];
  usedByJobCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface JobFormOverride {
  jobId: string;
  templateId: string | 'default' | 'custom';
  /** Only set when templateId === 'custom' */
  customFields?: FormField[];
  /** If the recruiter wants to save the custom config as a reusable template */
  saveAsTemplateName?: string;
}
