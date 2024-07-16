import { Client } from '@amityco/ts-sdk';
import axios from 'axios';

const QUERY_LIMIT = 10;

export default async function useSearchPostsCollection({ text, tags }: Partial<any>) {
  console.log('tags: ', tags);
  const client = Client.getActiveClient();
  const { token } = client;
  const response = await axios.get(
    `https://beta.amity.services/api/v3/search/posts?query=${text}&options[limit]=${QUERY_LIMIT}&tags[]=${tags.join(',')}`,
    {
      headers: {
        Authorization: `Bearer ${token?.accessToken}`,
      },
    },
  );
  const { posts } = response.data.data;
  const { items, ...rest } = {
    items: posts,
  };

  return {
    posts: items || [],
    ...rest,
    loadMore: () => {},
    hasMore: {},
  };
}
