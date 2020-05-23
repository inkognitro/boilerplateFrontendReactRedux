import { Translation } from "Packages/Common/CommonTypes";
import {
    MessageOutroAnimationWasStarted,
    MessagesWereAddedToToast,
    MessageIntroAnimationsWereFinished,
    MessageWasAddedToPipeline,
    MessageWasRemoved,
    ToastIntroAnimationWasFinished,
    ToastOutroAnimationWasStarted,
    ToastWasAdded,
    ToastWasRemoved,
} from "Packages/Common/Toaster";

export enum ToastTypes {
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
}

export type MessageToAdd = {
  toastType: ToastTypes;
  mustBeShownInSeparateToast: boolean;
  message: Message;
};

export type Message = {
  id: string;
  canBeClosedManually: boolean;
  automaticCloseDelayInMs: null | number;
  content: Translation;
  isIntroAnimationRunning?: boolean;
  isOutroAnimationRunning?: boolean;
};

export type Toast = {
  id: string;
  type: ToastTypes;
  messages: Message[];
  isIntroAnimationRunning?: boolean;
  isOutroAnimationRunning?: boolean;
};

export enum ToasterEventTypes {
  MESSAGE_INTRO_ANIMATIONS_WERE_FINISHED = "MESSAGE_INTRO_ANIMATIONS_WERE_FINISHED-8266728a-7572-48cb-9ff4-2e27071e1343",
  MESSAGE_OUTRO_ANIMATION_WAS_STARTED = "MESSAGE_OUTRO_ANIMATION_WAS_STARTED-8266728a-7572-48cb-9ff4-2e27071e1343",
  MESSAGES_WERE_ADDED_TO_TOAST = "MESSAGES_WERE_ADDED_TO_TOAST-8266728a-7572-48cb-9ff4-2e27071e1343",
  MESSAGE_WAS_ADDED_TO_PIPELINE = "MESSAGE_WAS_ADDED_TO_PIPELINE-8266728a-7572-48cb-9ff4-2e27071e1343",
  MESSAGE_WAS_REMOVED = "MESSAGE_WAS_REMOVED-8266728a-7572-48cb-9ff4-2e27071e1343",
  TOAST_INTRO_ANIMATION_WAS_FINISHED = "TOAST_INTRO_ANIMATION_WAS_FINISHED-8266728a-7572-48cb-9ff4-2e27071e1343",
  TOAST_OUTRO_ANIMATION_WAS_STARTED = "TOAST_OUTRO_ANIMATION_WAS_STARTED-8266728a-7572-48cb-9ff4-2e27071e1343",
  TOAST_WAS_ADDED = "TOAST_WAS_ADDED-8266728a-7572-48cb-9ff4-2e27071e1343",
  TOAST_WAS_REMOVED = "TOAST_WAS_REMOVED-8266728a-7572-48cb-9ff4-2e27071e1343",
}

export type ToasterEvent =
  | MessageIntroAnimationsWereFinished
  | MessageOutroAnimationWasStarted
  | MessagesWereAddedToToast
  | MessageWasAddedToPipeline
  | MessageWasRemoved
  | ToastIntroAnimationWasFinished
  | ToastOutroAnimationWasStarted
  | ToastWasAdded
  | ToastWasRemoved;

export type ToasterState = {
  messagesToAdd: MessageToAdd[];
  toasts: Toast[];
};

export type ToasterStateSelector<State = any> = (state: State) => ToasterState;

export enum ToasterCommandTypes {
  SHOW_MESSAGE = "SHOW_MESSAGE-8266728a-7572-48cb-9ff4-2e27071e1343",
  REMOVE_MESSAGE = "REMOVE_MESSAGE-8266728a-7572-48cb-9ff4-2e27071e1343",
}
