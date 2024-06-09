import type { APIRoute } from "astro";
import { getSession } from "auth-astro/server";

export const POST: APIRoute = async ({ params, request, url }) => {
  const session = await getSession(request);
  const accessToken = session?.access_token;
  const body = await request.json();
  if (session) {
    const data = await fetch(
      `http://localhost:8082/api/v1/admin/games/add`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },

        body: JSON.stringify(body),
      }
    );

    if (data.ok) {
      const json = await data.json();
      return new Response(JSON.stringify(json), { status: 200 });
    }
    return Response.json({ error: await data.text() }, { status: data.status });
  }
  return Response.json({ error: "Unauthorized" }, { status: 401 });
};
