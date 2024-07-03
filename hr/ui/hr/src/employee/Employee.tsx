import "bootstrap/dist/css/bootstrap.css";
import { RESTful } from "../../../lib/src/server/RESTful"; 

export function UIEmployee() {
  const employee = {
    fullName: "Nguyễn Năng Bình",
    dateOfBirth: "2000-03-28",
    nickName: "Jack",
  }
  const rest = new RESTful("http://localhost:3000", "http://localhost:3000");

  return (
    <div className="flex-column">
      <h1>Employee</h1>
      <div>
        <p>{employee.fullName}</p>
        <p>{employee.dateOfBirth}</p>
        <p>{employee.nickName}</p>
      </div>
      <button onClick={() => console.log(rest.post())}> Test POST </button>
    </div>
  )
}

