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
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
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
        <Command className=" absolute top-1 right-[200px] w-60 h-50 z-50">
          <CommandInput placeholder="Type a command or search..." />
          {/* <CommandList >
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile className="mr-2 h-4 w-4" />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator className="mr-2 h-4 w-4" />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList> */}
        </Command>
        
        <div className="flex ">
       {userData && <DropdownMenu>
          <DropdownMenuTrigger className="relative right-20">
            <UserIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{userData?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>}
        {!userData && <Button onClick={() => signIn("keycloak")} className="relative  right-[50px]">Login</Button>}
        {userData && <Button onClick={() => handleLogOut()} className="relative  right-[50px] w-[50px] h-[30px] "><LogOut  /></Button>}
        </div>
      </div>
  );
};

export { Header };
