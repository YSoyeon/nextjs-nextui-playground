'use client';

import React, { useEffect, useState } from 'react';
import './Editor.css';
import { BubbleMenu, EditorContent } from '@tiptap/react';
import Toolbar from './editor/toolbar/Toolbar';

import 'highlight.js/styles/github-dark.css';
import useEditor from '@/lib/hooks/useEditor';
import { Node } from '@tiptap/pm/model';

const Editor = () => {
  const [selected, setSelected] = useState('Normal');
  const [activeNode, setActiveNode] = useState<Node>();
  const [isFocusingSecuredText, setIsFocusingSecuredText] = useState(false);

  const { editor } = useEditor();

  useEffect(() => {
    if (!editor) return;
    editor.on('selectionUpdate', ({ editor, transaction }) => {
      const activeNode = editor?.state.doc.nodeAt(editor?.state.selection.$from.pos);
      setActiveNode(activeNode!);
      if (editor.isActive('securedText')) {
        setIsFocusingSecuredText(true);
        return;
      }
      setIsFocusingSecuredText(false);
    });
  }, [editor]);

  useEffect(() => {
    if (editor) {
      editor.setEditable(!isFocusingSecuredText);
    }
  }, [isFocusingSecuredText, editor]);

  const activateEditor = () => editor!.chain().focus().run();

  return (
    <div>
      {editor && (
        <div className="flex flex-col gap-2">
          <Toolbar selected={selected} setSelected={setSelected} editor={editor} activeNode={activeNode!} />
          <EditorContent className="editor-content" editor={editor} onClick={activateEditor} />
          <BubbleMenu editor={editor}>bubble</BubbleMenu>
        </div>
      )}
    </div>
  );
};

export default Editor;
