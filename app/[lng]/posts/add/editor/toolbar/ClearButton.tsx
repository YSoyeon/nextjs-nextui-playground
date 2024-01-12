import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from '@nextui-org/react';
import { Editor } from '@tiptap/react';
import React, { useState } from 'react';

type Props = {
  editor: Editor;
};
const ClearButton = ({ editor }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [clearLoading, setClearLoading] = useState(false);

  return (
    <>
      <button
        className="bg-sky-300	p-1 rounded"
        onClick={() => {
          onOpen();
          //  editor.commands.clearContent()
        }}
      >
        clear
      </button>
      <Modal backdrop="opaque" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">내용 삭제</ModalHeader>
              <ModalBody>
                {!clearLoading ? (
                  <p>
                    에디터에 작성된 내용을 모두 지우시겠습니까? <br />{' '}
                    <span className="text-rose-600">⚠️지운 내용은 복구할 수 없습니다.</span>
                  </p>
                ) : (
                  <Spinner />
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  취소
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    setClearLoading(true);
                    setTimeout(() => {
                      setClearLoading(false);
                      onClose();
                      editor.commands.clearContent();
                    }, 1000);
                  }}
                >
                  지우기
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ClearButton;
