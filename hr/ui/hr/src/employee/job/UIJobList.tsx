import React from "react";

import { widget, server, hook } from "@marci-ui/lib";
import { IListProps } from "../../interface/IListProps";
import { ListUtils, ShowRowDetailsRequest } from "utilities/ListUtils";

interface IJobListProps extends IListProps {}
export function UIJobList(props: IJobListProps) {
  const { title = "Jobs", height, onModify } = props;
  const [jobData, setJobData] = React.useState<any[]>([]); 
  const [ reload, setReload ] = React.useState(false);

  const columns: widget.DataTableColumn[] = [ 
    { field: "name", header: "Job Title", customRender(record, index) {
      const request: ShowRowDetailsRequest = {
        id: record.id,
        cellValue: record.fullName,
        rpcRequest: {
          component: "JobService",
          service: "getById",
        },
        callBack(entity) {
          const html = <>TODO</>;
          widget.createPopup(`Job: ${entity.fullName}`, html);
        },
      }
      return ListUtils.renderCellGetRecordById(request);
    }},
    { field: "description", header: "Description" },
  ];

  const onCreate = () => {
    widget.createPopup("Create Job", <div/>);
  }

  const onDelete = (targetIds: number[]) => {
    server.rpc.call(
      "JobService", "deleteByIds", { ids: targetIds }, 
      (response: server.ServerResponse) => {
        reloadTable();
      }
    );
  }

  const reloadTable = () => {
    setReload(!reload);
  };

  const successSearch = (response: server.ServerResponse) => {
    const jobs = response.body as any[];
    setJobData(jobs);
  }

  hook.useSearch({ 
    component: "JobService", service: "search", sqlArgs: {}, dependency: reload,
    successCB: successSearch, failCB: undefined,
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