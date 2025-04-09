import { Dispatch, SetStateAction } from 'react';

import { Locale } from '@/i18n.config';
export interface YouTubeVideosDataType {
  finishedVideos: YoutubeConvertedVideoItemType[] | [];
  liveVideos: YoutubeConvertedVideoItemType[] | [];
  upcomingVideos: YoutubeConvertedVideoItemType[] | [];
}

export interface YoutubeConvertedVideoItemType {
  id: string;
  title: string;
  url: string;
  date: string;
  status: string;
}

export interface FetchedVideoItemsList {
  finishedVideos: YoutubeConvertedVideoItemType[] | [];
  liveVideos: YoutubeConvertedVideoItemType[] | [];
  upcomingVideos: YoutubeConvertedVideoItemType[] | [];
}

export interface YoutubeFetchedVideoItemType {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  liveStreamingDetails: LiveStreamingDetails;
}

export interface YoutubePlaylistItemType {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  contentDetails: ContentDetails;
}

export interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: ResourceId;
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
  liveBroadcastContent?: string;
}

export interface Thumbnails {
  default: Default;
  medium: Medium;
  high: High;
  standard: Standard;
  maxres: Maxres;
}

export interface Default {
  url: string;
  width: number;
  height: number;
}

export interface Medium {
  url: string;
  width: number;
  height: number;
}

export interface High {
  url: string;
  width: number;
  height: number;
}

export interface Standard {
  url: string;
  width: number;
  height: number;
}

export interface Maxres {
  url: string;
  width: number;
  height: number;
}

export interface ResourceId {
  kind: string;
  videoId: string;
}

export interface ContentDetails {
  videoId: string;
  videoPublishedAt: string;
}

export interface LiveStreamingDetails {
  actualStartTime: string;
  actualEndTime: string;
  scheduledStartTime: string;
}

export interface YearVideoItemsSortedData {
  yearNumber: number;
  monthListArray: MonthVideoItemsSortedData[];
}

export interface MonthVideoItemsSortedData {
  monthNumber: number;
  videoListArray: YoutubeConvertedVideoItemType[];
}

export interface VideoStreamsListProps {
  locale: Locale;
  data: YearVideoItemsSortedData[];
}
export interface SelectedStreamsPeriod {
  year: number | null;
  month: number | null;
}

export interface YearStreamsListProps {
  locale: Locale;
  data: YearVideoItemsSortedData;
  selectedStreamsPeriod: SelectedStreamsPeriod;
  setSelectedStreamsPeriod: Dispatch<SetStateAction<SelectedStreamsPeriod>>;
}
