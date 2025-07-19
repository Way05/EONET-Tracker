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
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/src/app/components/ui/chart";

const chartData = [
  { month: "January", events: 186 },
  { month: "February", events: 305 },
  { month: "March", events: 237 },
  { month: "April", events: 73 },
  { month: "May", events: 209 },
  { month: "June", events: 214 },
];

const chartConfig = {
  events: {
    label: "Events",
    color: "white",
  },
} satisfies ChartConfig;

export default function Graph() {
  return (
    <div>
      <Card>
        <CardHeader className="flex flex-col items-stretch border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6">
            <CardTitle>Event Frequency</CardTitle>
            <CardDescription>Events per Day</CardDescription>
          </div>
          <div className="flex">
            <div className="border-- relative z-30 flex flex-1 flex-col justify-center gap-1 px-6 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8">
              <span className="text-muted-foreground text-xs">Total</span>
              <span className="text-lg font-bold leading-none sm:text-2xl">
                100
              </span>
            </div>
          </div>
        </CardHeader>
        {/* <CardAction>Card Action</CardAction> */}
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="events" fill="var(--color-events)" radius={3} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
