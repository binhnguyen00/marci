import React from "react";
import * as icon from "react-icons/bs";

import { widget, server, hook, input } from "@marci-ui/lib";
import { IListProps } from "../../interface/IListProps";
import { IFormProps } from "../../interface/IFormProps";
import { ListUtils, ShowRowDetailsRequest } from "utilities/ListUtils";

interface IJobListProps extends IListProps {}
export function UIJobList(props: IJobListProps) {
  const { title = "Jobs", height, onModify } = props;
  const [ jobData, setJobData ] = React.useState<any[]>([]); 
  const [ reload, setReload ] = React.useState(false);
  const reloadTable = () => {setReload(!reload)};

  const columns: widget.DataTableColumn[] = [ 
    { 
      field: "name", header: "Title", 
      customRender(record, index) {
        const request: ShowRowDetailsRequest = {
          id: record.id,
          cellValue: record.name,
          rpcRequest: {
            component: "JobService",
            service: "getById",
          },
          callBack(entity) {
            const html = (<UIJobForm entity={entity} reloadParent={reloadTable}/>);
            widget.createPopup(`Job: ${entity.name}`, html);
          },
        }
        return ListUtils.renderCellGetRecordById(request);
      }
    },
    { field: "description", header: "Description" },
  ];

  const onCreate = () => {
    const ui = (<UIJobForm reloadParent={reloadTable}/>);
    widget.createPopup("Create Job", ui);
  }

  const onDelete = (targetIds: number[]) => {
    server.rpc.call("JobService", "deleteByIds", { ids: targetIds }, reloadTable);
  }

  hook.useSearch({ 
    component: "JobService", sqlArgs: {}, 
    dependency: reload, updateData: setJobData
  });

  return (
    <div>
      <widget.DataTable 
        title={title} height={height} columns={columns} records={jobData} enableRowSelection
        onCreateCallBack={onCreate} onDeleteCallBack={onDelete}
      />
    </div>
  )
}

export function UIJobForm(props: IFormProps) {
  const { entity = {}, reloadParent = () => {} } = props;
  const [ jobState, setJobState ] = React.useState(entity);

  const handleInputChange = (field: string, newValue: any, rollbackValue: any) => {
    setJobState((prevState: any) => ({
      ...prevState,
      [field]: newValue,
    }));
  };

  const onSave = () => {
    const successCB = (response: server.ServerResponse) => {
      widget.closeCurrentPopup();
      reloadParent();
    };
    server.rpc.call("JobService", "save", { job: jobState }, successCB);
  }

  return (
    <div>
      <input.FieldString 
        bean={jobState} field="name" label="Title" onChange={handleInputChange}/>
      <input.FieldText 
        bean={jobState} field="description" label="Description" onChange={handleInputChange}/>
      <widget.Button 
        title="Save" onClick={onSave} icon={<icon.BsSave/>}/>
    </div>
  )
}