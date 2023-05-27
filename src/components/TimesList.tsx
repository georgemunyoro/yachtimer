import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const times = new Array(123).fill(null).map((i) => {
  return {
    time: 12.42,
    ao5: 12.42,
    ao12: 12.42,
  };
});

const averages = [
  { label: "time", current: 25.62, best: 14.36 },
  { label: "mo3", current: 25.62, best: 14.36 },
  { label: "ao5", current: 25.62, best: 14.36 },
  { label: "ao12", current: 25.62, best: 14.36 },
  { label: "ao25", current: 25.62, best: 14.36 },
  { label: "ao50", current: 25.62, best: 14.36 },
  { label: "ao100", current: 25.62, best: 14.36 },
  { label: "ao200", current: 25.62, best: 14.36 },
  { label: "ao500", current: 25.62, best: 14.36 },
  { label: "ao1000", current: 25.62, best: 14.36 },
  { label: "ao2000", current: 25.62, best: 14.36 },
];

const TimesList = () => {
  return (
    <div className="h-screen flex flex-col w-min border-r-2 border-slate-500">
      <TableContainer className="h-full">
        <Table size="sm">
          <Thead>
            <Tr>
              <Th className="!border-slate-500 text-slate-400"></Th>
              <Th className="!border-slate-500 text-slate-400">Current</Th>
              <Th className="!border-slate-500 text-slate-400">Best</Th>
            </Tr>
          </Thead>
          <Tbody>
            {averages.map(({ label, current, best }, index) => (
              <Tr>
                <Td className="!border-slate-700 text-slate-500">{label}</Td>
                <Td className="!border-slate-700 text-slate-500">{current}</Td>
                <Td className="!border-slate-700 text-slate-500">{best}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <TableContainer className="h-full">
        <Table size="sm">
          <Thead>
            <Tr>
              <Th className="!border-slate-500 text-slate-400">#</Th>
              <Th className="!border-slate-500 text-slate-400">Time</Th>
              <Th className="!border-slate-500 text-slate-400">ao5</Th>
              <Th className="!border-slate-500 text-slate-400">ao12</Th>
            </Tr>
          </Thead>
          <Tbody>
            {times.map(({ time, ao5, ao12 }, index) => (
              <Tr>
                <Td className="!border-slate-700 text-slate-500 border-r-[1px]">
                  {times.length - index}
                </Td>
                <Td className="!border-slate-700 text-slate-500">{time}</Td>
                <Td className="!border-slate-700 text-slate-500">{ao5}</Td>
                <Td className="!border-slate-700 text-slate-500">{ao12}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TimesList;
