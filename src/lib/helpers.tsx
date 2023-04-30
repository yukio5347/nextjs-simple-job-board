import translations from '@/lib/translations.json';

export const __ = (key: string, replace?: Record<string, unknown>): string => {
  let translatedText: string = translations[key as keyof typeof translations] || key;
  for (const key in replace) {
    const replacedText = String(replace[key as keyof typeof replace]);
    translatedText = translatedText.replace(`:${key}`, replacedText);
  }
  return translatedText;
};

export const nl2br = (str: string): (string | JSX.Element)[] => {
  const regex = /(\r\n|\r|\n)/g;
  return str.split(regex).map((line, index) => (line.match(regex) ? <br key={index} /> : line));
};

export const dateToString = (date: Date): string => {
  return date.toISOString().slice(0, 10);
};

export const addDays = (date: Date, days: number): Date => {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
};

export const getErrorMessage = (error: Error | unknown): string => {
  return error instanceof Error ? error.message : 'Unknown error occurred.. Please reload the page and try again.';
};
