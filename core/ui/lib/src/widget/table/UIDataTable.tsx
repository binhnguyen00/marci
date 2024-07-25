import React from "react";

import "./css/index.css"
import {
  useReactTable,
  ColumnResizeMode,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  ColumnResizeDirection,
  createColumnHelper,
  HeaderGroup, TableOptions
} from '@tanstack/react-table'

export interface DataTableColumn {
  field: string;
  header: string;
  customRender?: (record: any, index: number) => any;
}

export interface DataTableProps {
  records: any[];
  columns: DataTableColumn[];
  title?: string;
  height?: number;
  className?: string;
}

export function DataTable(props: DataTableProps) {
  let { title = "", className = "", height = 400, records, columns } = props;
  console.log(records);
  
  const columnConfigs = React.useMemo(() => 
    createColumnConfigs(columns), 
  [columns]);
  const table = useReactTable({
    data: records,
    columns: columnConfigs,
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  } as TableOptions<any>)

  return (
    <div className={`${className}`}>
      <div className="h5"> {title} </div>
      <div style={{ direction: table.options.columnResizeDirection }}>
        <div className="overflow-x-auto" style={{ height: height }}>
          <table
            style={{ 
              width: table.getCenterTotalSize() 
            }}
          >

            <thead>
              {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th   
                      key={header.id} 
                      colSpan={header.colSpan} 
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())
                      }
                      <div
                        onDoubleClick={() => header.column.resetSize()}
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className={`resizer ${table.options.columnResizeDirection} 
                                            ${header.column.getIsResizing() ? 'isResizing' : ''}`}
                        style={{
                          transform:
                            table.options.columnResizeMode === 'onEnd' && header.column.getIsResizing()
                            ? `translateX(${
                              (table.options.columnResizeDirection === 'rtl' ? -1 : 1) *
                              (table.getState().columnSizingInfo.deltaOffset ?? 0)
                            }px)`
                            : "",
                        }}
                      />
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  )
}

export function createColumnConfigs(columns: DataTableColumn[]) {
  try {
    const columnConfigs: ColumnDef<any>[] = columns.map((column: DataTableColumn) => {
      if (!column.customRender) {
        column.customRender = (record: any, index: number) => record[column.field]
      }
      return {
        header: column.header,
        accessorFn: column.customRender,
        // more options...
      } as ColumnDef<any>
    })
    return columnConfigs
  } catch (error) {
    console.error(error);
  }
}