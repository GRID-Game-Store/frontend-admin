import { Bug, Gamepad2, LayoutGrid, LogOut, RefreshCw, Settings, User, Users2 } from "lucide-react";
import Logo from "../logo/logo";
import { useEffect, type ReactElement } from "react";
import { signIn } from "auth-astro/client";

interface ILinksProps {
  name: string;
  children: ReactElement;
  isPagination?: boolean;
}

const Links: React.FC<ILinksProps> = ({ name, children, isPagination = false }) => {
  const link = name === "Overview" ? "/" : `/${name.toLocaleLowerCase()}${isPagination ? "?page=1" : ""}`; ;
  return (
    <a href={link} className="flex flex-row items-center mt-5">
      {children}
      <span className="text-lg font-semibold pl-3 hover:underline">{name}</span>
    </a>
  );
};

const SideBar: React.FC = () => {
  useEffect(() => {
    setInterval(() => {
      signIn("keycloak")
    }, 282000)
  }, []);
  return (
    <div className="bg-black w-[250px]  h-[170vh] flex flex-col items-center pt-3  ">
      <Logo />
      <div className="flex flex-col mt-5 text-white">
        <Links name={"Overview"}>
          <LayoutGrid />
        </Links>
        <Links name={"Transactions"}>
          <RefreshCw />
        </Links>
        <Links name={"Games"} isPagination>
          <Gamepad2 />
        </Links>
        <Links name={"Users"} isPagination>
          <Users2 />
        </Links>
        <Links name={"Reports"}>
          <Bug />
        </Links>
        <Links name={"Settings"}>
          <Settings />
        </Links>
      </div>
      <div className="absolute bottom-3 left-3 text-gray-400 hover:text-gray-100">
      {/* <Links name={"Logout"} >
            <LogOut />
        </Links> */}
      </div>
    </div>
  );
};

export { SideBar };
