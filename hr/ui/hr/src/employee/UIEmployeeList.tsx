import React from "react";
import { BsFillPersonDashFill  } from "react-icons/bs";
import { server, widget, hook, tableUtils } from "@marci-ui/lib";
import { ListUtils, ShowRowDetailsRequest } from "utilities/ListUtils";
import { UIEmployeeForm } from "./UIEmployeeForm";
import { IListProps } from "interface/IListProps";

interface UIEmployeeListProps extends IListProps {
  departmentId?: number;
}
export function UIEmployeeList(props: UIEmployeeListProps) {
  let { title, height, isSelector, selectRowsCallBack, departmentId } = props;

  const [ employeeData, setEmployeeData ] = React.useState<any[]>([]);
  const [ sqlArgsState, setSqlArgsState ] = React.useState<any>({
    ...tableUtils.initSqlArgs(),
    departmentId: departmentId,
  });
  const [ reload, setReload ] = React.useState(false);
  const [ tableCtx, setTableContext ] = React.useState<widget.DataTableContext>(tableUtils.initTableCtx());

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

  const onUseSearch = (sqlArguments: any) => {
    setSqlArgsState({
      ...sqlArguments,
      departmentId: departmentId,
    });
  }

  const getTableContext = (tableInstance: widget.DataTableContext) => {
    setTableContext(tableInstance);
  };

  // Automatically update sqlArgsState when departmentId changes
  React.useEffect(() => {
    setSqlArgsState((prevState: any) => ({
      ...prevState,
      departmentId: departmentId,
    }));
  }, [departmentId]);

  hook.useSearch({ 
    component: "EmployeeService", service: "search", sqlArgs: sqlArgsState, 
    dependencies: [ reload, sqlArgsState ], updateData: setEmployeeData,
  });

  return (
    <widget.DataTable 
      title={title} height={height} columns={columns} records={employeeData} enableRowSelection
      onCreateCallBack={!isSelector && onCreate} 
      onDeleteCallBack={!isSelector && onDelete} 
      onRowSelection={isSelector && selectRowsCallBack}
      onUseSearch={onUseSearch}
      toolbarButtons={[
        <UIButtonRemoveEmployeeFromDepartment 
          departmentId={departmentId} 
          selectedEmployeesIds={tableCtx.selectedRecordsIds}
        />
      ]}
      getTableContext={getTableContext}
    />
  );
}

function UIButtonRemoveEmployeeFromDepartment({ departmentId, selectedEmployeesIds }: { 
  departmentId?: number,
  selectedEmployeesIds?: number[],
}) {
  
  if (!departmentId) return null;
  const onClick = (event: Event) => {
    if (!selectedEmployeesIds || selectedEmployeesIds.length === 0) {
      widget.createWarningPopup(<>{"Please select at least 1 record"}</>)
      return;
    }
    server.rpc.call(
      "DepartmentService", "removeEmployees", { departmentId: departmentId, employeeIds: selectedEmployeesIds },
      (response: server.ServerResponse) => {
        widget.createSuccessPopup(<>{"Employees removed"}</>);
      }
    )
  }

  return (
    <widget.Tooltip 
      content={"Remove employees from department"}
      tooltip={
        <widget.Button 
          title="Remove" onClick={onClick}
          icon={<div><BsFillPersonDashFill/></div>}
        />
      }
    />
  )
}