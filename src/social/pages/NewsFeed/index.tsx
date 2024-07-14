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
import { RiMagicFill } from "react-icons/ri";
import { useMergePost } from '~/social/hooks/useMergePost';
import Carousel from 'react-multi-carousel';
import Post from '~/social/components/post/Post';
import { PostRepository } from '@amityco/ts-sdk';

interface NewsFeedProps {
  isOpen: boolean;
  toggleOpen: () => void;
}

const NewsFeed = ({ isOpen, toggleOpen }: NewsFeedProps) => {
  const { onChangePage } = useNavigation();
  const { formatMessage } = useIntl();
  const [searchPosts, setSearchPosts] = useState<Amity.Post[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const { postList, clearPosts } = useMergePost()

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  console.log('postList: ', postList);

  const mergePostFunc = async () => {
    const mergedPostIds = postList.map((item: Amity.Post) => item.postId)
    const updatedPost = {
      metadata: {
        ...postList[0].metadata,
        mergePostIds: mergedPostIds
      }

    };

    const { data: post } = await PostRepository.updatePost(postList[0].postId, updatedPost);
    if (post) {
      clearPosts()
    }
    console.log('post: ', post);
  }
  return (
    <Wrapper data-qa-anchor="news-feed">

      <div style={{ marginBottom: 10 }}>
        <SocialSearch
          searchBy="posts"
          setSearchPosts={setSearchPosts}
          setIsSearchLoading={setIsSearchLoading}
        />
      </div>
      <div style={{
        borderRadius: 8,
        border: '1px solid var(--Base-Shade-4, #EBECEF)',
        background: '#FFF',
        minHeight: 110,
        marginBottom: 10,
        padding: '4px 12px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #EBECEF'
        }}>

          <RiMagicFill size={21} color='#1054DE' />

          <p style={{ fontWeight: 600, fontSize: 14, marginLeft: 8 }}>Merge posts panel</p>
        </div>

        {postList.length > 0 ? <Carousel responsive={responsive} showDots >

          {postList.map((item: Amity.Post) => {
            return (
              <div style={{ transform: 'scale(0.85)' }}>
                <Post
                  key={item.postId}
                  postId={item.postId}
                  hidePostTarget={false}
                  readonly={false}
                  hideComments={true}

                />
              </div>
            )

          }

          )}


        </Carousel> :
          <div style={{ marginBottom: 8 }}>
            <p style={{ opacity: 0.5 }}>There is no merged post ongoing yet</p>
          </div>
        }
        {postList.length > 0 && <div style={{ display: 'flex', justifyContent: 'end', margin: '10px 0px' }}>
          <button onClick={clearPosts} style={{ background: '#fff', padding: '12px', fontWeight: 600, color: '#1054DE', borderRadius: 4, opacity: postList.length > 1 ? 1 : 0.5 }}>Clear</button>
          <button onClick={mergePostFunc} style={{ background: '#1054DE', padding: '12px', fontWeight: 600, color: '#fff', borderRadius: 4, opacity: postList.length > 1 ? 1 : 0.5 }}>Begin Merge</button>
        </div>}



      </div>

      <CommunitySideMenuOverlay isOpen={isOpen} onClick={toggleOpen} />
      <StyledCommunitySideMenu isOpen={isOpen} />
      <MobileContainer>
        <BarsIcon onClick={toggleOpen} />
        <HeadTitle>{formatMessage({ id: 'sidebar.community' })}</HeadTitle>
      </MobileContainer>
      <StoryTab type="globalFeed" />
      {
        searchPosts.length > 0 ? (
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
        )
      }
    </Wrapper >
  );
};

export default NewsFeed;
