import React, { useState } from 'react';

import { PageTypes } from '~/social/constants';
import Feed from '~/social/components/Feed';

import { useNavigation } from '~/social/providers/NavigationProvider';

import {
  CommunitySideMenuOverlay,
  HeadTitle,
  MobileContainer,
  StyledCommunitySideMenu,
  Wrapper,
} from './styles';
import { BarsIcon } from '~/icons';
import { useIntl } from 'react-intl';
import { StoryTab } from '~/social/components/StoryTab';
import SocialSearch from '~/social/components/SearchPostForm';

interface NewsFeedProps {
  isOpen: boolean;
  toggleOpen: () => void;
}

const NewsFeed = ({ isOpen, toggleOpen }: NewsFeedProps) => {
  const { onChangePage } = useNavigation();
  const { formatMessage } = useIntl();
  const [searchPosts, setSearchPosts] = useState<Amity.Post[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  return (
    <Wrapper data-qa-anchor="news-feed">
      <div style={{ marginBottom: 20 }}>
        <SocialSearch
          searchBy="posts"
          setSearchPosts={setSearchPosts}
          setIsSearchLoading={setIsSearchLoading}
        />
      </div>
      <CommunitySideMenuOverlay isOpen={isOpen} onClick={toggleOpen} />
      <StyledCommunitySideMenu isOpen={isOpen} />
      <MobileContainer>
        <BarsIcon onClick={toggleOpen} />
        <HeadTitle>{formatMessage({ id: 'sidebar.community' })}</HeadTitle>
      </MobileContainer>
      <StoryTab type="globalFeed" />
      {searchPosts.length > 0 ? (
        <Feed
          targetType={'search'}
          goToExplore={() => onChangePage(PageTypes.Explore)}
          showPostCreator
          posts={searchPosts}
          isLoading={isSearchLoading}
        />
      ) : (
        <Feed
          targetType={'globalFeed'}
          goToExplore={() => onChangePage(PageTypes.Explore)}
          showPostCreator
        />
      )}
    </Wrapper>
  );
};

export default NewsFeed;
