"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/app/components/ui/card";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { eventFormat, geometryFormat, propsListEvents } from "./dataInterfaces";
import { JSX, useState } from "react";

export default function Map(props: propsListEvents) {
  const [selected, setSelected] = useState<string>();
  function drawVectorLayer(geoData: geometryFormat[]): JSX.Element {
    const colorRed = { color: "red" };
    if (geoData.length > 1) {
      const polygon: [number, number][] = geoData.map(
        (coordPair: geometryFormat) => [
          coordPair.coordinates[1],
          coordPair.coordinates[0],
        ],
      );
      return <Polygon pathOptions={colorRed} positions={polygon}></Polygon>;
    } else {
      return (
        <Circle
          center={[geoData[0].coordinates[1], geoData[0].coordinates[0]]}
          pathOptions={colorRed}
          radius={10000}
        ></Circle>
      );
    }
  }
  return (
    <div>
      <Card className="aspect-square">
        <CardHeader>
          <CardTitle>Event Map</CardTitle>
          <CardDescription>View the Map</CardDescription>
        </CardHeader>
        <CardContent>
          <div id="map" className="aspect-square">
            <MapContainer
              center={[40, -98]}
              zoom={3}
              scrollWheelZoom={false}
              className="h-100 w-100 rounded-lg"
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
              {props.events
                ? props.events?.map((event: eventFormat) =>
                    drawVectorLayer(event.geometry),
                  )
                : null}
            </MapContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
