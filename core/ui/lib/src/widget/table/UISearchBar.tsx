import React from "react";
import * as icon from "react-icons/bs";
import { FieldString } from "../../input/FieldString";
import { Button } from "../button/UIButton";
import { StorageState } from "../Interface";
import { FieldCheckBox } from "input/FieldCheckBox";
import * as TableUtils from "./uitlities";
import { FieldDate } from "input";

interface SearchBarProps {
  title?: string;
  onUseSearch?: (sqlArgs: any) => void;
}
export function SearchBar({ title, onUseSearch }: SearchBarProps) {
  const [ sqlArgs, setSqlArgs ] = React.useState({
    ...TableUtils.initSqlArgs()
  });

  const handleInputChange = (field: string, newValue: any, rollBackValue: any) => {
    setSqlArgs((prevState: any) => ({
      ...prevState,
      [field]: newValue,
    }));
  }

  const handleCheckboxChange = (field: string, newValue: any, rollBackValue: any, isChecked: boolean) => {
    let results: any[] = sqlArgs.storageState;
    if (isChecked) results.push(newValue);
    else results = results.filter((state: any) => state !== newValue);
    setSqlArgs((prevState: any) => ({
      ...prevState,
      [field]: results,
    }));
  }

  const doSearch = () => {
    if (onUseSearch) onUseSearch(sqlArgs);
    else console.warn("Should implement create useSearch hook in order to search data");
  }

  return (
    <> 
      <FieldString 
        bean={sqlArgs} field="pattern" onChange={handleInputChange} placeholder={`Search ${title}...`}/> 
      <div>
        <FieldCheckBox
          bean={sqlArgs} field="storageState" checked
          value={StorageState.ACTIVE} label="Active" onChecked={handleCheckboxChange}/>
        <FieldCheckBox
          bean={sqlArgs} field="storageState" 
          value={StorageState.ARCHIVED} label="Archived" onChecked={handleCheckboxChange}/>
      </div>
      <FieldDate 
        bean={sqlArgs} field="modifiedTime" onChange={handleInputChange}/>
      <Button className="my-1"
        icon={<icon.BsSearch/>} title="Lookup" type="primary" onClick={doSearch}/>
    </>
  )
}