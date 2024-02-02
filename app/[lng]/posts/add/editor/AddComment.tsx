import { Button } from '@nextui-org/react';
import { Editor } from '@tiptap/react';
import React, { useRef } from 'react';
import { v4 } from 'uuid';

type Props = {
  editor: Editor;
  setComment: (comment: CommentType) => void;
  close: () => void;
};

const AddComment = ({ editor, setComment, close }: Props) => {
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const onComment = () => {
    const commentText = commentRef.current?.value;

    if (!commentText) return;

    const { from, to } = editor.state.selection!;
    const text = editor?.state.doc.textBetween(from, to, '');

    const newComment: CommentType = {
      parentId: `a${v4()}a`,
      content: text,
      comments: [
        {
          id: `c${v4()}c`,
          userName: 'soyeon',
          comment: commentText,
          replies: [],
          createdAt: new Date(),
        },
      ],
    };
    editor?.commands.setComment(newComment.parentId);
    setComment(newComment);
  };

  return (
    <div className="p-1 flex flex-col justify-center gap-1">
      <textarea className="focus:outline-none border-1" ref={commentRef} />
      <div className="flex gap-1 justify-center">
        <Button color="primary" className="text-white" onClick={close}>
          cancel
        </Button>
        <Button
          onClick={() => {
            onComment();
            close();
          }}
        >
          comment
        </Button>
      </div>
    </div>
  );
};

export default AddComment;
