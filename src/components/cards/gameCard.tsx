import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

interface ICardProps {
  imgUrl?: string;
  title?: string;
  description?: string;
  id?: number;
  price?: number;
  discount?: number;
  active?: boolean;
}
const GameCard: React.FC<ICardProps> = ({
  imgUrl,
  title,
  description,
  id,
  price,
  discount,
  active,
}) => {
  return (
    <Card className="w-[210px] h-max border bg-card text-card-foreground shadow overflow-hidden ml-5 mt-5 relative">
      <CardHeader className="p-0  flex flex-col items-center space-y-0   ">
        <a
          className="flex flex-col items-center"
          target="_blank"
          href={`/game/${id}`}
        >
          <img width={210} src={imgUrl} alt="" />
          {!active && (
            <Badge
              className="absolute right-[5px] top-1 "
              variant="destructive"
            >
              Not active
            </Badge>
          )}
          <CardTitle className="pb-0 tracking-tight text-xl font-extrabold ml-2 hover:underline">
            {title}
          </CardTitle>
        </a>
      </CardHeader>
      <CardContent className=" p-0 w-full pr-5 ml-3 flex flex-col justify-start relative  ">
        <p className="text-xs text-muted-foreground truncate hover:text-clip ">
          {description}
        </p>
        <div className="flex flex-row space-x-1 justify-between mb-2">
          <Badge className="mt-2 " variant="outline">
            {price}UAH
          </Badge>
          <Badge className="mt-2 " variant="outline">
            {discount}%
          </Badge>
        </div>
        <div className="flex flex-col space-y-1 mb-5 justify-end  ">
          <Button size={"sm"}>
            <a className="w-100" href={`/game/${id}`}>
              Open in Panel
            </a>
          </Button>
          <Button onClick={(e) => e.preventDefault()} size={"sm"}>
            Open in Grid
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { GameCard };
