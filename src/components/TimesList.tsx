import SessionPicker from "./SessionPicker";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { useMemo } from "react";
import { useStore } from "@/store";
import useAverages from "@/hooks/useAverages";

const TimesList = () => {
  const { sessions, selectedSession } = useStore((state) => state);

  const times = useMemo(
    () => sessions.find((s) => s.name === selectedSession)?.times || [],
    [sessions, selectedSession]
  );

  const averagesColDefs: ColDef[] = useMemo(
    () =>
      [
        {
          field: "label",
          headerName: "Avg.",
        },
        {
          field: "current",
        },
        {
          field: "best",
        },
      ] as ColDef[],
    []
  );

  const timeColDefs: ColDef[] = useMemo(
    () => [
      {
        headerName: "#",
        valueGetter: (params) => times.length - (params.node?.rowIndex || 0),
        maxWidth: 60
      },
      {
        field: "time",
      },
      {
        field: "ao5",
      },
      {
        field: "ao12",
      },
    ] as ColDef[],
    [times]
  );

  const { averagesTableRowData } = useAverages();

  return (
    <div className="h-screen flex flex-col gap-2 p-5">
      <SessionPicker />
      <div className="w-full ag-theme-balham-dark ag-theme-yachtimer">
        <AgGridReact
          onGridReady={({ api }) => api.sizeColumnsToFit()}
          rowData={averagesTableRowData}
          columnDefs={averagesColDefs}
          domLayout="autoHeight"
          suppressHorizontalScroll
          defaultColDef={{
            suppressMovable: true,
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
          }}
          getRowId={(params) => params.data.id}
        />
      </div>
    </div>
  );
};

export default TimesList;
