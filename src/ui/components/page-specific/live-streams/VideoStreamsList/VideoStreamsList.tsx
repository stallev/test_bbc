'use client';

import React, { useState } from 'react';

import {
  VideoStreamsListProps,
  YearVideoItemsSortedData,
  SelectedStreamsPeriod,
} from '@/types/YouTubeDataTypes';
import YearStreamsList from '@/ui/components/page-specific/live-streams/YearStreamsList/YearStreamsList';

export interface VideoItem {
  title: string;
  id: string;
  url: string;
}

const VideoStreamsList: React.FC<VideoStreamsListProps> = ({ data, locale }) => {
  // Проверка наличия данных перед доступом к properties
  const initialData = data && data.length > 0 ? data : [];

  const initialYear =
    initialData.length > 0 && initialData[0].yearNumber !== undefined
      ? initialData[0].yearNumber
      : null;

  const initialMonth =
    initialData.length > 0 &&
    initialData[0].monthListArray &&
    initialData[0].monthListArray.length > 0 &&
    initialData[0].monthListArray[initialData[0].monthListArray.length - 1].monthNumber !==
      undefined
      ? initialData[0].monthListArray[initialData[0].monthListArray.length - 1].monthNumber
      : null;

  const [selectedStreamsPeriod, setSelectedStreamsPeriod] = useState<SelectedStreamsPeriod>({
    year: initialYear,
    month: initialMonth,
  });

  // Если нет данных, возвращаем пустой div
  if (!data || data.length === 0) {
    return <div></div>;
  }

  return (
    <div>
      {data.map((year: YearVideoItemsSortedData) =>
        year && year.yearNumber ? (
          <YearStreamsList
            key={year.yearNumber}
            data={year}
            locale={locale || 'en'}
            selectedStreamsPeriod={selectedStreamsPeriod}
            setSelectedStreamsPeriod={setSelectedStreamsPeriod}
          />
        ) : null
      )}
    </div>
  );
};

export default VideoStreamsList;
