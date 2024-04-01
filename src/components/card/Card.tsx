import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign } from "lucide-react";
interface ICardProps {
    cardTitle: string,
    cardContent: string,
    cardContentAddition?: string,
    children?: React.ReactNode
}
const CardInfo: React.FC<ICardProps> = ({ cardTitle, cardContent, cardContentAddition, children }) => {
  return (
    <Card className="w-[300px] h-[100px] border bg-card text-card-foreground shadow">
      <CardHeader className="pb-0 pt-3 flex flex-row items-center justify-between space-y-0 ">
        <CardTitle className="pb-0 tracking-tight text-xl font-extrabold ">
            {cardTitle}
        </CardTitle>
        {children}
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="text-2xl font-bold">{cardContent}</div>
        <p className="text-xs text-muted-foreground">{cardContentAddition}</p>
      </CardContent>
    </Card>
  );
};

export { CardInfo };
