'use server';

import MinistryDataApi from '@/services/MinistryDataApi';
import { MinistryConvertedDataType } from '@/types/WPDataTypes/MinistryWPDataTypes';

/**
 * Server Action для получения данных о министерстве
 * @param postSlug - слаг министерства
 * @param locale - локаль
 * @returns Данные о министерстве
 */
export async function getMinistryData(
  postSlug: string,
  locale: string
): Promise<MinistryConvertedDataType> {
  return await MinistryDataApi.getMinistryPageData(postSlug, locale);
}
