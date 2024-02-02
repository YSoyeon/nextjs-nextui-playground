import React, { useEffect } from 'react';
import StarterKit from '@tiptap/starter-kit';
import Paragraph from '@tiptap/extension-paragraph';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import {
  ReactNodeViewRenderer,
  useEditor as useTiptapEditor,
} from '@tiptap/react';
import Youtube from '@tiptap/extension-youtube';

import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import { common, createLowlight } from 'lowlight';

import CodeBlock from '@/app/[lng]/posts/add/editor/node/CodeBlock';
import ResizableImageExtension from '@/app/[lng]/posts/add/editor/node/ResizableImage';
import { SecuredText } from '@/app/[lng]/posts/add/editor/node/SecuredText';
import { Comment } from '@/app/[lng]/posts/add/editor/node/Comment';

type Props = {
  activeCommentText: (commentId: string) => void;
  activeSecuredText: (securedId: string) => void;
};

const useEditor = ({ activeCommentText, activeSecuredText }: Props) => {
  const lowlight = createLowlight(common);

  useEffect(() => {
    lowlight.register('html', html);
    lowlight.register('css', css);
    lowlight.register('js', js);
    lowlight.register('ts', ts);
  }, [lowlight]);

  const editor = useTiptapEditor({
    extensions: [
      StarterKit,
      Paragraph,
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlock);
        },
      }).configure({ lowlight }),
      TaskList,
      TaskItem,
      // Image,
      ResizableImageExtension,
      Youtube.configure({ controls: false }),
      SecuredText.configure({
        HTMLAttributes: {
          class: 'securedText',
        },
        onSecuredTextActivated: (securedId) => {
          activeSecuredText(securedId);
        },
      }),
      Comment.configure({
        HTMLAttributes: {
          class: 'my-comment',
        },
        onCommentActivated: (commentId) => {
          activeCommentText(commentId);
          // if (commentId) setTimeout(() => focusCommentWithActiveId(commentId));
        },
      }),
    ],
  });

  return { editor };
};

export default useEditor;
