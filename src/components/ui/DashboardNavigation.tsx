"use client";

import {
  ArrowUpDown,
  BanknoteArrowDown,
  BanknoteArrowUp,
  PanelsTopLeft,
  Plane,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function DashboardNavigation() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();

  const selected = params.slug;

  const handleChangeView = (view: string) => {
    router.push(`/dashboard/${view}`);
  };

  return (
    <div className="flex justify-center gap-x-1 bg-gray-100 py-[0.4rem] px-3 rounded-md">
      <button
        onClick={() => handleChangeView("overview")}
        className={`shrink-0 justify-center flex gap-x-2 text-xs items-center w-1/5 hover:bg-gray-50 hover:text-[var(--main-red)] hover:font-semibold py-1 cursor-pointer rounded-sm
            ${
              selected === "overview"
                ? "bg-gray-50 text-[var(--main-red)] font-semibold"
                : ""
            }`}
      >
        <PanelsTopLeft className="h-4 w-4" />
        Overview
      </button>
      <button
        onClick={() => handleChangeView("cashflow")}
        className={`shrink-0 justify-center flex gap-x-2 text-xs items-center w-1/5 hover:bg-gray-50 hover:text-[var(--main-red)] hover:font-semibold py-1 cursor-pointer rounded-sm
        ${
          selected === "cashflow"
            ? "bg-gray-50 text-[var(--main-red)] font-semibold"
            : ""
        }`}
      >
        <ArrowUpDown className="h-4 w-4" />
        Cash Flow
      </button>
      <button
        onClick={() => handleChangeView("revenue")}
        className={`shrink-0 justify-center flex gap-x-2 text-xs items-center w-1/5 hover:bg-gray-50 hover:text-[var(--main-red)] hover:font-semibold py-1 cursor-pointer rounded-sm
        ${
          selected === "revenue"
            ? "bg-gray-50 text-[var(--main-red)] font-semibold"
            : ""
        }`}
      >
        <BanknoteArrowDown className="h-4 w-4" />
        Revenue
      </button>
      <button
        onClick={() => handleChangeView("expenses")}
        className={`shrink-0 justify-center flex gap-x-2 text-xs items-center w-1/5 hover:bg-gray-50 hover:text-[var(--main-red)] hover:font-semibold py-1 cursor-pointer rounded-sm
        ${
          selected === "expenses"
            ? "bg-gray-50 text-[var(--main-red)] font-semibold"
            : ""
        }`}
      >
        <BanknoteArrowUp className="h-4 w-4" />
        Expenses
      </button>
      <button
        onClick={() => handleChangeView("runway")}
        className={`shrink-0 justify-center flex gap-x-2 text-xs items-center w-1/5 hover:bg-gray-50 hover:text-[var(--main-red)] hover:font-semibold py-1 cursor-pointer rounded-sm
      ${
        selected === "runway"
          ? "bg-gray-50 text-[var(--main-red)] font-semibold"
          : ""
      }`}
      >
        <Plane className="h-4 w-4" />
        Runway Analysis
      </button>
    </div>
  );
}
