import React from "react";
import * as icon from "react-icons/bs";
import { widget, input, server } from "@marci-ui/lib";

interface UIAccountFormProps {
  reloadTable: (newAccount: any) => void;
}

export function UIAccountForm(props: UIAccountFormProps) {
  let { reloadTable } = props;
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
      reloadTable(account);
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

  const columns: widget.DataTableColumn[] = [ 
    { field: "id", header: "ID" },
    { field: "userName", header: "Username" },
    { field: "password", header: "Password" },
    { field: "email", header: "Email" },
  ];

  const reloadTable = (newAccount: any) => {
    let accounts = [...accountRecords, newAccount];
    setAccountData(accounts);
  };

  const showAccountForm = () => {
    widget.createPopup("Create Account", <UIAccountForm reloadTable={reloadTable}/>);
  }

  const loadAccountsSuccessCB: server.CallBack = (response: server.ServerResponse) => {
    const accounts = response.body as any[];
    setAccountData(accounts);
  }

  React.useEffect(() => {
    const searchParams = {} as any;
    server.rpc.call("AccountService", "search", {}, loadAccountsSuccessCB);
  }, [])

  return (
    <div className="flex-v">
      <widget.Button icon={<icon.BsPlus />}
        className="m-1" title="Create" onClick={showAccountForm}/>
      <widget.DataTable 
        title="Accounts" columns={columns} records={accountRecords}/>
    </div>
  )
}