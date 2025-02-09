import React, { memo, useEffect, useState } from 'react';
import { CommentRepository, PostRepository, SubscriptionLevels } from '@amityco/ts-sdk';

import usePost from '~/social/hooks/usePost';
import UIEngagementBar from './UIEngagementBar';
import { Mentionees, Metadata } from '~/helpers/utils';
import { useCustomComponent } from '~/core/providers/CustomComponentsProvider';
import useReactionSubscription from '~/social/hooks/useReactionSubscription';
import usePostSubscription from '~/social/hooks/usePostSubscription';
import { FormattedMessage } from 'react-intl';
import useSocialMention from '~/social/hooks/useSocialMention';
import { ERROR_RESPONSE } from '~/social/constants';
import { useNotifications } from '~/core/providers/NotificationProvider';

interface EngagementBarProps {
  postId: string;
  readonly?: boolean;
  hideComments?: boolean
}

const EngagementBar = ({ postId, readonly = false, hideComments }: EngagementBarProps) => {
  const [isComposeBarDisplayed, setComposeBarDisplayed] = useState(false);
  const notification = useNotifications();
  const toggleComposeBar = () => setComposeBarDisplayed((prevValue) => !prevValue);

  const hideComposeBar = () => setComposeBarDisplayed(false);
  const [metaData, setMetaData] = useState()
  console.log('metaData===: ', metaData);



  const post = usePost(postId);

  useEffect(() => {
    if (post) setMetaData(post.metadata)

  }, [post])


  const fetchPost = () => {

    const unsubscribe = PostRepository.getPost(postId, ({ data }) => {
      console.log('data====: ', data.metadata);
      setMetaData(data.metadata)
    });

  }

  const { clearAll } = useSocialMention({
    targetType: post?.targetType,
    targetId: post?.targetId,
  });

  usePostSubscription({
    postId,
    level: SubscriptionLevels.POST,
  });

  useReactionSubscription({
    targetType: post?.targetType,
    targetId: post?.targetId,
    shouldSubscribe: () => !!post,
  });

  if (!post) return null;

  const handleAddComment = async (
    commentText: string,
    mentionees: Mentionees,
    metadata: Metadata,
  ) => {
    try {
      await CommentRepository.createComment({
        referenceType: 'post',
        referenceId: postId,
        data: {
          text: commentText,
        },
        mentionees,
        metadata,
      });
      clearAll?.();
      hideComposeBar();
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === ERROR_RESPONSE.CONTAIN_BLOCKED_WORD) {
          notification.error({
            content: <FormattedMessage id="notification.error.blockedWord" />,
          });
        }
      }
    }
  };

  return (
    <UIEngagementBar
      post={post}
      readonly={readonly}
      isComposeBarDisplayed={isComposeBarDisplayed}
      handleAddComment={handleAddComment}
      onClickComment={toggleComposeBar}
      pinnedComment={metaData}
      hideComments={hideComments}
      onClickExpandSection={fetchPost}
    />
  );
};

export { UIEngagementBar };
export default memo((props: EngagementBarProps) => {
  const CustomComponentFn = useCustomComponent<EngagementBarProps>('EngagementBar');

  if (CustomComponentFn) return CustomComponentFn(props);

  return <EngagementBar {...props} />;
});
