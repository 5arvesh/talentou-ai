import type { ApplicationFormTemplate, FieldType, FormField, FormSection } from "@/types/applicationForm";

export const FIELD_TYPE_LABELS: Record<FieldType, string> = {
  text: "Text",
  email: "Email",
  phone: "Phone",
  number: "Number",
  date: "Date",
  dropdown: "Dropdown",
  url: "URL",
  long_text: "Long text",
  yes_no: "Yes / No",
  file: "File upload",
};

/** Field types selectable when adding a custom field or changing a field's type */
export const CUSTOM_FIELD_TYPES: FieldType[] = ["text", "number", "date", "dropdown", "url", "long_text", "yes_no", "file"];

export const DEFAULT_FORM_SECTIONS: FormSection[] = [
  { id: "personal", label: "Personal information", icon: "User", order: 0 },
  { id: "education", label: "Educational background", icon: "GraduationCap", order: 1 },
  { id: "professional", label: "Professional background", icon: "Briefcase", order: 2 },
  { id: "skills", label: "Skills & competencies", icon: "Award", order: 3 },
  { id: "employment", label: "Employment details", icon: "Building2", order: 4 },
  { id: "additional", label: "Additional information", icon: "Link2", order: 5 },
];

export const DEFAULT_FORM_FIELDS: FormField[] = [
  // Personal information
  { id: "resume", label: "Resume upload", fieldType: "file", visible: true, required: true, locked: true, sectionId: "personal", order: 0 },
  { id: "first_name", label: "First name", fieldType: "text", visible: true, required: true, locked: true, sectionId: "personal", order: 1 },
  { id: "last_name", label: "Last name", fieldType: "text", visible: true, required: true, locked: true, sectionId: "personal", order: 2 },
  { id: "email", label: "Email", fieldType: "email", visible: true, required: true, locked: true, sectionId: "personal", order: 3 },
  { id: "phone", label: "Phone", fieldType: "phone", visible: true, required: true, locked: false, sectionId: "personal", order: 4 },
  { id: "location", label: "Location", fieldType: "text", visible: true, required: true, locked: false, sectionId: "personal", order: 5 },
  {
    id: "best_time",
    label: "Best time to call",
    fieldType: "dropdown",
    visible: true,
    required: false,
    locked: false,
    sectionId: "personal",
    order: 6,
    options: ["Morning (9 AM – 12 PM)", "Afternoon (12 PM – 4 PM)", "Evening (4 PM – 7 PM)"],
  },

  // Educational background
  { id: "education", label: "Education", fieldType: "text", visible: true, required: false, locked: false, sectionId: "education", order: 0 },

  // Professional background
  { id: "years_exp", label: "Years of experience", fieldType: "number", visible: true, required: true, locked: false, sectionId: "professional", order: 0 },
  { id: "work_exp", label: "Work experience", fieldType: "long_text", visible: true, required: false, locked: false, sectionId: "professional", order: 1 },

  // Skills & competencies
  { id: "tech_skills", label: "Professional / technical skills", fieldType: "long_text", visible: true, required: false, locked: false, sectionId: "skills", order: 0 },
  { id: "soft_skills", label: "Behavioural / soft skills", fieldType: "long_text", visible: true, required: false, locked: false, sectionId: "skills", order: 1 },
  { id: "certifications", label: "Certifications", fieldType: "text", visible: true, required: false, locked: false, sectionId: "skills", order: 2 },

  // Employment details
  { id: "joining_date", label: "Earliest joining date", fieldType: "date", visible: true, required: true, locked: false, sectionId: "employment", order: 0 },
  { id: "current_ctc", label: "Current CTC (₹)", fieldType: "text", visible: true, required: false, locked: false, sectionId: "employment", order: 1 },
  { id: "expected_ctc", label: "Expected CTC (₹)", fieldType: "text", visible: true, required: true, locked: false, sectionId: "employment", order: 2 },
  {
    id: "work_location",
    label: "Preferred work location",
    fieldType: "dropdown",
    visible: true,
    required: true,
    locked: false,
    sectionId: "employment",
    order: 3,
    options: ["Remote", "Hybrid", "On-site (Bengaluru)", "On-site (other city)"],
  },

  // Additional information
  { id: "linkedin", label: "LinkedIn URL", fieldType: "url", visible: true, required: false, locked: false, sectionId: "additional", order: 0 },
  { id: "github", label: "GitHub URL", fieldType: "url", visible: true, required: false, locked: false, sectionId: "additional", order: 1 },
  { id: "portfolio", label: "Portfolio URL", fieldType: "url", visible: true, required: false, locked: false, sectionId: "additional", order: 2 },
  { id: "behance", label: "Behance URL", fieldType: "url", visible: false, required: false, locked: false, sectionId: "additional", order: 3 },
  { id: "extra_links", label: "Additional links", fieldType: "url", visible: true, required: false, locked: false, sectionId: "additional", order: 4 },
  { id: "summary", label: "Profile summary", fieldType: "long_text", visible: true, required: false, locked: false, sectionId: "additional", order: 5 },
];

export const DEFAULT_FORM_TEMPLATE: ApplicationFormTemplate = {
  id: "default",
  name: "Default template",
  isDefault: true,
  sections: DEFAULT_FORM_SECTIONS,
  fields: DEFAULT_FORM_FIELDS,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};

const cloneDefaultFields = (): FormField[] => DEFAULT_FORM_FIELDS.map((field) => ({ ...field }));

const buildEngineeringFields = (): FormField[] => {
  const fields = cloneDefaultFields();
  const github = fields.find((f) => f.id === "github");
  if (github) {
    github.visible = true;
    github.required = true;
  }
  const yearsExp = fields.find((f) => f.id === "years_exp");
  if (yearsExp) {
    yearsExp.required = true;
  }
  fields.push({
    id: "primary_stack",
    label: "Primary tech stack",
    fieldType: "text",
    visible: true,
    required: false,
    locked: false,
    sectionId: "skills",
    order: 3,
    isCustom: true,
  });
  return fields;
};

const buildSalesFields = (): FormField[] => {
  const fields = cloneDefaultFields();
  fields.push(
    {
      id: "ote",
      label: "On-target earnings (OTE)",
      fieldType: "text",
      visible: true,
      required: false,
      locked: false,
      sectionId: "employment",
      order: 4,
      isCustom: true,
    },
    {
      id: "territory_preference",
      label: "Territory preference",
      fieldType: "dropdown",
      visible: true,
      required: false,
      locked: false,
      sectionId: "additional",
      order: 6,
      options: ["North", "South", "East", "West", "Pan-India"],
      isCustom: true,
    }
  );
  return fields;
};

export const SAVED_TEMPLATES: ApplicationFormTemplate[] = [
  {
    id: "engineering",
    name: "Engineering",
    isDefault: false,
    sections: DEFAULT_FORM_SECTIONS,
    fields: buildEngineeringFields(),
    usedByJobCount: 8,
    createdAt: "2026-02-01T00:00:00.000Z",
    updatedAt: "2026-02-01T00:00:00.000Z",
  },
  {
    id: "sales-gtm",
    name: "Sales & GTM",
    isDefault: false,
    sections: DEFAULT_FORM_SECTIONS,
    fields: buildSalesFields(),
    usedByJobCount: 3,
    createdAt: "2026-02-01T00:00:00.000Z",
    updatedAt: "2026-02-01T00:00:00.000Z",
  },
];
