'use client';

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import { DollarSign, Info } from "lucide-react";
import { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip as TooltipShad } from "@radix-ui/react-tooltip";

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    qv: 6000,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    qv: 6000,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    qv: 6000,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    qv: 6000,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    qv: 6000,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    qv: 6000,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    qv: 6000,
    amt: 2100,
  },
];

export default function Cashflow() {
  return <div className="flex px-2 gap-x-3">
    <CashFlowChart />
    <div className="w-2/3 flex flex-col gap-y-3">
        
        <div className="border rounded-md px-3 py-3">
            <span className="flex justify-between items-center text-xs">
                <h1>Cash Position</h1>
                <DollarSign className="w-4 h-4" />
            </span>
            <div className="mt-3">
                <span className="flex items-center gap-x-2">
                <h1 className="text-lg font-bold">$500,999</h1>
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
                <span className="flex justify-between items-center">
                    <p className="text-xs">Operating Account</p>
                    <p className="text-xs">$350,000</p>
                </span>
                <span className="flex justify-between items-center">
                    <p className="text-xs">Reserve Fund</p>
                    <p className="text-xs">$150,000</p>
                </span>
            </div>
        </div>

        <div className="border rounded-md px-3 py-3">
            <span className="flex justify-between items-center text-xs">
                <h1>Upcoming Payments</h1>
            </span>
            <div className="mt-3 flex flex-col gap-y-2">
                <span className="flex justify-between items-center">
                    <span>
                        <p className="text-xs font-semibold">Payroll</p>
                        <p className="text-xs text-gray-400 ">Due in 5 days</p>
                    </span>
                    <p className="text-xs">$28,000</p>
                </span>
                <span className="flex justify-between items-center">
                    <span>
                        <p className="text-xs font-semibold">AWS</p>
                        <p className="text-xs text-gray-400 ">Due in 12 days</p>
                    </span>
                    <p className="text-xs">$3,200</p>
                </span>
                <span className="flex justify-between items-center">
                    <span>
                        <p className="text-xs font-semibold">Office Rent</p>
                        <p className="text-xs text-gray-400 ">Due in 18 days</p>
                    </span>
                    <p className="text-xs">$4,500</p>
                </span>
            </div>
        </div>
    </div>
  </div>

  
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
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#333" }}  />
              <YAxis tick={{ fontSize: 12, fill: "#333" }} />
              <Tooltip contentStyle={{ fontSize: "12px" }}
                labelStyle={{ fontSize: "12px" }} />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              <Line type="monotone" dataKey="qv" stroke="#fb2c36" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
}
  