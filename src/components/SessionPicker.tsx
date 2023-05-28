import { useStore } from "@/store";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, IconButton, Select } from "@chakra-ui/react";

const SessionPicker = () => {
  const { sessions, selectedSession, setSelectedSession } = useStore(
    (state) => state
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
        <Button colorScheme="teal" className="w-full" leftIcon={<AddIcon />}>
          New Session
        </Button>
        <IconButton
          aria-label="Rename session"
          icon={<EditIcon />}
          colorScheme="teal"
        />
        <IconButton
          aria-label="Delete session"
          icon={<DeleteIcon />}
          colorScheme="teal"
        />
      </div>
    </div>
  );
};

export default SessionPicker;
