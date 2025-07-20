"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/app/components/ui/card";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { eventFormat, propsListEvents } from "./dataInterfaces";

export default function Map(props: propsListEvents) {
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
              center={[51.505, -0.09]}
              zoom={13}
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
                    ></Marker>
                  ))
                : null}
            </MapContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
