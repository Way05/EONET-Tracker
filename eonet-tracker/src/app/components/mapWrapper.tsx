"use client";
import dynamic from "next/dynamic";
import { propsListEvents } from "./dataInterfaces";

const LazyMap = dynamic(() => import("@/src/app/components/map"), {
  ssr: false,
  loading: () => (
    <div className="w-140 flex aspect-square items-center">
      <p className="w-full text-center">[ Loading... ]</p>
    </div>
  ),
});

export default function MapWrapper(props: propsListEvents) {
  return (
    <div>
      <LazyMap events={props.events} />
    </div>
  );
}
