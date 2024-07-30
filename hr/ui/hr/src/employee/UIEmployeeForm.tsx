import React from "react";
import * as icon from "react-icons/bs";
import { server, input, widget } from "@marci-ui/lib";
import { UIEducationList } from "./education/UIEducationList";

interface UIEmployeeFormProps {
  entity?: any;
  reloadTable: () => void;
}
export function UIEmployeeForm(props: UIEmployeeFormProps) {
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
      widget.createSuccessPopup(html);
      reloadTable();
    }
    
    const failCB: server.CallBack = (response: server.ServerResponse) => {
      const html = (<div> {JSON.stringify(response.message, null, 2)} </div>)
      widget.closeCurrentPopup();
      widget.createDangerPopup(html);
    }

    server.rpc.call("EmployeeService", "create", { model: employeeState }, successCB, failCB);
  }

  const saveEmployee = () => {
    const successCB: server.CallBack = (response: server.ServerResponse) => {
      widget.closeCurrentPopup();  
      reloadTable();
    }
    const failCB: server.CallBack = (response: server.ServerResponse) => {
      const html = (<div> {JSON.stringify(response.message, null, 2)} </div>) 
      widget.closeCurrentPopup();
      widget.createDangerPopup(html);
    }

    server.rpc.call("EmployeeService", "save", { employee: employeeState }, successCB, failCB);
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

      <UIEducationList 
        educations={employeeState.educations} onModify={handleInputChange}/>

      <widget.Button 
        icon={isNewEntity ? <icon.BsSaveFill /> : <icon.BsSave />} 
        title={isNewEntity ? "Create" : "Save"} type="primary" 
        onClick={isNewEntity ? createEmployee : saveEmployee}
      />
    </div>
  )
}