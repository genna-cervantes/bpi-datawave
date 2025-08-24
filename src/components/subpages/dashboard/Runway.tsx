"use client";

import {
  LineChart,
  CartesianGrid,
  Line,
  Tooltip,
  YAxis,
  XAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip as TooltipShad,
} from "@radix-ui/react-tooltip";
import { Info } from "lucide-react";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    qv: 6000,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    qv: 6000,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    qv: 6000,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    qv: 6000,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    qv: 6000,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    qv: 6000,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    qv: 6000,
    amt: 2100,
  },
];

export default function Runway() {
  return (
    <div className="flex px-2 gap-x-3">
      <CashFlowChart />
      <div className="w-2/3 flex flex-col gap-y-3">
        {/* Funding History */}
        <div className="border rounded-md px-3 py-3">
          <span className="flex justify-between items-center text-xs">
            <h1>Funding History</h1>
          </span>
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-x-2">
              <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold">Series A</span>
                  <span className="text-xs">15% dilution</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">$2.5M raised</span>
                  <span className="text-xs text-gray-600">January 2024</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="w-1 h-4 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold">Seed Round</span>
                  <span className="text-xs">20% dilution</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">$500K raised</span>
                  <span className="text-xs text-gray-600">June 2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Burn Multiple */}
        <div className="border rounded-md px-3 py-3">
          <span className="flex justify-between items-center text-xs">
            <h1>Burn Multiple</h1>
          </span>
          <div className="mt-1">
            <div className="flex items-center gap-x-2">
              <h1 className="text-lg font-bold">1.6x</h1>
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
              <span className="bg-green-200 border border-green-500 text-xs px-2 rounded-sm">
                Good
              </span>
            </div>
            <p className="text-xs text-gray-600">Net Burn / Net New ARR</p>
          </div>
        </div>

        {/* Next Milestone */}
        <div className="border rounded-md px-3 py-3">
          <span className="flex justify-between items-center text-xs">
            <h1>Next Milestone</h1>
          </span>
          <div className="mt-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs">Target ARR</span>
              <span className="text-xs font-semibold">$500K</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs">Current ARR</span>
              <span className="text-xs font-semibold">$300,000</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
              <div
                className="bg-black h-2 rounded-full"
                style={{ width: "60%" }}
              ></div>
            </div>
            <p className="text-xs text-gray-600">8 months to milestone</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CashFlowChart() {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#333" }} />
          <YAxis tick={{ fontSize: 12, fill: "#333" }} />
          <Tooltip
            contentStyle={{ fontSize: "12px" }}
            labelStyle={{ fontSize: "12px" }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          <Line type="monotone" dataKey="qv" stroke="#fb2c36" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
