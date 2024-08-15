import React from "react";
import * as icon from "react-icons/bs";
import * as Tanstack from '@tanstack/react-table'
import * as TableUtils from "./uitlities";
import * as PopupManager from "../popup/PopupManager";

import { Button } from "../button/UIButton";
import { SearchBar } from "./UISearchBar";

import "./scss/_table.scss"

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
  height?: number | string;
  className?: string;
  debug?: boolean;
  onCreateCallBack?: () => void;
  onDeleteCallBack?: (targetIds: number[]) => void;
  onUseSearch?: (sqlArgs: any) => void;
  enableRowSelection?: boolean;
}

export function DataTable(props: DataTableProps) {
  let { 
    title = "", className = "", height = "100%", debug = false, enableRowSelection = false, 
    records, columns, onCreateCallBack, onDeleteCallBack, onUseSearch
  } = props;
  const columnConfigs = React.useMemo(() => 
    TableUtils.createColumnConfigs(props), [columns]
  );
  const [rowSelection, setRowSelection] = React.useState({}) // Row selection state
  const table = Tanstack.useReactTable({
    state: {
      rowSelection,
    },
    data: records,
    columns: columnConfigs,
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    getCoreRowModel: Tanstack.getCoreRowModel(),
    enableRowSelection: enableRowSelection,
    onRowSelectionChange: setRowSelection,
    debugTable: debug,
    debugHeaders: debug,
    debugColumns: debug,
  } as Tanstack.TableOptions<any>)

  return (
    <div className={`${className}`}>

      {/* title */}
      <div className="h5"> {title} </div>
      
      {/* toolbar */}
      <div className="flex-h justify-content-between">

        {/* toolbar: buttons */}
        <div className="flex-h justify-content-start my-1">
          {onCreateCallBack && <Button icon={<icon.BsPlus />} title="Create" onClick={() => onCreateCallBack()} />}
          {onDeleteCallBack && (
            <Button 
              className="mx-1" icon={<icon.BsTrash />} title="Delete" 
              onClick={() => {
                const ids = TableUtils.getSelectedIds(table);
                if (!ids?.length) {
                  PopupManager.createWarningPopup(<div> {"Please select at least 1 record"} </div>); 
                  return;
                } else onDeleteCallBack(ids);
              }} />
          )}
        </div>

        {/* toolbar: search */}
        <div className="flex-h justify-content-end">
          {onUseSearch && <SearchBar onUseSearch={onUseSearch} title={title}/>}
        </div>

      </div>

      {/* table */}
      <div style={{ direction: table.options.columnResizeDirection }}>
        <div className="table-container" style={{ height: height }}>

          <table style={{ width: table.getTotalSize() }}>

            {/* table: header */}
            <thead>
              {table.getHeaderGroups().map((headerGroup: Tanstack.HeaderGroup<any>) => (
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
                            : Tanstack.flexRender(column.columnDef.header, header.getContext())
                            }
                          </div>
                          <div className="flex-h justify-content-end">
                            {/* pin controller */}
                            {!header.isPlaceholder && column.getCanPin() && !isSelection
                            ? (<>
                              {column.getIsPinned() !== 'left' && !isSelection ? (
                                <button className="border rounded px-2" onClick={() => column.pin('left')}> {"<"} </button>
                              ) : null
                              }
                              {column.getIsPinned() && !isSelection ? (
                                <button className="border rounded px-2" onClick={() => column.pin(false)}> {"X"} </button> 
                              ) : null
                              }
                              {column.getIsPinned() !== 'right' && !isSelection ? (
                                <button className="border rounded px-2" onClick={() => column.pin('right')}> {">"} </button> 
                              ) : null
                              }
                            </>) : null
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

            {/* table: body */}
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
                        {Tanstack.flexRender(column.columnDef.cell, cell.getContext())}
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