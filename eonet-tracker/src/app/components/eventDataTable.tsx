"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/app/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/app/components/ui/select";
import { Button } from "./ui/button";
import { useMemo, useState } from "react";
import { Input } from "./ui/input";

interface EventDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function EventDataTable<TData, TValue>({
  data,
  columns,
}: EventDataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  function changeFilter(choice: string) {
    const filterValue = choice != "all" ? choice : "";
    table.getColumn("category")?.setFilterValue(filterValue);
  }

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnFilters,
      columnVisibility,
    },
  });

  useMemo(() => table.getColumn("category")?.toggleVisibility(false), []);

  return (
    <div>
      <div>
        <div className="flex items-center justify-between py-4">
          <Select onValueChange={changeFilter}>
            <SelectTrigger className="w-1/3">
              <SelectValue placeholder="Filter Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="drought">Drought</SelectItem>
                <SelectItem value="dustHaze">Dust Haze</SelectItem>
                <SelectItem value="earthquakes">Earthquakes</SelectItem>
                <SelectItem value="floods">Floods</SelectItem>
                <SelectItem value="landslides">Landslides</SelectItem>
                <SelectItem value="manmade">Manmade</SelectItem>
                <SelectItem value="seaLakeIce">Sea and Lake Ice</SelectItem>
                <SelectItem value="severeStorms">Severe Storms</SelectItem>
                <SelectItem value="snow">Snow</SelectItem>
                <SelectItem value="tempExtremes">
                  Extreme Temperatures
                </SelectItem>
                <SelectItem value="volcanoes">Volcanoes</SelectItem>
                <SelectItem value="waterColor">Water Color</SelectItem>
                <SelectItem value="wildfires">Wildfires</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            placeholder="Filter events..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="w-1/2"
          />
        </div>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between space-x-2 border-t px-2 py-2">
          <div className="text-muted-foreground text-sm">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
            {/* {" - "}
            Showing {table.getFilteredRowModel().rows.length} */}
          </div>
          <div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
