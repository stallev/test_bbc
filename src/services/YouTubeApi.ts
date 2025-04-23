import { YouTubeVideoStatuses, YouTubeStreamStatus } from '@/constants';
import {
  YoutubePlaylistItemType,
  YoutubeFetchedVideoItemType,
  YoutubeConvertedVideoItemType,
  FetchedVideoItemsList,
  ConvertedYoutubeFetchedVideoItemType,
} from '@/types/YouTubeDataTypes';

class YouTubeApiService {
  static async getVideoItemsData(videoListIds: string[], apiKey: string) {
    const url: string = `https://youtube.googleapis.com/youtube/v3/videos?part=liveStreamingDetails,snippet&id=${videoListIds}&key=${apiKey}`;

    const response = await fetch(url);
    const { items } = await response.json();

    return items;
  }
  static async getAllYouTubePlaylistItems(
    playlistId: string,
    apiKey: string
  ): Promise<FetchedVideoItemsList> {
    const upcoming: ConvertedYoutubeFetchedVideoItemType[] = [];
    const liveVideos: ConvertedYoutubeFetchedVideoItemType[] = [];
    const finishedVideos: ConvertedYoutubeFetchedVideoItemType[] = [];

    let nextPageToken = null;

    do {
      const url: string = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&key=${apiKey}&maxResults=50${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;

      const response = await fetch(url);
      const data = await response.json();

      const videoListIds = data.items
        .filter(
          (item: YoutubePlaylistItemType) => item.snippet.title !== YouTubeVideoStatuses.deleted
        )
        .map((playlistItem: YoutubePlaylistItemType) => playlistItem.contentDetails.videoId);

      const videoItemsData = await this.getVideoItemsData(videoListIds, apiKey);

      videoItemsData.map((item: YoutubeFetchedVideoItemType) => {
        switch (item.snippet.liveBroadcastContent) {
          case 'live':
            return liveVideos.push({
              id: item.id,
              title: item.snippet.title,
              url: `https://youtube.com/watch?v=${item.id}`,
              date: item.liveStreamingDetails.actualStartTime,
              status: YouTubeStreamStatus.live,
            });
          case 'upcoming':
            return upcoming.push({
              id: item.id,
              title: item.snippet.title,
              url: `https://youtube.com/watch?v=${item.id}`,
              date: item?.liveStreamingDetails?.scheduledStartTime,
              status: YouTubeStreamStatus.upcoming,
            });
          case 'none':
            return finishedVideos.push({
              id: item.id,
              title: item.snippet.title,
              url: `https://youtube.com/watch?v=${item.id}`,
              status: YouTubeStreamStatus.finished,
              date: !!item.liveStreamingDetails?.actualStartTime
                ? item.liveStreamingDetails?.actualStartTime
                : item.snippet?.publishedAt,
            });
        }
      });

      nextPageToken = data.nextPageToken;
    } while (nextPageToken);

    const currentTimestamp = new Date().getTime();

    const upcomingVideos = upcoming
      .filter(item => !!item.date)
      .filter(item => new Date(item.date).getTime() > currentTimestamp)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return {
      finishedVideos,
      liveVideos,
      upcomingVideos,
    };
  }

  static async getPortionYouTubeStreamsItems(
    playlistId: string,
    apiKey: string
  ): Promise<FetchedVideoItemsList> {
    const upcoming: YoutubeConvertedVideoItemType[] = [];
    const liveVideos: YoutubeConvertedVideoItemType[] = [];
    const finishedVideos: YoutubeConvertedVideoItemType[] = [];

    const url: string = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&key=${apiKey}&maxResults=10`;

    const response = await fetch(url);
    const data = await response.json();

    const videoListIds = data.items
      .filter(
        (item: YoutubePlaylistItemType) => item.snippet.title !== YouTubeVideoStatuses.deleted
      )
      .map((playlistItem: YoutubePlaylistItemType) => playlistItem.contentDetails.videoId);

    const videoItemsData = await this.getVideoItemsData(videoListIds, apiKey);

    videoItemsData.map((item: YoutubeFetchedVideoItemType) => {
      switch (item.snippet.liveBroadcastContent) {
        case 'live':
          return liveVideos.push({
            id: item.id,
            title: item.snippet.title,
            url: `https://youtube.com/watch?v=${item.id}`,
            date: item.liveStreamingDetails.actualStartTime,
            status: YouTubeStreamStatus.live,
          });
        case 'upcoming':
          return upcoming.push({
            id: item.id,
            title: item.snippet.title,
            url: `https://youtube.com/watch?v=${item.id}`,
            date: item?.liveStreamingDetails?.scheduledStartTime,
            status: YouTubeStreamStatus.upcoming,
          });
        case 'none':
          return finishedVideos.push({
            id: item.id,
            title: item.snippet.title,
            url: `https://youtube.com/watch?v=${item.id}`,
            status: YouTubeStreamStatus.finished,
            date: !!item.liveStreamingDetails?.actualStartTime
              ? item.liveStreamingDetails?.actualStartTime
              : item.snippet?.publishedAt,
          });
      }
    });

    const currentTimestamp = new Date().getTime();

    const upcomingVideos = upcoming
      .filter(item => !!item.date)
      .filter(item => new Date(item.date).getTime() > currentTimestamp)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return {
      finishedVideos,
      liveVideos,
      upcomingVideos,
    };
  }

  static async getPortionYouTubePlaylistItems(playlistId: string, apiKey: string) {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&key=${apiKey}&maxResults=50`;

    const response = await fetch(url);
    const data = await response.json();

    return data.items
      .filter(
        (item: YoutubePlaylistItemType) => item.snippet.title !== YouTubeVideoStatuses.deleted
      )
      .map((playlistItem: YoutubePlaylistItemType) => ({
        title: playlistItem.snippet.title,
        id: playlistItem.contentDetails.videoId,
        url: `https://youtube.com/watch?v=${playlistItem.contentDetails.videoId}`,
        full: playlistItem,
      }));
  }
}

export default YouTubeApiService;
