import { TimelineDataItemProps } from "@/types/WPDataTypes/AboutUsPageDataTypes";
import TimelineYear from "@/ui/components/page-specific/about/TimelineYear/TimelineYear";

import styles from './styles/timeline.module.scss';

const Timeline = ({ data }: { data: TimelineDataItemProps[] | [] }) => {
  if (!data.length) {
    return null;
  }

  return (
    <div className={styles.timeline}>
      {data.map((item, index) => (
        <TimelineYear key={index} data={item} />
      ))}
    </div>
  );
};

export default Timeline;
