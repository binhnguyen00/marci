import React from "react";
import { server, widget, hook } from "@marci-ui/lib";
import { ListUtils, ShowRowDetailsRequest } from "utilities/ListUtils";
import { UIEmployeeForm } from "./UIEmployeeForm";

export function UIEmployeeList() {
  const [ employeeData, setEmployeeData ] = React.useState<Array<any>>([]);
  const [ reload, setReload ] = React.useState(false);

  const columns: widget.DataTableColumn[] = [ 
    { field: "fullName", header: "Full Name", customRender(record, index) {
      const request: ShowRowDetailsRequest = {
        id: record.id,
        cellValue: record.fullName,
        rpcRequest: {
          component: "EmployeeService",
          service: "getById",
        },
        callBack(entity) {
          const html = <UIEmployeeForm entity={entity} reloadTable={reloadTable}/>;
          widget.createPopup(`Employee: ${entity.fullName}`, html);
        },
      }
      return ListUtils.renderCellGetRecordById(request);
    }},
    { field: "nickName", header: "Nick Name" },
    { field: "dateOfBirth", header: "Birthday" },
    { field: "accountId", header: "Account ID" },
  ];

  const reloadTable = () => {
    setReload(!reload);
  };

  const onCreate = () => {
    widget.createPopup("Create Employee", <UIEmployeeForm reloadTable={reloadTable}/>);
  }

  const onDelete = (targetIds: number[]) => {
    server.rpc.call(
      "EmployeeService", "deleteByIds", { ids: targetIds }, 
      (response: server.ServerResponse) => {
        reloadTable();
      }
    );
  }

  // React.useEffect(() => {
  //   const searchParams = {} as any;
  //   const successCB: server.CallBack = (response: server.ServerResponse) => {
  //     const employees = response.body as any[];
  //     setEmployeeData(employees);
  //   }
  //   server.rpc.call("EmployeeService", "search", { sqlArgs: searchParams }, successCB);
  // }, [reload])

  const successCB: server.CallBack = (response: server.ServerResponse) => {
    const employees = response.body as any[];
    setEmployeeData(employees);
  }
  
  hook.useSearch({ 
    component: "EmployeeService", service: "search", sqlArgs: {}, 
    successCB: successCB,
    dependency: reload
  });
  
  return (
    <div className="flex-v">
      <widget.DataTable 
        title="Employees" columns={columns} records={employeeData} enableRowSelection
        onCreateCallBack={onCreate} onDeleteCallBack={onDelete}/>
    </div>
  );
}