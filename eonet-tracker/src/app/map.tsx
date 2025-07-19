import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
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
        {/* <CardAction>Card Action</CardAction> */}
        <CardContent>
          <p>[MAP HERE]</p>
        </CardContent>
        {/* <CardFooter><p>Card Footer</p></CardFooter> */}
      </Card>
    </div>
  );
}
