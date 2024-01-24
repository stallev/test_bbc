import { YouTubeVideoStatuses } from "@/constants";

class YouTubeApiService {
  static async getAllYouTubePlaylistItems(playlistId: string, apiKey: string) {
    const allVideos = [];
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

      allVideos.push(...videosList);
      nextPageToken = data.nextPageToken;

    } while (nextPageToken);

    console.log(allVideos);

    return allVideos;
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
