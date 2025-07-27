"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/app/components/ui/card";
import { eventFormat, propsListEvents } from "./dataInterfaces";
import { EventDataTable } from "./eventDataTable";
import { columns, Event } from "./eventColumns";

export default function EventList(props: propsListEvents) {
  function formatData(events: eventFormat[]): Event[] {
    return events.map((event: eventFormat) => ({
      id: event.id,
      category: event.categories[0].id,
      name: event.title,
      date: event.geometry[0].date,
    }));
  }
  const formattedData: Event[] = formatData(props.events!);

  return (
    <div className="w-140">
      <Card className="gap-0">
        <CardHeader>
          <CardTitle>Event List</CardTitle>
          <CardDescription>Search or Filter</CardDescription>
        </CardHeader>
        <CardContent className="min-w-[228px]">
          <EventDataTable
            data={formattedData}
            columns={columns}
          ></EventDataTable>
        </CardContent>
      </Card>
    </div>
  );
}
