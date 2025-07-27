"use client";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { eventFormat, propsListEvents } from "./dataInterfaces";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

type mapEmbedProps = {
  events: eventFormat[] | undefined;
};

const center: [number, number] = [40, -98];
const zoom: number = 3;

export default function MapEmbed(props: mapEmbedProps) {
  const [map, setMap] = useState<Map | undefined>(null);

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        className="h-full w-full rounded-lg"
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {props.events
          ? props.events.map((event: eventFormat) => (
              <Marker
                key={event.id}
                position={[
                  event.geometry[0].coordinates[1],
                  event.geometry[0].coordinates[0],
                ]}
              >
                <Popup>{event.title}</Popup>
              </Marker>
            ))
          : null}
      </MapContainer>
    ),
    [props.events],
  );
  return <div className="h-full w-full">{displayMap}</div>;
}
