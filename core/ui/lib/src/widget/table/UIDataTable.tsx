import React from "react";

import { CompactTable, Column } from "@table-library/react-table-library/compact";
import { Data, TableNode } from '@table-library/react-table-library/types/table';
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

export type DataTableColumn = {
  label: string;
  field: string;
}

export interface DataTableProps {
  columns: DataTableColumn[];   // column configs
  rows: any[];                  // actual data
  title?: string;
  height?: number;
  className?: string;
}

export function DataTable(props: DataTableProps) {
  let { title, rows, columns, className = "", height } = props;

  if (!rows || rows && !rows.length) return (
    <div>
      {title ? <div className="h5"> {title} </div> : null}
      <div> No data </div>
    </div>
  )

  const theme = useTheme(getTheme());
  const data = createData(rows);
  const columnConfigs = createColumnConfigs(columns)

  return (
    <div className={`flex-v ${className}`} style={{ height: height ? height : "auto" }}>
      {title ? <div className="h5"> {title} </div> : null}
      <CompactTable 
        data={data} columns={columnConfigs} theme={theme}
      />
    </div>
  )
}

function createColumnConfigs(columns: DataTableColumn[]): Column<TableNode>[] | undefined {
  try {
    const columnConfigs: Column<TableNode>[] = columns.map((column) => {
      return {
        label: column.label,
        renderCell: (node: any) => node[column.field]
      } as Column<TableNode>;
    })
    console.log(columnConfigs);
    return columnConfigs;
  } catch (error) {
    console.error(error);
  }
}

function createData(rows: any[]): Data<TableNode> {
  if (!rows) rows = [];
  const data: Data<TableNode> = {
    nodes: rows
  }
  return data;
}