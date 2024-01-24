export const useLocaleFormattedTime = (date: Date, locale: string):string => {
  const options = { 
    weekday: 'long' as const, 
    year: 'numeric' as const, 
    month: 'long' as const, 
    day: 'numeric' as const,
    hour: 'numeric' as const,
    minute: 'numeric' as const
  };
  
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
}

export const useLocaleFormattedDate = (date: Date, locale: string):string => {
  const options = {
    day: 'numeric' as const,
    month: 'long' as const, 
    year: 'numeric' as const,    
  };
  
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
}

export const getFormattedDate = (dateString:string, locale:string) => {
  const options = {
    day: 'numeric' as const,
    month: 'long' as const, 
    year: 'numeric' as const,    
  };
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, options);
};
