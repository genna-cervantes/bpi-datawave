"use client";

import {
  Area,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  AreaChart,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";
import { BanknoteArrowDown, CreditCard, Info, Smartphone } from "lucide-react";
import { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip as TooltipShad } from "@radix-ui/react-tooltip";

const data = [
  {
    name: "Page A",
    uv: 4000,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    amt: 2100,
  },
];

export default function Revenue() {
  return (
    <div className="flex items-start">
      <Example />

      <div className="border rounded-md px-3 py-3 w-2/3">
        <span className="flex justify-between items-center">
          <span className="flex flex-col text-xs">
            <h1 className="font-semibold text-sm">Revenue Metrics</h1>
            <p className="text-gray-500">Key performance Indicators</p>
          </span>
          <BanknoteArrowDown className="w-4 h-4" />
        </span>
        <div className="mt-5 pb-4 border-b">
          <div className="grid grid-cols-2 grid-rows-2 px-4 gap-y-3">
            <span>
              <p className="text-xs">MRR Growth Rate</p>
              <span className="flex items-center gap-x-2">
                <h1 className=" text-green-400 font-semibold">+12.3%</h1>
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
            </span>
            <span>
              <p className="text-xs">Churn Rate</p>
              <span className="flex items-center gap-x-2">
                <h1 className=" text-red-400 font-semibold">2.1%</h1>
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
            </span>
            <span>
              <p className="text-xs">ARPU</p>
              <span className="flex items-center gap-x-2">
                <h1 className="font-semibold">$285</h1>
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
            </span>
            <span>
              <p className="text-xs">Net Revenue Retention</p>
              <span className="flex items-center gap-x-2">
                <h1 className=" text-green-400 font-semibold">118%</h1>
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
            </span>
          </div>
        </div>
        <div className="text-xs mt-3">
            <p>Payment Processors</p>
            <div className="flex flex-col mt-1 px-1 gap-y-2">
                <span className="flex w-full justify-between">
                    <span className="flex items-center gap-x-2">
                        <CreditCard className="w-4 h-4" />
                        Stripe
                    </span>
                    <p className="px-2 bg-green-300 border border-green-500 rounded-sm">Connected</p>
                </span>
                <span className="flex w-full justify-between">
                    <span className="flex items-center gap-x-2">
                        <Smartphone className="w-4 h-4" />
                        Paypal
                    </span>
                    <p className="px-2 bg-gray-100 cursor-pointer border rounded-sm">Connect</p>
                </span>
            </div>
        </div>
      </div>
    </div>
  );
}

export function Example() {
  return (
    
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#333" }}  />
          <YAxis tick={{ fontSize: 12, fill: "#333" }} />
          <Tooltip contentStyle={{ fontSize: "12px" }}
                labelStyle={{ fontSize: "12px" }} />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </AreaChart>
      </ResponsiveContainer>
    
  );
}
