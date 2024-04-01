import { Bug, Gamepad2, LayoutGrid, LogOut, RefreshCw, Settings } from "lucide-react";
import Logo from "../logo/logo";
import { type ReactElement } from "react";

interface ILinksProps {
  name: string;
  children: ReactElement;
}

const Links: React.FC<ILinksProps> = ({ name, children }) => {
  return (
    <a href="#overview" className="flex flex-row items-center mt-5">
      {children}
      <span className="text-lg font-semibold pl-3 hover:underline">{name}</span>
    </a>
  );
};

const SideBar: React.FC = () => {
  return (
    <div className="bg-black w-[250px] h-screen flex flex-col items-center pt-3 ">
      <Logo />
      <div className="flex flex-col mt-5 text-white">
        <Links name={"Overview"}>
          <LayoutGrid />
        </Links>
        <Links name={"Transactions"}>
          <RefreshCw />
        </Links>
        <Links name={"Games"}>
          <Gamepad2 />
        </Links>
        <Links name={"Reports"}>
          <Bug />
        </Links>
        <Links name={"Settings"}>
          <Settings />
        </Links>
      </div>
      <div className="absolute bottom-3 left-3 text-gray-400 hover:text-gray-100">
      <Links name={"Logout"} >
            <LogOut />
        </Links>
      </div>
    </div>
  );
};

export { SideBar };
