import { FieldString } from "input";
import React from "react";

interface SearchBarProps {
  onUseSearch?: (sqlArgs: any) => void;
}
export function SearchBar(props: SearchBarProps) {
  const { onUseSearch } = props;
  const [ sqlArgs, setSqlArgs ] = React.useState({
    filterValue: "",
    // more args
  });

  const handleInputChange = (field: string, newValue: any, rollBackValue: any) => {
    setSqlArgs((prevState: any) => ({
      ...prevState,
      [field]: newValue,
    }));
    if (onUseSearch) onUseSearch(sqlArgs);
    else console.warn("Should implement create useSearch hook in order to search data");
  }

  return (
    <div> 
      <FieldString 
        bean={sqlArgs} field="filterValue" onChange={handleInputChange} placeholder="Search..."/> 
    </div>
  )
}