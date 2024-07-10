import React, { useState, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import Truncate from 'react-truncate-markup';
import { Mentioned, Metadata, findChunks } from '~/helpers/utils';
import MentionHighlightTag from '~/core/components/MentionHighlightTag';
import { processChunks } from '~/core/components/ChunkHighlighter';
import Linkify from '~/core/components/Linkify';
import { CommentContent, ReadMoreButton } from './styles';
import CorrectIcon from './CorrectIcon';

const COMMENT_MAX_LINES = 8;

interface CommentTextProps {
  text?: string;
  className?: string;
  mentionees?: Mentioned[];
  maxLines?: number;
  isMark?: boolean
}

const CommentText = ({
  text,
  className,
  mentionees,
  maxLines = COMMENT_MAX_LINES,
  isMark = false
}: CommentTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const chunks = useMemo(
    () => processChunks(text || '', findChunks(mentionees)),
    [mentionees, text],
  );

  const expand = () => setIsExpanded(true);

  const textContent = text ? (
    <CommentContent style={{ background: isMark ? '#ECF8EE' : '', border: isMark ? '1px solid #44B556' : '', display: 'flex', alignItems: 'center' }} data-qa-anchor="comment-content" className={className}>
      <Truncate.Atom>
        {chunks.map((chunk) => {
          const key = `${text}-${chunk.start}-${chunk.end}`;
          const sub = text.substring(chunk.start, chunk.end);
          if (chunk.highlight) {
            const mentionee = mentionees?.find((m) => m.index === chunk.start);
            if (mentionee) {
              return (
                <MentionHighlightTag key={key} mentionee={mentionee}>
                  {sub}
                </MentionHighlightTag>
              );
            }

            return <span key={key}>{sub}</span>;
          }
          return <Linkify key={key}>{sub}</Linkify>;
        })}
        {isMark &&
          <div style={{ padding: 5, height: 24, width: 24, background: '#fff', borderRadius: 24, marginLeft: 8 }}>
            <CorrectIcon />
          </div>
        }


      </Truncate.Atom>
    </CommentContent>
  ) : null;

  if (isExpanded) {
    return textContent;
  }

  return textContent ? (
    <Truncate
      lines={maxLines}
      ellipsis={
        <ReadMoreButton onClick={expand}>
          <FormattedMessage id="comment.readmore" />
        </ReadMoreButton>
      }
    >
      {textContent}
    </Truncate>
  ) : null;
};

export default CommentText;
