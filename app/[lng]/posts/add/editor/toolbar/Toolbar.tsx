import { Editor } from '@tiptap/react';
import React, { useState } from 'react';
import HeadingSelect from './HeadingSelect';
import ToggleButton from '@/app/components/button/ToggleButton';
import { FaBold, FaCode, FaItalic, FaQuoteLeft } from 'react-icons/fa';
import { BiCodeBlock } from 'react-icons/bi';
import { MdChecklist, MdImage } from 'react-icons/md';
import { GoListOrdered, GoListUnordered } from 'react-icons/go';

import ClearButton from './ClearButton';
import MediaButton from './MediaButton';
import LockTextButton from './LockTextButton';
import CommentButton from './CommentButton';

type Props = {
  editor: Editor;
  activeSecuredId: string;
  activateCommentingMode: () => void;
  blocks: BlockType[];
  setBlocks: React.Dispatch<React.SetStateAction<BlockType[]>>;
};

const Toolbar = ({ editor, activeSecuredId, activateCommentingMode, blocks, setBlocks }: Props) => {
  const [isBlockSelected, setIsBlockSelected] = useState(false);

  return (
    <div className="w-[700px] flex gap-3 border-solid border-1 border-gray-300 p-2">
      <HeadingSelect editor={editor} />
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
      <LockTextButton
        editor={editor}
        isBlockSelected={isBlockSelected}
        blocks={blocks}
        setBlocks={setBlocks}
        activeSecuredId={activeSecuredId}
      />
      <CommentButton editor={editor} activateCommentingMode={activateCommentingMode} />
      <ClearButton editor={editor} />
    </div>
  );
};

export default Toolbar;
