import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  onConfirm?: () => void;
  title?: string;
  content: React.ReactNode;
};

const AlertModal = ({
  isOpen,
  onOpenChange,
  onConfirm,
  title,
  content,
}: Props) => (
  <Modal backdrop="opaque" isOpen={isOpen} onOpenChange={onOpenChange}>
    <ModalContent>
      {(onClose) => (
        <>
          {title && (
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
          )}
          <ModalBody>{content}</ModalBody>
          <ModalFooter>
            <Button
              className="bg-green-500"
              onPress={() => {
                onClose();
                if (onConfirm) onConfirm();
              }}
            >
              확인
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
);

export default AlertModal;
