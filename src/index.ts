export { default as AmityUiKitProvider } from '~/core/providers/UiKitProvider';
export { default as AmityUiKitFeed } from '~/social/components/Feed';
export { default as AmityUiKitSocial } from '~/social/pages/Application';
export { default as AmityUiKitChat } from '~/chat/pages/Application';

// Export helper
export {
  addChatMembers as amityAddChatMembers,
  removeChatMembers as amityRemoveChatMembers,
} from '~/chat/helpers';

export { default as useAmityUser } from '~/core/hooks/useUser';
export { useNavigation as useAmityNavigation } from '~/social/providers/NavigationProvider';

export { default as AmityAvatar } from '~/core/components/Avatar';
export { PostContainer as AmityPostContainer } from '~/social/components/post/Post/styles';
export { default as AmityPostEngagementBar } from '~/social/components/EngagementBar';
export { default as AmityExpandableText } from '~/social/components/Comment/CommentText';
export { useSDK as useAmitySDK } from '~/core/hooks/useSDK';

// v4
export { default as AmityUIKitManager } from '~/v4/core/AmityUIKitManager';
export { AmityDraftStoryPage, ViewStoryPage as AmityViewStoryPage } from '~/v4/social/pages';
export {
  CommentTray as AmityCommentTrayComponent,
  StoryTab as AmityStoryTabComponent,
} from '~/v4/social/components';

export { ReactionList as AmityReactionList } from '~/v4/social/components/ReactionList';

import type { ReactionListProps } from '~/v4/social/components/ReactionList';

export type { ReactionListProps as AmityReactionListProps };

// v4 internal use only (Amity Console)
export { StoryPreview as AmityStoryPreview } from './v4/social/internal-components/StoryPreview';

// import AmityComment from './components/Comment';
// import AmityCommentComposeBar from './components/CommentComposeBar';
// import AmityCommentLikeButton from './components/CommentLikeButton';
// import AmityCommunity from './components/Community';
// import AmityCommunityItem from './components/CommunityItem';
// import AmityEmptyFeed from './components/EmptyFeed';
// import AmityFiles from './components/Files';
// import AmityImageGallery from './components/ImageGallery';
// import AmityImages from './components/Images';
// import AmityMessage from './components/Message';
// import AmityMessageComposeBar from './components/MessageComposeBar';
// import AmityMessageList from './components/MessageList';
// import AmityPost from './components/Post';
// import AmityPostCreator from './components/PostCreator';
// import AmityPostLikeButton from './components/PostLikeButton';
// import AmityRecentChat from './components/RecentChat';
// import AmitySideMenu from './components/SideMenu';
