import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { Editor } from '@tiptap/react';
import React, { useRef } from 'react';
import { MdImage } from 'react-icons/md';
import { FaYoutube } from 'react-icons/fa6';

type Props = {
  editor: Editor;
  type: 'image' | 'video';
};
const MediaButton = ({ editor, type }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const inputRef = useRef<HTMLInputElement>(null);

  const mediaType = type === 'image' ? '이미지' : '비디오';

  const insert = () => {
    const url = inputRef.current?.value;
    if (type === 'image') {
      editor.chain().focus().setImage({ src: url!, alt: 'image' }).run();
    } else {
      editor
        .chain()
        .focus()
        .setYoutubeVideo({
          src: url!,
          width: Math.max(320, 640),
          height: Math.max(180, 480),
        })
        .run();
    }
    close();
  };

  return (
    <>
      <button
        onClick={() => {
          onOpen();
        }}
        aria-label="image-renderer"
      >
        {type === 'image' ? <MdImage /> : <FaYoutube />}
      </button>
      <Modal backdrop="opaque" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {mediaType} 추가
              </ModalHeader>
              <ModalBody>
                <label>{mediaType} URL</label>
                <input
                  className="border-1 border-black rounded p-1 rounded-sm"
                  type="text"
                  ref={inputRef}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  취소
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    onClose();
                    insert();
                  }}
                >
                  추가
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default MediaButton;
