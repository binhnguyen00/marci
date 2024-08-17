import React from "react";
import { widget } from "@marci-ui/lib";

const defaultData: any[] = [
  {
    id: 1,
    fullName: "John Smith",
    nickName: "John",
    dateOfBirth: "01/01/2000"
  },
  {
    id: 2,
    fullName: "Jane Smith",
    nickName: "Jane",
    dateOfBirth: "01/01/2000"
  },
  {
    id: 3,
    parentId: 2,
    fullName: "Bob Smith",
    nickName: "Bob",
    dateOfBirth: "01/01/2000"
  },
  {
    id: 4,
    parentId: 2,
    fullName: "Alice Smith",
    nickName: "Alice",
    dateOfBirth: "01/01/2000"
  },
  {
    id: 5,
    parentId: 2,
    fullName: "Tom Smith",
    nickName: "Tom",
    dateOfBirth: "01/01/2000"
  },
  {
    id: 6,
    parentId: 1,
    fullName: "Sam Smith",
    nickName: "Sam",
    dateOfBirth: "01/01/2000"
  },
  {
    id: 7,
    parentId: 6,
    fullName: "Mark Smith",
    nickName: "Mark",
    dateOfBirth: "01/01/2000"
  }, 
]

export function UIDemoDataTable() {

  const defaultColumns: widget.DataTableColumn[] = [
    {
      header: "Full Name",
      field: "fullName",
    },
    {
      header: "Nick Name",
      field: "nickName",
    },
    {
      header: "Birthday",
      field: "dateOfBirth",
    }
  ];

  const onDeleteCallBack = (targetIds: number[]) => {
    const html = (<div> {`Selected Ids: ${JSON.stringify(targetIds)}`} </div>)
    widget.createSuccessPopup(html);
  }

  return (
    <widget.DataTable 
      title="Data Table" enableRowSelection 
      columns={defaultColumns} records={defaultData} onDeleteCallBack={onDeleteCallBack}/>
  );
}