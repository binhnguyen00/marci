import React from "react";
import * as icon from "react-icons/bs";
import { server, input, widget } from "@marci-ui/lib";
import { ListUtils, ShowRowDetailsRequest } from "utilities/ListUtils";

interface UIEmployeeFormProps {
  entity?: any;
  reloadTable: (newEmployee: any) => void;
}
export function UICreateEmployeeForm(props: UIEmployeeFormProps) {
  let { entity = {}, reloadTable } = props;
  const isNewEntity = entity.id === undefined;
  const [employeeState, setEmployee] = React.useState(entity);

  const handleInputChange = (field: string, newValue: any, rollbackValue: any) => {
    setEmployee((prevState: any) => ({
      ...prevState,
      [field]: newValue,
    }));
  };

  const createEmployee = () => {

    const successCB: server.CallBack = (response: server.ServerResponse) => {
      const employee = response.body as any;
      const html = (<div> {JSON.stringify(employee, null, 2)} </div>)
      widget.closeCurrentPopup();  
      widget.createPopup("Success", html);
      reloadTable(employee);
    }
    
    const failCB: server.CallBack = (response: server.ServerResponse) => {
      const html = (<div> {JSON.stringify(response.message, null, 2)} </div>)
      widget.closeCurrentPopup();
      widget.createPopup("Fail", html);
    }

    server.rpc.call("EmployeeService", "create", { model: employeeState }, successCB, failCB);
  }

  return (
    <div className="form-group p-1 border">
      <input.FieldString hide={!isNewEntity}
        bean={employeeState} field="userName" label="Username" onChange={handleInputChange}/>
      <input.FieldString hide={!isNewEntity}
        bean={employeeState} field="password" label="Password" onChange={handleInputChange}/>

      <input.FieldString 
        bean={employeeState} field="fullName" label="Full Name" onChange={handleInputChange}/>
      <input.FieldString 
        bean={employeeState} field="nickName" label="Nick Name" onChange={handleInputChange}/>
      <input.FieldString hide={!isNewEntity}
        bean={employeeState} field="email" label="Email" onChange={handleInputChange}/>
      <input.FieldString 
        bean={employeeState} field="phoneNumber" label="Phone Number" onChange={handleInputChange}/>
      <input.FieldString 
        bean={employeeState} field="dateOfBirth" label="Birthday" onChange={handleInputChange}/>

      <widget.Button 
        icon={isNewEntity ? <icon.BsSaveFill /> : <icon.BsSave />} title={isNewEntity ? "Create" : "Save"} type="primary" onClick={createEmployee}/>
    </div>
  )
}

export function UIEmployeeList() {
  const [ employeeData, setEmployeeData ] = React.useState<Array<any>>([]);

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
          const html = <UICreateEmployeeForm entity={entity} reloadTable={reloadTable}/>;
          widget.createPopup(`Employee: ${entity.fullName}`, html);
        },
      }
      return ListUtils.renderCellGetRecordById(request);
    }},
    { field: "nickName", header: "Nick Name" },
    { field: "dateOfBirth", header: "Birthday" },
    { field: "accountId", header: "Account ID" },
  ];

  const reloadTable = (newEmployee: any) => {
    let employees = [...employeeData, newEmployee];
    setEmployeeData(employees);
  };

  const showCreateEmployeeForm = () => {
    widget.createPopup("Create Employee", <UICreateEmployeeForm reloadTable={reloadTable}/>);
  }

  const successCB: server.CallBack = (response: server.ServerResponse) => {
    const employees = response.body as any[];
    setEmployeeData(employees);
  }

  React.useEffect(() => {
    const searchParams = {} as any;
    server.rpc.call("EmployeeService", "search", { params: searchParams }, successCB);
  }, [])
  
  return (
    <div className="flex-v">
      <widget.Button icon={<icon.BsPlus />}
        className="m-1" title="Create" onClick={showCreateEmployeeForm}/>
      <widget.DataTable 
        title="Employees" columns={columns} records={employeeData}/>
    </div>
  );
}