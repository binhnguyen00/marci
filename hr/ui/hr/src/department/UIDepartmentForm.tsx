import React from "react";
import * as icon from "react-icons/bs";
import { widget, server, input } from "@marci-ui/lib";
import { IFormProps } from "../interface/IFormProps";

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