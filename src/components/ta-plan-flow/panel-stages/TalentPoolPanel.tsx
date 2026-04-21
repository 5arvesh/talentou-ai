import React, { useState } from 'react';
import { useTAPlanFlow } from '@/context/TAPlanFlowContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X, ChevronDown, Check, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';

const WORK_MODES = ['Remote', 'On-site', 'Hybrid'];

const MAJOR_CITIES = [
  // US Cities
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", 
  "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville",
  "San Francisco", "Seattle", "Denver", "Washington DC", "Boston", "Nashville",
  "Detroit", "Portland", "Las Vegas", "Miami", "Atlanta", "Minneapolis",
  "Charlotte", "Indianapolis", "Columbus", "Baltimore", "Milwaukee", "Pittsburgh",
  
  // India Cities
  "Bangalore", "Mumbai", "Delhi", "Hyderabad", "Chennai", "Pune", "Kolkata",
  "Ahmedabad", "Gurgaon", "Noida", "Jaipur", "Chandigarh", "Indore", "Kochi",
  "Coimbatore", "Vizag", "Surat", "Nagpur", "Lucknow", "Bhopal",
  
  // Europe Cities
  "London", "Paris", "Berlin", "Madrid", "Rome", "Amsterdam", "Barcelona",
  "Vienna", "Prague", "Dublin", "Brussels", "Zurich", "Munich", "Stockholm",
  "Copenhagen", "Oslo", "Helsinki", "Warsaw", "Budapest", "Lisbon",
  
  // Asia-Pacific Cities
  "Tokyo", "Singapore", "Hong Kong", "Seoul", "Shanghai", "Beijing", "Sydney",
  "Melbourne", "Bangkok", "Kuala Lumpur", "Manila", "Jakarta", "Dubai",
  "Abu Dhabi", "Taipei", "Osaka", "Ho Chi Minh City", "Perth", "Brisbane",
  
  // Canada Cities
  "Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa", "Edmonton", "Winnipeg",
  
  // Other Major Cities
  "Mexico City", "São Paulo", "Buenos Aires", "Cape Town", "Johannesburg", "Cairo",
  "Istanbul", "Moscow", "Tel Aviv", "Riyadh", "Doha", "Auckland", "Wellington"
];

const TARGET_INDUSTRIES = [
  // Technology & IT
  "Information Technology", "Software Development", "Artificial Intelligence", "Machine Learning",
  "Cloud Computing", "Cybersecurity", "Data Science", "Blockchain", "SaaS",
  
  // Healthcare & Life Sciences
  "Healthcare", "Biotechnology", "Pharmaceuticals", "Medical Devices", 
  "Telemedicine", "Healthcare IT", "Clinical Research",
  
  // Finance & Professional Services
  "Banking", "Financial Services", "Insurance", "Investment Banking", "Fintech",
  "Accounting", "Consulting", "Legal Services", "Real Estate",
  
  // Manufacturing & Industrial
  "Manufacturing", "Automotive", "Aerospace", "Defense", "Electronics",
  "Industrial Equipment", "Chemical", "Materials Science",
  
  // Retail & Consumer
  "Retail", "E-commerce", "Consumer Goods", "Fashion", "Food & Beverage",
  "Hospitality", "Travel & Tourism", "Entertainment", "Media",
  
  // Energy & Utilities
  "Energy", "Renewable Energy", "Oil & Gas", "Utilities", "Environmental Services",
  
  // Telecommunications
  "Telecommunications", "Networking", "Wireless Communication",
  
  // Education & Research
  "Education", "EdTech", "Research & Development", "Training & Development",
  
  // Logistics & Transportation
  "Logistics", "Supply Chain", "Transportation", "Shipping", "Warehousing",
  
  // Agriculture & Environment
  "Agriculture", "AgriTech", "Sustainability", "Clean Technology"
];

const EDUCATIONAL_INSTITUTIONS = [
  // US Universities - Ivy League
  "Harvard University", "Yale University", "Princeton University", "Columbia University",
  "University of Pennsylvania", "Cornell University", "Brown University", "Dartmouth College",
  
  // US Universities - Top Tech Schools
  "MIT", "Stanford University", "UC Berkeley", "Caltech", "Carnegie Mellon University",
  "Georgia Institute of Technology", "University of Michigan", "UIUC", "UT Austin",
  "University of Washington", "UCLA", "USC",
  
  // Indian Institutes - IITs
  "IIT Bombay", "IIT Delhi", "IIT Madras", "IIT Kanpur", "IIT Kharagpur",
  "IIT Roorkee", "IIT Guwahati", "IIT Hyderabad", "IIT Indore", "IIT BHU",
  
  // Indian Institutes - IIMs
  "IIM Ahmedabad", "IIM Bangalore", "IIM Calcutta", "IIM Lucknow", "IIM Kozhikode",
  
  // Indian Institutes - NITs & Others
  "NIT Trichy", "NIT Surathkal", "NIT Warangal", "BITS Pilani", "IIIT Hyderabad",
  "Delhi University", "Anna University", "VIT Vellore", "Manipal Institute of Technology",
  
  // UK Universities
  "Oxford University", "Cambridge University", "Imperial College London", 
  "London School of Economics", "University College London", "University of Edinburgh",
  
  // European Universities
  "ETH Zurich", "Technical University of Munich", "EPFL", "Delft University of Technology",
  
  // Asia-Pacific Universities
  "National University of Singapore", "Nanyang Technological University",
  "University of Tokyo", "Tsinghua University", "Peking University",
  "University of Melbourne", "Australian National University"
];

