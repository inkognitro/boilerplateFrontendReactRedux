import {Event} from 'Common/AppBase/EventBus';
import {LanguageIds, TranslationIdToTranslationMapping, TranslatorEventTypes} from "Common/Translator/Domain/Types";

export function createUILanguageWasSet(
    languageId: LanguageIds,
    translationIdToTranslationMapping: TranslationIdToTranslationMapping
): UILanguageWasSet {
    return {
        type: TranslatorEventTypes.UI_LANGUAGE_WAS_SET,
        payload: {
            languageId: languageId,
            translationIdToTranslationMapping: translationIdToTranslationMapping,
        }
    };
}

export type UILanguageWasSet = Event<TranslatorEventTypes.UI_LANGUAGE_WAS_SET, {
    languageId: LanguageIds,
    translationIdToTranslationMapping: TranslationIdToTranslationMapping,
}>;