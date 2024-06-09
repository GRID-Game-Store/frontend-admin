import {
  BadgeDollarSign,
  Bug,
  Gamepad2,
  LayoutGrid,
  LogOut,
  RefreshCw,
  Settings,
  ShieldHalf,
  User,
  Users2,
} from "lucide-react";
import Logo from "../logo/logo";
import { useEffect, type ReactElement } from "react";
import { signIn } from "auth-astro/client";

interface ILinksProps {
  name: string;
  children: ReactElement;
  isPagination?: boolean;
  additionQueryParams?: string;
  link?: string;
}

const Links: React.FC<ILinksProps> = ({
  name,
  children,
  isPagination = false,
  additionQueryParams = "",
}) => {
  const link =
    name === "Overview"
      ? "/"
      : `/${name.toLocaleLowerCase()}${
          isPagination ? "?page=1" : ""
        }${additionQueryParams}`;
  return (
    <a href={link} className="flex flex-row items-center mt-5">
      {children}
      <span className="text-lg font-semibold pl-3 hover:underline">{name}</span>
    </a>
  );
};

const LinksOnPanel: React.FC<ILinksProps> = ({
  name,
  children,
  isPagination = false,
  link = "",
}) => {
  return (
    <a href={link} className="flex flex-row items-center mt-5">
      {children}
      <span className="text-lg font-semibold pl-3 hover:underline">{name}</span>
    </a>
  );
};

const SideBar: React.FC = () => {
  return (
    <div className="bg-black w-[250px]  h-[200vh] flex flex-col items-center pt-3  ">
      <Logo />
      <div className="flex flex-col mt-5 text-white">
        <Links name={"Overview"}>
          <LayoutGrid />
        </Links>
        <Links
          name={"Transactions"}
          isPagination
          additionQueryParams="&pageSize=20"
        >
          <RefreshCw />
        </Links>
        <Links name={"Games"} isPagination>
          <Gamepad2 />
        </Links>
        <Links name={"Users"} isPagination>
          <Users2 />
        </Links>
        <LinksOnPanel name={"Panel PayPal"} isPagination link={import.meta.env.PAYPAL_DASHBOARD}>
          <BadgeDollarSign />
        </LinksOnPanel>
        <LinksOnPanel name={"Panel Stripe"} isPagination link={import.meta.env.STRIPE_DASHBOARD}>
          <BadgeDollarSign />
        </LinksOnPanel>
        <LinksOnPanel
          name={"Keycloak"}
          isPagination
          link="https://auth.grid.domain-for-tests.com/"
        >
          <ShieldHalf />
        </LinksOnPanel>
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
