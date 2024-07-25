import React from "react";
import { widget } from "@marci-ui/lib";
import { UIDemoApiCall } from "./UIDemoApiCall";
import { UIDemoPopup } from "./UIDemoPopup";

export function UIDemo() {

  const createData = (
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
  ) => {
    return { name, calories, fat, carbs, protein };
  }
  
  const basicTableConfig: widget.DataTableConfig = {
    title: "Basic Table",
    columnConfig: [
      { field: "name", headerName: "Dessert (100g serving)", width: 200 },
      { field: "calories", headerName: "Calories", width: 200 },
      { field: "fat", headerName: "Fat (g)", width: 200 },
      { field: "carbs", headerName: "Carbs (g)", width: 200 },
      { field: "protein", headerName: "Protein (g)", width: 200 },
    ],
    rows: [
      createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
      createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
      createData('Eclair', 262, 16.0, 24, 6.0),
      createData('Cupcake', 305, 3.7, 67, 4.3),
      createData('Gingerbread', 356, 16.0, 49, 3.9),
    ],
  }
  return (
    <div className="flex-v">
      <div className="border-bottom py-2">
        <UIDemoApiCall/>
      </div>
      <div className="border-bottom py-2">
        <UIDemoPopup/>
      </div>
      <div className="border-bottom py-2">
        <widget.BasicTable config={basicTableConfig}/>
      </div>
    </div>
  );
}
