
import { Layout } from "@/components/layout/Layout";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const CompaniesAdded = () => {
  const [timeFilter, setTimeFilter] = useState("this-week");
  const [sdrFilter, setSdrFilter] = useState("all-sdrs");
  
  // Sample data for the chart
  const chartData = [
    { name: '3 Mar', value: 5 },
    { name: '4 Mar', value: 3 },
    { name: '5 Mar', value: 14 },
    { name: '6 Mar', value: 8 },
    { name: '7 Mar', value: 11 },
  ];

  // Sample data for top companies by buyer intent
  const topCompaniesByIntent = [
    { company: "Talentou Inc", location: "Boston", industry: "Technology", revenue: "500M", buyerIntent: 914, sdr: "JO" },
    { company: "Apex Financial Group", location: "New York", industry: "Finance", revenue: "200M", buyerIntent: 878, sdr: "JO" },
    { company: "Codio Technologies", location: "Massachusetts", industry: "Technology", revenue: "325M", buyerIntent: 711, sdr: "JO" },
    { company: "Vertex Solutions", location: "San Francisco", industry: "SaaS", revenue: "150M", buyerIntent: 689, sdr: "JO" },
    { company: "Quantum Analytics", location: "Chicago", industry: "Data", revenue: "275M", buyerIntent: 654, sdr: "JO" },
  ];

  const getBuyerIntentClass = (score: number) => {
    if (score >= 800) return "bg-green-500 text-white";
    if (score >= 600) return "bg-orange-500 text-white";
    return "bg-red-500 text-white";
  };

  return (
    <Layout>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Companies Added</h1>
          
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
                <SelectValue placeholder="Time Range" />
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
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main chart card */}
          <div className="col-span-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">This week progress</h2>
            
            <div className="relative h-80">
              <div className="absolute top-10 left-8 px-3 py-1 bg-orange-100 text-orange-800 rounded text-sm">
                Target: 10
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#22c55e" 
                    strokeWidth={2} 
                    dot={{ r: 6, fill: "#22c55e" }} 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Stats card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Number of Companies added</h2>
            <div className="flex flex-col">
              <span className="text-5xl font-bold">168</span>
              <div className="flex items-center mt-2 text-green-500">
                <ArrowUp size={18} />
                <span className="ml-1 text-lg">15%</span>
              </div>
              <span className="text-gray-500 mt-1">Compared to last week</span>
            </div>
          </div>
        </div>
        
        {/* Top Companies Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Top Companies By Buyer Intent</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Companies</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Buyer Intent</TableHead>
                  <TableHead>SDR</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topCompaniesByIntent.map((company, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{company.company}</TableCell>
                    <TableCell>{company.location}</TableCell>
                    <TableCell>{company.industry}</TableCell>
                    <TableCell>{company.revenue}</TableCell>
                    <TableCell>
                      <div className={`px-3 py-1 rounded-md text-center ${getBuyerIntentClass(company.buyerIntent)}`}>
                        {company.buyerIntent}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="bg-orange-100 text-orange-800 w-8 h-8 rounded-full flex items-center justify-center">
                        {company.sdr}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CompaniesAdded;
