import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';

const ssmClient = new SSMClient();

export const getGoogleApiKey = async () => {
  try {
    const parameterName = process.env.GoogleApiKeyParamName;

    const command = new GetParameterCommand({
      Name: parameterName,
      WithDecryption: true,
    });

    const response = await ssmClient.send(command);

    return response.Parameter.Value;
  } catch (error) {
    console.error('Error fetching API Key:', error);

    return {
      success: false,
      body: JSON.stringify({ error: 'Failed to fetch API Key' }),
    };
  }
};
