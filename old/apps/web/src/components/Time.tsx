import { Time as ITime } from "../store/types";
import { formatTimeMS } from "../utils/formatting";

type TimeProps = {
  time: ITime | number | null;
};

const Time = ({ time }: TimeProps) => (
  <div>{formatTimeMS(typeof time === "number" ? time : time?.time)}</div>
);

export default Time;
