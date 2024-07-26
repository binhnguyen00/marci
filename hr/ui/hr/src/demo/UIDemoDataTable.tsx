import React from "react";
import { widget } from "@marci-ui/lib";

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
    customRender: (record: any, index: number) => record.fullName
  },
  {
    header: "Nick Name",
    field: "nickName",
    customRender: (record: any, index: number) => record.nickName
  },
  {
    header: "Birthday",
    field: "dateOfBirth",
    customRender: (record: any, index: number) => record.dateOfBirth,
  }
]

export function UIDemoDataTable() {
  return (
    <div className="flex-v">
      <widget.DataTable title="Data Table" columns={defaultColumns} records={defaultData}/>
    </div>
  );
}