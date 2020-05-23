import {
    Redirect,
    Route,
    RouterCommandTypes,
    RouterState,
    RouterStateSelector,
} from "Packages/Common/Router/Domain/Types";
import { put, select, takeEvery } from "redux-saga/effects";
import { ExtendRouter } from "Packages/Common/Router";
import { findRedirectByExactRoute } from "../../Query/RedirectQuery";
import { findStoredRoute } from "../../Query/RouteQuery";
import { createRouterWasExtended } from "../../Event/RouterWasExtended";

export function* handleExtendRouter(routerStateSelector: RouterStateSelector, command: ExtendRouter): Generator {
    // @ts-ignore
    const routerState: RouterState = yield select(routerStateSelector);
    const redirectsToAdd: Redirect[] = [];
    for (const index in command.payload.redirects) {
        const redirect = command.payload.redirects[index];
        const storedRedirect = findRedirectByExactRoute(
            routerState,
            redirect.fromRoute,
        );
        if (storedRedirect) {
            continue;
        }
        redirectsToAdd.push(redirect);
    }
    const routesToAdd: Route[] = [];
    for (const index in command.payload.routes) {
        const route = command.payload.routes[index];
        const storedRoute = findStoredRoute(routerState, route);
        if (storedRoute) {
            continue;
        }
        routesToAdd.push(route);
    }
    if (redirectsToAdd.length === 0 && routesToAdd.length === 0) {
        return;
    }
    yield put(createRouterWasExtended(routesToAdd, redirectsToAdd));
}

export function* watchExtendRouterCommands(routerStateSelector: RouterStateSelector): Generator {
    yield takeEvery(RouterCommandTypes.EXTEND_ROUTER, handleExtendRouter, routerStateSelector);
}
