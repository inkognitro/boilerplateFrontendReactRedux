import {ToasterEventTypes} from "Common/Toaster/Domain/Types";
import {Event} from "Common/Bootstrap/Event";

export function createMessageIntroAnimationsWereFinished(messageId: string): MessageOutroAnimationWasStarted {
    return {
        type: ToasterEventTypes.MESSAGE_OUTRO_ANIMATION_WAS_STARTED,
        payload: {
            messageId: messageId
        }
    };
}

export type MessageOutroAnimationWasStarted = Event<ToasterEventTypes.MESSAGE_OUTRO_ANIMATION_WAS_STARTED, {
    messageId: string,
}>;