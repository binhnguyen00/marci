import React from "react";
import * as icon from "react-icons/bs";
import { server, input, widget } from "@marci-ui/lib";

interface UIEmployeeFormProps {
  reloadTable: (newEmployee: any) => void;
}
export function UIEmployeeForm(props: UIEmployeeFormProps) {
  let { reloadTable } = props;
  const [employee, setEmployee] = React.useState({});

  const handleInputChange = (field: string, newValue: any, rollbackValue: any) => {
    setEmployee((prevState) => ({
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

    server.rpc.call("EmployeeService", "save", { employee: employee }, successCB, failCB);
  }

  return (
    <div className="form-group p-1 border">
      <input.FieldString 
        bean={employee} field="fullName" label="Full Name" onChange={handleInputChange}/>
      <input.FieldString 
        bean={employee} field="nickName" label="Nick Name" onChange={handleInputChange}/>
      <input.FieldString 
        bean={employee} field="dateOfBirth" label="Birthday" onChange={handleInputChange}/>

      <widget.Button 
        icon={<icon.BsSaveFill />}
        title="Save" type="primary" onClick={createEmployee}/>
    </div>
  )
}

export function UIEmployeeList() {
  const [ employeeData, setEmployeeData ] = React.useState<Array<any>>([]);

  const columns: widget.DataTableColumn[] = [ 
    { field: "id", header: "ID" },
    { field: "fullName", header: "Full Name" },
    { field: "nickName", header: "Nick Name" },
    { field: "dateOfBirth", header: "Birthday" },
    { field: "accountId", header: "Account ID" },
  ];

  const reloadTable = (newEmployee: any) => {
    let employees = [...employeeData, newEmployee];
    setEmployeeData(employees);
  };

  const showEmployeeForm = () => {
    widget.createPopup("Create Employee ", <UIEmployeeForm reloadTable={reloadTable}/>);
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
        className="m-1" title="Create" onClick={showEmployeeForm}/>
      <widget.DataTable 
        title="Employees" columns={columns} records={employeeData}/>
    </div>
  );
}