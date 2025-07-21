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
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/app/components/ui/card";
import { eventFormat, propsListEvents } from "./dataInterfaces";
import Event from "./event";

export default function EventList(props: propsListEvents) {
  let eventsShowing: number = 0;
  const [filterChoice, setFilterChoice] = useState<string>("all");
  function changeFilter(choice: string) {
    eventsShowing = 0;
    setFilterChoice(choice);
  }

  const [selected, setSelected] = useState<string>("");
  useEffect(() => {
    console.log(selected);
  }, [selected]);

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
                  return (
                    <Event
                      key={event.id}
                      id={event.id}
                      title={event.title}
                      currentSelection={selected}
                      sendID={setSelected}
                    ></Event>
                  );
                } else if (filterChoice === "all") {
                  eventsShowing++;
                  return (
                    <Event
                      key={event.id}
                      id={event.id}
                      title={event.title}
                      currentSelection={selected}
                      sendID={setSelected}
                    ></Event>
                  );
                }
              })
            : null}
          {eventsShowing === 0 ? <div>No events found.</div> : null}
        </CardContent>
      </Card>
    </div>
  );
}
