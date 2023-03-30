import translations from '@/lib/translations.json';

export const __ = (key: string, replace?: Record<string, unknown>): string => {
  let translatedText: string = translations[key as keyof typeof translations] || key;
  for (const key in replace) {
    const replacedText = String(replace[key as keyof typeof replace]);
    translatedText = translatedText.replace(`:${key}`, replacedText);
  }
  return translatedText;
}
