import { YouTubeVideoStatuses, YouTubeStreamStatus } from '@/constants';
import {
  YoutubePlaylistItemType,
  YoutubeFetchedVideoItemType,
  YoutubeConvertedVideoItemType,
  FetchedVideoItemsList,
  ConvertedYoutubeFetchedVideoItemType,
} from '@/types/YouTubeDataTypes';

class YouTubeApiService {
  static async getVideoItemsData(
    videoListIds: string[],
    apiKey: string
  ): Promise<YoutubeFetchedVideoItemType[]> {
    const params = new URLSearchParams({
      part: 'liveStreamingDetails,snippet',
      id: videoListIds.join(','),
      key: apiKey,
    });
    const url: string = `https://youtube.googleapis.com/youtube/v3/videos?${params.toString()}`;

    const response = await fetch(url);
    const { items } = await response.json();

    return items;
  }

  static async fetchAndSortVideoItems(
    upcoming: ConvertedYoutubeFetchedVideoItemType[],
    liveVideos: ConvertedYoutubeFetchedVideoItemType[],
    finishedVideos: ConvertedYoutubeFetchedVideoItemType[],
    url: string,
    apiKey: string
  ) {
    const response = await fetch(url);
    const data = await response.json();

    const videoListIds = data.items
      .filter(
        (item: YoutubePlaylistItemType) => item.snippet.title !== YouTubeVideoStatuses.deleted
      )
      .map((playlistItem: YoutubePlaylistItemType) => playlistItem.contentDetails.videoId);

    const videoItemsData = await this.getVideoItemsData(videoListIds, apiKey);

    videoItemsData.forEach((item: YoutubeFetchedVideoItemType) => {
      switch (item.snippet.liveBroadcastContent) {
        case 'live':
          liveVideos.push({
            id: item.id,
            title: item.snippet.title,
            url: `https://youtube.com/watch?v=${item.id}`,
            date: item.liveStreamingDetails.actualStartTime,
            status: YouTubeStreamStatus.live,
          });
          break;
        case 'upcoming':
          upcoming.push({
            id: item.id,
            title: item.snippet.title,
            url: `https://youtube.com/watch?v=${item.id}`,
            date: item?.liveStreamingDetails?.scheduledStartTime,
            status: YouTubeStreamStatus.upcoming,
          });
          break;
        case 'none':
          finishedVideos.push({
            id: item.id,
            title: item.snippet.title,
            url: `https://youtube.com/watch?v=${item.id}`,
            status: YouTubeStreamStatus.finished,
            date: !!item.liveStreamingDetails?.actualStartTime
              ? item.liveStreamingDetails?.actualStartTime
              : item.snippet?.publishedAt,
          });
          break;
      }
    });

    return data?.nextPageToken ? data.nextPageToken : null;
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
      const url: string = (() => {
        const params = new URLSearchParams({
          part: 'snippet,contentDetails',
          playlistId: playlistId,
          key: apiKey,
          maxResults: '50',
        });

        if (nextPageToken) {
          params.append('pageToken', nextPageToken);
        }

        return `https://www.googleapis.com/youtube/v3/playlistItems?${params.toString()}`;
      })();

      nextPageToken = await this.fetchAndSortVideoItems(
        upcoming,
        liveVideos,
        finishedVideos,
        url,
        apiKey
      );
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

    const params = new URLSearchParams({
      part: 'snippet,contentDetails',
      playlistId,
      key: apiKey,
      maxResults: '50',
    });

    const url = `https://www.googleapis.com/youtube/v3/playlistItems?${params.toString()}`;

    await this.fetchAndSortVideoItems(upcoming, liveVideos, finishedVideos, url, apiKey);

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
    const params = new URLSearchParams({
      part: 'snippet,contentDetails',
      playlistId,
      key: apiKey,
      maxResults: '50',
    });

    const url = `https://www.googleapis.com/youtube/v3/playlistItems?${params.toString()}`;

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
