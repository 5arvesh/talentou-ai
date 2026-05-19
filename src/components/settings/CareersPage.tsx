import React, { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CareersPageOverview } from './CareersPageOverview';
import { CareersPageDesign } from './CareersPageDesign';
import { useTourStore, TourStep } from '@/store/tour-store';

const CAREERS_TOUR_STEPS: TourStep[] = [
  {
    title: "Careers Page Widget",
    description: "Configure an embeddable widget that syncs your live job openings to your company website. Candidates who apply through it appear directly in Talentou.",
    targetSelector: '[data-tour-id="careers-page-title"]',
  },
  {
    title: "Embed Code",
    description: "Copy this snippet and paste it into your website's HTML. Use Allowed Domains to restrict which sites can run the widget.",
    targetSelector: '[data-tour-id="careers-embed-code"]',
  },
  {
    title: "Customize the Widget",
    description: "Choose a template, set your brand colors, add your welcome message, and control which fields are visible to candidates.",
    targetSelector: '[data-tour-id="careers-design-tab"]',
    onEnter: () => {
      (document.querySelector('[data-tour-id="careers-design-tab"]') as HTMLElement)?.click();
    },
  },
  {
    title: "Live Preview",
    description: "The preview updates in real time as you change settings — see exactly how your widget will look before you publish it.",
    targetSelector: '[data-tour-id="careers-preview"]',
  },
];

export function CareersPage() {
  const { startTour } = useTourStore();

  useEffect(() => {
    startTour('careers-page', CAREERS_TOUR_STEPS);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 data-tour-id="careers-page-title" className="text-xl font-semibold text-foreground">Careers Page</h2>
        <p className="text-sm text-muted-foreground mt-1">Configure your embeddable careers widget for your company website.</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6 border-b w-full rounded-none bg-transparent justify-start space-x-8 px-0 h-auto">
          <TabsTrigger
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
