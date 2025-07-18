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

interface eventFormat {
  id: string;
  title: string;
  description: string;
  link: string;
  closed: boolean;
  //LAZY I WILL ADD THEM IF I NEED THEM
  categories: any;
  sources: any;
  geometry: any;
}

interface allEventsFormat {
  title: string;
  description: string;
  link: string;
  events: eventFormat[];
}

export default function EventList() {
  const eventLimit: number = 20;
  const categoryFilter: string = "";
  const [currData, setData] = useState<allEventsFormat>();
  const params: URLSearchParams = new URLSearchParams();
  params.append("status", "open");
  params.append("limit", eventLimit.toString());

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

    getData();
  }, []);
  return (
    <div>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            <SelectItem value="drought">Drought</SelectItem>
            <SelectItem value="dustHaze">Dust Haze</SelectItem>
            <SelectItem value="earthquakes">Earthquakes</SelectItem>
            <SelectItem value="floods">Floods</SelectItem>
            <SelectItem value="landslides">Landslides</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {currData
        ? currData.events.map((event: eventFormat) => (
            <div key={event.id}>{event.title}</div>
          ))
        : "Loading..."}
    </div>
  );
}
