"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Event = {
  id: string;
  category: string;
  name: string;
  date: string;
};

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  //   {
  //     accessorKey: "category",
  //     header: "Category",
  //   },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const formatted: string = new Date(
        row.getValue("date"),
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      return <span>{formatted}</span>;
    },
  },
];
