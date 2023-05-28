import { Time as ITime } from "@/store";

type TimeProps = {
  time: ITime | number | null;
};

const Time = ({ time }: TimeProps) => {
  if (time === null) return <div>0.00</div>;
  return (
    <div>
      {((typeof time === "number" ? time : time.time) / 1000).toFixed(2)}
    </div>
  );
};

export default Time;
