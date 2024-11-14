import NextAuth from "next-auth";

import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix,authRoutes, publicRoutes } from "./routes";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig)



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default auth((req): any => {

	const { nextUrl } = req;
	const isLoggedIn = !!req.auth;

	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);

	//allow access to api auth routes
	if (isApiAuthRoute) {
		return null
	}

	//redirect to default login redirect if logged in and trying to access an auth route
	if(isAuthRoute) {
		if(isLoggedIn) {
			return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
		}
		return null;
	};

	//redirect to login if not logged in and not a public route
	if (!isLoggedIn && !isPublicRoute) {
		return Response.redirect(new URL("/auth/login", nextUrl))
	};
	//allow access to every other route
	return null;
})

export const config = {
	//invoking middleware for all routes except those that match the regex
	matcher: ['/((?!.+\\.[//w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}