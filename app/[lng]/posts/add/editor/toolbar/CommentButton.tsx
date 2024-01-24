import Drawer from '@/app/components/Drawer';
import React, { useState } from 'react';
import { BiCommentDetail } from 'react-icons/bi';
import CommentList from '../CommentList';
import { Editor } from '@tiptap/react';
import { v4 } from 'uuid';

type Props = {
  editor: Editor;
};

const CommentButton = ({ editor }: Props) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [activeCommentId, setActiveCommentId] = useState<string>('');

  const onClick = () => {
    const { from, to } = editor.state.selection!;
    console.log(`from : ${from} , to : ${to}`);
    const text = editor?.state.doc.textBetween(from, to, '');

    const newComment = {
      parentId: `a${v4()}a`,
      text,
      comments: [
        { id: `c${v4()}c`, userName: 'soyeon', comment: 'this is a comment', replies: [], createdAt: new Date() },
      ],
    };
    editor?.commands.setComment(newComment.parentId);

    // open comment list drawer
    setIsActive((prev) => !prev);
  };

  const addComment = () => {};

  return (
    <button
      onClick={onClick}
      className={`p-1 ${isActive ? 'bg-slate-400 text-black rounded' : ''}`}
      aria-label="securedText"
    >
      <BiCommentDetail />
      <Drawer isOpen={isActive}>
        <CommentList
          commentObj={comments.filter((comment) => comment.parentId === activeCommentId)[0]}
          addComment={addComment}
        />
      </Drawer>
    </button>
  );
};
export default CommentButton;
