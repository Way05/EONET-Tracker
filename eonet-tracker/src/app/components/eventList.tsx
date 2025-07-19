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

interface categoriesFormat {
  id: string;
  title: string;
}

interface sourcesFormat {
  id: string;
  url: string;
}

interface geometryFormat {
  magnitudeValue: number;
  magnitudeUnit: string;
  date: string;
  type: string;
  coordinates: [number, number];
}

interface eventFormat {
  id: string;
  title: string;
  description: string;
  link: string;
  closed: boolean;
  categories: categoriesFormat[];
  sources: sourcesFormat[];
  geometry: geometryFormat[];
}

interface allEventsFormat {
  title: string;
  description: string;
  link: string;
  events: eventFormat[];
}

export default function EventList() {
  const eventLimit: number = 20;
  const [currData, setData] = useState<allEventsFormat>();
  const params: URLSearchParams = new URLSearchParams();
  params.append("status", "open");
  params.append("limit", eventLimit.toString());

  let eventsShowing: number = 0;
  const [filterChoice, setFilterChoice] = useState<string>("all");
  function changeFilter(choice: string) {
    eventsShowing = 0;
    setFilterChoice(choice);
  }

  useEffect(() => {
    async function getData(): Promise<void> {
      const res: Response = await fetch(
        `https://eonet.gsfc.nasa.gov/api/v3/events?${params}`,
        {
          next: { revalidate: 3600 },
        },
      );
      const json: allEventsFormat = await res.json();
      setData(json);

      console.log(json);
    }

    // getData();
  });
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
          {currData
            ? currData.events.map((event: eventFormat) => {
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
