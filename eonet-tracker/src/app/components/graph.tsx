import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/app/components/ui/card";
import { Bar, BarChart } from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartConfig,
} from "@/src/app/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function Graph() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Event Frequency</CardTitle>
          <CardDescription>Events per Day</CardDescription>
        </CardHeader>
        {/* <CardAction>Card Action</CardAction> */}
        <CardContent>
          <p>[DATA HERE]</p>
          {/* <ChartContainer config={chartConfig}>
            <BarChart data={chartData}>
              <Bar dataKey="value" />
              {/* <ChartTooltip content={<ChartTooltipContent />} /> */}
          {/* </BarChart>
          </ChartContainer> */}
        </CardContent>
        {/* <CardFooter><p>Card Footer</p></CardFooter> */}
      </Card>
    </div>
  );
}
