import { FormattedPostDateProps } from '@/types/postTypes';
import { getShortMonthFormattedDate } from '@/utils/dateFormatter';

export const getFormattedPostDate = (
  dateString: string,
  locale: string
): FormattedPostDateProps => {
  const date = new Date(dateString);

  return {
    postDateFormattedValue: getShortMonthFormattedDate(dateString, locale),
    timestamp: date.getTime(),
    year: date.getFullYear().toString(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
};
