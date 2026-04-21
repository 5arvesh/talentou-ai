import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Check, Building2, Users, TrendingUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { useTAPlan } from '@/context/TAPlanContext';

export function MetricsSection() {
  const { stages, updateStageData } = useTAPlan();
  const [isOpen, setIsOpen] = useState(true);

  const data = stages.successMetrics.data;
  const isCompleted = stages.successMetrics.completed;

  // Initialize with default values if not set
  const [companiesAvailable, setCompaniesAvailable] = useState(
    data.kpis.find((k: any) => k.type === 'companies')?.value || '1000'
  );
  const [contactsAvailable, setContactsAvailable] = useState(
    data.kpis.find((k: any) => k.type === 'contacts')?.value || '3000'
  );
  const [numberOfLeads, setNumberOfLeads] = useState(
    data.targets.find((t: any) => t.type === 'leads')?.value || '1500'
  );
  const [companiesTarget, setCompaniesTarget] = useState(
    data.targets.find((t: any) => t.type === 'companiesDaily')?.value || '100'
  );
  const [contactsTarget, setContactsTarget] = useState(
    data.targets.find((t: any) => t.type === 'contactsDaily')?.value || '200'
  );

  const handleMetricChange = (type: string, category: 'kpis' | 'targets', value: string) => {
    const currentData = data[category];
    const existingIndex = currentData.findIndex((item: any) => item.type === type);
    
    const newData = existingIndex >= 0
      ? currentData.map((item: any, idx: number) => 
          idx === existingIndex ? { type, value } : item
        )
      : [...currentData, { type, value }];
    
    updateStageData('successMetrics', { [category]: newData });
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="border border-blue-500/30 rounded-lg overflow-hidden bg-gradient-to-br from-card to-card/50 shadow-sm hover:shadow-md transition-all">
        <CollapsibleTrigger className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-transparent hover:from-blue-500/15 transition-colors">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="font-semibold text-foreground">Your Measures</h3>
            {isCompleted && <Check className="w-4 h-4 text-[#58bb6b]" />}
          </div>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="p-4 space-y-6 border-t border-blue-500/20">
            {/* GTM Reach Unlocked */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">GTM Reach Unlocked</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-gradient-to-br from-blue-50/80 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 rounded-lg border border-blue-200/40 dark:border-blue-700/40">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-xs text-muted-foreground">Companies Available</span>
                  </div>
                  <Input
                    type="number"
                    value={companiesAvailable}
                    onChange={(e) => {
                      setCompaniesAvailable(e.target.value);
                      handleMetricChange('companies', 'kpis', e.target.value);
                    }}
                    className="text-2xl font-bold border-0 bg-transparent p-0 h-auto focus-visible:ring-0 text-foreground"
                  />
                </div>

                <div className="p-4 bg-gradient-to-br from-blue-50/80 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 rounded-lg border border-blue-200/40 dark:border-blue-700/40">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-xs text-muted-foreground">Contacts Available</span>
                  </div>
                  <Input
                    type="number"
                    value={contactsAvailable}
                    onChange={(e) => {
                      setContactsAvailable(e.target.value);
                      handleMetricChange('contacts', 'kpis', e.target.value);
                    }}
                    className="text-2xl font-bold border-0 bg-transparent p-0 h-auto focus-visible:ring-0 text-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Target Metrics */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">Target Metrics</h4>
              <p className="text-xs text-muted-foreground">Set your outreach targets</p>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">Number of Leads</label>
                  <Input
                    type="number"
                    value={numberOfLeads}
                    onChange={(e) => {
                      setNumberOfLeads(e.target.value);
                      handleMetricChange('leads', 'targets', e.target.value);
                    }}
                    className="bg-gradient-to-br from-blue-50/50 to-blue-100/30 dark:from-blue-900/10 dark:to-blue-800/5 border-blue-200/30 dark:border-blue-700/30"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">Companies Target (Daily)</label>
                  <Input
                    type="number"
                    value={companiesTarget}
                    onChange={(e) => {
                      setCompaniesTarget(e.target.value);
                      handleMetricChange('companiesDaily', 'targets', e.target.value);
                    }}
                    className="bg-gradient-to-br from-blue-50/50 to-blue-100/30 dark:from-blue-900/10 dark:to-blue-800/5 border-blue-200/30 dark:border-blue-700/30"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">Contacts Target (Daily)</label>
                  <Input
                    type="number"
                    value={contactsTarget}
                    onChange={(e) => {
                      setContactsTarget(e.target.value);
                      handleMetricChange('contactsDaily', 'targets', e.target.value);
                    }}
                    className="bg-gradient-to-br from-blue-50/50 to-blue-100/30 dark:from-blue-900/10 dark:to-blue-800/5 border-blue-200/30 dark:border-blue-700/30"
                  />
                </div>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
