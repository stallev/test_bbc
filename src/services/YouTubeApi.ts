import { YouTubeVideoStatuses } from "@/constants";

class YouTubeApiService {
  static async getVideoItemsData(videoId: string[], apiKey: string) {
    const url: string = `https://youtube.googleapis.com/youtube/v3/videos?part=liveStreamingDetails,snippet&id=${videoId}&key=${apiKey}`;

    const response = await fetch(url);
    const { items } = await response.json();

    return items;
  }
  static async getAllYouTubePlaylistItems(playlistId: string, apiKey: string) {
    const allVideos = [];
    const upcoming: any[] = [];
    const liveVideos: any[] = [];
    const finishedVideos: any[] = [];

    let nextPageToken = null;

    do {
      const url:string = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&key=${apiKey}&maxResults=50${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;

      const response = await fetch(url);
      const data = await response.json();

      const videosList = data.items
        .filter((item: any) => item.snippet.title !== YouTubeVideoStatuses.deleted)
        .map((playlistItem: any) => ({
          title: playlistItem.snippet.title,
          id: playlistItem.contentDetails.videoId,
          url: `https://youtube.com/watch?v=${playlistItem.contentDetails.videoId}`,
        }));
      const videoListIds = videosList.map((item: any) => item.id);
      const videoItemsData = await this.getVideoItemsData(videoListIds, apiKey);
      
      videoItemsData.map((item: any) => {
        switch(item.snippet.liveBroadcastContent) {
          case 'live':
            return liveVideos.push({
              id: item.id,
              title: item.snippet.title,
              url: `https://youtube.com/watch?v=${item.id}`,
              actualStartTime: item.liveStreamingDetails.actualStartTime,
              status: item.snippet.liveBroadcastContent,
            })
          case 'upcoming':
            return upcoming.push({
              id: item.id,
              title: item.snippet.title,
              url: `https://youtube.com/watch?v=${item.id}`,
              scheduledStartTime: item?.liveStreamingDetails?.scheduledStartTime,
              status: item.snippet.liveBroadcastContent,
            })
          case 'none':
            return finishedVideos.push({
              id: item.id,
              title: item.snippet.title,
              url: `https://youtube.com/watch?v=${item.id}`,
              status: item.snippet.liveBroadcastContent,
              publishedAt: item.snippet?.publishedAt,
            })
        }
      })

      allVideos.push(...videosList);

      nextPageToken = data.nextPageToken;

    } while (nextPageToken);

    const currentTimestamp = new Date().getTime();

    const upcomingVideos = upcoming
      .filter((item) => !!item.scheduledStartTime)
      .filter((item) => new Date(item.scheduledStartTime).getTime() > currentTimestamp)
      .sort((a, b) =>
        (new Date(a.scheduledStartTime).getTime() - new Date(b.scheduledStartTime).getTime())
      );

    return {
      finishedVideos,
      liveVideos,
      upcomingVideos,
    };
  }

  static async getPortionYouTubePlaylistItems(playlistId: string, apiKey: string) {
    const url:string = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&key=${apiKey}&maxResults=50`;

    const response = await fetch(url);
    const data = await response.json();

    return data.items
      .filter((item: any) => item.snippet.title !== YouTubeVideoStatuses.deleted)
      .map((playlistItem: any) => ({
        title: playlistItem.snippet.title,
        id: playlistItem.contentDetails.videoId,
        url: `https://youtube.com/watch?v=${playlistItem.contentDetails.videoId}`,
        full: playlistItem,
      }));
  }
}

export default YouTubeApiService;
