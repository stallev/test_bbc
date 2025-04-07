import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "@/ui/components/ui-kit";
import SermonCard from "../SermonCard/SermonCard";
import { RenderingSermonCardDataType } from "@/types/WPDataTypes/SermonPostsDataTypes";

import styles from "./styles/sermon-cards-list.module.scss";

import { SermonCardsListProps } from "./types";

const SermonCardsList: React.FC<SermonCardsListProps> = ({
  data,
  fetchMoreData,
  hasMore,
}) => {
  return (
    <InfiniteScroll
      className={styles["sermon-cards-list"]}
      dataLength={data.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<Loader />}
    >
      {data.map((item: RenderingSermonCardDataType) => (
        <SermonCard key={item.sermonAudio} data={item} />
      ))}
    </InfiniteScroll>
  );
};

export default SermonCardsList;
