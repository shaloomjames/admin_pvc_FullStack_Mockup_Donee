import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";

const ShowEmployee = () => {
  const [employeeData, setEmployeeData] = useState([]); // Raw employee data
  const [search, setSearch] = useState(""); // State for search query
  const [filteredData, setFilteredData] = useState([]); // Filtered employees

  const navigate = useNavigate();

  useEffect(() => {
    const userToken = Cookies.get("UserAuthToken");
    if (userToken) {
      try {
        const decodedToken = jwtDecode(userToken);
        const userRole = decodedToken.userrole;
        if (userRole !== "Admin") {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/employee");
        setEmployeeData(res.data);
        setFilteredData(res.data); // Initialize filtered data with all employees
      } catch (error) {
        console.log("Error Fetching Employees Data", error);
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    // Filter employees whenever search changes
    const filteredEmployees = employeeData.filter((employee) =>
      employee.employeeName.toLowerCase().includes(search.toLowerCase()) ||
      employee.employeeEmail.toLowerCase().includes(search.toLowerCase()) ||
      employee.employeeRole?.roleName?.toLowerCase().includes(search.toLowerCase()) ||
      employee.employeeSalary?.toString().toLowerCase().includes(search.toLowerCase())


    );
    setFilteredData(filteredEmployees);
  }, [search, employeeData]);

  // const deleteEmployee = async (employeeid) => {
  //   const isConfirmed = window.confirm("Are you sure you want to delete this Employee?");
  //   if (isConfirmed) {
  //     try {
  //       const res = await axios.delete(`http://localhost:5000/api/employee/${employeeid}`);
  //       setEmployeeData(employeeData.filter((employee) => employee._id !== employeeid));
  //       successNotify(res.data.msg);
  //     } catch (error) {
  //       console.log("Error Deleting Employee");
  //     }
  //   }
  // };

  const deleteEmployee = async (employeeid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`http://localhost:5000/api/employee/${employeeid}`);
          setEmployeeData(employeeData.filter((employee) => employee._id !== employeeid));
          setFilteredData(filteredData.filter((employee) => employee._id !== employeeid));
          Swal.fire("Deleted!", response.data.msg, "success");
        } catch (error) {
          Swal.fire("Error", error?.response?.data?.err || "An unexpected error occurred. Please try again.", "error");
          console.error("Error deleting employee:", error);
        }
      }
    });
  };
  

  return (
    <>
      <div className="container-fluid mb-5">
        <Link type="button" className="btn mb-1 btn-primary" to="/addemployee">
          Add Employee
          <span className="btn-icon-right">
            <i className="fa-solid fa-user-plus"></i>
          </span>
        </Link>

        {/* Search Field */}
        <div className="row mt-3">
          <div className="col-lg-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Name, Email,  Role or Salary"
              value={search}
              onChange={(e) => setSearch(e.target.value)} // Update search query
            />
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Employee</h4>
                <div className="table-responsive">
                  <table className="table header-border">
                    <thead>
                      <tr>
                        <th>Employee Name</th>
                        <th>Employee Email</th>
                        <th>Employee Role</th>
                        <th>Employee Salary</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.length > 0 ? (
                        filteredData.map((employee, index) => (
                          <tr key={index}>
                            <td>{employee.employeeName || "N/A"}</td>
                            <td>{employee.employeeEmail || "N/A"}</td>
                            <td>{employee.employeeRole?.roleName || "N/A"}</td>
                            <td>{employee.employeeSalary || "N/A"}</td>
                            <td>
                              <span>
                                <Link
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Edit"
                                  to={`/updateemployee/${employee._id}`}
                                >
                                  <i className="fa fa-pencil color-muted mx-2"></i>
                                </Link>
                                <Link
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Close"
                                  onClick={() => deleteEmployee(employee._id)}
                                >
                                  <i className="fa fa-close color-danger mx-2"></i>
                                </Link>
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center">
                            No Employee Found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowEmployee;
