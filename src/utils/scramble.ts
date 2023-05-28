import { Scrambow } from "scrambow";

export enum ScrambleType {
  WCA_222 = "222",
  WCA_333 = "333",
  WCA_444 = "444",
  WCA_555 = "555",
  WCA_666 = "666",
  WCA_777 = "777",
}

export const generateScramble = (scrambleType: ScrambleType): string => {
  const generatedScramble = new Scrambow()
    .setType(scrambleType)
    .setSeed(Math.random() * 1000000)
    .get()[0].scramble_string;

  return generatedScramble;
};
