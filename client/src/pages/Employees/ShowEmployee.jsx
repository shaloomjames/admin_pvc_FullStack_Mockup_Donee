// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Swal from "sweetalert2"; // Import SweetAlert2
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";

// const ShowEmployee = () => {
//   const [employeeData, setEmployeeData] = useState([]); // Raw employee data
//   const [search, setSearch] = useState(""); // State for search query
//   const [filteredData, setFilteredData] = useState([]); // Filtered employees
//   const [RoleFilter, setRoleFilter] = useState(""); // State to store selected role filter

//   const navigate = useNavigate();

//   useEffect(() => {
//     const userToken = Cookies.get("UserAuthToken");
//     if (userToken) {
//       try {
//         const decodedToken = jwtDecode(userToken);
//         const userRole = decodedToken.userrole;
//         if (userRole !== "Admin") {
//           navigate("/login");
//         }
//       } catch (error) {
//         navigate("/login");
//       }
//     } else {
//       navigate("/login");
//     }
//   }, [navigate]);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/employee");
//         setEmployeeData(res.data);
//         setFilteredData(res.data); // Initialize filtered data with all employees
//       } catch (error) {
//         console.log("Error Fetching Employees Data", error);
//       }
//     };
//     fetchEmployees();
//   }, []);


//   useEffect(() => {
//     // Filter employees whenever search or RoleFilter changes
//     const filteredEmployees = employeeData.filter((employee) => {
//       // Check if the employee matches the search term
//       const matchesSearch = employee.employeeName.toLowerCase().includes(search.toLowerCase()) ||
//         employee.employeeEmail.toLowerCase().includes(search.toLowerCase()) ||
//         employee.employeeSalary?.toString().toLowerCase().includes(search.toLowerCase());
  
//       // Check if the employee matches the role filter
//       const matchesRole = RoleFilter ? employee.employeeRole?.roleName.toLowerCase().includes(RoleFilter.toLowerCase()) : true;
  
//       return matchesSearch && matchesRole;
//     });
  
//     setFilteredData(filteredEmployees); // Set filtered data
//   }, [search, RoleFilter, employeeData]);  // Run the effect when search, RoleFilter, or employeeData changes

//   // Extract all roles from employee data for dropdown
//   const allRoles = [...new Set(employeeData.map(employee => employee.employeeRole?.map((role,index)=>role.roleName)).flat())];

//   const deleteEmployee = async (employeeid) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to undo this action!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const response = await axios.delete(`http://localhost:5000/api/employee/${employeeid}`);
//           setEmployeeData(employeeData.filter((employee) => employee._id !== employeeid));
//           setFilteredData(filteredData.filter((employee) => employee._id !== employeeid));
//           Swal.fire("Deleted!", response.data.msg, "success");
//         } catch (error) {
//           Swal.fire("Error", error?.response?.data?.err || "An unexpected error occurred. Please try again.", "error");
//           console.error("Error deleting employee:", error);
//         }
//       }
//     });
//   };

//   return (
//     <>
//       <div className="container-fluid mb-5">
//         <Link type="button" className="btn mb-1 btn-primary" to="/addemployee">
//           Add Employee
//           <span className="btn-icon-right">
//             <i className="fa-solid fa-user-plus"></i>
//           </span>
//         </Link>

//         {/* Search Field */}
//         <div className="row mt-3">
//           <div className="col-lg-4">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search by Name, Email or Salary"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)} // Update search query
//             />
//           </div>
//           <div className="col-lg-4"></div>
//           {/* <div className="form-control col-md-3"> */}
//             <select id="inputState" className="form-control col-md-2" onChange={(e) => setRoleFilter(e.target.value)}>
//               <option disabled selected>Choose Employee Role</option>
//               {
//                 allRoles.length > 0 ? (
//                   allRoles.map((role, index) => (
//                     <option value={role || ""} key={index}>{role || "N/A"}</option>
//                   ))
//                 ) : (
//                   <option disabled>No Roles Available</option>
//                 )
//               }
//             </select>
//           {/* </div> */}
//           <div className="col-lg-2 d-flex align-items-end">
//             <button className="btn btn-secondary" onClick={()=> setRoleFilter("")}>
//               Clear Filter
//             </button>
//           </div>
//         </div>

