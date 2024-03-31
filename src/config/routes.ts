/**
 * An array of public routes. These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/", "/dashboard"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /dashboard
 * @type {string[]}
 */
export const authRoutes = ["/auth/signin", "/auth/signup"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication process
 * @type {string[]}
 */
export const apiAuthPrefix = ["/api/auth", "/api/users"];

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
