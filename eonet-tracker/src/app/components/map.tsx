import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/app/components/ui/card";

export default function Map() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Event Map</CardTitle>
          <CardDescription>View the Map</CardDescription>
        </CardHeader>
        <CardContent>
          <p>[MAP HERE]</p>
        </CardContent>
      </Card>
    </div>
  );
}
