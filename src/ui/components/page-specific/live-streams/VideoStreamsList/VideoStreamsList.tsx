'use client';

import dynamic from 'next/dynamic';
import React, { useState } from 'react';

import {
  VideoStreamsListProps,
  YearVideoItemsSortedData,
  SelectedStreamsPeriod,
} from '@/types/YouTubeDataTypes';
const YearStreamsList = dynamic(
  () => import('@/ui/components/page-specific/live-streams/YearStreamsList/YearStreamsList'),
  { ssr: false }
);

export interface VideoItem {
  title: string;
  id: string;
  url: string;
}

const VideoStreamsList: React.FC<VideoStreamsListProps> = ({ data, locale }) => {
  const [selectedStreamsPeriod, setSelectedStreamsPeriod] = useState<SelectedStreamsPeriod>({
    year: data[0].yearNumber,
    month: data[0].monthListArray[data[0].monthListArray.length - 1].monthNumber,
  });

  return (
    <div className="">
      {data.map((year: YearVideoItemsSortedData) => (
        <YearStreamsList
          key={year.yearNumber}
          data={year}
          locale={locale}
          selectedStreamsPeriod={selectedStreamsPeriod}
          setSelectedStreamsPeriod={setSelectedStreamsPeriod}
        />
      ))}
    </div>
  );
};

export default VideoStreamsList;
