import React from "react";
import * as BsIcon from "react-icons/bs";
import * as FaIcon from "react-icons/fa6"
import * as Tanstack from '@tanstack/react-table'
import * as TableUtils from "./uitlities";
import * as PopupManager from "../popup/PopupManager";

import { Button } from "../button/UIButton";
import { SearchBar } from "./UISearchBar";

import "./scss/_table.scss"
import { Tooltip } from "widget/common/UITooltip";

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

  const columnConfigs = React.useMemo(() => TableUtils.createColumnConfigs(props), [columns]);
  const [rowSelection, setRowSelection] = React.useState({}) // Row selection state
  const [expandedRows, setExpandedRows] = React.useState({}) // Row expansion state

  const toggleRowExpansion = (rowId) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [rowId]: !prevState[rowId],
    }));
  };

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
        <div className="flex-h my-1">
          {onCreateCallBack && <Button icon={<BsIcon.BsPlus />} title="Create" onClick={() => onCreateCallBack()} />}
          {onDeleteCallBack && (
            <Button
              className="mx-1" icon={<BsIcon.BsTrash />} title="Delete"
              onClick={() => {
                const ids = TableUtils.getSelectedIds(table);
                if (!ids?.length) {
                  PopupManager.createWarningPopup(<div> {"Please select at least 1 record"} </div>);
                  return;
                } else onDeleteCallBack(ids);
              }} />
          )}
          {(() => { // Render expand all rows Button
            const rows = table.getRowModel().rows;
            const hasChild = rows.some(row => rows.some(childRow => childRow.original["parentId"] === row.original["id"]));
            if (hasChild) {
              return (
                <Tooltip position="top" content={"Expand All"} tooltip={
                  <FaIcon.FaFolderTree 
                    className="mt-1" style={{ cursor: "pointer" }} 
                    onClick={() => {if (rows.length) rows.forEach(row => toggleRowExpansion(row.id))}}/>
                }/>
              )
            } else return null
          })()}
        </div>

        {/* toolbar: search */}
        <div className="flex-h justify-content-end">
          {onUseSearch && <SearchBar onUseSearch={onUseSearch} title={title} />}
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
                        <div className="flex-h justify-content-between">
                          {/* render Header's label */}
                          <div className="whitespace-nowrap">
                            {header.isPlaceholder
                              ? null
                              : Tanstack.flexRender(column.columnDef.header, header.getContext())
                            }
                          </div>
                          <div className="flex-h">
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
              {(() => {
                  const rows = table.getRowModel().rows;
                  const rootRows = rows.filter(row => !row.original["parentId"]); 
                  const renderRowWithChildren = (row: Tanstack.Row<any>, currentLevel: number) => {
                    const childRows = rows.filter(r => r.original["parentId"] === row.original["id"]);
                    const isExpanded = expandedRows[row.id];
                    return (
                      <React.Fragment key={row.id}>
                        <tr>
                          {row.getVisibleCells().map((cell: Tanstack.Cell<any, unknown>, cellIndex: number) => {
                            const isFirstRootCell = enableRowSelection 
                              ? (cellIndex === 1 && childRows.length > 0) 
                              : (cellIndex === 0 && childRows.length > 0);
                            const isPaddingCell = enableRowSelection ? cellIndex === 1 : cellIndex === 0;
                            return (
                              <td
                                className={isFirstRootCell && "flex-h justify-content-start"}
                                key={cell.id}
                                style={{
                                  width: cell.column.getSize(),
                                  paddingLeft: isPaddingCell ? `${currentLevel * 25}px` : undefined, // Only indent the first cell
                                  ...TableUtils.getPinedColumnCSS(cell.column), // <-- IMPORTANT: use for Pinning the column
                                }}
                              >
                                {/* Render the expand/collapse button only in the first cell of the row */}
                                {isFirstRootCell && (
                                  <>{isExpanded 
                                    ? <FaIcon.FaRegFolderOpen 
                                        style={{ cursor: "pointer" }} className="m-1" 
                                        onClick={(event: any) => toggleRowExpansion(row.id)}/>
                                    : <FaIcon.FaRegFolderClosed 
                                        style={{ cursor: "pointer" }} className="m-1" 
                                        onClick={(event: any) => toggleRowExpansion(row.id)}/>
                                  }</>
                                )}
                                {Tanstack.flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </td>
                            )}
                          )}
                        </tr>

                        {isExpanded && childRows.map(childRow => renderRowWithChildren(childRow, currentLevel + 1))}
                      </React.Fragment>
                    );
                  };

                  return rootRows.map(rootRow => renderRowWithChildren(rootRow, 0)); // Start with level 0
              })()}
            </tbody>

          </table>

        </div>
      </div>
    </div>
  )
}
