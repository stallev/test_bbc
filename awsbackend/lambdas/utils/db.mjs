import AWS from 'aws-sdk';
const dynamodb = new AWS.DynamoDB.DocumentClient();

export const getAllDbItems = async tableName => {
  const params = {
    TableName: tableName,
  };
  const result = await dynamodb.scan(params).promise();
  return result.Items;
};

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
