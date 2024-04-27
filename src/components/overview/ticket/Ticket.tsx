import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Ticket = () => {
  return (
    <div className="mt-2 ml-3  rounded-lg border bg-card text-card-foreground shadow w-[49%] p-1 pl-0 bg-white pl-4 pt-3 ">
      <h3 className="tracking-tight text-xl font-extrabold w-max mb-2">Tickets</h3>
      <Tabs defaultValue="account" className="">
        <TabsList>
          <TabsTrigger value="All">All</TabsTrigger>
          <TabsTrigger value="Open">Open</TabsTrigger>
          <TabsTrigger value="Padding">Padding</TabsTrigger>
          <TabsTrigger value="Closed">Closed</TabsTrigger>
        </TabsList>
        <TabsContent value="All">
          <Table>
            <TableCaption>A list of all your tickets.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Account</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Close</TableCell>
                <TableCell>2022-01-01</TableCell>
                <TableCell className="  ">
                  <p className="truncate ... w-[300px] ">Lorem ipsum dolor sit amet consectetur adipisicing elit. In aperiam magni, eos fugiat commodi debitis doloremque incidunt deleniti? Iure unde adipisci minus, laudantium molestias repellat libero dicta doloremque ex. Excepturi?</p>
                </TableCell>
                <TableCell className="text-right">Kyryl Srebriakov</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { Ticket };
