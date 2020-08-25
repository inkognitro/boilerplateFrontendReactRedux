import { Event } from "packages/entity/common-types";
import { Request } from "../Types";
import { HttpEventTypes } from "./Types";

export function createHttpRequestWasCancelled(
    request: Request,
): HttpRequestWasCancelled {
    return {
        type: HttpEventTypes.HTTP_REQUEST_WAS_CANCELLED,
        payload: { request },
    };
}

export type HttpRequestWasCancelled = Event<
  HttpEventTypes.HTTP_REQUEST_WAS_CANCELLED,
  {
    request: Request;
  }
>;