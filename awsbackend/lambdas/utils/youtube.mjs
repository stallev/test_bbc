import axios from 'axios';
import { YouTubePlaylistIDs, YouTubeApiKeys } from '../constants/youtubeConstants.mjs';

export const getLatestPlaylistItems = async () => {
  const url = `https://www.googleapis.com/youtube/v3/playlistItems`;

  try {
    const {
      data: { items },
    } = await axios.get(url, {
      params: {
        part: 'snippet,contentDetails',
        playlistId: YouTubePlaylistIDs.myStream,
        key: YouTubeApiKeys.alexander,
        maxResults: 10,
      },
    });

    const itemsList = items.map(item => ({
      id: item.id,
      title: item.snippet.title,
    }));
    console.log('itemsList:', itemsList);

    return itemsList;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};
