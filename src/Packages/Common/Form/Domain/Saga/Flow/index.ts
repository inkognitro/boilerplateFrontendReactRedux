import { spawn, takeEvery } from "@redux-saga/core/effects";
import { FormCommandTypes } from "../../Types";
import { handleSubmitForm } from "./SubmitFormHandling";
import { handleSetFormFieldMessages } from "./SetFormFieldMessagesHandling";

export function createFormSaga(): () => Generator {
    return function* (): Generator {
        yield spawn(watchFormSubmitCommands);
        yield spawn(watchSetFieldMessagesCommands);
    };
}

function* watchFormSubmitCommands(): Generator {
    yield takeEvery(FormCommandTypes.SUBMIT_FORM, handleSubmitForm);
}

function* watchSetFieldMessagesCommands(): Generator {
    yield takeEvery(FormCommandTypes.SET_FORM_FIELD_MESSAGES, handleSetFormFieldMessages);
}
