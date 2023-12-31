import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    Axios.post("sem-project-alb-452073085.ap-southeast-2.elb.amazonaws.com/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    });
  };

  const getEmployees = () => {
    Axios.get("sem-project-alb-452073085.ap-southeast-2.elb.amazonaws.com/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const updateEmployeeWage = (name) => {
    Axios.put("sem-project-alb-452073085.ap-southeast-2.elb.amazonaws.com/update", { wage: newWage, name: name }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.name == name
              ? {
                  name: val.name,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  position: val.position,
                  wage: newWage,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteEmployee = (name) => {
    Axios.delete(`sem-project-alb-452073085.ap-southeast-2.elb.amazonaws.com/delete/${name}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.name != name;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Employee ID</label>
        <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <label>Company</label>
        <input
          type="text"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        />
        <label>Designation</label>
        <input
          type="text"
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        />
        <label>Salary </label>
        <input
          type="number"
          onChange={(event) => {
            setWage(event.target.value);
          }}
        />
        <button onClick={addEmployee}>Add</button>
      </div>
      <div className="employees">
        <button onClick={getEmployees}>Show</button>

        {employeeList.map((val, key) => {
          return (
            <div className="employee">
              <div>
                <h3>Name : {val.name}</h3>
                <h3>Employee ID : {val.age}</h3>
                <h3>Company : {val.country}</h3>
                <h3>Designation : {val.position}</h3>
                <h3>Salary : {val.wage}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter new value of wage.."
                  onChange={(event) => {
                    setNewWage(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateEmployeeWage(val.name);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteEmployee(val.name);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
