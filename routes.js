/**
 * an array of routes that are accessible to the public
 * these routes do not require authentication 
 * @type {string[]}
 */

export const publicRoutes = [
    "/"

];


/**
 * an array of routes that are accessible to the public
 * these routes will redirect logged in users to /settings 
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
];

/**
 * an array of routes that are accessible to the public
 * these routes do not require authentication 
 * @type {string[]}
 */
export const apiAuthPrefix = "/api/auth";


