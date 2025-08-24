"use client";

import { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip as TooltipShad } from "@radix-ui/react-tooltip";
import { Info, TrendingDown } from "lucide-react";
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  SectorProps,
  Cell,
} from "recharts";

type Coordinate = {
  x: number;
  y: number;
};

type PieSectorData = {
  percent?: number;
  name?: string | number;
  midAngle?: number;
  middleRadius?: number;
  tooltipPosition?: Coordinate;
  value?: number;
  paddingAngle?: number;
  dataKey?: string;
  payload?: any;
};

type PieSectorDataItem = React.SVGProps<SVGPathElement> &
  Partial<SectorProps> &
  PieSectorData;

const data = [
  { name: "Payroll", value: 28000, color: "#3B82F6" },
  { name: "SaaS Tools", value: 8500, color: "#14B8A6" },
  { name: "Office & Rent", value: 4500, color: "#F97316" },
  { name: "Marketing", value: 4200, color: "#EAB308" },
  { name: "Cloud Infrastructure", value: 3200, color: "#A855F7" },
  { name: "Other", value: 1600, color: "#22C55E" },
];

export default function Expenses() {
  return (
    <div className="flex ">
      <div className="w-1/2">
        <div className="flex flex-col ">
          <div className="w-full">
            <Example />
          </div>

          <div className="px-2 grid grid-cols-3 gap-x-4  gap-y-2">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <div className="text-xs">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-gray-600">
                    ${item.value.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <div className="bg-white rounded-lg px-3 py-3 border text-xs">
          <div className="mb-4">
            <h2 className="text-sm font-bold text-gray-900">Cost Optimization</h2>
            <p className="text-xs text-gray-600">AI-powered savings recommendations</p>
          </div>
          
          {/* Potential Savings Summary */}
          <div className="border rounded-md px-3 py-2 mb-3">
            <div className="flex items-center justify-between">
              <div className="flex gap-x-1">
                <TrendingDown className="h-4 w-4 mr-1" />
                <p className="text-xsfont-medium">Potential Savings:</p>
                <p className="text-xs font-bold ">$2,400/month</p>
              </div>
            </div>
          </div>
          
          {/* Recommendations */}
          <div className="space-y-2">
            {/* SaaS Subscriptions */}
            <div className="border border-gray-200 rounded-lg px-3 py-2">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-[0.80rem] text-gray-900">SaaS Subscriptions</h3>
                <span className="bg-red-200 border border-red-500 text-red-900 text-xs font-medium px-2 rounded-sm">
                  High Impact
                </span>
              </div>
              <p className="text-gray-600 text-xs">
                You have 3 unused licenses in your design tools subscription.
              </p>
              <span className="flex items-center gap-x-2 mt-1">
                <p className="text-green-600 font-semibold text-xs">
                    Save $840/month
                </p>
                <TooltipProvider>
                  <TooltipShad>
                    <TooltipContent>
                      <button className="cursor-pointer bg-gray-200 text-xs mb-2 px-2 py-1 rounded-sm">
                        Ask AI
                      </button>
                    </TooltipContent>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-gray-700" />
                    </TooltipTrigger>
                  </TooltipShad>
                </TooltipProvider>
              </span>
            </div>
            
            {/* Cloud Infrastructure */}
            <div className="border border-gray-200 rounded-lg px-3 py-2">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-[0.80rem] text-gray-900">Cloud Infrastructure</h3>
                <span className="bg-gray-100 text-xs font-medium px-2 rounded-sm">
                  Medium Impact
                </span>
              </div>
              <p className="text-gray-600 text-xs">
                You have 3 unused licenses in your design tools subscription.
              </p>
              <span className="flex items-center gap-x-2 mt-1">
                <p className="text-green-600 font-semibold text-xs">
                    Save $840/month
                </p>
                <TooltipProvider>
                  <TooltipShad>
                    <TooltipContent>
                      <button className="cursor-pointer bg-gray-200 text-xs mb-2 px-2 py-1 rounded-sm">
                        Ask AI
                      </button>
                    </TooltipContent>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-gray-700" />
                    </TooltipTrigger>
                  </TooltipShad>
                </TooltipProvider>
              </span>
            </div>
            
            {/* Office Expenses */}
            <div className="border border-gray-200 rounded-lg px-3 py-2">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-[0.80rem] text-gray-900">Office Expenses</h3>
                <span className="bg-gray-100 text-xs font-medium px-2 rounded-sm">
                  Medium Impact
                </span>
              </div>
              <p className="text-gray-600 text-xs">
                You have 3 unused licenses in your design tools subscription.
              </p>
              <span className="flex items-center gap-x-2 mt-1">
                <p className="text-green-600 font-semibold text-xs">
                    Save $840/month
                </p>
                <TooltipProvider>
                  <TooltipShad>
                    <TooltipContent>
                      <button className="cursor-pointer bg-gray-200 text-xs mb-2 px-2 py-1 rounded-sm">
                        Ask AI
                      </button>
                    </TooltipContent>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-gray-700" />
                    </TooltipTrigger>
                  </TooltipShad>
                </TooltipProvider>
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

function Example() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
