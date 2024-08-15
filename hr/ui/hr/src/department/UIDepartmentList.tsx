import React from "react";
import * as icon from "react-icons/bs";
import { widget, server, hook, input } from "@marci-ui/lib";
import { IListProps } from "../interface/IListProps";
import { IFormProps } from "../interface/IFormProps";

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

interface UIDepartmentFormProps extends IFormProps {
  parentId?: number;
}
export function UIDepartmentForm({ entity = {}, reloadParent = () => {}, parentId }: UIDepartmentFormProps) {
  const [ departmentState, setDepartmentState ] = React.useState(entity);
  const isNewEntity = !entity.id;

  const handleInputChange = (field: string, newValue: any, rollbackValue: any) => {
    setDepartmentState((prevState: any) => ({
      ...prevState,
      [field]: newValue,
    }));
  };

  const onSave = () => {
    const successCB = (response: server.ServerResponse) => {
      widget.closeCurrentPopup();
      reloadParent();
    };
    server.rpc.call("DepartmentService", "save", { department: { ...departmentState, parentId: parentId } }, successCB);
  }

  return (
    <>
      <input.FieldString 
        bean={departmentState} field="name" label="Title" onChange={handleInputChange}/>
      <input.FieldText 
        bean={departmentState} field="description" label="Description" onChange={handleInputChange}/>
      <widget.Button 
        title={isNewEntity ? "Create" : "Save"} 
        onClick={onSave} icon={isNewEntity ? <icon.BsPlus /> : <icon.BsSave />}
      />
    </>
  )
}