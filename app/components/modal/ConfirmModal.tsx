import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import React from "react";

type Props = {
	isOpen: boolean;
	onOpenChange: () => void;
	onConfirm: () => void;
	title?: string;
	content: React.ReactNode;
};
const ConfirmModal = ({ isOpen, onOpenChange, onConfirm, title, content }: Props) => {
	return (
		<Modal backdrop="opaque" isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				{(onClose) => (
					<>
						{title && <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>}
						<ModalBody>{content}</ModalBody>
						<ModalFooter>
							<Button color="danger" onPress={onClose}>
								취소
							</Button>
							<Button
								color="primary"
								onPress={() => {
									onClose();
									onConfirm();
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
};

export default ConfirmModal;
