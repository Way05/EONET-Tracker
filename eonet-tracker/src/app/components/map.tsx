"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/app/components/ui/card";
import { Button } from "./ui/button";
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
import { Suspense, useCallback, useMemo, useState } from "react";
import { Crosshair } from "lucide-react";

const center: [number, number] = [40, -98];
const zoom: number = 3;

function DisplayPosition({ map }: Map) {
  const [position, setPosition] = useState(() => map.getCenter());

  const onMove = useCallback(() => {
    setPosition(map.getCenter());
  }, [map]);

  useMemo(() => {
    map.on("move", onMove);
    return () => {
      map.off("move", onMove);
    };
  }, [map, onMove]);

  return (
    <div>
      <p className="text-sm font-medium">
        Latitude: {position.lat.toFixed(2)}, Longitude:
        {` ${position.lng.toFixed(2)}`}
      </p>
    </div>
  );
}

export default function Map(props: propsListEvents) {
  const [map, setMap] = useState<Map | undefined>(null);
  // const [selected, setSelected] = useState<string>();
  // function zoomToSelected(id: string) {
  //   map.setView();
  // }
  // function drawVectorLayer(id: string, geoData: geometryFormat[]): JSX.Element {
  //   const colorRed = { color: "red" };
  //   if (geoData.length > 1) {
  //     const polygon: [number, number][] = geoData.map(
  //       (coordPair: geometryFormat) => [
  //         coordPair.coordinates[1],
  //         coordPair.coordinates[0],
  //       ],
  //     );
  //     return (
  //       <Polygon key={id} pathOptions={colorRed} positions={polygon}></Polygon>
  //     );
  //   } else {
  //     return (
  //       <Circle
  //         key={id}
  //         center={[geoData[0].coordinates[1], geoData[0].coordinates[0]]}
  //         pathOptions={colorRed}
  //         radius={10000}
  //       ></Circle>
  //     );
  //   }
  // }
  // useEffect(() => {
  //   zoomToSelected();
  //   drawVectorLayer();
  // }, [selected]);

  const loadMarkers = useMemo(() => {
    return (
      <div>
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
      </div>
    );
  }, [props.events]);

  const onClick = useCallback(() => {
    map.setView(center, zoom);
  }, [map]);
  const displayMap = useMemo(
    () => (
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        className="aspect-square h-fit rounded-lg"
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {loadMarkers}
      </MapContainer>
    ),
    [props.events],
  );

  return (
    <div>
      <Card className="w-140 aspect-square">
        <CardHeader>
          <CardTitle>Event Map</CardTitle>
          <CardDescription>View the Map</CardDescription>
          <CardAction>
            <Button variant="outline" onClick={onClick} className="h-10 w-10">
              <Crosshair></Crosshair>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div id="map" className="aspect-square">
            {displayMap}
          </div>
        </CardContent>
        <CardFooter>
          {map ? <DisplayPosition map={map}></DisplayPosition> : null}
        </CardFooter>
      </Card>
    </div>
  );
}
