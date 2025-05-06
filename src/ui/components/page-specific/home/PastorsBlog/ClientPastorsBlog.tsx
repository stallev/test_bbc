'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

import { Locale } from '@/i18n.config';
import { ClientSectionProps } from '@/types/globalTypes';
import { BlogCardProps } from '@/ui/components/page-specific/blog/BlogCard/types';
import { Loader } from '@/ui/components/ui-kit';

const PastorsBlog = dynamic(
  () => import('@/ui/components/page-specific/home/PastorsBlog/PastorsBlog'),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

const ClientPastorsBlog = ({ locale, translations }: ClientSectionProps) => {
  const [data, setData] = useState<BlogCardProps[] | null>(null);

  const getPastorsBlogData = async (locale: Locale) =>
    import('@/services/BlogDataApi').then(module =>
      module.default.getLastPostsDataHomePageByLang(locale)
    );

  useEffect(() => {
    getPastorsBlogData(locale).then(setData);
  }, [locale]);

  if (!data) return <Loader />;

  return <PastorsBlog data={data} translations={translations} />;
};

export default ClientPastorsBlog;
