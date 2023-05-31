import useCurrentSession from "../hooks/useCurrentSession";
import { useStore } from "../store";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";

export enum SessionEditorMode {
  New = "new",
  Edit = "edit",
  Delete = "delete",
}

type NewSessionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  mode: SessionEditorMode;
};

const DeleteSessionContent = ({
  onClose,
}: Pick<NewSessionModalProps, "onClose">) => {
  const { currentSession } = useCurrentSession();
  const { deleteSession } = useStore((state) => state);

  return (
    <>
      <ModalHeader>Delete session</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        Are you sure you want to delete session
        <span className="font-bold"> {currentSession?.name}</span>?
      </ModalBody>
      <ModalFooter>
        <Button
          colorScheme="teal"
          mr={3}
          onClick={() => {
            if (!currentSession) return;
            deleteSession(currentSession.name);
            onClose();
          }}
        >
          Continue
        </Button>
        <Button colorScheme="red" onClick={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </>
  );
};

const EditSessionContent = ({
  onClose,
}: Pick<NewSessionModalProps, "onClose">) => {
  const { updateSession } = useStore((state) => state);
  const { currentSession } = useCurrentSession();
  const [sessionName, setSessionName] = useState(currentSession?.name ?? "");

  return (
    <>
      <ModalHeader>Edit session</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <div>Name</div>
        <Input
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
          autoFocus
        />
      </ModalBody>
      <ModalFooter>
        <Button
          colorScheme="teal"
          mr={3}
          onClick={() => {
            updateSession({
              name: sessionName,
            });
            onClose();
          }}
        >
          Continue
        </Button>
        <Button colorScheme="red" onClick={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </>
  );
};

const NewSessionContent = ({
  onClose,
}: Pick<NewSessionModalProps, "onClose">) => {
  const [sessionName, setSessionName] = useState("");
  const { createSession } = useStore((state) => state);

  return (
    <>
      <ModalHeader>Create a new session</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <div>Name</div>
        <Input
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
          autoFocus
        />
      </ModalBody>
      <ModalFooter>
        <Button
          colorScheme="teal"
          mr={3}
          onClick={() => {
            createSession(sessionName);
            onClose();
          }}
        >
          Continue
        </Button>
        <Button colorScheme="red" onClick={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </>
  );
};

const SessionEditorModal = ({
  isOpen,
  onClose,
  mode,
}: NewSessionModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        {mode === SessionEditorMode.New && (
          <NewSessionContent onClose={onClose} />
        )}
        {mode === SessionEditorMode.Edit && (
          <EditSessionContent onClose={onClose} />
        )}
        {mode === SessionEditorMode.Delete && (
          <DeleteSessionContent onClose={onClose} />
        )}
      </ModalContent>
    </Modal>
  );
};

export default SessionEditorModal;
