import React, { CSSProperties } from "react";

import "./css/index.css"
import {
  useReactTable, getCoreRowModel, flexRender, createColumnHelper,
  ColumnDef, HeaderGroup, TableOptions, Column, Table,
} from '@tanstack/react-table'
import * as TableUtils from "./uitls";

export interface DataTableColumn {
  field: string;
  header: string;
  width?: number;
  hide?: boolean;
  customRender?: (record: any, index: number) => any;
}

export interface DataTableProps {
  records: any[];
  columns: DataTableColumn[];
  title?: string;
  height?: number;
  className?: string;
  debug?: boolean;
  enableRowSelection?: boolean;
}

export function DataTable(props: DataTableProps) {
  let { title = "", className = "", height = 400, debug = true, enableRowSelection = false, records, columns } = props;
  const columnConfigs = React.useMemo(() => 
    TableUtils.createColumnConfigs(props), [columns]
  );
  const table = useReactTable({
    data: records,
    columns: columnConfigs,
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: enableRowSelection,
    debugTable: debug,
    debugHeaders: debug,
    debugColumns: debug,
  } as TableOptions<any>)

  return (
    <div className={`${className}`}>
      {/* title */}
      <div className="h5"> {title} </div>
      <div style={{ direction: table.options.columnResizeDirection }}>
        <div className="table-container" style={{ height: height }}>

          <table style={{ width: table.getTotalSize() }}>

            {/* header */}
            <thead>
              {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    let { column } = header;
                    const isSelection: boolean = column.id == "selection"
                    return (
                      <th 
                        key={header.id} 
                        colSpan={header.colSpan} 
                        style={{ 
                          width: header.getSize(), 
                          ...TableUtils.getPinedColumnCSS(column) // <-- IMPORTANT: use for Pinning the column 
                        }}
                      >
                        <div className="flex-h">
                          {/* render Header's label */}
                          <div className="whitespace-nowrap"> 
                            {header.isPlaceholder
                            ? null
                            : flexRender(column.columnDef.header, header.getContext())
                            }
                          </div>
                          <div className="flex-h justify-content-end">
                            {/* pin controller */}
                            {!header.isPlaceholder && column.getCanPin() && !isSelection
                            ? (
                              <>
                                {column.getIsPinned() !== 'left' && !isSelection ? (
                                  <button className="border rounded px-2" onClick={() => column.pin('left')}>
                                    {'<='}
                                  </button>
                                ) : null}
                                {column.getIsPinned() && !isSelection ? (
                                  <button className="border rounded px-2" onClick={() => column.pin(false)}>
                                    {'X'}
                                  </button>
                                ) : null}
                                {column.getIsPinned() !== 'right' && !isSelection ? (
                                  <button className="border rounded px-2" onClick={() => column.pin('right')}>
                                    {'=>'}
                                  </button>
                                ) : null}
                              </>
                            ) : null
                            }
                            {/* Resize div */}
                            <div  
                              onDoubleClick={() => header.column.resetSize()}
                              onMouseDown={header.getResizeHandler()}
                              onTouchStart={header.getResizeHandler()}
                              className={`resizer ${table.options.columnResizeDirection} ${header.column.getIsResizing() ? 'isResizing' : ''}`}>
                            </div>
                          </div>
                        </div>
                      </th>
                    )
                  })}
                </tr>
              ))}
            </thead>

            {/* body */}
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    const { column } = cell;
                    return (
                      <td
                        key={cell.id}
                        style={{ 
                          width: column.getSize(),
                          ...TableUtils.getPinedColumnCSS(column) // <-- IMPORTANT: use for Pinning the column 
                        }}
                      >
                        {flexRender(column.columnDef.cell, cell.getContext())}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>

          </table>
          
        </div>
      </div>
    </div>
  )
}