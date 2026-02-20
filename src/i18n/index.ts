// ============================================================================
// RoboNorth.ca — Internationalization (i18n) Setup
// ============================================================================
// 
// Multi-language preparation for en-CA (primary) and fr-CA.
// Currently uses English everywhere. To enable French:
// 1. Complete all translations in fr.ts
// 2. Add locale detection (URL prefix or browser language)
// 3. Wrap components with translation context
// ============================================================================

import { en, type TranslationKey } from './en';
import { fr } from './fr';

export type Locale = 'en' | 'fr';
export type Translations = TranslationKey;

const translations: Record<Locale, TranslationKey> = { en, fr };

export function getTranslations(locale: Locale = 'en'): TranslationKey {
  return translations[locale] || translations.en;
}

export const defaultLocale: Locale = 'en';
export const supportedLocales: Locale[] = ['en', 'fr'];

export { en, fr };
