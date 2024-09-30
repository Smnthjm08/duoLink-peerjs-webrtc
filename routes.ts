// An array of routes that are accesssible to the public
//these routes don not require Authentication

export const publicRoutes = ["/"];


// An array of routes that are accesssible to the public
//these routes will redirect logged in users to /settings

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error"
]



//prefix for the api authentication routes
// routes that start with this prefix are used for API authentication purposes
export const apiAuthprefix  = "/api/auth"


//default redirect path after logging in

export const DEFAULT_LOGIN_REDIRECT = "/settings"