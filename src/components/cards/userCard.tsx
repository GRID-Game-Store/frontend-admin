import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import type { IEntities } from "../users/userList";
interface ICardUserProps {
  user: IEntities;
}
const CardUser: React.FC<ICardUserProps> = ({ user }) => {
  const handleCopyID = () => {
    user.externalId &&
      window.navigator.clipboard.writeText(user.externalId).then(function (x) {
        alert("Link copied to clipboard: " + user.externalId);
      });
  };

  return (
    <Card className="w-[200px] border bg-card text-card-foreground shadow ml-2">
      <CardHeader className="pb-0 pt-3 pl-3  flex flex-row items-center justify-between space-y-0 ">
        <CardTitle className="pb-0 tracking-tight text-[17px] font-extrabold ">
          {user.email}
        </CardTitle>
      </CardHeader>
      <CardContent className=" pt-0 pl-3 flex flex-col space-y-2">
        <h1>Balance: {user.balance} UAH</h1>
        <Button onClick={() => handleCopyID()} className=" w-full">
          Copy ID
        </Button>
        <Button className=" w-full">Open in Panel</Button>
      </CardContent>
    </Card>
  );
};

export { CardUser };
