import { UserRepository } from '@amityco/ts-sdk';
import { useEffect, useRef, useState } from 'react';

import useLiveCollection from '~/v4/core/hooks/useLiveCollection';

const MINIMUM_STRING_LENGTH_TO_TRIGGER_QUERY = 1;

export const useUserQueryByDisplayName = (
  params: Parameters<typeof UserRepository.searchUserByDisplayName>[0],
) => {
  const [items, setItems] = useState<Amity.User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [loadMoreHasBeenCalled, setLoadMoreHasBeenCalled] = useState(false);
  const loadMoreRef = useRef<(() => void) | null>(null);
  const unSubRef = useRef<(() => void) | null>(null);

  const loadMore = () => {
    if (loadMoreRef.current) {
      loadMoreRef.current();
      setLoadMoreHasBeenCalled(true);
    }
  };

  useEffect(() => {
    if (unSubRef.current) {
      unSubRef.current();
      unSubRef.current = null;
    }

    const unSubFn = UserRepository.searchUserByDisplayName(params, (response) => {
      setHasMore(response.hasNextPage || false);
      setIsLoading(response.loading);
      loadMoreRef.current = response.onNextPage || null;
      setItems(response.data);
    });
    unSubRef.current = unSubFn;

    return () => {
      unSubRef.current?.();
      unSubRef.current = null;
    };
  }, [params]);

  return {
    users: items,
    isLoading,
    hasMore,
    loadMore,
    loadMoreHasBeenCalled,
  };
};

// breaking changes
export default function useUsersCollection(
  term: Parameters<typeof UserRepository.getUsers>[0],
  shouldCall: () => boolean = () => true,
) {
  const { items, ...rest } = useLiveCollection({
    fetcher: UserRepository.getUsers,
    params: term,
  });

  return {
    users: items,
    ...rest,
  };
}
