import React from "react";
import { widget } from "@marci-ui/lib";
import { UIDemoApiCall } from "./UIDemoApiCall";
import { UIDemoPopup } from "./UIDemoPopup";

const columns: widget.DataTableColumn[] = [
  { field: "id", label: "ID" },
  { field: "name", label: "Name" },
  { field: "position", label: "Position" },
  { field: "office", label: "Office" },
  { field: "age", label: "Age" }, 
]

const rows: any[] = [
  { id: 1, name: "Tiger Nixon", position: "System Architect", office: "Edinburgh", age: 61, date: "2011-04-25" },
  { id: 2, name: "Garrett Winters", position: "Accountant", office: "Tokyo", age: 63, date: "2011-07-25" },
  { id: 3, name: "Ashton Cox", position: "Junior Technical Author", office: "San Francisco", age: 66, date: "2009-01-12" },
  { id: 4, name: "Cedric Kelly", position: "Senior Javascript Developer", office: "Edinburgh", age: 22, date: "2012-03-29" },
  { id: 5, name: "Airi Satou", position: "Accountant", office: "Tokyo", age: 33, date: "2008-11-28" },
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
        <widget.DataTable height={200} title="Data Table" columns={columns} rows={rows}/>
      </div>
    </div>
  );
}
