import {spawn} from "@redux-saga/core/effects";
import {TranslatorStateSelector} from "Common/Domain/Translator/Types";
import {createWatchSetUILanguageSaga} from "Common/Domain/Translator/Command/SetUILanguage";

export enum TranslatorCommandTypes {
    SET_UI_LANGUAGE = 'SET_UI_LANGUAGE-42486f3c-e848-4371-810e-5c55d3cce2a6',
}

export function createTranslatorSaga(translatorStateSelector: TranslatorStateSelector): () => Generator {
    return function* translatorSaga() {
        yield spawn(createWatchSetUILanguageSaga(translatorStateSelector));
    }
}