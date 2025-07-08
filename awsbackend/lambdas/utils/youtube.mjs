import axios from 'axios';
import {
  YouTubePlaylistIDs,
  YouTubeStreamStatus,
  YouTubeVideoStatuses,
} from '../constants/youtubeConstants.mjs';

export const getFullListYouTubeItems = async apiKey => {
  const items = await YouTubeApiService.getAllYouTubePlaylistItems(
    YouTubePlaylistIDs.myStream,
    apiKey
  );

  return items;
};

export const get50LatestPlaylistItems = async apiKey => {
  try {
    const itemsList = await YouTubeApiService.getPortionYouTubeStreamsItems(
      YouTubePlaylistIDs.myStream,
      apiKey
    );

    return itemsList;
  } catch (error) {
    console.error('Error in get50LatestPlaylistItems:', error.message);
    throw error;
  }
};

/**
 * Compares two objects containing video lists (finishedVideos, liveVideos, upcomingVideos)
 * @param {object} obj1 - First object with video arrays
 * @param {object} obj2 - Second object with video arrays
 * @returns {boolean} True if objects are identical, false otherwise
 */
export const compareItemsLists = (obj1, obj2) => {
  const keys = ['finishedVideos', 'liveVideos', 'upcomingVideos'];

  // Check if all keys exist and have same lengths
  for (const key of keys) {
    if (!obj1[key] || !obj2[key] || obj1[key].length !== obj2[key].length) {
      return false;
    }
  }

  // Compare each array after sorting by id
  for (const key of keys) {
    const list1 = [...obj1[key]].sort((a, b) => a.id.localeCompare(b.id));
    const list2 = [...obj2[key]].sort((a, b) => a.id.localeCompare(b.id));

    if (
      !list1.every((item, index) => {
        const otherItem = list2[index];
        return (
          item.id === otherItem.id &&
          item.title === otherItem.title &&
          item.url === otherItem.url &&
          item.status === otherItem.status &&
          (item.date || '') === (otherItem.date || '')
        );
      })
    ) {
      return false;
    }
  }

  return true;
};

