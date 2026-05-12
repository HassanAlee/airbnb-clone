"use client";

import * as React from "react";
import { startOfToday } from "date-fns";
import { type DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";

export function SelectCalendar() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    undefined,
  );
  console.log(dateRange);

  return (
    <Card className="mx-auto w-fit p-0 border-none shadow-none">
      <CardContent className="p-0">
        <Calendar
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={setDateRange}
          numberOfMonths={1}
          disabled={{ before: startOfToday() }}
        />
      </CardContent>
    </Card>
  );
}