export function TalentPoolPanel() {
  const { planData, updatePlanData, completeStage, setCurrentStage } = useTAPlanFlow();
  const [openCityPopover, setOpenCityPopover] = useState(false);
  const [citySearchValue, setCitySearchValue] = useState('');
  const [openIndustryPopover, setOpenIndustryPopover] = useState(false);
  const [industrySearchValue, setIndustrySearchValue] = useState('');
  const [openInstitutionPopover, setOpenInstitutionPopover] = useState(false);
  const [institutionSearchValue, setInstitutionSearchValue] = useState('');

  const toggleWorkMode = (mode: string) => {
    const currentModes = planData.talentPool.workMode;
    const updated = currentModes.includes(mode)
      ? currentModes.filter(m => m !== mode)
      : [...currentModes, mode];
    updatePlanData('talentPool', { workMode: updated });
  };

  const addCity = (city: string) => {
    if (city && !planData.talentPool.cities.includes(city)) {
      updatePlanData('talentPool', {
        cities: [...planData.talentPool.cities, city],
      });
    }
    setOpenCityPopover(false);
    setCitySearchValue('');
  };

  const removeCity = (index: number) => {
    const updated = planData.talentPool.cities.filter((_, i) => i !== index);
    updatePlanData('talentPool', { cities: updated });
  };

  const addIndustry = (industry: string) => {
    if (industry && !planData.talentPool.targetIndustries.includes(industry)) {
      updatePlanData('talentPool', {
        targetIndustries: [...planData.talentPool.targetIndustries, industry],
      });
    }
    setOpenIndustryPopover(false);
    setIndustrySearchValue('');
  };

  const removeIndustry = (index: number) => {
    const updated = planData.talentPool.targetIndustries.filter((_, i) => i !== index);
    updatePlanData('talentPool', { targetIndustries: updated });
  };

  const addInstitution = (institution: string) => {
    if (institution && !planData.talentPool.educationalInstitutions.includes(institution)) {
      updatePlanData('talentPool', {
        educationalInstitutions: [...planData.talentPool.educationalInstitutions, institution],
      });
    }
    setOpenInstitutionPopover(false);
    setInstitutionSearchValue('');
  };

  const removeInstitution = (index: number) => {
    const updated = planData.talentPool.educationalInstitutions.filter((_, i) => i !== index);
    updatePlanData('talentPool', { educationalInstitutions: updated });
  };

  const handleNext = () => {
    completeStage('talentPool');
    setCurrentStage(2);
  };

  const isFormValid = planData.talentPool.workMode.length > 0 && planData.talentPool.cities.length > 0;

  return (
    <div className="space-y-6">
      {/* Work Arrangement */}
      <div className="space-y-3">
        <Label className="text-base font-bold text-[#6474a9]">Work Arrangement</Label>
        <div className="flex gap-3">
          {WORK_MODES.map((mode) => (
            <Button
              key={mode}
              type="button"
              variant={planData.talentPool.workMode.includes(mode) ? "default" : "outline"}
              onClick={() => toggleWorkMode(mode)}
              className={cn(
                "flex-1 border-transparent",
                planData.talentPool.workMode.includes(mode) 
                  ? "bg-[#7800d4] hover:bg-[#7800d4]/90 text-white" 
                  : "bg-[#f3eeff] font-bold text-[#6474a9] hover:bg-[#e9d1ff]"
              )}
            >
              {mode}
            </Button>
          ))}
        </div>
      </div>

      {/* Hiring Region - City Only with Autocomplete */}
      <div className="space-y-3">
        <Label className="text-base font-bold text-[#6474a9]">Hiring Region</Label>
        
        {planData.talentPool.cities.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {planData.talentPool.cities.map((city, index) => (
              <Badge
                key={index}
                className="bg-[#7800d4] hover:bg-[#7800d4]/90 text-white px-3 py-1.5 text-sm flex items-center gap-2"
              >
                {city}
                <button
                  onClick={() => removeCity(index)}
                  className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        <Popover open={openCityPopover} onOpenChange={setOpenCityPopover}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openCityPopover}
              className="w-full justify-between h-11 bg-[#f3eeff] border-transparent hover:bg-[#e9d1ff] font-bold text-[#6474a9]"
            >
              {citySearchValue || "Select or type city..."}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0" align="start">
            <Command>
              <CommandInput 
                placeholder="Search city..." 
                value={citySearchValue}
                onValueChange={setCitySearchValue}
              />
              <CommandEmpty>
                <div className="p-2">
                  <p className="text-sm text-muted-foreground mb-2">No city found.</p>
                  {citySearchValue && (
                    <Button 
                      size="sm" 
                      onClick={() => addCity(citySearchValue)}
                      className="w-full"
                    >
                      Add "{citySearchValue}"
                    </Button>
                  )}
                </div>
              </CommandEmpty>
              <CommandList>
                <CommandGroup>
                  {MAJOR_CITIES.filter(city => 
                    city.toLowerCase().includes(citySearchValue.toLowerCase())
                  ).map((city) => (
                    <CommandItem
                      key={city}
                      onSelect={() => addCity(city)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          planData.talentPool.cities.includes(city) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {city}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Target Industries */}
      <div className="space-y-3">
        <Label className="text-base font-bold text-[#6474a9]">Target Industries</Label>
        
        {planData.talentPool.targetIndustries.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {planData.talentPool.targetIndustries.map((industry, index) => (
              <Badge
                key={index}
                className="bg-[#7800d4] hover:bg-[#7800d4]/90 text-white px-3 py-1.5 text-sm flex items-center gap-2"
              >
                {industry}
                <button
                  onClick={() => removeIndustry(index)}
                  className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        <Popover open={openIndustryPopover} onOpenChange={setOpenIndustryPopover}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openIndustryPopover}
              className="w-full justify-between h-11 bg-[#f3eeff] border-transparent hover:bg-[#e9d1ff] font-bold text-[#6474a9]"
            >
              {industrySearchValue || "Select or type industry..."}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0" align="start">
            <Command>
              <CommandInput 
                placeholder="Search industry..." 
                value={industrySearchValue}
                onValueChange={setIndustrySearchValue}
              />
              <CommandEmpty>
                <div className="p-2">
                  <p className="text-sm text-muted-foreground mb-2">No industry found.</p>
                  {industrySearchValue && (
                    <Button 
                      size="sm" 
                      onClick={() => addIndustry(industrySearchValue)}
                      className="w-full"
                    >
                      Add "{industrySearchValue}"
                    </Button>
                  )}
                </div>
              </CommandEmpty>
              <CommandList>
                <CommandGroup>
                  {TARGET_INDUSTRIES.filter(industry => 
                    industry.toLowerCase().includes(industrySearchValue.toLowerCase())
                  ).map((industry) => (
                    <CommandItem
                      key={industry}
                      onSelect={() => addIndustry(industry)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          planData.talentPool.targetIndustries.includes(industry) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {industry}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Educational Institutions */}
      <div className="space-y-3">
        <Label className="text-base font-bold text-[#6474a9]">Educational Institutions</Label>
        
        {planData.talentPool.educationalInstitutions.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {planData.talentPool.educationalInstitutions.map((institution, index) => (
              <Badge
                key={index}
                className="bg-[#7800d4] hover:bg-[#7800d4]/90 text-white px-3 py-1.5 text-sm flex items-center gap-2"
              >
                {institution}
                <button
                  onClick={() => removeInstitution(index)}
                  className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        <Popover open={openInstitutionPopover} onOpenChange={setOpenInstitutionPopover}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openInstitutionPopover}
              className="w-full justify-between h-11 bg-[#f3eeff] border-transparent hover:bg-[#e9d1ff] font-bold text-[#6474a9]"
            >
              {institutionSearchValue || "Select or type institution..."}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0" align="start">
            <Command>
              <CommandInput 
                placeholder="Search institution..." 
                value={institutionSearchValue}
                onValueChange={setInstitutionSearchValue}
              />
              <CommandEmpty>
                <div className="p-2">
                  <p className="text-sm text-muted-foreground mb-2">No institution found.</p>
                  {institutionSearchValue && (
                    <Button 
                      size="sm" 
                      onClick={() => addInstitution(institutionSearchValue)}
                      className="w-full"
                    >
                      Add "{institutionSearchValue}"
                    </Button>
                  )}
                </div>
              </CommandEmpty>
              <CommandList>
                <CommandGroup>
                  {EDUCATIONAL_INSTITUTIONS.filter(institution => 
                    institution.toLowerCase().includes(institutionSearchValue.toLowerCase())
                  ).map((institution) => (
                    <CommandItem
                      key={institution}
                      onSelect={() => addInstitution(institution)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          planData.talentPool.educationalInstitutions.includes(institution) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {institution}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="pt-4 flex flex-col items-end gap-2">
        <Button
          onClick={handleNext}
          disabled={!isFormValid}
          className="bg-gradient-to-r from-[#503afd] to-[#3857fd] hover:from-[#503afd]/90 hover:to-[#3857fd]/90 text-white rounded-full px-6 py-2 h-auto text-base font-medium border-0"
        >
          Next <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
        {!isFormValid && (
          <p className="text-xs text-muted-foreground">
            Please select at least one work mode and add at least one city to continue
          </p>
        )}
      </div>
    </div>
  );
}

