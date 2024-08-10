import React from "react";
import * as icon from "react-icons/bs";
import { FieldString } from "../../input/FieldString";
import { Button } from "../button/UIButton";

interface SearchBarProps {
  title?: string;
  onUseSearch?: (sqlArgs: any) => void;
}
export function SearchBar({ title, onUseSearch }: SearchBarProps) {
  const [ sqlArgs, setSqlArgs ] = React.useState({
    filterValue: "",
    // more args
  });

  const handleInputChange = (field: string, newValue: any, rollBackValue: any) => {
    setSqlArgs((prevState: any) => ({
      ...prevState,
      [field]: newValue,
    }));
  }

  const doSearch = () => {
    if (onUseSearch) onUseSearch(sqlArgs);
    else console.warn("Should implement create useSearch hook in order to search data");
  }

  return (
    <> 
      <FieldString 
        bean={sqlArgs} field="filterValue" onChange={handleInputChange} placeholder={`Search ${title}...`}/> 
      <Button className="my-1"
        icon={<icon.BsSearch/>} title="Lookup" type="primary" onClick={doSearch}/>
    </>
  )
}