// MinistryPageWrapper.tsx
'use client';

import { useEffect, useState } from 'react';
import { getMinistryData } from '@/app/actions/ministryDataActions';
import { PostParams } from '@/types/postTypes';
import { MinistryConvertedDataType } from '@/types/WPDataTypes/MinistryWPDataTypes';
import { getTranslations } from '@/utils/languageParser';
import MinistryPageContent from '../MinistryPageContent/MinistryPageContent';

export default function MinistryPageWrapper({ postSlug, locale }: PostParams) {
  const [data, setData] = useState<MinistryConvertedDataType | null>(null);
  const [loading, setLoading] = useState(true);

  const translations = getTranslations(locale);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMinistryData(postSlug, locale);
        setData(res);
      } catch (error) {
        console.error('Ошибка при загрузке данных министерства:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [postSlug, locale]);

  if (loading) {
    return (
      <div>
        {/* Скелетоны */}
        <div style={{ height: '40px', width: '200px', background: '#ccc', marginBottom: '1rem' }} />
        <div style={{ height: '300px', width: '100%', background: '#ddd' }} />
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <MinistryPageContent ministryInfoData={data.ministryInfoData} translations={translations} />
  );
}
