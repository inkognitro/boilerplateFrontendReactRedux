import { Redirect, Route, RouterState } from "../Types";

export function findRedirectByExactRoute(
    state: RouterState,
    route: Route,
): null | Redirect {
    for (const index in state.redirects) {
        const redirect = state.redirects[index];
        if (
            redirect.fromRoute.urlSchema === route.urlSchema
            && redirect.fromRoute.urlMustMatchExactly === route.urlMustMatchExactly
        ) {
            return redirect;
        }
    }
    return null;
}