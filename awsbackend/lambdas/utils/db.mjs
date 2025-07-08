import AWS from 'aws-sdk';
const dynamodb = new AWS.DynamoDB.DocumentClient();

/**
 * Fetches all items from a DynamoDB table
 * @param {string} tableName - Name of the DynamoDB table
 * @returns {Promise<object[]>} Array of items
 */
export const getAllDbItems = async tableName => {
  const params = {
    TableName: tableName,
  };
  const result = await dynamodb.scan(params).promise();
  return result.Items;
};

/**
 * Inserts multiple items into a DynamoDB table
 * @param {string} tableName - Name of the DynamoDB table
 * @param {object[]} items - Array of items to insert
 * @returns {Promise<void>}
 */
export const putItemsToDb = async (tableName, items) => {
  const params = {
    RequestItems: {
      [tableName]: items.map(item => ({
        PutRequest: {
          Item: item,
        },
      })),
    },
  };
  await dynamodb.batchWrite(params).promise();
};

/**
 * Deletes all items from a DynamoDB table
 * @param {string} tableName - Name of the DynamoDB table
 * @returns {Promise<void>}
 */
export const deleteAllDbItems = async tableName => {
  const dbItems = await getAllDbItems(tableName);
  if (dbItems.length === 0) return;

  const deleteRequests = dbItems.map(item => ({
    DeleteRequest: {
      Key: {
        id: item.id,
      },
    },
  }));

  const params = {
    RequestItems: {
      [tableName]: deleteRequests,
    },
  };
  await dynamodb.batchWrite(params).promise();
};

/**
 * Fetches a document by ID from a DynamoDB table
 * @param {string} tableName - Name of the DynamoDB table
 * @param {string} id - Document ID
 * @returns {Promise<object|null>} Document or null if not found
 */
export const getDocumentById = async (tableName, id) => {
  try {
    const params = {
      TableName: tableName,
      Key: { id },
    };
    const result = await dynamodb.get(params).promise();
    return result.Item || null;
  } catch (error) {
    console.error('Error in getDocumentById:', error.message);
    throw error;
  }
};

/**
 * Inserts a new document into a DynamoDB table
 * @param {string} tableName - Name of the DynamoDB table
 * @param {object} document - Document to insert
 * @returns {Promise<void>}
 */
export const putDocument = async (tableName, document) => {
  try {
    const params = {
      TableName: tableName,
      Item: document,
    };
    await dynamodb.put(params).promise();
    console.log('Inserted document:', document.id);
  } catch (error) {
    console.error('Error in putDocument:', error.message);
    throw error;
  }
};

/**
 * Updates storedData and updatedAt for a document in a DynamoDB table
 * @param {string} tableName - Name of the DynamoDB table
 * @param {string} id - Document ID
 * @param {object} storedData - New storedData value
 * @returns {Promise<void>}
 */
export const updateDocument = async (tableName, id, storedData) => {
  try {
    const params = {
      TableName: tableName,
      Key: { id },
      UpdateExpression: 'SET storedData = :data, updatedAt = :updatedAt',
      ExpressionAttributeValues: {
        ':data': storedData,
        ':updatedAt': new Date().toISOString(),
      },
    };
    await dynamodb.update(params).promise();
    console.log('Updated document:', id);
  } catch (error) {
    console.error('Error in updateDocument:', error.message);
    throw error;
  }
};
