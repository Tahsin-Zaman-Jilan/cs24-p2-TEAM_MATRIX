import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import {
  DEFAULT_LOGIN_REDIRECT,
  authRoutes,
  publicRoutes,
  apiAuthPrefix,
} from "./config/routes";

// This function can be marked `async` if using `await` inside
export default withAuth(
  async function middleware(req) {
    // const { nextUrl } = req;

    // const isLoggedIn = !!req.nextauth.token;

    // const isApiAuthRoute = apiAuthPrefix.includes(nextUrl.pathname);

    // const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

    // const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    // if (isApiAuthRoute) {
    //   return null;
    // }

    // if (isAuthRoute) {
    //   if (isLoggedIn) {
    //     return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    //   }

    //   return null;
    // }

    // if (!isLoggedIn && !isPublicRoute) {
    //   return NextResponse.redirect(new URL("/auth/signin", nextUrl));
    // }

    return null;
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  },
);

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
