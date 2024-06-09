import GitHub from "@auth/core/providers/github";
import { defineConfig } from "auth-astro";
import Keycloak from "@auth/core/providers/keycloak";
import jwtDecode from "jwt-decode";
async function refreshAccessToken(token) {

  const resp = await fetch(`${import.meta.env.REFRESH_TOKEN_URL}`, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: import.meta.env.KEYCLOAK_CLIENT_ID,
      client_secret: import.meta.env.KEYCLOAK_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: token.refresh_token,
    }),
    method: "POST",
  });
 


  const refreshToken = await resp.json();
  if (!resp.ok) throw refreshToken;

  return {
    ...token,
    access_token: refreshToken.access_token,
    id_token: refreshToken.id_token,
    expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
    refresh_token: refreshToken.refresh_token,
  };
  
}

export default defineConfig({
  providers: [
    Keycloak({
      clientId: `${import.meta.env.KEYCLOAK_CLIENT_ID}`,
      clientSecret: `${import.meta.env.KEYCLOAK_CLIENT_SECRET}`,
      issuer: `${import.meta.env.KEYCLOAK_ISSUER}`,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
    // Allows callback URLs on the same origin
    else if (new URL(url).origin === baseUrl) return url
    return baseUrl
    },
    async session({ session, user, token }) {
      session.access_token = token.access_token;
      session.id_token = token.id_token;
      session.error = token.error;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      const nowTimeStamp = Math.floor(Date.now() / 1000);
     
      if (account) {
        token.access_token = account.access_token;
        token.id_token = account.id_token;
        token.expires_at = account.expires_at;
        token.refresh_token = account.refresh_token;
        return token;
      } else if (nowTimeStamp < token.expires_at) {
        // token has not expired yet, return it
        return token;
      } else {
        try {
          const refreshedToken = await refreshAccessToken(token);
          return refreshedToken;
        } catch (error) {
          console.error("Error refreshing access token", error);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
    },
  },
});
