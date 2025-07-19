"use client";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/app/components/ui/select";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/app/components/ui/card";
import { eventFormat } from "./dataInterfaces";

type data = {
  events: eventFormat[] | undefined;
};

export default function EventList(props: data) {
  let eventsShowing: number = 0;
  const [filterChoice, setFilterChoice] = useState<string>("all");
  function changeFilter(choice: string) {
    eventsShowing = 0;
    setFilterChoice(choice);
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Event List</CardTitle>
          <CardDescription>Search or Filter</CardDescription>
          <Select onValueChange={changeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="drought">Drought</SelectItem>
                <SelectItem value="dustHaze">Dust Haze</SelectItem>
                <SelectItem value="earthquakes">Earthquakes</SelectItem>
                <SelectItem value="floods">Floods</SelectItem>
                <SelectItem value="landslides">Landslides</SelectItem>
                <SelectItem value="manmade">Manmade</SelectItem>
                <SelectItem value="seaLakeIce">Sea and Lake Ice</SelectItem>
                <SelectItem value="severeStorms">Severe Storms</SelectItem>
                <SelectItem value="snow">Snow</SelectItem>
                <SelectItem value="tempExtremes">
                  Extreme Temperatures
                </SelectItem>
                <SelectItem value="volcanoes">Volcanoes</SelectItem>
                <SelectItem value="waterColor">Water Color</SelectItem>
                <SelectItem value="wildfires">Wildfires</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardHeader>
        {/* <CardAction>Card Action</CardAction> */}
        <CardContent className="min-w-[228px]">
          {props.events
            ? props.events.map((event: eventFormat) => {
                if (
                  filterChoice != "" &&
                  filterChoice === event.categories[0].id
                ) {
                  eventsShowing++;
                  return <div key={event.id}>{event.title}</div>;
                } else if (filterChoice === "all") {
                  eventsShowing++;
                  return <div key={event.id}>{event.title}</div>;
                }
              })
            : null}
          {eventsShowing === 0 ? <div>No events found.</div> : null}
        </CardContent>
        {/* <CardFooter><p>Card Footer</p></CardFooter> */}
      </Card>
    </div>
  );
}
