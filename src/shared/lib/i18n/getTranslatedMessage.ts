import type { MessageKey, LanguageCode } from '@/shared/types/message'
import { messages, defaultLanguage } from '@/shared/config/i18n/messages'

/**
 * @function getPreferredLanguage
 * @description Parses the Accept-Language header and returns the preferred language supported by the application.
 * @param header The Accept-Language header string.
 * @returns The preferred supported language code, or the default language.
 */
const getPreferredLanguage = (
  header: string | null | undefined
): LanguageCode => {
  if (!header) {
    return defaultLanguage
  }

  const languages = header
    .split(',')
    .map(lang => {
      const parts = lang.trim().split(';')
      const code = parts[0].split('-')[0].toLowerCase() // Get base language code (e.g., 'en' from 'en-US')
      const quality = parts[1] ? parseFloat(parts[1].split('=')[1]) : 1.0
      return { code, quality }
    })
    .sort((a, b) => b.quality - a.quality)

  for (const lang of languages) {
    if (messages[lang.code as LanguageCode]) {
      return lang.code as LanguageCode
    }
  }

  return defaultLanguage
}

/**
 * @function getTranslatedMessage
 * @description Gets a translated message based on the Accept-Language header.
 * @param acceptLanguageHeader The Accept-Language header string.
 * @param messageKey The key of the message to retrieve (must be a string key of the Messages interface).
 * @param params Optional parameters to replace in the message string.
 * @returns The translated message string.
 */
export const getTranslatedMessage = (
  acceptLanguageHeader: string | null | undefined,
  messageKey: MessageKey,
  params?: Record<string, string>
): string => {
  const lang = getPreferredLanguage(acceptLanguageHeader)
  let message =
    messages[lang]?.[messageKey] || messages[defaultLanguage][messageKey]

  if (!message) {
    console.warn(
      `Translation key '${String(
        messageKey
      )}' not found for language '${lang}' or default '${defaultLanguage}'.`
    )
    message = `Missing translation for: ${String(messageKey)}`
  }

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      message = message.replace(`{${key}}`, value)
    })
  }

  return message
}
