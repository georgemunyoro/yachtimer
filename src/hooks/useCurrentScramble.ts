import { useStore } from "@/store";

const useCurrentScramble = () => {
  const { scrambleHistory, scrambleIndex } = useStore((state) => state);
  return scrambleIndex === null ? null : scrambleHistory[scrambleIndex];
};

export default useCurrentScramble;
