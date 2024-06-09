import { Auth } from "@auth/core";
import type { Session } from "@auth/core/types";
import authConfig from "auth:config";

/**

Fetches the current session.

@param req The request object.

@returns The current session, or null if there is no session.
*/
export async function getSession(
  astro: any,
  options = authConfig
): Promise<Session | null> {
  const req = astro.request;

  //console.log('getSession start')

  // @ts-ignore
  options.secret ??= import.meta.env.AUTH_SECRET;
  options.trustHost ??= true;

  const url = new URL(`${options.prefix}/session`, req.url);
  const response = await Auth(
    new Request(url, { headers: req.headers }),
    options
  );
  const { status = 200 } = response;

  //console.log('getSession response', response);
  //console.log('getSetCookie', response.headers.getSetCookie())
  const data = await response.json();
  // return the cookie
  const setCookie = response.headers.getSetCookie();
  if (setCookie) {
    astro.response.headers.set("Set-Cookie", setCookie);
  }

  if (!data || !Object.keys(data).length) return null;
  if (status === 200) return data;
  throw new Error(data.message);
}
