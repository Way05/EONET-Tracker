"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/app/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/src/app/components/ui/chart";
import { eventFormat } from "./dataInterfaces";
import { useEffect, useState } from "react";

const chartConfig = {
  events: {
    label: "Events",
    color: "white",
  },
} satisfies ChartConfig;

type data = {
  events: eventFormat[] | undefined;
};

type chartEntry = {
  date: string;
  events: number;
};

interface tempObjData {
  [key: string]: number;
}

export default function Graph(props: data) {
  const [chartData, setChartData] = useState<chartEntry[]>([]);
  const [totalEvents, setTotalEvents] = useState<number>(0);

  useEffect(() => {
    if (props.events) {
      setTotalEvents(props.events?.length);
      const tempChartData: tempObjData = {};
      for (const event of props.events) {
        const date: string = event.geometry[0].date.slice(0, 10);
        if (!tempChartData[date]) {
          tempChartData[date] = 1;
        } else {
          tempChartData[date]++;
        }
      }

      const formattedData: chartEntry[] = Object.keys(tempChartData).map(
        (key) => ({ date: key, events: tempChartData[key] }),
      );
      setChartData(formattedData.reverse());

      // console.log(tempChartData);
      // console.log(chartData);
    }
  }, [props.events]);
  return (
    <div>
      <Card>
        <CardHeader className="flex flex-col items-stretch border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6">
            <CardTitle>Event Frequency</CardTitle>
            <CardDescription>Ongoing Events per Day</CardDescription>
          </div>
          <div className="flex">
            <div className="border-- relative z-30 flex flex-1 flex-col justify-center gap-1 px-6 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8">
              <span className="text-muted-foreground text-xs">Total</span>
              <span className="text-lg font-bold leading-none sm:text-2xl">
                {totalEvents}
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
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                    }}
                  />
                }
              />
              <Bar dataKey="events" fill="var(--color-events)" radius={3} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            No trend data.
          </div>
          <div className="text-muted-foreground leading-none">
            Showing the last {totalEvents} disasters.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
