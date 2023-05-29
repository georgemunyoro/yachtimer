import { useStore } from "@/store";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, IconButton, Select, useDisclosure } from "@chakra-ui/react";
import SessionEditorModal, { SessionEditorMode } from "./SessionEditorModal";
import { useState } from "react";

const SessionPicker = () => {
  const { sessions, selectedSession, setSelectedSession } = useStore(
    (state) => state
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [sessionEditorMode, setSessionEditorMode] = useState<SessionEditorMode>(
    SessionEditorMode.New
  );

  if (!selectedSession) return null;

  return (
    <div className="flex flex-col gap-2">
      <Select
        className="text-slate-400"
        borderColor="slategray"
        iconColor="slategray"
        value={selectedSession}
        onChange={(e) => {
          if (e.target.value) setSelectedSession(e.target.value);
        }}
      >
        {sessions.map(({ name }) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </Select>
      <div className="flex gap-2">
        <Button
          colorScheme="teal"
          className="w-full"
          leftIcon={<AddIcon />}
          onClick={() => {
            setSessionEditorMode(SessionEditorMode.New);
            onOpen();
          }}
        >
          New Session
        </Button>
        <IconButton
          aria-label="Rename session"
          icon={<EditIcon />}
          colorScheme="teal"
          onClick={() => {
            setSessionEditorMode(SessionEditorMode.Edit);
            onOpen();
          }}
        />
        <IconButton
          aria-label="Delete session"
          icon={<DeleteIcon />}
          colorScheme="teal"
          onClick={() => {
            setSessionEditorMode(SessionEditorMode.Delete);
            onOpen();
          }}
        />
        <SessionEditorModal
          isOpen={isOpen}
          onClose={onClose}
          mode={sessionEditorMode}
        />
      </div>
    </div>
  );
};

export default SessionPicker;
