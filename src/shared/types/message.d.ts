/**
 * @interface Messages
 * @description Interface for the messages.
 */
export interface Messages {
  welcome: string
  internalServerError: string
}

/**
 * @type {LanguageCode}
 * @description Type for the language codes.
 */
export type LanguageCode =
  | 'en'
  | 'es'
  | 'zh'
  | 'hi'
  | 'pt'
  | 'bn'
  | 'ru'
  | 'ja'
  | 'pa'
  | 'vi'
  | 'tr'
  | 'ar'
  | 'mr'
  | 'te'
  | 'ko'
  | 'ta'
  | 'ur'
  | 'de'
  | 'id'
  | 'fr'
  | 'jv'
  | 'fa'
  | 'it'
  | 'ha'
  | 'gu'
  | 'bho'
  | 'th'
  | 'nl'
  | 'yo'
  | 'uk'

/**
 * @type {MessageKey}
 * @description Type for the message keys.
 */
export type MessageKey = Extract<keyof Messages, string>
