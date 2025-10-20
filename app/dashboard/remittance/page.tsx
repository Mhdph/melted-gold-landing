"use client";

import { useState } from "react";
import PageTitle from "@/components/page-title";
import RemittanceForm from "@/components/pages/remittance/remittance-form";
import RemittanceList from "@/components/pages/remittance/remittance-list";
import {
  Remittance,
  SortBy,
  FilterUnit,
} from "@/components/pages/remittance/types";
import { remittanceUnits } from "@/components/pages/remittance/utils";

export default function RemittancePage() {
  const [remittances, setRemittances] = useState<Remittance[]>(remittanceUnits);
  const [sortBy, setSortBy] = useState<SortBy>("date");
  const [filterUnit, setFilterUnit] = useState<FilterUnit>("all");

  const handleNewRemittance = (newRemittance: Remittance) => {
    setRemittances([newRemittance, ...remittances]);
  };

  const filteredRemittances = remittances
    .filter((r) => filterUnit === "all" || r.unit === filterUnit)
    .sort((a, b) => {
      if (sortBy === "date") return b.id.localeCompare(a.id);
      return b.amount - a.amount;
    });

  return (
    <div className="min-h-screen bg-[#F6F5EE]" dir="rtl">
      <main className="px-4 py-4 space-y-6">
        {/* Page Header */}
        <PageTitle
          title="ثبت حواله"
          description="ثبت و مدیریت حواله‌های طلا و ریال"
        />

        {/* New Remittance Form */}
        <RemittanceForm onSubmit={handleNewRemittance} />

        {/* Remittance History */}
        <RemittanceList
          remittances={filteredRemittances}
          sortBy={sortBy}
          filterUnit={filterUnit}
          onSortChange={setSortBy}
          onFilterChange={setFilterUnit}
        />
      </main>
    </div>
  );
}
