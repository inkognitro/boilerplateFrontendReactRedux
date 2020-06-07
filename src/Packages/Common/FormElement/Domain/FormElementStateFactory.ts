import uuidV4 from "uuid/v4";
import {
    CheckboxState,
    EmailFieldState,
    FormElementTypes,
    PasswordFieldState,
    TextFieldState,
} from "./Types";

export function createTextFieldState(partialInitialState: Partial<TextFieldState> = {}): TextFieldState {
    return {
        id: (partialInitialState.id ? partialInitialState.id : uuidV4()),
        value: (partialInitialState.value ? partialInitialState.value : ''),
        readOnly: (partialInitialState.readOnly ? partialInitialState.readOnly : false),
        type: FormElementTypes.TEXT,
        messages: [],
    };
}

type PasswordFieldStateCreationSettings = Partial<Omit<PasswordFieldState, "type">>;
export function createPasswordFieldState(partialInitialState: PasswordFieldStateCreationSettings = {}): PasswordFieldState {
    return {
        id: (partialInitialState.id ? partialInitialState.id : uuidV4()),
        value: (partialInitialState.value ? partialInitialState.value : ''),
        readOnly: (partialInitialState.readOnly ? partialInitialState.readOnly : false),
        type: FormElementTypes.PASSWORD,
        messages: [],
    };
}

type EmailFieldStateCreationSettings = Partial<Omit<EmailFieldState, "type">>;
export function createEmailFieldState(partialInitialState: EmailFieldStateCreationSettings = {}): EmailFieldState {
    return {
        id: (partialInitialState.id ? partialInitialState.id : uuidV4()),
        value: (partialInitialState.value ? partialInitialState.value : ''),
        readOnly: (partialInitialState.readOnly ? partialInitialState.readOnly : false),
        type: FormElementTypes.EMAIL,
        messages: [],
    };
}

type CheckboxStateCreationSettings = Partial<CheckboxState>;
export function createCheckboxState(partialInitialState: CheckboxStateCreationSettings = {}): CheckboxState {
    return {
        id: (partialInitialState.id ? partialInitialState.id : uuidV4()),
        value: (partialInitialState.value ? partialInitialState.value : false),
        readOnly: (partialInitialState.readOnly ? partialInitialState.readOnly : false),
        type: FormElementTypes.CHECKBOX,
        messages: [],
    };
}
