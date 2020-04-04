import {CurrentUrlWasChanged} from "Common/Router/Domain/Event/CurrentUrlWasChanged";
import {RouterWasExtended} from "Common/Router/Domain/Event/RouterWasExtended";
import {RouterWasInitialized} from "Common/Router/Domain/Event/RouterWasInitialized";

export type RouterState = {
    redirects: Redirect[],
    routes: Route[],
};

export type Redirect = {
    fromRoute: Route,
    toUrl: string,
};

export type Route = {
    urlSchema: string,
    urlMustMatchExactly: boolean,
};

export enum RouterEventTypes {
    ROUTER_WAS_INITIALIZED = 'ROUTER_WAS_INITIALIZED-6c0f7c81-d248-45a0-9813-187c90e42254',
    CURRENT_URL_WAS_CHANGED = 'CURRENT_URL_WAS_CHANGED-6c0f7c81-d248-45a0-9813-187c90e42254',
    ROUTER_WAS_EXTENDED = 'ROUTER_WAS_EXTENDED-6c0f7c81-d248-45a0-9813-187c90e42254',
}

export type RouterStateSelector<State = any> = (state: State) => RouterState

export type RouterEvent = (RouterWasInitialized | CurrentUrlWasChanged | RouterWasExtended);