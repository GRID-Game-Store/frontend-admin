import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  Calculator,
  Calendar,
  CreditCard,
  LogOut,
  Settings,
  Smile,
  User as UserIcon,
} from "lucide-react";

import { signIn, signOut } from "auth-astro/client";
import type { User } from "@auth/core/types";
import { handleLogOut } from "@/utils/logout";



interface IHeaderProps {
  title: string;
  userData:  User | undefined; 
}
const Header: React.FC<IHeaderProps> = ({ title, userData }) => { 
  return (
      <div className="bg-white absolute left-[250px] w-[calc(100%-250px)] h-16  flex items-center justify-between pl-3 ">
        <h1 className="scroll-m-20 text-1xl font-extrabold tracking-tight lg:text-2xl ">
          {title}
        </h1>
        <div className="flex ">
       {userData?.name && <DropdownMenu>
          <DropdownMenuTrigger className="relative right-20">
            <UserIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{userData?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>}
        {!userData && <Button onClick={() => signIn("keycloak")} className="relative  right-[50px]">Login</Button>}
        {userData && <Button onClick={() => handleLogOut()} className="relative  right-[50px] w-[50px] h-[30px] "><LogOut  /></Button>}
        </div>
      </div>
  );
};

export { Header };
