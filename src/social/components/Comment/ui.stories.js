import React from 'react';

import StyledComment from './Comment.styles';

export default {
  title: 'Ui Only/Social/Comment',
};

export const UiComment = args => {
  return <StyledComment {...args} />;
};

UiComment.storyName = 'Single Comment';

UiComment.args = {
  authorName: 'Test Author',
  authorAvatar: '',
  canDelete: true,
  canEdit: true,
  canLike: true,
  canReply: true,
  canReport: true,
  createdAt: new Date('9/28/20'),
  text: 'Dynamic comment text',
  updatedAt: new Date('9/29/20'),
};

UiComment.argTypes = {
  authorName: { control: { type: 'text' } },
  authorAvatar: { control: { type: 'text' } },
  canDelete: { control: { type: 'boolean' } },
  canEdit: { control: { type: 'boolean' } },
  canLike: { control: { type: 'boolean' } },
  canReply: { control: { type: 'boolean' } },
  canReport: { control: { type: 'boolean' } },
  createdAt: { control: { type: 'date' } },
  text: { control: { type: 'text' } },
  onClickReply: { action: 'onClickReply()' },
  handleReportComment: { action: 'handleReportComment()' },
  updatedAt: { control: { type: 'date' } },
};
