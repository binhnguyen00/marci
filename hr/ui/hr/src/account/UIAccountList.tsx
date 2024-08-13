import React from "react";
import * as icon from "react-icons/bs";
import { widget, input, server, hook } from "@marci-ui/lib";
import { IFormProps } from "interface/IFormProps";

interface UIAccountFormProps extends IFormProps {}
export function UIAccountForm(props: UIAccountFormProps) {
  let { reloadParent = () => {} } = props;
  const [account, setAccount] = React.useState({});

  const handleInputChange = (field: string, newValue: any, rollbackValue: any) => {
    setAccount((prevState) => ({
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
        bean={account} field="userName" label="Username" onChange={handleInputChange}/>
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

export function UIAccountList() {
  const [ accountRecords, setAccountData ] = React.useState<Array<any>>([]);
  const [ sqlArgs, setSqlArgs ] = React.useState<any>(widget.initSqlArgs());
  const [ reload, setReload ] = React.useState(false);

  const columns: widget.DataTableColumn[] = [ 
    { field: "id", header: "ID" },
    { field: "userName", header: "Username" },
    { field: "password", header: "Password" },
    { field: "email", header: "Email" },
  ];

  const reloadTable = () => {
    setReload(!reload);
  };

  const onCreateAccount = () => {
    widget.createPopup("Create Account", <UIAccountForm reloadParent={reloadTable}/>);
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
      title="Accounts" columns={columns} records={accountRecords}
      onCreateCallBack={onCreateAccount} onUseSearch={onUseSearch}/>
  )
}