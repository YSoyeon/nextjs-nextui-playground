import React from 'react';
import { Editor } from '@tiptap/react';
import CommentButton from './CommentButton';

type Props = {
  editor: Editor;
  activateCommentingMode: () => void;
};

const BubbleToolbar = ({ editor, activateCommentingMode }: Props) => (
  <div className="flex gap-3 border-1 border-solid border-foreground p-2">
    <CommentButton
      editor={editor}
      activateCommentingMode={activateCommentingMode}
    />
  </div>
);

export default BubbleToolbar;
