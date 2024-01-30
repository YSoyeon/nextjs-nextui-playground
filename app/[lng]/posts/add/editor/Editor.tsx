'use client';

import React, { useEffect, useState } from 'react';
import './Editor.css';
import { BubbleMenu, EditorContent } from '@tiptap/react';
import Toolbar from './toolbar/Toolbar';

import 'highlight.js/styles/github-dark.css';
import useEditor from '@/lib/hooks/useEditor';
import Drawer from '@/app/components/Drawer';
import CommentList from './CommentList';
import { v4 } from 'uuid';
import _ from 'lodash';
import BubbleToolbar from './toolbar/BubbleToolbar';
import AddComment from './AddComment';
import { CardBody } from '@nextui-org/react';

const Editor = () => {
  const [isActiveDrawer, setIsActiveDrawer] = useState<boolean>(false);

  const [comments, setComments] = useState<CommentType[]>([]);
  const [activeSecuredId, setActiveSecuredId] = useState<string>('');
  const [activeCommentId, setActiveCommentId] = useState<string>('');
  const [isCommentingMode, setIsCommentingMode] = useState<boolean>(false);

  const [blocks, setBlocks] = useState<BlockType[]>([]);

  const activeCommentText = (commentId: string) => {
    if (commentId) {
      setActiveCommentId(commentId);
      setIsActiveDrawer(true);
    } else {
      setIsCommentingMode(false);
    }
  };

  const activeSecuredText = (securedId: string) => {
    setActiveSecuredId(securedId);
  };

  const { editor } = useEditor({ activeCommentText, activeSecuredText });

  useEffect(() => {
    if (editor) {
      editor.setEditable(activeSecuredId ? false : true);
    }
  }, [activeSecuredId, editor]);

  const activateEditor = () => editor!.chain().focus().run();

  const addComment = (parentId: string, comment: string) => {
    const copied = _.cloneDeep(comments);
    const mappedComments = copied.map((c) => {
      if (c.parentId === parentId) {
        c.comments.push({
          id: `c${v4()}c`,
          userName: 'soyeon',
          comment: comment!,
          replies: [],
          createdAt: new Date(),
        });
      }
      return c;
    });
    setComments(mappedComments);
  };

  return (
    <CardBody>
      {editor && (
        <div className="flex flex-col gap-3 justify-center items-center">
          <Toolbar
            editor={editor}
            activeSecuredId={activeSecuredId}
            activateCommentingMode={() => setIsCommentingMode(true)}
            blocks={blocks}
            setBlocks={setBlocks}
          />
          <EditorContent
            className="editor-content"
            style={{ border: '1px solid #ccc', padding: '0.5rem 1rem', width: '700px', height: '30rem' }}
            editor={editor}
            onClick={activateEditor}
          />
          <BubbleMenu editor={editor}>
            <div className="bg-white border-2 p-1">
              {isCommentingMode ? (
                <AddComment
                  editor={editor}
                  setComment={(comment) => setComments((prev) => [...prev, comment])}
                  close={() => setIsCommentingMode(false)}
                />
              ) : (
                <BubbleToolbar editor={editor} activateCommentingMode={() => setIsCommentingMode(true)} />
              )}
            </div>
          </BubbleMenu>
        </div>
      )}
      <Drawer isOpen={isActiveDrawer}>
        <CommentList
          commentObj={comments.filter((comment) => comment.parentId === activeCommentId)[0]}
          addComment={addComment}
        />
      </Drawer>
    </CardBody>
  );
};

export default Editor;
