import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";

import { env } from "~/env";
import { db } from "~/server/db";

export type { Session } from "next-auth";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

const useSecureCookies = env.VERCEL_ENV === "production";
const cookiePrefix = useSecureCookies ? "__Secure-" : "";
const cookieDomain = useSecureCookies ? "lendr.obifortune.com" : undefined;

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        domain: cookieDomain,
        secure: useSecureCookies,
      },
    },
  },
  callbacks: {
    session: (opts) => {
      if (!("user" in opts)) throw "unreachable with session strategy";

      return {
        ...opts.session,
        user: { ...opts.session.user, id: opts.user.id },
      };
    },
  },
  adapter: DrizzleAdapter(db),
  providers: [
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
});
