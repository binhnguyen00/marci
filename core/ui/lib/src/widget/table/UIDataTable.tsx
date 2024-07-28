import React, { CSSProperties } from "react";

import "./css/index.css"
import {
  useReactTable, getCoreRowModel, flexRender, createColumnHelper,
  ColumnDef, HeaderGroup, TableOptions, Column, Table,
} from '@tanstack/react-table'

export interface DataTableColumn {
  field: string;
  header: string;
  width?: number;
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
    createColumnConfigs(props), [columns]
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
      <div className="h5"> {title} </div>
      <div style={{ direction: table.options.columnResizeDirection }}>
        <div className="table-container" style={{ height: height }}>

          <table style={{ width: table.getTotalSize() }}>

            {renderTableHeader(table)}

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
                          ...getPinedColumnCSS(column) // <-- IMPORTANT: use for Pinning the column 
                        }}
                      >
                        {flexRender(
                          column.columnDef.cell,
                          cell.getContext()
                        )}
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

export function createColumnConfigs(props: DataTableProps) {
  const columns: DataTableColumn[] = props.columns;
  try {
    const columnConfigs: ColumnDef<any>[] = columns.map((column: DataTableColumn) => {
      if (!column.customRender) {
        column.customRender = (record: any, index: number) => record[column.field]
      }
      return {
        header: column.header,
        accessorFn: column.customRender,
        size: column.width ? column.width : 300,
        // more options...
      } as ColumnDef<any>
    })

    if (props.enableRowSelection) {
      columnConfigs.unshift({
        id: 'selection',
        header: ({ table }) => (
          <input type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()} //or getToggleAllRowsSelectedHandler
          />
        ),
        cell: ({ row }) => (
          <input type="checkbox"
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
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

function getPinedColumnCSS(column: Column<any>): CSSProperties {
  const isPinned = column.getIsPinned();
  return {
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    width: column.getSize(),
    position: isPinned ? 'sticky' : 'relative',
    zIndex: isPinned ? 1 : 0,
  }
}

function renderTableHeader(table: Table<any>) {
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map(header => {
            const { column } = header;
            return (
              <th 
                key={header.id} 
                colSpan={header.colSpan} 
                style={{ 
                  width: header.getSize(), 
                  ...getPinedColumnCSS(column) // <-- IMPORTANT: use for Pinning the column 
                }}
              >
                <div className="flex-h">
                  {/* render Header's label */}
                  <div className="whitespace-nowrap"> 
                    {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())
                    }
                  </div>
                  <div className="flex-h justify-content-end">
                    {/* Pin controller */}
                    {!header.isPlaceholder && header.column.getCanPin() && (
                      <>
                        {header.column.getIsPinned() !== 'left' ? (
                          <button
                            className="border rounded px-2"
                            onClick={() => header.column.pin('left')}
                          >
                            {'<='}
                          </button>
                        ) : null}
                        {header.column.getIsPinned() ? (
                          <button
                            className="border rounded px-2"
                            onClick={() => header.column.pin(false)}
                          >
                            {'X'}
                          </button>
                        ) : null}
                        {header.column.getIsPinned() !== 'right' ? (
                          <button
                            className="border rounded px-2"
                            onClick={() => header.column.pin('right')}
                          >
                            {'=>'}
                          </button>
                        ) : null}
                      </>
                    )}
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
  )
}