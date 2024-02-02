import React from 'react';
import CommentButton from './CommentButton';
import { Editor } from '@tiptap/react';

type Props = {
  editor: Editor;
  activateCommentingMode: () => void;
};

const BubbleToolbar = ({ editor, activateCommentingMode }: Props) => {
  return (
    <div className="flex gap-3 border-solid border-1 border-foreground p-2">
      <CommentButton
        editor={editor}
        activateCommentingMode={activateCommentingMode}
      />
    </div>
  );
};

export default BubbleToolbar;
