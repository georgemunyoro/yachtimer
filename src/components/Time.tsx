import { Time as ITime } from "@/store";

type TimeProps = {
  time: ITime | number | null;
};

const Time = ({ time }: TimeProps) => {
  if (time === null) return <div>0.00</div>;
  return <div>{typeof time === "number" ? time : time.time}</div>;
};

export default Time;
