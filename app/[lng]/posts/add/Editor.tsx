'use client';

import React, { useEffect, useState } from 'react';
import './Editor.css';
import { EditorContent, ReactNodeViewRenderer, useEditor } from '@tiptap/react';
import { Extension } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Paragraph from '@tiptap/extension-paragraph';
import Toolbar from './editor/toolbar/Toolbar';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';

import { common, createLowlight } from 'lowlight';

import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import CodeBlock from './editor/component/CodeBlock';

import 'highlight.js/styles/github-dark.css';
import Youtube from '@tiptap/extension-youtube';
import ResizableImageExtension from './editor/component/ResizableImage';

const Editor = () => {
  const [selected, setSelected] = useState('Normal');
  const lowlight = createLowlight(common);

  useEffect(() => {
    lowlight.register('html', html);
    lowlight.register('css', css);
    lowlight.register('js', js);
    lowlight.register('ts', ts);
  }, [lowlight]);

  const editor = useEditor({
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
      Extension.create({
        addKeyboardShortcuts() {
          return {
            Enter: () => {
              setSelected('normal');
              return false;
            },
          };
        },
      }),
    ],
    onSelectionUpdate: () => {},
  });

  const activateEditor = () => editor!.chain().focus().run();

  return (
    <div>
      {editor && (
        <div className="flex flex-col gap-2">
          <Toolbar selected={selected} setSelected={setSelected} editor={editor} />
          <EditorContent className="editor-content" editor={editor} onClick={activateEditor} />
        </div>
      )}
    </div>
  );
};

export default Editor;
