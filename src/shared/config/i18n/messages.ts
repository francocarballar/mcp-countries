import type { Messages, LanguageCode } from '../../../shared/types/message'

/**
 * @constant messages
 * @description Constant for the messages.
 * @type {Record<LanguageCode, Messages>}
 * @returns {Record<LanguageCode, Messages>} A record of messages for each language.
 */
export const messages: Record<LanguageCode, Messages> = {
  en: {
    // English
    welcome: 'Welcome to the API',
    internalServerError: 'An internal server error occurred.'
  },
  es: {
    // Spanish
    welcome: 'Bienvenido a la API',
    internalServerError: 'Ocurrió un error interno en el servidor.'
  },
  zh: {
    // Chinese (Mandarin Simplified)
    welcome: '欢迎使用 API',
    internalServerError: 'An internal server error occurred.'
  },
  hi: {
    // Hindi
    welcome: 'एपीआई में आपका स्वागत है',
    internalServerError: 'An internal server error occurred.'
  },
  pt: {
    // Portuguese
    welcome: 'Bem-vindo à API',
    internalServerError: 'An internal server error occurred.'
  },
  bn: {
    // Bengali
    welcome: 'এপিআই-এ স্বাগতম',
    internalServerError: 'An internal server error occurred.'
  },
  ru: {
    // Russian
    welcome: 'Добро пожаловать в API',
    internalServerError: 'An internal server error occurred.'
  },
  ja: {
    // Japanese
    welcome: 'APIへようこそ',
    internalServerError: 'An internal server error occurred.'
  },
  pa: {
    // Punjabi (Gurmukhi script as common)
    welcome: 'API ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ',
    internalServerError: 'An internal server error occurred.'
  },
  vi: {
    // Vietnamese
    welcome: 'Chào mừng đến với API',
    internalServerError: 'An internal server error occurred.'
  },
  tr: {
    // Turkish
    welcome: "API'ya hoş geldiniz",
    internalServerError: 'An internal server error occurred.'
  },
  ar: {
    // Arabic (Modern Standard)
    welcome: 'أهلاً بك في واجهة برمجة التطبيقات',
    internalServerError: 'An internal server error occurred.'
  },
  mr: {
    // Marathi
    welcome: 'API मध्ये आपले स्वागत आहे',
    internalServerError: 'An internal server error occurred.'
  },
  te: {
    // Telugu
    welcome: 'APIకి స్వాగతం',
    internalServerError: 'An internal server error occurred.'
  },
  ko: {
    // Korean
    welcome: 'API에 오신 것을 환영합니다',
    internalServerError: 'An internal server error occurred.'
  },
  ta: {
    // Tamil
    welcome: 'APIக்கு வரவேற்கிறோம்',
    internalServerError: 'An internal server error occurred.'
  },
  ur: {
    // Urdu
    welcome: 'API میں خوش آمدید',
    internalServerError: 'An internal server error occurred.'
  },
  de: {
    // German
    welcome: 'Willkommen bei der API',
    internalServerError: 'An internal server error occurred.'
  },
  id: {
    // Indonesian
    welcome: 'Selamat datang di API',
    internalServerError: 'An internal server error occurred.'
  },
  fr: {
    // French
    welcome: "Bienvenue sur l'API",
    internalServerError: 'An internal server error occurred.'
  },
  jv: {
    // Javanese
    welcome: 'Sugeng rawuh ing API',
    internalServerError: 'An internal server error occurred.'
  },
  fa: {
    // Persian (Farsi)
    welcome: 'به API خوش آمدید',
    internalServerError: 'An internal server error occurred.'
  },
  it: {
    // Italian
    welcome: "Benvenuto nell'API",
    internalServerError: 'An internal server error occurred.'
  },
  ha: {
    // Hausa
    welcome: 'Barka da zuwa API',
    internalServerError: 'An internal server error occurred.'
  },
  gu: {
    // Gujarati
    welcome: 'API માં આપનું સ્વાગત છે',
    internalServerError: 'An internal server error occurred.'
  },
  bho: {
    // Bhojpuri
    welcome: 'API में स्वागत बा',
    internalServerError: 'An internal server error occurred.'
  },
  th: {
    // Thai
    welcome: 'ยินดีต้อนรับสู่ API',
    internalServerError: 'An internal server error occurred.'
  },
  nl: {
    // Dutch
    welcome: 'Welkom bij de API',
    internalServerError: 'An internal server error occurred.'
  },
  yo: {
    // Yoruba
    welcome: 'Kaabọ si API',
    internalServerError: 'An internal server error occurred.'
  },
  uk: {
    // Ukrainian
    welcome: 'Ласкаво просимо до API',
    internalServerError: 'An internal server error occurred.'
  }
}

/**
 * @constant defaultLanguage
 * @description Constant for the default language.
 * @type {LanguageCode}
 * @returns {LanguageCode} The default language.
 */
export const defaultLanguage: LanguageCode = 'en'
