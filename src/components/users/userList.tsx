import type { UsersResponse } from "@/types/types";
import { CardUser } from "../cards/userCard";



export interface IEntities {
  externalId?: string
  email?: string
  balance?: number
}

interface IGamesListProps {
  users: UsersResponse["entities"];
}


const UsersList: React.FC<IGamesListProps> = ({ users }) => {
  return (
    <div className="flex flex-wrap ">
      {users && users.map((user: IEntities) => <div key={user.externalId}><CardUser user={user} /></div>)}
    </div>
  );
};

export { UsersList };
