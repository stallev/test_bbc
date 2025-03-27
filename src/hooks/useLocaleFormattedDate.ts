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

export const getDateWithoutTime = (dateString: string): Date => {
  const dateParts = dateString.split('-');
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1;
  const day = parseInt(dateParts[2]);
  
  const date = new Date(year, month, day);
  date.setHours(0, 0, 0, 0);
  
  return date;
}

export const getLocaleFormattedDate = (date: string, locale: string | undefined):string => {
  const options = {
    day: 'numeric' as const,
    month: 'long' as const, 
    year: 'numeric' as const,    
  };
  
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(new Date(date));
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

export const getShortMonthFormattedDate = (dateString:string, locale:string | undefined) => {
  const options = {
    day: 'numeric' as const,
    month: 'short' as const, 
    year: 'numeric' as const,    
  };
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, options);
};

export const getShortMonthWithTimeFormattedDate = (dateString:string, locale:string | undefined) => {
  const options = {
    weekday: 'short' as const, 
    year: 'numeric' as const, 
    month: 'short' as const, 
    day: 'numeric' as const,
    hour: 'numeric' as const,
    minute: 'numeric' as const,
  };
  const date = new Date(dateString);

  return date.toLocaleDateString(locale, options);
};
