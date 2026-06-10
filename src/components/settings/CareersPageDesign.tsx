import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { TemplateSelector } from './TemplateSelector';
import { ColorPickerField } from './ColorPickerField';
import { CareersPagePreview } from './CareersPagePreview';

const WIDGET_MODES = [
  { id: 'inline', label: 'Inline', desc: 'Embeds directly in the page' },
  { id: 'floating', label: 'Floating Button', desc: 'Bottom-right floating button' },
  { id: 'full-page', label: 'Full Page', desc: 'Takes over the entire page' },
];

const FONT_OPTIONS = ['Inter', 'Plus Jakarta Sans', 'DM Sans', 'Poppins', 'Roboto'];
const BUTTON_STYLES = ['Rounded', 'Sharp', 'Pill'];
const JOBS_PER_PAGE = ['5', '10', '20', '50'];

const DISPLAY_FIELDS = [
  { id: 'showSearch', label: 'Show Search' },
  { id: 'showFilters', label: 'Show Filters' },
  { id: 'showLocation', label: 'Show Location' },
  { id: 'showDepartment', label: 'Show Department' },
  { id: 'showJobType', label: 'Show Job Type' },
] as const;

type DisplayKey = typeof DISPLAY_FIELDS[number]['id'];

interface DesignState {
  template: string;
  widgetMode: string;
  theme: { primary: string; secondary: string; background: string; text: string; heading: string };
  fontFamily: string;
  buttonStyle: string;
  borderRadius: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  companyDescription: string;
  logoUrl: string;
  bannerUrl: string;
  display: Record<DisplayKey, boolean>;
  jobsPerPage: string;
}

const defaultState: DesignState = {
  template: 'classic-list',
  widgetMode: 'inline',
  theme: { primary: '#87df6d', secondary: '#8f8a8a', background: '#ffffff', text: '#000000', heading: '#541781' },
  fontFamily: 'Inter',
  buttonStyle: 'Rounded',
  borderRadius: '12px',
  welcomeTitle: 'Join Our Team',
  welcomeSubtitle: 'Explore open positions and find your next opportunity',
  companyDescription: '',
  logoUrl: '',
  bannerUrl: '',
  display: { showSearch: true, showFilters: true, showLocation: true, showDepartment: true, showJobType: true },
  jobsPerPage: '10',
};

export function CareersPageDesign() {
  const [state, setState] = useState<DesignState>(defaultState);

  const update = <K extends keyof DesignState>(key: K, value: DesignState[K]) =>
    setState((prev) => ({ ...prev, [key]: value }));

  const updateTheme = (key: keyof DesignState['theme'], value: string) =>
    setState((prev) => ({ ...prev, theme: { ...prev.theme, [key]: value } }));

  const updateDisplay = (key: DisplayKey, value: boolean) =>
    setState((prev) => ({ ...prev, display: { ...prev.display, [key]: value } }));

  const handleSave = () => {
    // TODO: PUT /settings/careers
    toast.success('Careers page settings saved');
  };

  const sectionClass = 'space-y-4';
  const headingClass = 'text-sm font-semibold text-foreground';

  return (
    <div className="space-y-8">
      {/* Template */}
      <section className={sectionClass}>
        <h3 className={headingClass}>Template</h3>
        <TemplateSelector value={state.template} onChange={(v) => update('template', v)} />
      </section>

      <Separator />

      {/* Widget Mode */}
      <section className={sectionClass}>
        <h3 className={headingClass}>Widget Mode</h3>
        <div className="flex gap-3 flex-wrap">
          {WIDGET_MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => update('widgetMode', m.id)}
              className={`px-4 py-2 rounded-lg border-2 text-sm transition-all text-left ${
                state.widgetMode === m.id
                  ? 'border-green-500 bg-green-50 text-green-600 font-medium'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              <span className="block font-medium">{m.label}</span>
              <span className="block text-xs text-muted-foreground">{m.desc}</span>
            </button>
          ))}
        </div>
      </section>

      <Separator />

      {/* Theme */}
      <section data-tour-id="careers-design-options" className={sectionClass}>
        <h3 className={headingClass}>Theme</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <ColorPickerField label="Primary" value={state.theme.primary} onChange={(v) => updateTheme('primary', v)} />
          <ColorPickerField label="Secondary" value={state.theme.secondary} onChange={(v) => updateTheme('secondary', v)} />
          <ColorPickerField label="Background" value={state.theme.background} onChange={(v) => updateTheme('background', v)} />
          <ColorPickerField label="Text" value={state.theme.text} onChange={(v) => updateTheme('text', v)} />
          <ColorPickerField label="Heading" value={state.theme.heading} onChange={(v) => updateTheme('heading', v)} />
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Font Family</Label>
            <Select value={state.fontFamily} onValueChange={(v) => update('fontFamily', v)}>
              <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
              <SelectContent>
                {FONT_OPTIONS.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Button Style</Label>
            <Select value={state.buttonStyle} onValueChange={(v) => update('buttonStyle', v)}>
              <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
              <SelectContent>
                {BUTTON_STYLES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Border Radius</Label>
            <Input value={state.borderRadius} onChange={(e) => update('borderRadius', e.target.value)} className="h-9" placeholder="12px" />
          </div>
        </div>
      </section>

      <Separator />

      {/* Content */}
      <section className={sectionClass}>
        <h3 className={headingClass}>Content</h3>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Welcome Title</Label>
            <Input value={state.welcomeTitle} onChange={(e) => update('welcomeTitle', e.target.value)} className="h-9" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Welcome Subtitle</Label>
            <Input value={state.welcomeSubtitle} onChange={(e) => update('welcomeSubtitle', e.target.value)} className="h-9" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Company Description</Label>
            <Textarea value={state.companyDescription} onChange={(e) => update('companyDescription', e.target.value)} rows={3} placeholder="Tell candidates about your company..." className="resize-none" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Logo URL</Label>
            <Input value={state.logoUrl} onChange={(e) => update('logoUrl', e.target.value)} className="h-9" placeholder="https://..." />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Banner URL <span className="text-[10px] ml-1">(used by Magazine template)</span></Label>
            <Input value={state.bannerUrl} onChange={(e) => update('bannerUrl', e.target.value)} className="h-9" placeholder="https://..." />
          </div>
        </div>
      </section>

      <Separator />

      {/* Display Settings */}
      <section className={sectionClass}>
        <h3 className={headingClass}>Display Settings</h3>
        <div className="grid grid-cols-3 gap-3">
          {DISPLAY_FIELDS.map((f) => (
            <div key={f.id} className="flex items-center gap-2">
              <Checkbox
                id={f.id}
                checked={state.display[f.id]}
                onCheckedChange={(v) => updateDisplay(f.id, !!v)}
              />
              <label htmlFor={f.id} className="text-sm cursor-pointer">{f.label}</label>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-2">
          <Label className="text-sm shrink-0">Jobs Per Page</Label>
          <Select value={state.jobsPerPage} onValueChange={(v) => update('jobsPerPage', v)}>
            <SelectTrigger className="w-24 h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              {JOBS_PER_PAGE.map((n) => <SelectItem key={n} value={n}>{n}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* Save Button */}
      <Button onClick={handleSave} className="w-full bg-green-500 hover:bg-[#3d9e2c] text-white h-10 font-semibold">
        Save Changes
      </Button>

      <Separator />

      {/* Preview */}
      <section data-tour-id="careers-preview" className={sectionClass}>
        <h3 className={headingClass}>Preview</h3>
        <CareersPagePreview settings={{ ...state, showSearch: state.display.showSearch }} />
      </section>
    </div>
  );
}
