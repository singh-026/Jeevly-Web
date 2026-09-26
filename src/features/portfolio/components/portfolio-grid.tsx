"use client";

import { useState } from "react";
import { FilterChips, type FilterOption } from "@/components/ui/filter-chips";
import { cn } from "@/lib/cn";
import { disciplineLabels } from "@/features/services/constants";
import type { CaseStudy, PortfolioFilter } from "../types";
import { CaseStudyCard } from "./case-study-card";

function matches(study: CaseStudy, filter: PortfolioFilter) {
  return filter === "all" || study.disciplines.includes(filter);
}

/** Filters in memory; the full list is server-rendered, so no refetch or reload. */
export function PortfolioGrid({ studies }: { studies: CaseStudy[] }) {
  const [filter, setFilter] = useState<PortfolioFilter>("all");
  const visible = studies.filter((study) => matches(study, filter));

  const options: FilterOption<PortfolioFilter>[] = (["all", "development", "marketing"] as const).map((value) => ({
    value,
    label: value === "all" ? "All" : disciplineLabels[value],
    count: studies.filter((study) => matches(study, value)).length,
  }));

  return (
    <div>
      <FilterChips label="Filter case studies by service" options={options} value={filter} onChange={setFilter} />
      <p aria-live="polite" className="sr-only">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((study) => (
          <li key={study.slug} className={cn(study.featured && "sm:col-span-2 lg:col-span-3")}>
            <CaseStudyCard study={study} />
          </li>
        ))}
      </ul>
    </div>
  );
}
