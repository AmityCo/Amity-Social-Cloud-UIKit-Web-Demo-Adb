import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { FormattedMessage } from 'react-intl';

import PostLikeButton from '~/social/components/post/LikeButton';
import CommentComposeBar from '~/social/components/CommentComposeBar';
import { SecondaryButton } from '~/core/components/Button';
import {
  EngagementBarContainer,
  Counters,
  InteractionBar,
  CommentIcon,
  NoInteractionMessage,
} from './styles';
import CommentList from '~/social/components/CommentList';
import { LIKE_REACTION_KEY } from '~/constants';
import { Mentionees, Metadata } from '~/helpers/utils';
import { useCustomComponent } from '~/core/providers/CustomComponentsProvider';
import usePostSubscription from '~/social/hooks/usePostSubscription';
import { SubscriptionLevels } from '@amityco/ts-sdk';
import { MdOutlineExpandCircleDown } from "react-icons/md";
import Comment from '~/social/components/Comment';
const COMMENTS_PER_PAGE = 5;

interface UIEngagementBarProps {
  post: Amity.Post;
  readonly?: boolean;
  onClickComment?: () => void;
  isComposeBarDisplayed?: boolean;
  handleAddComment?: (text: string, mentionees: Mentionees, metadata: Metadata) => void;
  pinnedComment?: any;
}

const UIEngagementBar = ({
  post,
  readonly,
  onClickComment,
  isComposeBarDisplayed,
  handleAddComment,
  pinnedComment
}: UIEngagementBarProps) => {
  const { postId, targetType, targetId, reactions = {}, commentsCount, latestComments } = post;
  const [pinnedCommentID, setPinnedCommentID] = useState<string>('')
  const { pinnedComment: commentId } = pinnedComment ?? {};



  useEffect(() => {
    if (commentId) {

      setPinnedCommentID(commentId)
    }
    else if (!commentId && latestComments.length > 0) {
      setPinnedCommentID(latestComments[0].commentId)
    }
  }, [commentId])


  usePostSubscription({
    postId,
    level: SubscriptionLevels.POST,
  });

  const totalLikes = reactions[LIKE_REACTION_KEY] || 0;

  const [expandComment, setExpandComment] = useState<boolean>(false)
  return (
    <EngagementBarContainer>
      <Counters>
        {totalLikes > 0 && (
          <span data-qa-anchor="engagement-bar-like-counter">
            {millify(totalLikes || 0)}{' '}
            <FormattedMessage id="plural.like" values={{ amount: totalLikes }} />
          </span>
        )}

        {commentsCount > 0 && (
          <span data-qa-anchor="engagement-bar-comment-counter">
            {millify(commentsCount || 0)}{' '}
            <FormattedMessage id="plural.comment" values={{ amount: commentsCount }} />
          </span>
        )}
      </Counters>
      {!readonly ? (
        <>
          <InteractionBar>
            <PostLikeButton postId={postId} />
            <SecondaryButton
              data-qa-anchor="engagement-bar-comment-button"
              onClick={onClickComment}
            >
              <CommentIcon /> <FormattedMessage id="comment" />
            </SecondaryButton>
          </InteractionBar>
          {!expandComment && pinnedCommentID && <Comment key={pinnedCommentID} commentId={pinnedCommentID} />}


          {expandComment && post.commentsCount > 0 ?

            <CommentList pinnedComment={pinnedCommentID} referenceId={postId} referenceType={'post'} limit={COMMENTS_PER_PAGE} />
            :

            post.commentsCount > 1 &&
            <div
              style={{
                padding: '12px 0px',
                fontWeight: 600,
                fontSize: 14,
                borderBottom: '1px solid #EBECEF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
              onClick={() => setExpandComment(true)}
            >

              View all comments
              <MdOutlineExpandCircleDown style={{ height: 20, width: 20, marginLeft: 4 }} />
            </div>
          }

          {/* {post.commentsCount > 0 ? (
            <CommentList pinnedComment={pinnedComment} referenceId={postId} referenceType={'post'} limit={COMMENTS_PER_PAGE} />
          ) : null} */}


          {isComposeBarDisplayed && (
            <CommentComposeBar
              postId={postId}
              onSubmit={(text, mentionees, metadata) =>
                handleAddComment?.(text, mentionees, metadata)
              }
            />
          )}
        </>
      ) : (
        <>
          <NoInteractionMessage>
            <FormattedMessage id="community.cannotInteract" />
          </NoInteractionMessage>
          {post.commentsCount > 0 ? (
            <CommentList
              referenceId={postId}
              referenceType={'post'}
              limit={COMMENTS_PER_PAGE}
              pinnedComment={pinnedComment}
              readonly
            />
          ) : null}
        </>
      )}
    </EngagementBarContainer>
  );
};

export default (props: UIEngagementBarProps) => {
  const CustomComponentFn = useCustomComponent<UIEngagementBarProps>('UIEngagementBar');

  if (CustomComponentFn) return CustomComponentFn(props);

  return <UIEngagementBar {...props} />;
};
