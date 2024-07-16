import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { SocialSearchContainer, SearchIcon, SearchIconContainer } from './styles';
import styled from 'styled-components';
import { useInputAutocomplete } from '~/core/components/InputAutocomplete';
import InputText from '~/core/components/InputText';
import { useCustomComponent } from '~/core/providers/CustomComponentsProvider';
import useSearchPostsCollection from '~/social/hooks/collections/useSearchPostsCollection';
import { MultiSelect } from "react-multi-select-component";

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
  const [selected, setSelected] = useState([]);
  console.log('selected: ', selected);


  const options = [
    { label: "photoshop", value: "photoshop" },
    { label: "illustrator", value: "illustrator" },
    { label: "Question", value: "question" },
  ];

  function onClear() {
    setSearchValue('');
  }

  const fetchPosts = async (searchText?: string) => {
    try {
      setIsSearchLoading(true);
      const result = await useSearchPostsCollection({ text: searchText ?? '', tags: selected.map(item => (item as any).value) });
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
    if (selected) {
      fetchPosts(searchValue);
    }
  }, [searchValue, lastSearchValue, debouncedFetchPosts, selected]);

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
            <div style={{ display: 'flex', flex: 3, gap: 12 }}>
              <div style={{ flex: 2 }}>
                <p style={{ fontWeight: 600 }}>Search posts</p>
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
              </div>
              <div style={{ flex: 1, padding: 0 }}>
                <p style={{ fontWeight: 600 }}>tags</p>
                <MultiSelect
                  options={options}
                  value={selected}
                  onChange={setSelected}
                  labelledBy="tags"
                />
              </div>
            </div>

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
