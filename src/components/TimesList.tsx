import SessionPicker from "./SessionPicker";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { useMemo } from "react";
import { useStore } from "@/store";
import { Time } from "@/store/types";
import useAverages from "@/hooks/useAverages";
import { DeleteIcon } from "@chakra-ui/icons";
import { formatTimeMS } from "@/utils/formatting";

const timeValueFormatter = ({ value }: { value: number }) =>
  value === 0 || value === null ? "-" : formatTimeMS(value);

const TimesList = () => {
  const { sessions, selectedSession, deleteTime } = useStore((state) => state);

  const times = useMemo(
    () => sessions.find((s) => s.name === selectedSession)?.times || [],
    [sessions, selectedSession]
  );

  const averagesColDefs: ColDef[] = useMemo(
    () =>
      [
        {
          field: "label",
          headerName: "Average",
        },
        {
          field: "current",
          valueFormatter: timeValueFormatter,
        },
        {
          field: "best",
          valueFormatter: timeValueFormatter,
        },
      ] as ColDef[],
    []
  );

  const timeColDefs: ColDef[] = useMemo(
    () =>
      [
        {
          headerName: "#",
          valueGetter: (params) => times.length - (params.node?.rowIndex || 0),
          width: 50,
        },
        {
          field: "time",
          valueFormatter: timeValueFormatter,
          flex: 1,
        },
        {
          field: "ao5",
          valueFormatter: timeValueFormatter,
          flex: 1,
        },
        {
          field: "ao12",
          valueFormatter: timeValueFormatter,
          flex: 1,
        },
        {
          headerName: "",
          flex: 1,
          cellClass: "!p-0 !flex items-center justify-center",
          width: 40,
          maxWidth: 40,
          cellRenderer: ({ data }: { data: Time }) => {
            return (
              <div className="flex text-white gap-2 items-center justify-center shown-on-row-hover">
                <DeleteIcon
                  onClick={() => deleteTime(data.id)}
                  fontSize="small"
                  className="!text-slate-600 hover:!text-red-500 cursor-pointer"
                />
              </div>
            );
          },
        },
      ] as ColDef[],
    [deleteTime, times.length]
  );

  const { averagesTableRowData } = useAverages();

  return (
    <div className="h-screen flex flex-col gap-2 p-5">
      <SessionPicker />
      <div className="w-full ag-theme-balham-dark ag-theme-yachtimer">
        <AgGridReact
          suppressCellFocus={true}
          onGridReady={({ api }) => api.sizeColumnsToFit()}
          rowData={averagesTableRowData}
          columnDefs={averagesColDefs}
          domLayout="autoHeight"
          suppressHorizontalScroll
          defaultColDef={{
            suppressMovable: true,
            cellClass: "!flex items-start justify-center !p-[0]",
          }}
          getRowId={(params) => params.data.label}
        />
      </div>
      <div className="w-full grow ag-theme-balham-dark ag-theme-yachtimer">
        <AgGridReact
          onGridReady={({ api }) => api.sizeColumnsToFit()}
          rowData={times}
          columnDefs={timeColDefs}
          suppressHorizontalScroll
          defaultColDef={{
            suppressMovable: true,
            cellClass: "!flex items-start justify-center !p-[0]",
          }}
          getRowId={(params) => params.data.id}
        />
      </div>
    </div>
  );
};

export default TimesList;
