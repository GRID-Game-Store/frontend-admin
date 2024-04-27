import { signOut } from "auth-astro/client";


export const handleLogOut  =  () => {
    // @ts-ignore: next-line
    fetch("/api/auth/logout.json").then(() => signOut("keycloak"))
  };

