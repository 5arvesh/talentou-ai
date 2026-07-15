import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CareersPageOverview } from './CareersPageOverview';
import { CareersPageDesign } from './CareersPageDesign';
import { TourStep } from '@/store/tour-store';
import { useScreenTour } from '@/hooks/useScreenTour';

const goToOverviewTab = () => {
  (document.querySelector('[data-tour-id="careers-overview-tab"]') as HTMLElement)?.click();
};

const goToDesignTab = () => {
  (document.querySelector('[data-tour-id="careers-design-tab"]') as HTMLElement)?.click();
};

const CAREERS_TOUR_STEPS: TourStep[] = [
  {
    title: "Careers Page Integration",
    description: "This is your careers page integration hub. Connect Talentou directly to your company website. Any role you publish will appear on your careers page automatically, and every application flows straight into Talentou.",
    targetSelector: '[data-tour-id="careers-page-title"]',
    onEnter: goToOverviewTab,
  },
  {
    title: "Allowed Domains",
    description: "Control which websites your widget can run on. Add your company domain to restrict the widget exclusively to your site.",
    targetSelector: '[data-tour-id="careers-allowed-domains"]',
    onEnter: goToOverviewTab,
  },
  {
    title: "Embed Code",
    description: "This is a one-time setup. Copy the code snippet and paste it into your website's HTML — your developer, or anyone managing your Wix, WordPress, or custom site can do this in minutes. Once it's in, Talentou's careers widget will appear on your website automatically. Disabling this will remove the integration from your site.",
    targetSelector: '[data-tour-id="careers-embed-code"]',
    onEnter: goToOverviewTab,
  },
  {
    title: "Head to the Design Tab",
    description: "All visual customisation lives in the Design tab — templates, brand colours, fonts, and display settings. Click the highlighted tab to explore it.",
    targetSelector: '[data-tour-id="careers-design-tab"]',
    onEnter: goToOverviewTab,
    hideNext: true,
  },
  {
    title: "Customise the Widget",
    description: "Head to the Design tab to make the widget match your brand. Choose a template, set your brand colours, add a welcome message, and control which fields are visible to candidates.",
    targetSelector: '[data-tour-id="careers-design-options"]',
    onEnter: goToDesignTab,
  },
  {
    title: "Live Preview",
    description: "See exactly how your careers page will look to candidates before it goes live. The preview updates in real time as you adjust your design settings. What you see here is what candidates will see on your website.",
    targetSelector: '[data-tour-id="careers-preview"]',
  },
];

export function CareersPage() {
  useScreenTour('ta-leader', 'careers-page', CAREERS_TOUR_STEPS);

  return (
    <div className="space-y-6">
      <div>
        <h2 data-tour-id="careers-page-title" className="text-xl font-semibold text-foreground">Careers Page</h2>
        <p className="text-sm text-muted-foreground mt-1">Configure your embeddable careers widget for your company website.</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6 border-b w-full rounded-none bg-transparent justify-start space-x-8 px-0 h-auto">
          <TabsTrigger
            data-tour-id="careers-overview-tab"
            value="overview"
            className="pb-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-500 data-[state=active]:text-brand-500 data-[state=inactive]:text-gray-500 bg-transparent shadow-none"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            data-tour-id="careers-design-tab"
            value="design"
            className="pb-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-500 data-[state=active]:text-brand-500 data-[state=inactive]:text-gray-500 bg-transparent shadow-none"
          >
            Design
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <CareersPageOverview />
        </TabsContent>
        <TabsContent value="design">
          <CareersPageDesign />
        </TabsContent>
      </Tabs>
    </div>
  );
}
