import dynamic from 'next/dynamic';
import { Locale } from '@/i18n.config';
import BlogDataApi from '@/services/BlogDataApi';
import StaffDataApi from '@/services/StaffDataApi';
import ministryStyles from '@/styles/pages/ministry.module.scss';
import { getTranslations } from '@/utils/languageParser';

const PastorsBlog = dynamic(
  () => import('@/ui/components/page-specific/home/PastorsBlog/PastorsBlog')
);
const Staff = dynamic(() => import('@/ui/components/page-specific/home/Staff/Staff'));

export default async function MinistryLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const params = await props.params;
  const children = await props.children;
  const { locale } = params;
  const translations = getTranslations(locale);

  const staffData = await StaffDataApi.getMinisters(locale);
  const postsData = await BlogDataApi.getLastPostsDataHomePageByLang(locale);

  return (
    <div className={ministryStyles.ministry}>
      <div>{children}</div>

      <div className={ministryStyles['ministry__layout-content']}>
        <Staff data={staffData} translations={translations} />
        <PastorsBlog data={postsData} translations={translations} />
      </div>
    </div>
  );
}
