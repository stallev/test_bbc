import { getShortMonthFormattedDate } from "@/hooks/useLocaleFormattedDate";
import { FormattedPostDateProps } from "@/types/postTypes";

export const getFormattedPostDate = (dateString: string, locale: string): FormattedPostDateProps => {
  const date = new Date(dateString);

  return {
    postDateFormattedValue: getShortMonthFormattedDate(dateString, locale),
    timestamp: date.getTime(),
    year: date.getFullYear().toString(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
}