
import { useState, useRef, useEffect } from "react";
import { Command, CommandInput, CommandList, CommandGroup, CommandItem } from "@/components/ui/command";
import { User, Building2, Calendar, Sparkles } from "lucide-react";

// Mock data for search results - in a real app, this would come from an API or database
const mockContacts = [
  { id: 1, name: "Alex Smith", company: "Stellar Solutions" },
  { id: 2, name: "Allen Carter", company: "Alpha Tech" },
  { id: 3, name: "Amanda Johnson", company: "Nexus Corp" },
  { id: 4, name: "Andrew Davis", company: "Pinnacle Systems" },
];

const mockCompanies = [
  { id: 1, name: "Alpha Tech Inc." },
  { id: 2, name: "Alpine Solutions" },
  { id: 3, name: "Apex Corporation" },
  { id: 4, name: "Astral Dynamics" },
];

const mockActivities = [
  { id: 1, description: "Connect with Alex Smith", date: "Apr 10" },
  { id: 2, description: "Last Week" },
  { id: 3, description: "Follow up with Allen Carter", date: "Apr 15" },
];

const mockAiSuggestions = [
  { id: 1, description: "Show all contacts with \"AI\"" },
  { id: 2, description: "Leads with buyer intent > 700 and name starting \"AI\"" },
  { id: 3, description: "Companies using AI technology" },
];

interface SearchResultsProps {
  searchQuery: string;
  isOpen: boolean;
  onClose: () => void;
}

export function SearchResults({ searchQuery, isOpen, onClose }: SearchResultsProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Filter the contacts based on search query
  const filteredContacts = mockContacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Filter the companies based on search query
  const filteredCompanies = mockCompanies.filter(company => 
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Filter the activities based on search query
  const filteredActivities = mockActivities.filter(activity => 
    activity.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Filter the AI suggestions based on search query
  const filteredAiSuggestions = mockAiSuggestions.filter(suggestion => 
    suggestion.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close the search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // If not open, don't render anything
  if (!isOpen) return null;

  return (
    <div 
      ref={ref}
      className="absolute left-1/2 transform -translate-x-1/2 top-12 w-[600px] bg-white border border-gray-200 rounded-md shadow-lg z-50"
    >
      <Command className="rounded-lg border shadow-md">
        <CommandList className="max-h-[400px] overflow-auto">
          {filteredContacts.length > 0 && (
            <CommandGroup heading="Contacts" className="px-2 py-1.5">
              {filteredContacts.map(contact => (
                <CommandItem 
                  key={`contact-${contact.id}`}
                  className="flex items-center py-2 px-2 cursor-pointer hover:bg-gray-100"
                >
                  <User className="mr-2 h-4 w-4 text-gray-500" />
                  <span>{contact.name} – {contact.company}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {filteredCompanies.length > 0 && (
            <CommandGroup heading="Companies" className="px-2 py-1.5">
              {filteredCompanies.map(company => (
                <CommandItem 
                  key={`company-${company.id}`}
                  className={`flex items-center py-2 px-2 cursor-pointer hover:bg-gray-100 ${
                    company.name === "Alpha Tech Inc." ? "bg-green-100" : ""
                  }`}
                >
                  <Building2 className="mr-2 h-4 w-4 text-gray-500" />
                  <span>{company.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {filteredActivities.length > 0 && (
            <CommandGroup heading="Activities" className="px-2 py-1.5">
              {filteredActivities.map(activity => (
                <CommandItem 
                  key={`activity-${activity.id}`}
                  className="flex items-center py-2 px-2 cursor-pointer hover:bg-gray-100"
                >
                  <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                  <span>{activity.description}{activity.date ? ` – ${activity.date}` : ''}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {filteredAiSuggestions.length > 0 && (
            <CommandGroup heading="AI Suggestions" className="px-2 py-1.5">
              {filteredAiSuggestions.map(suggestion => (
                <CommandItem 
                  key={`suggestion-${suggestion.id}`}
                  className="flex items-center py-2 px-2 cursor-pointer hover:bg-gray-100"
                >
                  <Sparkles className="mr-2 h-4 w-4 text-orange-500" />
                  <span>{suggestion.description}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {searchQuery && 
            filteredContacts.length === 0 && 
            filteredCompanies.length === 0 && 
            filteredActivities.length === 0 && 
            filteredAiSuggestions.length === 0 && (
              <div className="py-6 text-center text-sm text-gray-500">
                No results found for "{searchQuery}"
              </div>
            )
          }
        </CommandList>
      </Command>
    </div>
  );
}
