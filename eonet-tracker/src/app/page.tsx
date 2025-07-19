"use client";
import Image from "next/image";
import EventList from "./components/eventList";
import Map from "./components/map";
import Graph from "./components/graph";
import { useEffect, useState } from "react";
import { allEventsFormat } from "./components/dataInterfaces";

export default function Home() {
  const eventLimit: number = 20;
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

    // getData();
  }, []);
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <main className="row-start-2 flex flex-wrap items-center gap-[32px] sm:items-start">
        <EventList events={currData?.events}></EventList>
        <Map></Map>
        <Graph events={currData?.events}></Graph>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-[24px]">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://eonet.gsfc.nasa.gov/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          NASA EONET API
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://api.nasa.gov/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          All NASA APIs →
        </a>
      </footer>
    </div>
  );
}
