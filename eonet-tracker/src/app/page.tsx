// "use client";
import Image from "next/image";
import EventList from "./components/eventList";
import Graph from "./components/graph";
import { allEventsFormat } from "./components/dataInterfaces";
import MapWrapper from "./components/mapWrapper";

const TEMP_DATA: allEventsFormat = {
  title: "EONET Events",
  description: "Natural events from EONET.",
  link: "https://eonet.gsfc.nasa.gov/api/v3/events",
  events: [
    {
      id: "EONET_14386",
      title: "Topical Cyclone 01S",
      description: null,
      link: "https://eonet.gsfc.nasa.gov/api/v3/events/EONET_14386",
      closed: null,
      categories: [
        {
          id: "severeStorms",
          title: "Severe Storms",
        },
      ],
      sources: [
        {
          id: "JTWC",
          url: "https://www.metoc.navy.mil/jtwc/products/sh0126.tcw",
        },
      ],
      geometry: [
        {
          magnitudeValue: 35.0,
          magnitudeUnit: "kts",
          date: "2025-07-16T18:00:00Z",
          type: "Point",
          coordinates: [89.9, -9.7],
        },

        {
          magnitudeValue: 35.0,
          magnitudeUnit: "kts",
          date: "2025-07-17T00:00:00Z",
          type: "Point",
          coordinates: [89.3, -9.9],
        },

        {
          magnitudeValue: 35.0,
          magnitudeUnit: "kts",
          date: "2025-07-17T06:00:00Z",
          type: "Point",
          coordinates: [88.8, -9.9],
        },

        {
          magnitudeValue: 35.0,
          magnitudeUnit: "kts",
          date: "2025-07-17T12:00:00Z",
          type: "Point",
          coordinates: [88.2, -10.2],
        },

        {
          magnitudeValue: 35.0,
          magnitudeUnit: "kts",
          date: "2025-07-17T18:00:00Z",
          type: "Point",
          coordinates: [87.6, -10.3],
        },

        {
          magnitudeValue: 35.0,
          magnitudeUnit: "kts",
          date: "2025-07-18T00:00:00Z",
          type: "Point",
          coordinates: [86.4, -11.3],
        },

        {
          magnitudeValue: 35.0,
          magnitudeUnit: "kts",
          date: "2025-07-18T06:00:00Z",
          type: "Point",
          coordinates: [85.4, -11.8],
        },

        {
          magnitudeValue: 30.0,
          magnitudeUnit: "kts",
          date: "2025-07-18T12:00:00Z",
          type: "Point",
          coordinates: [84, -12.1],
        },

        {
          magnitudeValue: 30.0,
          magnitudeUnit: "kts",
          date: "2025-07-18T18:00:00Z",
          type: "Point",
          coordinates: [82.5, -12.2],
        },
      ],
    },

    {
      id: "EONET_14372",
      title: "BRADFORD BRANCH Wildfire, Riverside, California",
      description: null,
      link: "https://eonet.gsfc.nasa.gov/api/v3/events/EONET_14372",
      closed: null,
      categories: [
        {
          id: "wildfires",
          title: "Wildfires",
        },
      ],
      sources: [
        {
          id: "IRWIN",
          url: "https://irwin.doi.gov/observer/",
        },
      ],
      geometry: [
        {
          magnitudeValue: 1071.59,
          magnitudeUnit: "acres",
          date: "2025-07-16T15:51:00Z",
          type: "Point",
          coordinates: [-116.79812, 33.501354],
        },
      ],
    },

    {
      id: "EONET_14374",
      title: "DALE Wildfire, Riverside, California",
      description: "13 Miles SE from Sage, CA",
      link: "https://eonet.gsfc.nasa.gov/api/v3/events/EONET_14374",
      closed: null,
      categories: [
        {
          id: "wildfires",
          title: "Wildfires",
        },
      ],
      sources: [
        {
          id: "IRWIN",
          url: "https://irwin.doi.gov/observer/",
        },
      ],
      geometry: [
        {
          magnitudeValue: 1071.59,
          magnitudeUnit: "acres",
          date: "2025-07-16T15:38:00Z",
          type: "Point",
          coordinates: [-116.787954, 33.526501],
        },
      ],
    },

    {
      id: "EONET_14380",
      title: "Buckboard Wildfire, Oneida, Idaho",
      description: "10 Miles SW from Malad, ID",
      link: "https://eonet.gsfc.nasa.gov/api/v3/events/EONET_14380",
      closed: null,
      categories: [
        {
          id: "wildfires",
          title: "Wildfires",
        },
      ],
      sources: [
        {
          id: "IRWIN",
          url: "https://irwin.doi.gov/observer/",
        },
      ],
      geometry: [
        {
          magnitudeValue: 1698.0,
          magnitudeUnit: "acres",
          date: "2025-07-15T20:59:00Z",
          type: "Point",
          coordinates: [-112.412383, 42.0147],
        },
      ],
    },

    {
      id: "EONET_14382",
      title: "Cabin Wildfire, Coconino, Arizona",
      description: "21 Miles NW from Heber, AZ",
      link: "https://eonet.gsfc.nasa.gov/api/v3/events/EONET_14382",
      closed: null,
      categories: [
        {
          id: "wildfires",
          title: "Wildfires",
        },
      ],
      sources: [
        {
          id: "IRWIN",
          url: "https://irwin.doi.gov/observer/",
        },
      ],
      geometry: [
        {
          magnitudeValue: 1048.0,
          magnitudeUnit: "acres",
          date: "2025-07-15T19:38:00Z",
          type: "Point",
          coordinates: [-110.948117, 34.61695],
        },
      ],
    },
  ],
};

export default async function Home() {
  const eventLimit: number = 500;
  const params: URLSearchParams = new URLSearchParams();
  params.append("status", "open");
  params.append("limit", eventLimit.toString());
  const res = await fetch(
    `https://eonet.gsfc.nasa.gov/api/v3/events?${params}`,
    {
      headers: {
        "Cache-Control": "max-age=3600",
      },
      next: { revalidate: 3600 },
    },
  );
  console.log(
    `Hourly API calls remaining: ${res.headers.get("X-RateLimit-Remaining")}`,
  );
  console.log(
    (await res.clone().arrayBuffer()).byteLength / 1000000,
    "MB of data received",
  );
  let data: allEventsFormat = TEMP_DATA;
  data = await res.json();
  // console.log(data);

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-x-16 p-10 font-sans">
      <main className="row-start-2 flex flex-wrap items-center gap-[32px] sm:items-start">
        <EventList events={data?.events} />
        <MapWrapper events={data?.events} />
        {/* <Graph events={data?.events} /> */}
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
