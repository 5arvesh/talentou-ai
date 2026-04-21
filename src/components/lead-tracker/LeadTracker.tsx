
import { useState } from "react";
import { 
  ArrowUp, 
  ArrowDown
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

// Mock data for the charts
const companyAddedChartData = [
  { day: "Mon", count: 24 },
  { day: "Tue", count: 25 },
  { day: "Wed", count: 27 },
  { day: "Thu", count: 29 },
  { day: "Fri", count: 33 },
  { day: "Sat", count: 33 },
  { day: "Sun", count: 33 }
];

const contactAddedChartData = [
  { day: "Mon", count: 51 },
  { day: "Tue", count: 53 },
  { day: "Wed", count: 54 },
  { day: "Thu", count: 55 },
  { day: "Fri", count: 52 },
  { day: "Sat", count: 49 },
  { day: "Sun", count: 49 }
];

const companyReachedChartData = [
  { day: "Mon", count: 13 },
  { day: "Tue", count: 13 },
  { day: "Wed", count: 14 },
  { day: "Thu", count: 14 },
  { day: "Fri", count: 15 },
  { day: "Sat", count: 15 },
  { day: "Sun", count: 15 }
];

const meetingsBookedChartData = [
  { day: "Mon", count: 0 },
  { day: "Tue", count: 0 },
  { day: "Wed", count: 0 },
  { day: "Thu", count: 0 },
  { day: "Fri", count: 1 },
  { day: "Sat", count: 1 },
  { day: "Sun", count: 1 }
];

const contactReachedChartData = [
  { day: "Mon", count: 13 },
  { day: "Tue", count: 14 },
  { day: "Wed", count: 14 },
  { day: "Thu", count: 15 },
  { day: "Fri", count: 16 },
  { day: "Sat", count: 16 },
  { day: "Sun", count: 16 }
];

// Component for the charts with consistent styling
const StatChart = ({ data, color }: { data: any[]; color: string }) => (
  <div className="h-24">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
        <XAxis dataKey="day" hide />
        <YAxis hide />
        <Tooltip 
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">Day:</div>
                    <div>{payload[0].payload.day}</div>
                    <div className="font-medium">Count:</div>
                    <div>{payload[0].value}</div>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Line 
          type="monotone" 
          dataKey="count" 
          stroke={color} 
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// Stat card component for individual metrics
const StatCard = ({ 
  title, 
  value, 
  change, 
  isPositive, 
  chartData, 
  chartColor,
  onClick
}: { 
  title: string; 
  value: number | string; 
  change?: number; 
  isPositive?: boolean; 
  chartData: any[]; 
  chartColor: string;
  onClick?: () => void;
}) => (
  <div 
    className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm"
    onClick={onClick}
    style={{ cursor: onClick ? 'pointer' : 'default' }}
  >
    <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
    <div className="flex items-end gap-2 mb-2">
      <span className="text-2xl font-bold">{value}</span>
      {change !== undefined && (
        <div className={`flex items-center text-sm ${isPositive ? 'text-green-600' : 'text-red-600'} mb-1`}>
          {isPositive ? (
            <ArrowUp className="h-4 w-4 mr-1" />
          ) : (
            <ArrowDown className="h-4 w-4 mr-1" />
          )}
          {change}%
        </div>
      )}
    </div>
    <StatChart data={chartData} color={chartColor} />
    <div className="text-xs text-gray-500 mt-2">Compared to last week</div>
  </div>
);

export function LeadTracker() {
  const [timeFilter, setTimeFilter] = useState("this-week");
  const [sdrFilter, setSdrFilter] = useState("all-sdrs");

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section with filters */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Lead Tracker</h1>
        
        <div className="flex gap-3">
          <Select value={sdrFilter} onValueChange={setSdrFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All SDR's" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-sdrs">All SDR's</SelectItem>
              <SelectItem value="anton-ciby">Anton Ciby</SelectItem>
              <SelectItem value="joseph-james">Joseph James</SelectItem>
              <SelectItem value="ayush-anand">Ayush Anand</SelectItem>
              <SelectItem value="john-doe">John Doe</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="This Week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="custom-range">Custom Range</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="last-week">Last Week</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Content Layout */}
      <div className="flex flex-col gap-6">
        {/* Database Status Card */}
        <div className="bg-green-50/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Database Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <StatCard
              title="Number of Companies added"
              value={168}
              change={15}
              isPositive={true}
              chartData={companyAddedChartData}
              chartColor="#22c55e"
            />
            
            <StatCard
              title="Number of Contacts added"
              value={248}
              change={4}
              isPositive={false}
              chartData={contactAddedChartData}
              chartColor="#ef4444"
            />
          </div>
        </div>

        {/* Outreach Status Card */}
        <div className="bg-orange-50/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Outreach Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <StatCard
              title="Number of Companies reached out to"
              value={77}
              change={6}
              isPositive={true}
              chartData={companyReachedChartData}
              chartColor="#22c55e"
            />
            
            <StatCard
              title="Meetings Booked"
              value={3}
              change={28}
              isPositive={true}
              chartData={meetingsBookedChartData}
              chartColor="#22c55e"
            />
            
            <StatCard
              title="Number of Contacts reached out to"
              value={81}
              change={2}
              isPositive={false}
              chartData={contactReachedChartData}
              chartColor="#ef4444"
            />
            
            {/* Response Stats Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Number of responses</h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Responses</span>
                  <span className="text-2xl font-bold">64</span>
                </div>
                <div className="flex flex-col gap-1 mt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-green-500"></span>
                      <span>Positive</span>
                    </div>
                    <span className="font-medium">38</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500"></span>
                      <span>Negative</span>
                    </div>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-gray-400"></span>
                      <span>Gone Cold</span>
                    </div>
                    <span className="font-medium">14</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
