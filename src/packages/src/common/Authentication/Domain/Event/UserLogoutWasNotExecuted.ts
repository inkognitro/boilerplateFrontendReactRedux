import { Event } from "packages/entity/common-types";
import { AuthEventTypes } from "./Types";

export function createUserLogoutWasNotExecuted(logoutId: string): UserLogoutWasNotExecuted {
    return {
        type: AuthEventTypes.USER_LOGOUT_WAS_NOT_EXECUTED,
        payload: { logoutId },
    };
}

export type UserLogoutWasNotExecuted = Event<AuthEventTypes.USER_LOGOUT_WAS_NOT_EXECUTED, {
    logoutId: string;
}>;