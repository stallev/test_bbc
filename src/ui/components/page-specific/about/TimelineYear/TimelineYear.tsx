import { TimelineDataItemProps } from '@/types/WPDataTypes/AboutUsPageDataTypes';
import MarkdownContent from '@/ui/components/MarkdownContent/MarkdownContent';
import { CustomImage, Text } from '@/ui/components/ui-kit';
import Container from '@/ui/containers/Container/Container';
import { getBase64BlurData } from '@/utils/getBase64BlurData';

import styles from './styles/timeline-year.module.scss';

const TimelineYear = ({ data }: { data: TimelineDataItemProps }) => {
  const isShortDesripted = !!data.year_desc.length;

  return (
    <>
      <Container>
        <div className={styles['timeline-year']}>
          <div
            className={`${styles['timeline-year__header']}
        ${isShortDesripted ? styles['timeline-year__header--coloured'] : ''}`}
          >
            <Text textType="h2" className={styles['timeline-year__title']}>
              {data.year_title}
            </Text>

            {isShortDesripted && (
              <Text textType="p" className={styles['timeline-year__short-descr']}>
                {data.year_desc}
              </Text>
            )}
          </div>
        </div>
      </Container>

      {data.images.length > 0 && (
        <div className={styles['timeline-year__images']}>
          {data.images.map(async (image, index) => {
            const imageBase64Url = await getBase64BlurData(image.url);

            return (
              <CustomImage
                key={index}
                imageURL={image.url}
                alt={image.alt}
                className={styles['timeline-year__image']}
                placeholder="blur"
                blurDataURL={imageBase64Url}
              />
            );
          })}
        </div>
      )}

      {!!data.year_additional_desc.length && (
        <Container>
          <MarkdownContent
            className={styles['timeline-year__additional-descr']}
            content={data.year_additional_desc}
          />
        </Container>
      )}
    </>
  );
};

export default TimelineYear;
