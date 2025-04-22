import { PagesPaths } from './constants/apiConstants.mjs';
import { fetchLocalePages } from './utils/api.mjs';
import { getAllDbItems, putItemsToDb, deleteAllDbItems } from './utils/db.mjs';
import { getLatestPlaylistItems } from './utils/youtube.mjs';

const compareItemsLists = (list1, list2) => {
  if (list1.length !== list2.length) return false;

  const sortedList1 = [...list1].sort((a, b) => a.id.localeCompare(b.id));
  const sortedList2 = [...list2].sort((a, b) => a.id.localeCompare(b.id));

  return sortedList1.every((item, index) => {
    const otherItem = sortedList2[index];
    return item.id === otherItem.id && item.title === otherItem.title;
  });
};

export const validateYouTubeList = async () => {
  try {
    const tableName = process.env.TABLE_NAME;
    const youtubeItems = await getLatestPlaylistItems();

    const dbItems = await getAllDbItems(tableName);

    if (dbItems.length === 0) {
      await putItemsToDb(tableName, youtubeItems);
      console.log('Database was empty, inserted new items');

      await fetchLocalePages(PagesPaths.Home);
      await fetchLocalePages(PagesPaths.LiveStreams);
    } else {
      const areEqual = compareItemsLists(youtubeItems, dbItems);
      if (areEqual) {
        console.log('Data is up to date');
      } else {
        await deleteAllDbItems(tableName);
        await putItemsToDb(tableName, youtubeItems);
        console.log('Data was updated');

        await fetchLocalePages(PagesPaths.Home);
        await fetchLocalePages(PagesPaths.LiveStreams);
      }
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'success',
        data: youtubeItems,
      }),
    };
    return response;
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error processing request',
        error: error.message,
      }),
    };
  }
};
