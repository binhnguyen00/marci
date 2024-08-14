import React from "react";
import * as icon from "react-icons/bs";
import { widget, server, hook, input } from "@marci-ui/lib";
import { IListProps } from "../interface/IListProps";
import { IFormProps } from "../interface/IFormProps";
import { ListUtils } from "../utilities/ListUtils";

interface UIDepartmentListProps extends IListProps {}
export function UIDepartmentList({ title = "Departments", height, onModify }: UIDepartmentListProps) {
  const [ departmentData, setDepartmentData ] = React.useState<any[]>([]);
  const [ sqlArgs, setSqlArgs ] = React.useState<any>(widget.initSqlArgs());
  const [ reload, setReload ] = React.useState(false);

  const columns: widget.DataTableColumn[] = [ 
    { 
      field: "name", header: "Title", 
      customRender(record, index) {
        return ListUtils.renderCellGetRecordById({
          id: record.id,
          cellValue: record.name,
          rpcRequest: {
            component: "DepartmentService",
            service: "getById",
          },
          callBack(entity) {
            const html = (<UIDepartmentForm entity={entity} reloadParent={reloadTable}/>);
            widget.createPopup(`Department: ${entity.name}`, html);
          },
        });
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

interface UIDepartmentFormProps extends IFormProps {}
export function UIDepartmentForm({ entity = {}, reloadParent = () => {} }: UIDepartmentFormProps) {
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
    server.rpc.call("DepartmentService", "save", { department: departmentState }, successCB);
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