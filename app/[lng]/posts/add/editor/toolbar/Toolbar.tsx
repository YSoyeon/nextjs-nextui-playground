import { Editor } from '@tiptap/react';
import React, { useState } from 'react';
import HeadingSelect from './HeadingSelect';
import ToggleButton from '@/app/[lng]/components/button/ToggleButton';
import { FaBold, FaCode, FaItalic, FaQuoteLeft } from 'react-icons/fa';
import { BiCodeBlock } from 'react-icons/bi';
import { MdChecklist, MdImage } from 'react-icons/md';
import { GoListOrdered, GoListUnordered } from 'react-icons/go';

import { useDisclosure } from '@nextui-org/react';
import ClearButton from './ClearButton';
import MediaButton from './MediaButton';

type Props = {
  editor: Editor;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

const Toolbar = ({ editor, selected, setSelected }: Props) => {
  return (
    <div className="flex gap-3 border-solid border-1 border-foreground p-2">
      <HeadingSelect editor={editor} selected={selected} setSelected={setSelected} />
      <ToggleButton
        onClick={() => editor!.chain().focus().toggleBold().run()}
        selected={editor.isActive('bold')}
        aria-label="bold"
      >
        <FaBold />
      </ToggleButton>
      <ToggleButton
        onClick={() => editor!.chain().focus().toggleItalic().run()}
        selected={editor.isActive('italic')}
        aria-label="italic"
      >
        <FaItalic />
      </ToggleButton>
      <ToggleButton
        onClick={() => editor!.chain().focus().toggleCode().run()}
        selected={editor.isActive('code')}
        aria-label="code"
      >
        <FaCode />
      </ToggleButton>
      <ToggleButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        aria-label="blockquote"
        selected={editor.isActive('blockquote')}
      >
        <FaQuoteLeft />
      </ToggleButton>
      <ToggleButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        aria-label="codeBlock"
        selected={editor.isActive('codeBlock')}
      >
        <BiCodeBlock />
      </ToggleButton>
      <ToggleButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        aria-label="bullettList"
        selected={editor.isActive('bulletList')}
      >
        <GoListUnordered />
      </ToggleButton>
      <ToggleButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        aria-label="orderedList"
        selected={editor.isActive('orderedList')}
      >
        <GoListOrdered />
      </ToggleButton>
      <ToggleButton
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        aria-label="taskList"
        selected={editor.isActive('taskList')}
      >
        <MdChecklist />
      </ToggleButton>
      <MediaButton editor={editor} type={'image'} />
      <MediaButton editor={editor} type={'video'} />
      <ClearButton editor={editor} />
    </div>
  );
};

export default Toolbar;
