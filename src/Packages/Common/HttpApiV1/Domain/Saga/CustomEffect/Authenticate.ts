import { apiV1BaseUrl, ApiV1ReadResponse } from "Packages/Common/HttpApiV1";
import { User } from "Packages/Entity/User";
import { createPostRequest, HttpStatusCodes, Request } from "Packages/Common/HttpFoundation";
import { AuthUser } from "Packages/Common/Authentication";
import { BusinessLogicResult } from "Packages/Common/CommonTypes";
import { executeRequest } from "./InternalRequestHandling";

export type AuthenticateResult = BusinessLogicResult<{
    authUser?: AuthUser
}>;

type AuthSettings = {
    username: string
    password: string
};

type AuthApiResponse = ApiV1ReadResponse<{user: User, token: string}>;

export function* authenticate(settings: AuthSettings): Generator<unknown, AuthenticateResult> {
    const request: Request = createPostRequest({
        url: `${apiV1BaseUrl}/auth/authenticate`,
        body: {
            username: settings.username,
            password: settings.password,
        },
    });
    // @ts-ignore
    const response: (null | AuthApiResponse) = yield executeRequest<AuthApiResponse>(request);
    if (!response) {
        return {
            data: {},
        };
    }
    const result = {
        generalMessages: response.body.generalMessages,
        fieldMessages: response.body.fieldMessages,
    };
    if (response.statusCode === HttpStatusCodes.OK) {
        return {
            ...result,
            data: {
                authUser: {
                    token: response.body.data.token,
                    user: response.body.data.user,
                },
            },
        };
    }
    return {
        ...result,
        data: {},
    };
}
