import React from "react";
import * as icon from "react-icons/bs";
import { widget, input, server, hook, tableUtils } from "@marci-ui/lib";
import { IFormProps } from "interface/IFormProps";
import { ListUtils, ShowRowDetailsRequest } from "utilities/ListUtils";
import { IListProps } from "interface/IListProps";

interface UIAccountFormProps extends IFormProps {}
export function UIAccountForm(props: UIAccountFormProps) {
  let { entity = {}, reloadParent = () => {} } = props;
  const [account, setAccount] = React.useState(entity);

  const handleInputChange = (field: string, newValue: any, rollbackValue: any) => {
    setAccount((prevState: any) => ({
      ...prevState,
      [field]: newValue,
    }));
  };

  const createAccount = () => {
    
    const successCB: server.CallBack = (response: server.ServerResponse) => {
      const account = response.body as any;
      const html = (<div> {JSON.stringify(account, null, 2)} </div>)
      widget.closeCurrentPopup();  
      widget.createPopup("Success", html);
      reloadParent();
    }

    const failCB: server.CallBack = (response: server.ServerResponse) => {
      const html = (
        <div>
          <div className="border-bottom"> {JSON.stringify(response.message, null, 2)} </div>
          <div> {JSON.stringify(response.body, null, 2)} </div>
        </div>
      )
      widget.closeCurrentPopup();
      widget.createPopup("Fail", html);
    }

    server.rpc.call("AccountService", "save", { target: account }, successCB, failCB);
  }

  return (
    <div className="form-group p-1 border">
      <input.FieldString 
        bean={account} field="userName" label="Username" onChange={handleInputChange} disabled/>
      <input.FieldString 
        bean={account} field="displayName" label="Display Name" onChange={handleInputChange}/>
      <input.FieldString 
        bean={account} field="password" label="Password" onChange={handleInputChange}/>
      <input.FieldString
        bean={account} field="email" label="Email" onChange={handleInputChange}/>
      <widget.Button 
        icon={<icon.BsSaveFill />}
        title="Save" type="primary" onClick={createAccount}/>
    </div>
  )
}

interface UIAccountListProps extends IListProps {}
export function UIAccountList(props: UIAccountListProps) {
  const { title = "Accounts", height } = props;
  const [ accountRecords, setAccountData ] = React.useState<Array<any>>([]);
  const [ sqlArgs, setSqlArgs ] = React.useState<any>(tableUtils.initSqlArgs());
  const [ reload, setReload ] = React.useState(false);

  const columns: widget.DataTableColumn[] = [ 
    { 
      field: "userName", header: "Username", 
      customRender(record, index) {
        const request: ShowRowDetailsRequest = {
          id: record.id,
          cellValue: record.userName,
          rpcRequest: {
            component: "AccountService",
            service: "getById",
          },
          callBack(entity) {
            const html = (<UIAccountForm entity={entity} reloadParent={reloadTable}/>);
            widget.createPopup(`Account: ${entity.userName}`, html);
          },
        }
        return ListUtils.renderCellGetRecordById(request);
      },
    },
    { field: "displayName", header: "Display Name" },
    { field: "email", header: "Email" },
    { field: "address", header: "Address" },
    { field: "countryName", header: "Country" },
    { field: "cityName", header: "City" },
    { field: "stateName", header: "State" },
  ];

  const reloadTable = () => {
    setReload(!reload);
  };

  const onCreateAccount = () => {
    widget.createPopup("Create Account", <UIAccountForm reloadParent={reloadTable}/>);
  }

  const onActive = (targetIds: number[]) => {
    server.rpc.call(
      "AccountService", "active", { targetIds: targetIds }, 
      (response: server.ServerResponse) => {
        reloadTable();
      }
    );
  }

  const onArchive = (targetIds: number[]) => {
    server.rpc.call(
      "AccountService", "archive", { targetIds: targetIds }, 
      (response: server.ServerResponse) => {
        reloadTable();
      }
    );
  }

  const onUseSearch = (sqlArgs: any) => {
    setSqlArgs(sqlArgs);
  }

  hook.useSearch({ 
    component: "AccountService", service: "search", sqlArgs: sqlArgs, 
    dependencies: [reload, sqlArgs], updateData: setAccountData,
  });

  return (
    <widget.DataTable 
      title={title} height={height} columns={columns} records={accountRecords}
      onCreate={onCreateAccount} onUseSearch={onUseSearch} onActive={onActive} onArchive={onArchive}/>
  )
}