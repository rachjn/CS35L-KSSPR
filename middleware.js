import NextAuth from "next-auth"; 
import authConfig from "@/auth.config";
import { 
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix, 
    authRoutes,
    publicRoutes
} from "@/routes"; 


const {auth } = NextAuth(authConfig);

export default auth((req) => {
    // // req.auth
    // const isLoggedIn = !!req.auth; 
    // console.log("ROUTE: ", req.nextUrl.pathname);
    // console.log("IS LOGGEDIN: ", isLoggedIn); 

    const {nextUrl} = req; 
    const isLoggedIn = !!req.auth; 

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);  
    const isAuthRoute = authRoutes.includes(nextUrl.pathname); 

    //allow every single api route 
    if (isApiAuthRoute){
        return null; 
    }

    // check auth route 
    if (isAuthRoute){
        if (isLoggedIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return null; 
    }

    if (!isLoggedIn && !isPublicRoute){
        return Response.redirect(new URL("/auth/login", nextUrl)); 
        //redirect user to login page 
    }

    return null; 
});



export const config = {
    matcher: [
        '/((?!.+\\.[\\w]+$|_next).*)', '/', '/api|trpc)(.*)'
    ],
}
//regex meaning: 
// All application routes included except:
//  Static files (e.g., .js, .css, .jpg).
//  Next.js internal paths like _next.
// Specific paths:
//  The homepage (/).
//  Routes under /api and /trpc.