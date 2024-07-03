import "bootstrap/dist/css/bootstrap.css";

export function UIEmployee() {
  const employee = {
    fullName: "Nguyễn Năng Bình",
    dateOfBirth: "2000-03-28",
    nickName: "Jack",
  }
  return (
    <div className="flex-column">
      <h1>Employee</h1>
      <div>
        <p>{employee.fullName}</p>
        <p>{employee.dateOfBirth}</p>
        <p>{employee.nickName}</p>
      </div>
    </div>
  )
}

