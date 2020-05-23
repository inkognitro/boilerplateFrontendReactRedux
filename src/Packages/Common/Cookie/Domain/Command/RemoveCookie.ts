import { CookieCommandTypes } from "Packages/Common/Cookie/Domain/Types";
import { Command } from "Packages/Common/CommonTypes";

export function createRemoveCookie(name: string): RemoveCookie {
    return {
        type: CookieCommandTypes.REMOVE_COOKIE,
        payload: {
            cookieName: name,
        },
    };
}

export type RemoveCookie = Command<
  CookieCommandTypes.REMOVE_COOKIE,
  {
    cookieName: string;
  }
>;
