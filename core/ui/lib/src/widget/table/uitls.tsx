import React, { CSSProperties } from "react";
import "./css/index.css"
import {
  useReactTable, getCoreRowModel, flexRender, createColumnHelper,
  ColumnDef, HeaderGroup, TableOptions, Column, Table, VisibilityState
} from '@tanstack/react-table'
import { DataTableColumn, DataTableProps } from "./UIDataTable";

export function getSelectedIds(table: Table<any>): number[] | undefined {
  try {
    let selectedRowIds = [] as number[]
    if (!table.getIsSomePageRowsSelected()) return selectedRowIds;
    selectedRowIds = table.getSelectedRowModel()
      .rows.map((row) => row.original.id as number);
    return selectedRowIds as number[];
  } catch (error) {
    console.error(error);
    return;
  }
}

export function getPinedColumnCSS(column: Column<any>): CSSProperties {
  const isPinned = column.getIsPinned();
  return {
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    width: column.getSize(),
    position: isPinned ? 'sticky' : 'relative',
    zIndex: isPinned ? 1 : 0,
  }
}

export function createColumnConfigs(props: DataTableProps) {
  const { columns, enableRowSelection } = props;
  try {
    const columnConfigs: ColumnDef<any>[] = columns.map((column: DataTableColumn) => {
      let { customRender, field, header, width = 300 } = column;
      if (!customRender) customRender = (record: any, index: number) => record[field];
      return {
        id: field,
        header: header,
        cell: ({ row }) => (
          customRender(row.original, row.index)
        ),
        size: width,
        // more options...
      } as ColumnDef<any>
    })

    if (enableRowSelection) {
      columnConfigs.unshift({
        id: 'selection',
        header: ({ table }) => (
          <input type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={() => {
              table.toggleAllRowsSelected()
              console.log("models", table.getSelectedRowModel());
            }} //or getToggleAllRowsSelectedHandler 
          />
        ),
        cell: ({ row }) => (
          <input type="checkbox"
            checked={row.getIsSelected()}
            onChange={() => row.toggleSelected()}
          />
        ),
        maxSize: 30,
      })
    }

    return columnConfigs
  } catch (error) {
    console.error(error);
  }
}

export function processColumnVisibility(columns: DataTableColumn[]): VisibilityState | undefined {
  if (!columns.length) return undefined;
  let columnVisibility = {} as VisibilityState;
  columns.map((column: DataTableColumn) => {
    if (column.hide) columnVisibility[column.field] = false;
    else columnVisibility[column.field] = true;
  })
  return columnVisibility;
}