export const YouTubeApiService = {
  /**
   * Получает данные о видео по их ID
   * @param {string[]} videoListIds - Массив ID видео
   * @param {string} apiKey - Ключ API YouTube
   * @returns {Promise<object[]>} Массив объектов с данными о видео
   */
  async getVideoItemsData(videoListIds, apiKey) {
    try {
      const params = new URLSearchParams({
        part: 'liveStreamingDetails,snippet',
        id: videoListIds.join(','),
        key: apiKey,
      });
      const url = `https://youtube.googleapis.com/youtube/v3/videos?${params.toString()}`;
      const response = await axios.get(url);
      console.log('Fetched video items:', response.data.items.length);
      return response.data.items || [];
    } catch (error) {
      console.error('Error in getVideoItemsData:', error.message);
      throw new Error(`Failed to fetch video items: ${error.message}`);
    }
  },

  /**
   * Извлекает и сортирует видео из плейлиста по категориям (live, upcoming, finished)
   * @param {object[]} upcoming - Массив для предстоящих видео
   * @param {object[]} liveVideos - Массив для live-видео
   * @param {object[]} finishedVideos - Массив для завершенных видео
   * @param {string} url - URL для запроса к YouTube API
   * @param {string} apiKey - Ключ API YouTube
   * @returns {Promise<string|null>} Токен следующей страницы или null
   */
  async fetchAndSortVideoItems(upcoming, liveVideos, finishedVideos, url, apiKey) {
    try {
      const response = await axios.get(url);
      const data = response.data;

      const videoListIds = data.items
        .filter(item => item.snippet.title !== YouTubeVideoStatuses.deleted)
        .map(playlistItem => playlistItem.contentDetails.videoId);

      const videoItemsData = await this.getVideoItemsData(videoListIds, apiKey);

      videoItemsData.forEach(item => {
        switch (item.snippet.liveBroadcastContent) {
          case 'live':
            liveVideos.push({
              id: item.id,
              title: item.snippet.title,
              url: `https://youtube.com/watch?v=${item.id}`,
              date: item.liveStreamingDetails?.actualStartTime,
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
              date: item.liveStreamingDetails?.actualStartTime || item.snippet?.publishedAt,
            });
            break;
        }
      });

      console.log('Processed video items:', {
        live: liveVideos.length,
        upcoming: upcoming.length,
        finished: finishedVideos.length,
      });
      return data?.nextPageToken || null;
    } catch (error) {
      console.error('Error in fetchAndSortVideoItems:', error.message);
      throw new Error(`Failed to fetch and sort video items: ${error.message}`);
    }
  },

  /**
   * Получает все элементы плейлиста, разделяя их на live, upcoming и finished
   * @param {string} playlistId - ID плейлиста YouTube
   * @param {string} apiKey - Ключ API YouTube
   * @returns {Promise<{finishedVideos: object[], liveVideos: object[], upcomingVideos: object[]}>} Объект с массивами видео
   */
  async getAllYouTubePlaylistItems(playlistId, apiKey) {
    const upcoming = [];
    const liveVideos = [];
    const finishedVideos = [];
    let nextPageToken = null;

    try {
      do {
        const params = new URLSearchParams({
          part: 'snippet,contentDetails',
          playlistId,
          key: apiKey,
          maxResults: '50',
        });

        if (nextPageToken) {
          params.append('pageToken', nextPageToken);
        }

        const url = `https://www.googleapis.com/youtube/v3/playlistItems?${params.toString()}`;
        nextPageToken = await this.fetchAndSortVideoItems(
          upcoming,
          liveVideos,
          finishedVideos,
          url,
          apiKey
        );
      } while (nextPageToken);

      const currentTimestamp = Date.now();
      const upcomingVideos = upcoming
        .filter(item => !!item.date)
        .filter(item => new Date(item.date).getTime() > currentTimestamp)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      console.log('Fetched all playlist items:', {
        live: liveVideos.length,
        upcoming: upcomingVideos.length,
        finished: finishedVideos.length,
      });

      return {
        finishedVideos,
        liveVideos,
        upcomingVideos,
      };
    } catch (error) {
      console.error('Error in getAllYouTubePlaylistItems:', error.message);
      throw new Error(`Failed to fetch playlist items: ${error.message}`);
    }
  },

  /**
   * Получает порцию (50 элементов) видео из плейлиста, разделяя их на live, upcoming и finished
   * @param {string} playlistId - ID плейлиста YouTube
   * @param {string} apiKey - Ключ API YouTube
   * @returns {Promise<{finishedVideos: object[], liveVideos: object[], upcomingVideos: object[]}>} Объект с массивами видео
   */
  async getPortionYouTubeStreamsItems(playlistId, apiKey) {
    const upcoming = [];
    const liveVideos = [];
    const finishedVideos = [];

    try {
      const params = new URLSearchParams({
        part: 'snippet,contentDetails',
        playlistId,
        key: apiKey,
        maxResults: '50',
      });

      const url = `https://www.googleapis.com/youtube/v3/playlistItems?${params.toString()}`;
      await this.fetchAndSortVideoItems(upcoming, liveVideos, finishedVideos, url, apiKey);

      const currentTimestamp = Date.now();
      const upcomingVideos = upcoming
        .filter(item => !!item.date)
        .filter(item => new Date(item.date).getTime() > currentTimestamp)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      console.log('Fetched portion of streams:', {
        live: liveVideos.length,
        upcoming: upcomingVideos.length,
        finished: finishedVideos.length,
      });

      return {
        finishedVideos,
        liveVideos,
        upcomingVideos,
      };
    } catch (error) {
      console.error('Error in getPortionYouTubeStreamsItems:', error.message);
      throw new Error(`Failed to fetch portion of streams: ${error.message}`);
    }
  },

  /**
   * Получает порцию (50 элементов) элементов плейлиста
   * @param {string} playlistId - ID плейлиста YouTube
   * @param {string} apiKey - Ключ API YouTube
   * @returns {Promise<object[]>} Массив объектов с данными о видео
   */
  async getPortionYouTubePlaylistItems(playlistId, apiKey) {
    try {
      const params = new URLSearchParams({
        part: 'snippet,contentDetails',
        playlistId,
        key: apiKey,
        maxResults: '50',
      });

      const url = `https://www.googleapis.com/youtube/v3/playlistItems?${params.toString()}`;
      const response = await axios.get(url);
      const data = response.data;

      const items = data.items
        .filter(item => item.snippet.title !== YouTubeVideoStatuses.deleted)
        .map(playlistItem => ({
          title: playlistItem.snippet.title,
          id: playlistItem.contentDetails.videoId,
          url: `https://youtube.com/watch?v=${playlistItem.contentDetails.videoId}`,
          full: playlistItem,
        }));

      console.log('Fetched portion of playlist items:', items.length);
      return items;
    } catch (error) {
      console.error('Error in getPortionYouTubePlaylistItems:', error.message);
      throw new Error(`Failed to fetch portion of playlist items: ${error.message}`);
    }
  },
};
