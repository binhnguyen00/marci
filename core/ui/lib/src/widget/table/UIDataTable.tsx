import React from "react";
import * as icon from "react-icons/bs";
import {
  useReactTable, getCoreRowModel, flexRender, createColumnHelper,
  ColumnDef, HeaderGroup, TableOptions, Column, Table,
} from '@tanstack/react-table'
import "./css/index.css"
import * as TableUtils from "./uitls";
import { Button } from "../button/UIButton";
import { createPopup } from "widget/popup/UIPopup";

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
  onCreateCallBack?: () => void;
  onDeleteCallBack?: (targetIds: number[]) => void;
  enableRowSelection?: boolean;
}

export function DataTable(props: DataTableProps) {
  let { 
    title = "", className = "", height = 400, debug = true, enableRowSelection = false, 
    records, columns, onCreateCallBack, onDeleteCallBack
  } = props;
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
      
      {/* buttons */}
      <div className="flex-h my-1">
        {onCreateCallBack 
        ? <Button icon={<icon.BsPlus />} title="Create" onClick={() => onCreateCallBack()} />
        : null
        }
        {onDeleteCallBack
        ? (
        <Button 
          className="mx-1" icon={<icon.BsTrash />} title="Delete" 
          onClick={() => {
            const ids = TableUtils.getSelectedIds(table);
            if (!ids?.length) {
              createPopup(
                <div className="text-warning"> {"Warning"} </div>, 
                <div> {"Please select at least 1 record"} </div>
              ); 
              return;
            } else onDeleteCallBack(ids);
          }} />
        ) : null
        }
      </div>

      {/* table */}
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
                            {/* resize div */}
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