import { Editor } from '@tiptap/react';
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { FaLock, FaLockOpen } from 'react-icons/fa';
import { encrypt, getRandomSecuredLength } from '@/lib/util/editor';
import { useDisclosure } from '@nextui-org/react';
import AlertModal from '@/app/components/modal/AlertModal';

type Props = {
  editor: Editor;
  blocks: BlockType[];
  setBlocks: React.Dispatch<React.SetStateAction<BlockType[]>>;
  activeSecuredId: string;
};

const LockTextButton = ({
  editor,
  blocks,
  setBlocks,
  activeSecuredId,
}: Props) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    setIsActive(editor.isActive('securedText'));
  }, [editor.isActive('securedText')]);

  const onLock = () => {
    const nodes = editor.view.state.selection.content().content;

    if (nodes.childCount > 1) {
      // 개행된 문자열은 잠금 불가
      onOpen();
      return;
    }

    if (isActive && activeSecuredId) {
      const securedId = activeSecuredId;
      let lockedInfo: BlockType | null = null;
      const filtered = blocks.filter((block) => {
        if (block.id === securedId) lockedInfo = block;
        return block.id !== securedId;
      });

      !editor?.isDestroyed &&
        lockedInfo &&
        editor?.commands.unsetLock(lockedInfo);
      setBlocks(filtered);
    } else {
      const { from, to } = editor?.view.state.selection!;
      const text = editor?.state.doc.textBetween(from, to, '');

      if (!text) return;

      const lockLength = getRandomSecuredLength(text.length);

      const lockInfo: BlockType = {
        id: `b${v4()}b`,
        encrypted: encrypt(text),
        from,
        to: from + lockLength,
      };

      !editor?.isDestroyed && editor?.commands.setLock(lockInfo.id, lockLength);

      setBlocks((prev) => [...prev, lockInfo]);
    }
  };

  return (
    <button
      type="button"
      onClick={onLock}
      className={`p-1 ${isActive ? 'rounded bg-slate-400 text-black' : ''}`}
      aria-label="securedText"
    >
      {isActive ? <FaLock /> : <FaLockOpen />}
      <AlertModal
        content="개행된 문자열은 암호화할 수 없습니다."
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </button>
  );
};

export default LockTextButton;
