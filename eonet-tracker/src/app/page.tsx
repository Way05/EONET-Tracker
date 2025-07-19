import Image from "next/image";
import EventList from "./components/eventList";
import Map from "./components/map";
import Graph from "./components/graph";

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <main className="row-start-2 flex flex-wrap items-center gap-[32px] sm:items-start">
        <EventList></EventList>
        <Map></Map>
        <Graph></Graph>
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
