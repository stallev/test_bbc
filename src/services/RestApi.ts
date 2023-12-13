import { EndpointsList } from "@/constants";

class RestApiService {
  static async getPageData(id: string) {
    const response = await fetch(`${EndpointsList.PagesStandartRestEndpoint}${id}`);
    const { complex:data } = await response.json();

    return data;
  }

  static async getYouTubePlaylistItems(playlistId: string) {
    const apiKey = process.env.YOUTUBE_API_KEY;

    const allVideos = [];
    let nextPageToken = null;

    do {
      const url:string = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&key=${apiKey}&maxResults=50${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;

      const response = await fetch(url);
      const data = await response.json();

      const videosList = data.items.map((playlistItem: any) => ({
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
}

export default RestApiService;
