import { Editor } from '@tiptap/react';
import React from 'react';
import HeadingSelect from './HeadingSelect';
import ToggleButton from '@/app/[lng]/components/button/ToggleButton';
import { FaBold } from 'react-icons/fa';

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
    </div>
  );
};

export default Toolbar;
