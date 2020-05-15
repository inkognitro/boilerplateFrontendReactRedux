import { FormElementStateWasChanged } from "Common/Domain/FormUtils/FormElements/Event/FormElementStateWasChanged";
import { FormElementStatesWereChanged } from "Common/Domain/FormUtils/FormElements/Event/FormElementStatesWereChanged";

export enum FormElementCommandTypes {
    CHANGE_FORM_ELEMENT_STATE = 'CHANGE_FORM_ELEMENT_STATE-1d8df24a-9de9-49c5-bcdc-659b5d4267e7',
    CHANGE_FORM_ELEMENT_STATES = 'CHANGE_FORM_ELEMENT_STATES-1d8df24a-9de9-49c5-bcdc-659b5d4267e7',
}

export enum FormElementEventTypes {
    FORM_ELEMENT_STATE_WAS_CHANGED = 'FORM_ELEMENT_STATE_WAS_CHANGED-beeac545-1968-4751-bb8d-4518e5536e66',
    FORM_ELEMENT_STATES_WERE_CHANGED = 'FORM_ELEMENT_STATES_WERE_CHANGED-beeac545-1968-4751-bb8d-4518e5536e66',
}

export enum FormElementTypes {
    TEXT = 'text',
    EMAIL = 'email',
    PASSWORD = "password",
}

export type Message = {
    id: string;
    type: MessageTypes;
    content: string;
};

export enum MessageTypes {
    ERROR = "error",
}

export interface BasicFormElementState {
    id: string
    type: FormElementTypes
    readOnly: boolean
}

export type InputFieldState<FormElementType = string> = (BasicFormElementState & {
    type: FormElementType
    value: string,
    messages: Message[]
});

export type TextFieldState = InputFieldState<FormElementTypes.TEXT>;
export type EmailFieldState = InputFieldState<FormElementTypes.EMAIL>;
export type PasswordFieldState = InputFieldState<FormElementTypes.PASSWORD>;

export type FormElementState = (TextFieldState | EmailFieldState | PasswordFieldState);

export type FormElementStateChanges = { formElement: FormElementState, stateChanges: Partial<FormElementState> };
export type FormElementEvent = (FormElementStateWasChanged | FormElementStatesWereChanged);
