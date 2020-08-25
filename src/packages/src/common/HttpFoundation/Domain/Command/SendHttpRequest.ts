import { Command } from "packages/entity/common-types";
import { Request } from "../Types";
import { HttpFoundationCommandTypes } from "./Types";

export function createSendHttpRequest(request: Request): SendHttpRequest {
    return {
        type: HttpFoundationCommandTypes.SEND_HTTP_REQUEST,
        payload: { request },
    };
}

export type SendHttpRequest = Command<HttpFoundationCommandTypes.SEND_HTTP_REQUEST, {
    request: Request;
}>;