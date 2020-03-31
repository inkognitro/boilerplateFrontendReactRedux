import {ToasterEventTypes} from "Common/Toaster/Domain/Types";
import {Event} from "Common/Bootstrap/Event";

export function createMessageWasAddedToPipeline(messageId: string): MessageWasRemoved {
    return {
        type: ToasterEventTypes.MESSAGE_WAS_REMOVED,
        payload: {
            messageId: messageId,
        }
    };
}

export type MessageWasRemoved = Event<ToasterEventTypes.MESSAGE_WAS_REMOVED, {
    messageId: string,
}>;