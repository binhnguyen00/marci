import React from "react";
import { DataGrid, DataGridProps, GridColDef } from "@mui/x-data-grid";

interface DataTableProps extends DataGridProps {
}

const columns: readonly GridColDef<any>[] = [];

export function DataTable(props: DataTableProps) {
  return (
    <DataGrid 
      columns={columns}
    >

    </DataGrid>
  )
}