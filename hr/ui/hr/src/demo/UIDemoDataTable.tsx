import React from "react";
import { widget } from "@marci-ui/lib";

export function UIDemoDataTable() {
  const defaultData: any[] = [
    {
      fullName: "John Smith",
      nickName: "John",
      dateOfBirth: "01/01/2000"
    },
    {
      fullName: "Jane Smith",
      nickName: "Jane",
      dateOfBirth: "01/01/2000"
    },
    {
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

  return (
    <div className="flex-v">
      <widget.DataTable 
        title="Data Table TEST" enableRowSelection
        columns={defaultColumns} records={defaultData}/>
    </div>
  );
}