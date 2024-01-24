import { WordpressGraphQLEndpoint } from "@/constants";

const API_URL = WordpressGraphQLEndpoint.dev;

 export async function fetchAPI(query = '', { variables = {} }: Record<string, any> = {}) {
  const headers = { 'Content-Type': 'application/json' }
  
  const res = await fetch(API_URL, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }

  return json.data;
}