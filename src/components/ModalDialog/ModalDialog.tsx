import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";
import { Dispatch, FC, SetStateAction } from "react";

interface ModalDialogProps {
  title: string;
  message: string;
  isOpen: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  onConfirm?: () => void;
}

const ModalDialog: FC<ModalDialogProps> = ({
  title,
  message,
  onConfirm,
  isOpen,
  setOpenModal,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={() => setOpenModal(false)}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              <p>{message}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onConfirm}>
                Sí
              </Button>
              <Button color="primary" onPress={() => setOpenModal(false)}>
                No
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalDialog;
