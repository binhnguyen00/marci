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
  const [expandedRows, setExpandedRows] = React.useState({}) // Row expansion state

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

  const toggleRowExpansion = (rowId) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [rowId]: !prevState[rowId],
    }));
  };

  const renderRows = (rows: Tanstack.Row<any>[], level = 0) => {
    // Filter rows to find the ones without a parentId (root-level rows)
    const rootRows = rows.filter(row => !row.original["parentId"]);

    // Function to recursively render rows and their children
    const renderRowWithChildren = (row: Tanstack.Row<any>, currentLevel: number) => {
      // Find all rows that have the current row as their parent
      const childRows = rows.filter(r => r.original["parentId"] === row.original["id"]);
      const isExpanded = expandedRows[row.id];

      return (
        <React.Fragment key={row.id}>
          <tr>
            {row.getVisibleCells().map((cell, cellIndex) => (
              <td
                key={cell.id}
                style={{
                  width: cell.column.getSize(),
                  paddingLeft: cellIndex === 0 ? `${currentLevel * 20}px` : undefined, // Only indent the first cell
                  ...TableUtils.getPinedColumnCSS(cell.column),
                }}
              >
                {/* Render the expand/collapse button only in the first cell of the row */}
                {cellIndex === 0 && childRows.length > 0 && (
                  <button onClick={(event: any) => toggleRowExpansion(row.id)}>
                    {isExpanded ? '-' : '+'}
                  </button>
                )}
                {Tanstack.flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>

          {isExpanded && childRows.map(childRow => renderRowWithChildren(childRow, currentLevel + 1))}
        </React.Fragment>
      );
    };

    // Start rendering with root rows
    return rootRows.map(rootRow => renderRowWithChildren(rootRow, level));
  };

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
              {/* {table.getRowModel().rows.map(row => (
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
              ))} */}
              {renderRows(table.getRowModel().rows)}
            </tbody>

          </table>

        </div>
      </div>
    </div>
  )
}