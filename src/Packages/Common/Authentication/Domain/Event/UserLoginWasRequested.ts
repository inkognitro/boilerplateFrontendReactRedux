import { AuthEventTypes } from "Packages/Common/Authentication/Domain/Types";
import {Event} from "Packages/Common/CommonTypes";

export function createUserLoginWasStarted(
    payload: Payload,
): UserLoginWasRequested {
    return {
        type: AuthEventTypes.USER_LOGIN_WAS_REQUESTED,
        payload,
    };
}

export type UserLoginWasRequested = Event<
  AuthEventTypes.USER_LOGIN_WAS_REQUESTED,
  Payload
>;

type Payload = {
  username: string;
  password: string;
};
