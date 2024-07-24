import React from "react";
import { DataGrid, DataGridProps, GridColDef } from "@mui/x-data-grid";

interface DataTableProps extends DataGridProps {
  config: DataTableConfig;
}

export function DataTable(props: DataTableProps) {
  let { config } = props
  let { columnConfig, rows, height = 400 } = config

  return (
    <div style={{ height: height, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columnConfig}
        autoPageSize
        checkboxSelection
      />
    </div>
  )
}

export interface DataTableConfig {
  columnConfig: GridColDef<any>[],    // configs for the column
  rows: Array<any>                    // actual data
  height?: number                     // as pixels
}