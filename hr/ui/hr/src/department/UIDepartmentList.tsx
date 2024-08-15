import React from "react";
import * as icon from "react-icons/bs";
import { widget, server, hook } from "@marci-ui/lib";
import { IListProps } from "../interface/IListProps";
import { UIDepartmentForm } from "./UIDepartmentForm";

interface UIDepartmentListProps extends IListProps {}
export function UIDepartmentList({ title = "Departments", height, onModify }: UIDepartmentListProps) {
  const [ departmentData, setDepartmentData ] = React.useState<any[]>([]);
  const [ sqlArgs, setSqlArgs ] = React.useState<any>(widget.initSqlArgs());
  const [ reload, setReload ] = React.useState(false);

  const renderCellGetRecordById = (record: any, index: number) => {

    const successCB: server.CallBack = (response: server.ServerResponse) => {
      const javaEntity = response.body as any;
      const html = (
        <UIDepartmentForm 
          entity={javaEntity} reloadParent={reloadTable}/>
      );
      widget.createPopup(`Department: ${javaEntity.name}`, html);
    }

    const failCB: server.CallBack = (response: server.ServerResponse) => {
      const error = response.message;
      const html = (<div> {JSON.stringify(error, null, 2)} </div>)
      widget.closeCurrentPopup();
      widget.createPopup("Fail", html);
    }

    const createDepartment = () => {
      const html = (
        <UIDepartmentForm 
          entity={undefined} parentId={record.id}  reloadParent={reloadTable}/>
      );
      widget.createPopup("New Department", html);
    }

    return ( 
      <div className="flex-h justify-content-between" style={{ width: "100%" }}>
        <div 
          className="cell-clickable"
          onClick={() => {
            server.rpc.call("DepartmentService", "getById", { id: record.id }, successCB, failCB);
          }}
        > 
          {record.name} 
        </div>

        <icon.BsPlus className="m-1" style={{ cursor: "pointer" }} onClick={createDepartment}/>
      </div>
    )
  }

  const columns: widget.DataTableColumn[] = [ 
    { 
      field: "name", header: "Title", 
      customRender(record, index) {
        return renderCellGetRecordById(record, index);
      },
    },
    { field: "description", header: "Description", width: 300 },
  ];

  const reloadTable = () => {
    setReload(!reload);
  };

  const onCreate = () => {
    widget.createPopup("New Department", <UIDepartmentForm reloadParent={reloadTable} />);
  };

  const onDelete = (targetIds: number[]) => {
    server.rpc.call(
      "DepartmentService", "deleteByIds", { ids: targetIds }, 
      (response: server.ServerResponse) => {
        reloadTable();
      }
    )
  }

  const onUseSearch = (sqlArgs: any) => {
    setSqlArgs(sqlArgs);
  }

  hook.useSearch({ 
    component: "DepartmentService", service: "search", sqlArgs: sqlArgs, 
    dependencies: [reload, sqlArgs], updateData: setDepartmentData,
  });

  return (
    <widget.DataTable 
      title={title} height={height} columns={columns} records={departmentData}
      onCreateCallBack={onCreate} onDeleteCallBack={onDelete} onUseSearch={onUseSearch}
    />
  )
}