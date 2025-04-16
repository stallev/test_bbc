import { YoutubeConvertedVideoItemType, YearVideoItemsSortedData } from '@/types/YouTubeDataTypes';

interface changedVideoItemType {
  year: number;
  month: number;
  day: number;
  id: string;
  title: string;
  url: string;
  date: Date;
  status: string;
}

export const getFormattedYoutubeVideosData = (
  data: YoutubeConvertedVideoItemType[]
): YearVideoItemsSortedData[] => {
  const addedFieldsData = data.map(item => ({
    ...item,
    year: item.date.getFullYear(),
    month: item.date.getMonth(),
    day: item.date.getDate(),
  }));

  const sortedByYear: { [key: number]: changedVideoItemType[] } = addedFieldsData.reduce(
    (acc: { [key: number]: changedVideoItemType[] }, item) => {
      if (!acc[item.year]) {
        acc[item.year] = [];
      }
      acc[item.year].push(item);
      return acc;
    },
    {} as { [key: number]: changedVideoItemType[] }
  );

  const yearArray = Object.keys(sortedByYear).map(
    (year: string): YearVideoItemsSortedData => ({
      yearNumber: parseInt(year, 10),
      monthListArray: Object.values(
        sortedByYear[parseInt(year, 10)].reduce(
          (
            acc: {
              [key: number]: {
                monthNumber: number;
                videoListArray: YoutubeConvertedVideoItemType[];
              };
            },
            item
          ) => {
            if (!acc[item.month]) {
              acc[item.month] = { monthNumber: item.month, videoListArray: [] };
            }
            acc[item.month].videoListArray.push({
              id: item.id,
              title: item.title,
              url: item.url,
              date: item.date,
              status: item.status,
            });
            return acc;
          },
          {} as {
            [key: number]: { monthNumber: number; videoListArray: YoutubeConvertedVideoItemType[] };
          }
        )
      ).sort((a, b) => a.monthNumber - b.monthNumber),
    })
  );

  yearArray.forEach(yearItem => {
    yearItem.monthListArray.forEach(monthItem => {
      monthItem.videoListArray.sort(
        (a: YoutubeConvertedVideoItemType, b: YoutubeConvertedVideoItemType) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    });
  });

  return yearArray.sort((a, b) => b.yearNumber - a.yearNumber);
};