//         <div className="row mt-5">
//           <div className="col-lg-12">
//             <div className="card">
//               <div className="card-body">
//                 <h4 className="card-title">Employee</h4>
//                 <div className="table-responsive">
//                   <table className="table header-border">
//                     <thead>
//                       <tr>
//                         <th>Employee Name</th>
//                         <th>Employee Email</th>
//                         <th>Employee Role</th>
//                         <th>Employee Salary</th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredData.length > 0 ? (
//                         filteredData.map((employee, index) => (
//                           <tr key={index}>
//                             <td>{employee.employeeName || "N/A"}</td>
//                             <td>{employee.employeeEmail || "N/A"}</td>
//                             <td>{employee.employeeRole?.map((role,index)=>(
//                               <td>{role.roleName}</td>
//                             )) || "N/A"}</td>
//                             <td>{employee.employeeSalary || "N/A"}</td>
//                             <td>
//                               <span>
//                                 <Link
//                                   data-toggle="tooltip"
//                                   data-placement="top"
//                                   title="Edit"
//                                   to={`/updateemployee/${employee._id}`}
//                                 >
//                                   <i className="fa fa-pencil color-muted mx-2"></i>
//                                 </Link>
//                                 <Link
//                                   data-toggle="tooltip"
//                                   data-placement="top"
//                                   title="Close"
//                                   onClick={() => deleteEmployee(employee._id)}
//                                 >
//                                   <i className="fa fa-close color-danger mx-2"></i>
//                                 </Link>
//                               </span>
//                             </td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td colSpan="5" className="text-center">
//                             No Employee Found
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ShowEmployee;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const ShowEmployee = () => {
  const [employeeData, setEmployeeData] = useState([]); // Raw employee data
  const [search, setSearch] = useState(""); // State for search query
  const [filteredData, setFilteredData] = useState([]); // Filtered employees
  const [RoleFilter, setRoleFilter] = useState(""); // State to store selected role filter

  const navigate = useNavigate();

  useEffect(() => {
    const userToken = Cookies.get("UserAuthToken");

    if (userToken) {
      try {
        const decodedToken = jwtDecode(userToken); // Decode the JWT token
        const userRole = decodedToken.userrole; // Get the user role(s)

        // Check if userRole contains "Admin"
        if (Array.isArray(userRole) && userRole.includes("Admin")) {
          // The user has "Admin" role, allow access
          console.log("User is an Admin");
        } else {
          // Redirect to login if "Admin" role is not present
          navigate("/login");
        }
      } catch (error) {
        // If token decoding fails, redirect to login
        console.error("Token decoding failed:", error);
        navigate("/login");
      }
    } else {
      // If there's no token, redirect to login
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
    // Filter employees whenever search or RoleFilter changes
    const filteredEmployees = employeeData.filter((employee) => {
      // Check if the employee matches the search term
      const matchesSearch =
        employee.employeeName.toLowerCase().includes(search.toLowerCase()) ||
        employee.employeeEmail.toLowerCase().includes(search.toLowerCase()) ||
        employee.employeeSalary?.toString().toLowerCase().includes(search.toLowerCase());

      // Check if the employee matches the role filter (handles role being an array)
      const matchesRole = RoleFilter
        ? employee.employeeRoles?.some((role) => role.roleName.toLowerCase().includes(RoleFilter.toLowerCase()))
        : true;

      return matchesSearch && matchesRole;
    });

    setFilteredData(filteredEmployees); // Set filtered data
  }, [search, RoleFilter, employeeData]); // Run the effect when search, RoleFilter, or employeeData changes

  // Extract all roles from employee data for dropdown
  const allRoles = [
    ...new Set(
      employeeData
        .map((employee) => employee.employeeRoles?.map((role) => role.roleName)) // Extract role names from employeeRole array
        .flat()
    ),
  ];

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
          Swal.fire(
            "Error",
            error?.response?.data?.err || "An unexpected error occurred. Please try again.",
            "error"
          );
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
          <div className="col-lg-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Name, Email or Salary"
              value={search}
              onChange={(e) => setSearch(e.target.value)} // Update search query
            />
          </div>
          <div className="col-lg-4"></div>
          <select
            id="inputState"
            className="form-control col-md-3"
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option disabled selected>
              Choose Employee Role
            </option>
            <option value={""}>All</option>
            {allRoles.length > 0 ? (
              allRoles.map((role, index) => (
                <option value={role || ""} key={index}>
                  {role || "N/A"}
                </option>
              ))
            ) : (
              <option disabled>No Roles Available</option>
            )}
          </select>
          {/* <div className="col-lg-2 d-flex align-items-end">
            <button className="btn btn-secondary" onClick={() => setRoleFilter("")}>
              Clear Filter
            </button>
          </div> */}
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
                            <td>{employee.employeeRoles?.map(role => role.roleName).join(", ") || "N/A"}</td>
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
