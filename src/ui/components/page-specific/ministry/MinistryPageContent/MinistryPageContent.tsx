import { MinistryInfoDataType } from '@/types/WPDataTypes/MinistryWPDataTypes';
import MinistryInfo from '@/ui/components/page-specific/ministry/MinistryInfo/MinistryInfo';
import StructuredMarkdownContent from '@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent';
import { Text } from '@/ui/components/ui-kit';
import Container from '@/ui/containers/Container/Container';

import styles from './styles/ministry-page-content.module.scss';

interface MinistryPageContentProps {
  ministryInfoData: MinistryInfoDataType;
  translations: Record<string, string>;
}

const MinistryPageContent = ({ ministryInfoData, translations }: MinistryPageContentProps) => {
  return (
    <Container>
      <Text textType="h1" className={styles['ministry-page-content__title']}>
        {ministryInfoData.title}
      </Text>

      <div className={styles['ministry-page-content__info']}>
        <MinistryInfo translations={translations} data={ministryInfoData} />

        {!!ministryInfoData?.pageContent.length && (
          <StructuredMarkdownContent
            isFontSizeResizable={false}
            content={ministryInfoData.pageContent}
          />
        )}
      </div>
    </Container>
  );
};

export default MinistryPageContent;
