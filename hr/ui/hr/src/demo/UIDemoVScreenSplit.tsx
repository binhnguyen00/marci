import React from "react";
import { widget } from "@marci-ui/lib";
import { UIDemoDataTable } from "./UIDemoDataTable";

export function UIDemoVScreenSplit() {
  return (
    <widget.VScreenSplit components={[
      <UIFileExplorer/>,
      <UIDemoDataTable/>, 
    ]}/>
  )
}

function UIFileExplorer() {
  const defaultData: any[] = [
    { id: 1, fullName: "John Smith", nickName: "John", dateOfBirth: "01/01/2000" },
    { id: 2, fullName: "Jane Smith", nickName: "Jane", dateOfBirth: "01/01/2000" },
    { id: 3, parentId: 2, fullName: "Bob Smith", nickName: "Bob", dateOfBirth: "01/01/2000" },
    { id: 4, parentId: 2, fullName: "Alice Smith", nickName: "Alice", dateOfBirth: "01/01/2000" },
    { id: 5, parentId: 2, fullName: "Tom Smith", nickName: "Tom", dateOfBirth: "01/01/2000" },
    { id: 6, parentId: 1, fullName: "Sam Smith", nickName: "Sam", dateOfBirth: "01/01/2000" },
    { id: 7, parentId: 6, fullName: "Mark Smith", nickName: "Mark", dateOfBirth: "01/01/2000" }, 
  ]
  return (
    <widget.Tree 
      title="Render Overried" records={defaultData} displayField="fullName" 
      renderDisplay={(record: any, shouldHavePadding?: boolean) => {
        return (
          <strong 
            className="text-primary clickable" 
            style={{ paddingLeft: shouldHavePadding && 20 }}
            onClick={() => { alert("This is overried :)") }}
          >
            {record.fullName}
          </strong>
        )
    }}/>
  )
}