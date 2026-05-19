import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CareersPageOverview } from './CareersPageOverview';
import { CareersPageDesign } from './CareersPageDesign';

export function CareersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Careers Page</h2>
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
