import { useMemo } from "react";
import { useStore } from "@/store";

const useCurrentSession = () => {
  const { selectedSession, sessions } = useStore((state) => state);

  const currentSession = useMemo(
    () => sessions.find((s) => s.name === selectedSession),
    [sessions, selectedSession]
  );

  return {
    currentSession,
  };
};

export default useCurrentSession;
