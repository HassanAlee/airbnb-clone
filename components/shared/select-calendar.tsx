"use client";

import * as React from "react";
import { startOfToday } from "date-fns";
import { type DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";

export function SelectCalendar({
  reservation,
}: {
  reservation: { startDate: Date; endDate: Date }[] | undefined;
}) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    undefined,
  );

  const disabledDates = [
    { before: startOfToday() },
    ...(reservation?.map((r) => ({ from: r.startDate, to: r.endDate })) ?? []),
  ];

  return (
    <>
      <input
        type="hidden"
        name="startDate"
        value={dateRange?.from?.toISOString() ?? ""}
      />
      <input
        type="hidden"
        name="endDate"
        value={dateRange?.to?.toISOString() ?? ""}
      />
      <Card className="mx-auto w-fit p-0 border-none shadow-none">
        <CardContent className="p-0">
          <Calendar
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={1}
            disabled={disabledDates}
          />
        </CardContent>
      </Card>
    </>
  );
}
