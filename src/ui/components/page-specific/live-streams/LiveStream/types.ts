import { YoutubeConvertedVideoItemType } from '@/types/YouTubeDataTypes';
export interface LiveStreamTypes {
  data: {
    liveVideos: YoutubeConvertedVideoItemType[] | [];
    upcomingVideos: YoutubeConvertedVideoItemType[] | [];
  };
}
