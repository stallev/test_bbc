import { DOMAIN_NAME } from '@/constants/EndpointsList';
import { i18n, Locale } from '@/i18n.config';
import styles from '@/styles/pages/staff.module.scss';
import StaffList from '@/ui/components/page-specific/staff/StaffList/StaffList';
import { Text } from '@/ui/components/ui-kit';
import Container from '@/ui/containers/Container/Container';
import { getTranslations } from '@/utils/languageParser';

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({
    locale,
  }));
}

export default async function PastorsPage(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;
  const pastors = await fetch(`${DOMAIN_NAME}/api/word/${params.locale}/pastors/`);
  if (!pastors.ok) {
    throw new Error(`Failed to fetch pastors data}`);
  }
  const pastorsData = await pastors.json();
  const translations = getTranslations(params.locale);

  return (
    <>
      <Container>
        <Text textType="h1" className={styles.staff__title}>
          {pastorsData.title}
        </Text>
      </Container>

      <Container isNarrowContent>
        <StaffList translations={translations} data={pastorsData.data} isDetailed />
      </Container>
    </>
  );
}
