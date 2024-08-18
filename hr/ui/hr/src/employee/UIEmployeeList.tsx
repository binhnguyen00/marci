import React from "react";
import { server, widget, hook } from "@marci-ui/lib";
import { ListUtils, ShowRowDetailsRequest } from "utilities/ListUtils";
import { UIEmployeeForm } from "./UIEmployeeForm";
import { IListProps } from "interface/IListProps";

interface UIEmployeeListProps extends IListProps {}
export function UIEmployeeList(props: UIEmployeeListProps) {
  const { title = "Employees", height, sqlArgs = widget.initSqlArgs() } = props;

  console.log(sqlArgs);
  
  const [ employeeData, setEmployeeData ] = React.useState<any[]>([]);
  const [ sqlArgsState, setSqlArgs ] = React.useState<any>(sqlArgs);
  const [ reload, setReload ] = React.useState(false);

  const columns: widget.DataTableColumn[] = [ 
    { 
      field: "fullName", header: "Full Name", 
      customRender(record, index) {
        const request: ShowRowDetailsRequest = {
          id: record.id,
          cellValue: record.fullName,
          rpcRequest: {
            component: "EmployeeService",
            service: "getById",
          },
          callBack(entity) {
            const html = (<UIEmployeeForm entity={entity} reloadParent={reloadTable}/>);
            widget.createPopup(`Employee: ${entity.fullName}`, html);
          },
        }
        return ListUtils.renderCellGetRecordById(request);
      },
    },
    { field: "nickName", header: "Nick Name" },
    { field: "dateOfBirth", header: "Birthday" },
    { field: "accountId", header: "Account ID" },
  ];

  const reloadTable = () => {
    setReload(!reload);
  };

  const onCreate = () => {
    widget.createPopup("Create Employee", <UIEmployeeForm reloadParent={reloadTable}/>);
  }

  const onDelete = (targetIds: number[]) => {
    server.rpc.call(
      "EmployeeService", "deleteByIds", { ids: targetIds }, 
      (response: server.ServerResponse) => {
        reloadTable();
      }
    );
  }

  const onUseSearch = (sqlArgs: any) => {
    setSqlArgs(sqlArgs);
  }

  hook.useSearch({ 
    component: "EmployeeService", service: "search", sqlArgs: sqlArgsState, 
    dependencies: [reload, sqlArgsState, sqlArgs], updateData: setEmployeeData,
  });

  return (
    <widget.DataTable 
      title={title} height={height} columns={columns} records={employeeData} enableRowSelection
      onCreateCallBack={onCreate} onDeleteCallBack={onDelete} onUseSearch={onUseSearch}/>
  );
}