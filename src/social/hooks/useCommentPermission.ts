import { UserRepository } from '@amityco/ts-sdk';
import { includes, set } from 'lodash';
import { useEffect, useState } from 'react';
import useSDK from '~/core/hooks/useSDK';
import { isModerator } from '~/helpers/permissions';

const useCommentPermission = (
  comment?: Amity.Comment | null,
  readonly: boolean = false,
  userRoles: string[] = [],
) => {
  const { currentUserId, client, userRoles: role } = useSDK();
  const isCommentOwner = comment?.userId === currentUserId;
  const isReplyComment = !!comment?.parentId;
  const [isGlobalAdmin, setIsGlobalAdmin] = useState<boolean>(false)

  const canDelete = (!readonly && isCommentOwner) || isModerator(userRoles);
  const canEdit = !readonly && isCommentOwner;
  const canLike = !readonly;
  const canReply = !readonly && !isReplyComment;
  const canReport = !readonly && !isCommentOwner;
  const canMarkAsCorrect = isGlobalAdmin

  useEffect(() => {
    if (currentUserId) {
      UserRepository.getUser(currentUserId, (value) => {
        console.log('value: ', value);
        if (value.data.roles.includes('global-admin')) {
          setIsGlobalAdmin(true)
        }

      });
    }

  }, [currentUserId])


  return {
    canDelete,
    canEdit,
    canLike,
    canReply,
    canReport,
    canMarkAsCorrect
  };
};

export default useCommentPermission;
