type Route = {
    routerUrl: string,
};

export const homeRoute: Route = {
    routerUrl: '/',
};
export const createHomeRouteUrl = (): string => {
    return homeRoute.routerUrl;
};

export const loginRoute: Route = {
    routerUrl: '/auth/login',
};
export const createLoginRouteUrl = (): string => {
    return loginRoute.routerUrl;
};

export const passwordForgottenRoute: Route = {
    routerUrl: '/auth/pwforgotten',
};
export const createPasswordForgottenUrl = (): string => {
    return passwordForgottenRoute.routerUrl;
};