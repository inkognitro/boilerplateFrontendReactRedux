import {Middleware} from 'redux';
import {handleOpenUrl} from "Common/RoutingWIP/Domain/Commands/OpenUrl";
import {handleReplaceCurrentUrl} from "Common/RoutingWIP/Domain/Commands/ReplaceCurrentUrl";

export enum CommandActionTypes {
    ADD_ROUTE_DEFINITION = 'ADD_ROUTE_DEFINITION-11b86ff0-39f3-4bbd-8cbb-e15c84639a44',
    OPEN_URL = 'OPEN_URL-11b86ff0-39f3-4bbd-8cbb-e15c84639a44',
    REPLACE_CURRENT_URL = 'REPLACE_CURRENT_URL-11b86ff0-39f3-4bbd-8cbb-e15c84639a44',
}

export function createRoutingMiddleware(historyManager: HistoryManager): Middleware {
    historyManager.addCurrentRouteUrlWasChangedListener((url: string) => {
        console.log('url was changed to ' + url); //todo: dispatch event
    });
    return _ => next => action => {
        if (!action) {
            return;
        }

        if(action.type === CommandActionTypes.OPEN_URL) {
            handleOpenUrl(action.payload);
            return;
        }

        if(action.type === CommandActionTypes.REPLACE_CURRENT_URL) {
            handleReplaceCurrentUrl(action.payload);
            return;
        }

        return next(action);
    };
}

export interface HistoryManager {
    setCurrentRouteUrl(routeUrl: string): void
    replaceCurrentRouteUrl(routeUrl: string): void
    addCurrentRouteUrlWasChangedListener(onChangeCurrentRouteUrl: (url: string) => void): void
}