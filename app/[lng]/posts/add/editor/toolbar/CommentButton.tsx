import React, { useState } from 'react';
import { BiCommentDetail } from 'react-icons/bi';
import { Editor } from '@tiptap/react';

type Props = {
  editor: Editor;
  activateCommentingMode: () => void;
};

const CommentButton = ({ editor, activateCommentingMode }: Props) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const onClick = () => {
    alert('todo');
    return;
    const { from, to } = editor.state.selection!;
    const isSelected = from !== to;

    setIsActive((prev) => !prev);

    if (!isSelected) return;
    activateCommentingMode();
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-1 ${isActive ? 'rounded bg-slate-400 text-black' : ''}`}
      aria-label="securedText"
    >
      <BiCommentDetail />
    </button>
  );
};
export default CommentButton;
