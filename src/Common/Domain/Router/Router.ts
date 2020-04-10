import {RouterStateSelector} from "Common/Domain/Router/Types";
import {put, call, spawn} from "@redux-saga/core/effects";
import {HistoryManager} from "Common/Domain/Router/HistoryManager";
import {createWatchOpenUrlSaga} from "Common/Domain/Router/Commands/OpenUrl";
import {createRouterWasInitialized} from "Common/Domain/Router/Event/RouterWasInitialized";
import {createCurrentUrlWasChanged} from "Common/Domain/Router/Event/CurrentUrlWasChanged";
import {createWatchExtendRouterSaga} from "Common/Domain/Router/Commands/ExtendRouter";

export enum RouterCommandTypes {
    OPEN_URL = 'OPEN_URL-33ca8d0f-20f8-439e-b34f-fdd6859316c4',
    EXTEND_ROUTER = 'EXTEND_ROUTER-33ca8d0f-20f8-439e-b34f-fdd6859316c4',
}

export function createRouterSaga(
    routerStateSelector: RouterStateSelector,
    historyManager: HistoryManager
): () => Generator {
    const watchCurrentUrlChange = function* (): Generator {
        while(true) {
            const url = yield call(historyManager.getOnChangeCurrentUrlPromise);
            //@ts-ignore
            put(createCurrentUrlWasChanged(url));
        }
    };
    const initializeRouterSaga = function* (): Generator {
        yield put(createRouterWasInitialized(historyManager.getCurrentUrl()));
    };
    return function* routerSaga() {
        yield call(initializeRouterSaga);
        yield spawn(watchCurrentUrlChange);
        yield spawn(createWatchOpenUrlSaga(routerStateSelector, historyManager));
        yield spawn(createWatchExtendRouterSaga(routerStateSelector));
    }
}