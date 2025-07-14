import StaffDataApi from '@/services/StaffDataApi';
import styles from '@/styles/pages/staff-person.module.scss';
import { PostParams } from '@/types/postTypes';
import StructuredMarkdownContent from '@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent';
import { Text, CustomImage } from '@/ui/components/ui-kit';
import Container from '@/ui/containers/Container/Container';

export async function generateStaticParams() {
  return [];
}

export const revalidate = 60;

export default async function StaffPerson(props: { params: Promise<PostParams> }) {
  const params = await props.params;
  const postData = await StaffDataApi.getMinisterItemDataBySlug(params.postSlug, params.locale);

  if (!postData) {
    return <div>Error loading data.</div>;
  }

  return (
    <Container>
      <div className={styles['staff-person__header']}>
        <div className={styles['staff-person__image-container']}>
          {postData.featuredImage && (
            <CustomImage
              imageURL={postData.featuredImage}
              className={styles['staff-person__image']}
              priority={true}
              sizes="30vw"
            />
          )}
        </div>
        <div className={styles['staff-person__info']}>
          <Text textType="h1" className={styles['staff-person__name']}>
            {postData.title}
          </Text>

          <Text textType="span" className={styles['staff-person__position']}>
            {postData.pastorPosition}
          </Text>
        </div>
      </div>

      <StructuredMarkdownContent
        content={postData.content}
        className={styles['staff-person__structured-content']}
        isFontSizeResizable={false}
      />
    </Container>
  );
}
