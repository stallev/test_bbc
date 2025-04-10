import { OurMissionDataProps } from '@/types/WPDataTypes/AboutUsPageDataTypes';
import MarkdownContent from '@/ui/components/MarkdownContent/MarkdownContent';
import { Text } from '@/ui/components/ui-kit';
import Container from '@/ui/containers/Container/Container';

import styles from './styles/mission.module.scss';

const Mission = ({ data }: { data: OurMissionDataProps }) => {
  return (
    <Container>
      <div className={styles.mission}>
        <Text textType="h2" className={styles.mission__title}>
          {data.mission_title}
        </Text>

        <MarkdownContent
          content={data.mission_description}
          className={styles.mission__description}
        />

        <div className={styles.mission__goal}>
          <Text textType="p">{data.mission_goal}</Text>
        </div>
      </div>
    </Container>
  );
};

export default Mission;
