import type { ColumnDef } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import type { Payment } from "./types/types";

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "paid",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("paid") ? "Paid" : "not paid"}
      </div>
    ),
  },
  {
    accessorKey: "paymentMethods",
    header: "Payment system",
    cell: ({ row }) => {
      // TODO add links to .env
      const paymentMethodsHref =
        row.getValue("paymentMethods") === "STRIPE"
          ? import.meta.env.STRIPE_DASHBOARD
          : import.meta.env.PAYPAL_DASHBOARD;
      return (
        <a
          className="capitalize text-cyan-800 underline"
          target="_blank"
          href={paymentMethodsHref}
        >
          {row.getValue("paymentMethods")}
        </a>
      );
    },
  },
  {
    accessorKey: "userId",
    header: ({ column }) => {
      return <div className="">User ID</div>;
    },
    cell: ({ row }) => {
      return <div className="w-40 truncate">{row.getValue("userId")}</div>;
    },
  },
  {
    accessorKey: "transactionId",
    header: ({ column }) => {
      return <div className="">Transaction ID</div>;
    },
    cell: ({ row }) => {
      return (
        <div className=" w-40 truncate">{row.getValue("transactionId")}</div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: () => <div className="text-right">Created at</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt")).toDateString();
      return <div className="text-right font-medium">{date}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => <div className="text-right">Updated at</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("updatedAt")).toDateString();
      return <div className="text-right font-medium">{date}</div>;
    },
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex items-center justify-center text-right"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className=" ml-[20px]">{row.getValue("totalAmount")} UAH</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.userId)}
            >
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(payment.transactionId)
              }
            >
              Copy transaction ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
