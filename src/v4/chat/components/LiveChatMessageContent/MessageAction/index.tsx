import React, { useRef } from 'react';
import styles from './styles.module.css';
import Kebub from '~/v4/icons/Kebub';
import { useIntl } from 'react-intl';
import Popover from '~/v4/core/components/Popover';
import Reply from '~/v4/icons/Reply';
import Copy from '~/v4/icons/Copy';
import Bin from '~/v4/icons/Bin';
import Flag from '~/v4/icons/Flag';
import { Typography } from '~/v4/core/components';

export type AmityMessageActionType = {
  onCopy?: () => void;
  onFlag?: () => void;
  onUnflag?: () => void;
  onDelete?: () => void;
  onReply?: () => void;
  onMention?: () => void;
};

interface MessageActionProps {
  isOwner: boolean;
  isModerator: boolean;
  isFlagged?: boolean;
  action: AmityMessageActionType;
  containerRef: React.RefObject<HTMLDivElement>;
}

const MessageAction = ({
  isOwner,
  isModerator,
  isFlagged,
  action,
  containerRef,
}: MessageActionProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const { formatMessage } = useIntl();
  const clickMeButtonRef = useRef<HTMLDivElement | null>(null);

  const onCopyMessage = () => {
    action.onCopy && action.onCopy();
    setIsPopoverOpen(false);
  };

  const onReplyMessage = () => {
    action.onReply && action.onReply();
    setIsPopoverOpen(false);
  };

  const onDeleteMessage = () => {
    action.onDelete && action.onDelete();
    setIsPopoverOpen(false);
  };

  const onFlagMessage = () => {
    action.onFlag && action.onFlag();
    setIsPopoverOpen(false);
  };

  const onUnFlagMessage = () => {
    action.onUnflag && action.onUnflag();
    setIsPopoverOpen(false);
  };

  return (
    <>
      <Popover
        positions={['bottom', 'top']}
        onClickOutside={() => setIsPopoverOpen(false)}
        isOpen={isPopoverOpen}
        align="start"
        parentElement={containerRef?.current || undefined}
        content={
          <>
            <div className={styles.messageActionButton} onClick={onReplyMessage}>
              <div className={styles.messageActionButtonText}>
                <Typography.Body>
                  {formatMessage({ id: 'livechat.messageBubble.reply.button' })}
                </Typography.Body>
              </div>
              <Reply className={styles.replyIcon} />
            </div>
            <div className={styles.messageActionButton} onClick={onCopyMessage}>
              <div className={styles.messageActionButtonText}>
                <Typography.Body>
                  {formatMessage({ id: 'livechat.messageBubble.copy.button' })}
                </Typography.Body>
              </div>
              <Copy className={styles.copyIcon} />
            </div>
            {/* TODO: release 1.1 hide these action, will be implement in release 1.2 */}
            {/* {!isOwner || (
              <div
                className={styles.messageActionButton}
                onClick={() => {
                  onMention && onMention();
                }}
              >
                <div
                  className={clsx(styles.messageActionButtonText, typography.ascTypograyphyBody)}
                >
                  {formatMessage({ id: 'livechat.messageBubble.mention.button' })}
                </div>
                <Mention className={styles.mentionIcon} />
              </div>
            )} */}
            {(isModerator || !isOwner) && (
              <div
                className={styles.messageActionButton}
                onClick={isFlagged ? onUnFlagMessage : onFlagMessage}
              >
                <div className={styles.messageDangerActionButtonText}>
                  <Typography.Body>
                    {formatMessage({
                      id: `${
                        isFlagged
                          ? 'livechat.messageBubble.unReport.button'
                          : 'livechat.messageBubble.report.button'
                      }`,
                    })}
                  </Typography.Body>
                </div>
                <Flag className={styles.flagIcon} />
              </div>
            )}
            {(isOwner || isModerator) && (
              <div className={styles.messageActionButton} onClick={onDeleteMessage}>
                <div className={styles.messageDangerActionButtonText}>
                  <Typography.Body>
                    {formatMessage({ id: 'livechat.messageBubble.delete.button' })}
                  </Typography.Body>
                </div>
                <Bin className={styles.binIcon} />
              </div>
            )}
          </>
        }
      >
        <div
          className={styles.optionButton}
          ref={clickMeButtonRef}
          onClick={() => {
            setIsPopoverOpen(!isPopoverOpen);
          }}
        >
          <Kebub className={styles.optionIcon} />
        </div>
      </Popover>
      {/* <Reaction className={styles.reactionIcon} /> */}
    </>
  );
};

export default MessageAction;
