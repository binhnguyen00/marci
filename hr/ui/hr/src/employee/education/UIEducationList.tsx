import React from "react";
import * as icon from "react-icons/bs";
import { widget, input } from "@marci-ui/lib";

interface UIEducationListProps {
  educations: any[];
  onModify?: (field: string, newValue: any, rollbackValue: any) => void;
}
export function UIEducationList(props: UIEducationListProps) {
  let { educations = [], onModify } = props;
  let [ educationsState, setEducations ] = React.useState(educations);

  const columns: widget.DataTableColumn[] = [
    { field: "university", header: "University" },
    { field: "major", header: "Major" },
    { field: "degree", header: "Degree" },
    { field: "fromDate", header: "From" },
    { field: "toDate", header: "To" },
  ]

  const onDelete = (targetIds: number[]) => {
    const clone = [...educationsState];
    const filteredRecords = clone.filter(record => !targetIds.includes(record.id));
    setEducations(filteredRecords);
    if (onModify) onModify("educations", filteredRecords, educations);
  }

  const onCreate = () => {
    const reloadTable = (newEducation: any) => {
      const clone = [...educationsState, newEducation];
      setEducations(clone);
      if (onModify) onModify("educations", clone, educations);
      widget.closeCurrentPopup();
    }
    widget.createPopup("Create Education", <UIEducationForm reloadTable={reloadTable}/>);
  }

  return (
    <div>
      <widget.DataTable enableRowSelection
        title="Educations" columns={columns} records={educationsState}
        onDeleteCallBack={onDelete} onCreateCallBack={onCreate}/>
    </div>
  )
} 

interface UIEducationFormProps {
  entity?: any;
  reloadTable: (newEducation: any) => void;
}
export function UIEducationForm(props: UIEducationFormProps) {
  let { entity = {}, reloadTable } = props;
  const [ educationState, setEducation ] = React.useState(entity);

  const handleInputChange = (field: string, newValue: any, rollbackValue: any) => {
    setEducation((prevState: any) => ({
      ...prevState,
      [field]: newValue,
    }));
  };

  return (
    <div className="flex-v">
      <input.FieldString 
        bean={educationState} field="university" label="University" onChange={handleInputChange}/>
      <input.FieldString 
        bean={educationState} field="major" label="Major" onChange={handleInputChange}/>
      <input.FieldString 
        bean={educationState} field="degree" label="Degree" onChange={handleInputChange}/>
      <div className="flex-h">
        <input.FieldDate 
          bean={educationState} field="fromDate" label="From" onChange={handleInputChange}/>
        <input.FieldDate 
          bean={educationState} field="toDate" label="To" onChange={handleInputChange}/>
      </div>

      <widget.Button 
        icon={<icon.BsSave />} title="Save" type="primary" onClick={() => {
          if (reloadTable) reloadTable(educationState);
        }}/>
    </div>
  )
}