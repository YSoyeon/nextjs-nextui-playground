'use client';

import React, { useState } from 'react';
import './Editor.css';
import { EditorContent, useEditor } from '@tiptap/react';
import { Extension } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Paragraph from '@tiptap/extension-paragraph';
import Toolbar from './toolbar/Toolbar';

const Editor = () => {
  const [selected, setSelected] = useState('Normal');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Paragraph,
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
