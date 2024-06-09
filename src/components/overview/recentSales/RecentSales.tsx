import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../../ui/button";
import { DataTable } from "@/components/dataTable/dataTable";
import type { Payment } from "@/components/dataTable/types/types";


interface IRecentSalesProps {
  transactions : any
}
const RecentSales : React.FC<IRecentSalesProps> = ({transactions}) => {

  return (
    <div className="space-y-5 bg-white  rounded-lg border bg-card text-card-foreground shadow w-[300px] p-2 flex  flex-col justify-start ">
      <h3 className="tracking-tight text-xl font-extrabold w-max ">
        Recent Sales
      </h3>
      {transactions.entities && <DataTable
        data={transactions.entities as unknown as Array<Payment>}
        currentPage={transactions.currentPage! + 1}
        totalPages={transactions.totalPages! + 1}
        totalItems={transactions.totalItems}
        width="230"
        currentPageURL={1}
        mode="small"
      />}
      <Button onClick={() => window.location.href = '/transactions?page=1&pageSize=20'} >View all</Button>
    </div>
  );
};

export { RecentSales };
