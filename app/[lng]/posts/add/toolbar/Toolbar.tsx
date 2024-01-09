import { Editor } from '@tiptap/react';
import React from 'react';
import HeadingSelect from './HeadingSelect';
import ToggleButton from '@/app/[lng]/components/button/ToggleButton';
import { FaBold, FaCode, FaItalic, FaQuoteLeft } from 'react-icons/fa';
import { BiCodeBlock } from 'react-icons/bi';

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
        aria-label="blockQuote"
        selected={editor.isActive('blockQuote')}
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
    </div>
  );
};

export default Toolbar;
