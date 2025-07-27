import dynamic from "next/dynamic";
import { propsListEvents } from "./dataInterfaces";

const LazyMap = dynamic(() => import("@/src/app/components/map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function MapWrapper(props: propsListEvents) {
  return (
    <div>
      <LazyMap events={props.events} />
    </div>
  );
}
