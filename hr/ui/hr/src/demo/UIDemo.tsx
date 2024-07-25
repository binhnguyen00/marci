import React from "react";
import { widget } from "@marci-ui/lib";
import { UIDemoApiCall } from "./UIDemoApiCall";
import { UIDemoPopup } from "./UIDemoPopup";

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

const defaultColumns: any[] = [
  {
    header: "Full Name",
    field: "fullName",
    accessorFn: (row: any, index: number) => row.fullName
  },
  {
    header: "Nick Name",
    field: "nickName",
    accessorFn: (row: any, index: number) => row.nickName
  },
  {
    header: "Birthday",
    field: "dateOfBirth",
    accessorFn: (row: any, index: number) => row.dateOfBirth,
  }
]

export function UIDemo() {

  return (
    <div className="flex-v">
      <div className="border-bottom py-2">
        <UIDemoApiCall/>
      </div>
      <div className="border-bottom py-2">
        <UIDemoPopup/>
      </div>
      <div className="border-bottom py-2">
        <widget.DataTable title="Data Table" columns={defaultColumns} records={defaultData}/>
      </div>
    </div>
  );
}
