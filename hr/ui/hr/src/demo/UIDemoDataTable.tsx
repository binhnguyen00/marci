import React from "react";
import { widget } from "@marci-ui/lib";

export function UIDemoDataTable() {
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
      fullName: "Bob Smith",
      nickName: "Bob",
      dateOfBirth: "01/01/2000"
    }
  ]

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