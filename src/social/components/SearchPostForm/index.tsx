import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { SocialSearchContainer, SearchIcon, SearchIconContainer } from './styles';
import styled from 'styled-components';
import { useInputAutocomplete } from '~/core/components/InputAutocomplete';
import InputText from '~/core/components/InputText';
import { useCustomComponent } from '~/core/providers/CustomComponentsProvider';
import useSearchPostsCollection from '~/social/hooks/collections/useSearchPostsCollection';

const Container = styled.div`
  position: relative;
`;

interface SocialSearchProps {
  className?: string;
  sticky?: boolean;
  searchBy: 'posts';
  setSearchPosts: (posts: Amity.Post[]) => void;
  setIsSearchLoading: (isLoading: boolean) => void;
}

const SocialSearch = ({
  className,
  sticky = false,
  setSearchPosts,
  setIsSearchLoading,
}: SocialSearchProps) => {
  const [searchValue, setSearchValue] = useState('');
  const { open, containerRef } = useInputAutocomplete({
    value: searchValue,
  });
  const [lastSearchValue, setLastSearchValue] = useState<string>('');
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  function onClear() {
    setSearchValue('');
  }

  const fetchPosts = async (searchText: string) => {
    try {
      setIsSearchLoading(true);
      const result = await useSearchPostsCollection({ text: searchText });
      setSearchPosts(result.posts.length > 0 ? result.posts : []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsSearchLoading(false);
    }
  };

  // Debounce function implementation
  const debounce = (func: (...args: any[]) => void, wait: number) => {
    return (...args: any[]) => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
      const timeout = setTimeout(() => func.apply(this, args), wait);
      setDebounceTimeout(timeout);
    };
  };

  const debouncedFetchPosts = useCallback(
    debounce((searchText: string) => {
      fetchPosts(searchText);
    }, 300),
    [],
  );

  useEffect(() => {
    if (searchValue && searchValue !== lastSearchValue) {
      debouncedFetchPosts(searchValue);
      setLastSearchValue(searchValue);
    }
    if (lastSearchValue && !searchValue) {
      setSearchPosts([]);
    }
  }, [searchValue, lastSearchValue, debouncedFetchPosts]);

  // Clean up the debounce function on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

  return (
    <SocialSearchContainer className={className} sticky={sticky}>
      <FormattedMessage id="exploreHeader.searchPostPlaceholder">
        {([placeholder]) => (
          <Container ref={containerRef}>
            <InputText
              data-qa-anchor="social-search-input"
              value={searchValue}
              prepend={
                <SearchIconContainer>
                  <SearchIcon />
                </SearchIconContainer>
              }
              placeholder={typeof placeholder === 'string' ? placeholder : undefined}
              onClear={onClear}
              onChange={(newValue) => setSearchValue?.(newValue.plainText)}
              onClick={() => open()}
            />
          </Container>
        )}
      </FormattedMessage>
    </SocialSearchContainer>
  );
};

export default (props: SocialSearchProps) => {
  const CustomComponentFn = useCustomComponent<SocialSearchProps>('SocialSearch');

  if (CustomComponentFn) return CustomComponentFn(props);

  return <SocialSearch {...props} />;
};
