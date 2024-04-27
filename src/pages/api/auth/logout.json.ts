import { getSession } from "auth-astro/server";





export async function GET({ request } : {request: Request}) {
    const session = await getSession(request)
    if (session) {
      // this will log out the user on Keycloak side
      const idToken = session.id_token;
  
      let url = `${import.meta.env.END_SESSION_URL}?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(import.meta.env.AUTH_URL)}`;
      console.log(idToken);
      try {
       
        await fetch(url, { method: "GET" , cache: "no-store"});
      } catch (err) {
        console.error(err);
        return new Response(null, { status: 500 });
      }
    }
    return new Response(null, { status: 200 });
  }