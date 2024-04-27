/* eslint-disable no-unused-vars */
import NextAuth from "next-auth";
import { Session } from "@auth/core/types";

declare module "@auth/core/types" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    access_token?: string;
    id_token?: number | string;
    roles?: any;
    error?: any;
  }
}

declare module "next-auth/jwt" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface DefaultJWT extends DefaultJWT {
    decoded?: {
      realm_access: {
        roles: any[];
      };
    };
  }
}
