import { DynamoDBDocumentsKeys } from './constants/youtubeConstants.mjs';
import { fetchLocalePages } from './utils/api.mjs';
import { getGoogleApiKey } from './utils/asm.mjs';
import { getDocumentById, putDocument, updateDocument } from './utils/db.mjs';
import {
  get50LatestPlaylistItems,
  compareItemsLists,
  getFullListYouTubeItems,
} from './utils/youtube.mjs';

export const validateYouTubeList = async () => {
  try {
    const tableName = process.env.TABLE_NAME;
    const apiKey = await getGoogleApiKey();
    console.log('GoogleApiKe', apiKey);

    const lastItems = await get50LatestPlaylistItems(apiKey);

    const storedLast50ItemsDoc = await getDocumentById(tableName, DynamoDBDocumentsKeys.last50);
    const storedFullListItemsDoc = await getDocumentById(tableName, DynamoDBDocumentsKeys.fullList);

    if (!storedFullListItemsDoc) {
      const fullListYouTubeItems = await getFullListYouTubeItems(apiKey);
      await putDocument(tableName, {
        id: DynamoDBDocumentsKeys.fullList,
        storedData: fullListYouTubeItems,
        updatedAt: new Date().toISOString(),
      });
      console.log('Full list in the database was empty, inserted new items');
      return;
    }

    if (!storedLast50ItemsDoc) {
      await putDocument(tableName, {
        id: DynamoDBDocumentsKeys.last50,
        storedData: lastItems,
        updatedAt: new Date().toISOString(),
      });
      console.log('50last list in the database was empty, inserted new items');
    } else {
      const storedData = storedLast50ItemsDoc.storedData;
      const areEqual = compareItemsLists(lastItems, storedData);
      if (areEqual) {
        console.log('Data is up to date');
      } else {
        await updateDocument(tableName, DynamoDBDocumentsKeys.last50, lastItems);
        const fullListYouTubeItems = await getFullListYouTubeItems(apiKey);
        await updateDocument(tableName, DynamoDBDocumentsKeys.fullList, fullListYouTubeItems);
        console.log('Data was updated');
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'success',
        data: lastItems,
      }),
    };
  } catch (error) {
    console.error('Error in validateYouTubeList:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error processing request',
        error: error.message,
      }),
    };
  }
};

export const fetchLandingPage = async () => {
  await fetchLocalePages('/');
};
