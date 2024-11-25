// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// import Swal from 'sweetalert2'; // Import SweetAlert2
// import Cookies from 'js-cookie';     
// import { jwtDecode } from 'jwt-decode';  // Correct import for jwt-decode

// const AddEmployee = () => {
//     const [employeeRoleData, setemployeeRoleData] = useState([]);
//     const [employeeName, setEmployeeName] = useState('');
//     const [employeeEmail, setEmployeeEmail] = useState('');
//     const [employeeSalary, setemployeeSalary] = useState('');
//     const [employeePassword, setEmployeePassword] = useState('');
//     const [employeeRole, setEmployeeRole] = useState([]);

//     const navigate = useNavigate();

//     // const notify = (error) => toast.error(error);
//     // const successNotify = (success) => toast.success(success);

    
//     const showErrorAlert = (message) => {
//         Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: message,
//             // timer: 2000, // Automatically closes after 2 seconds
//             // showConfirmButton: false,
//         });
//     };

//     const showSuccessAlert = (message) => {
//         Swal.fire({
//             icon: 'success',
//             title: 'Success',
//             text: message,
//             timer: 2000,
//             showConfirmButton: false,
//         });
//     };


//     useEffect(() => {
//         const userToken = Cookies.get("UserAuthToken");
    
//         if (userToken) {
//             try {
//                 // Decode the token
//                 const decodedToken = jwtDecode(userToken);  // Get the user role from the decoded token
//                 const userRole = decodedToken.userrole;     // If user role is not Admin, redirect to login                
//                 if (userRole !== "Admin") {
//                     navigate("/login");
//                 }
//             } catch (error) {
//                 // If token decoding fails, redirect to login
//                 navigate("/login");
//             }
//         } else {
//             navigate("/login");  // If there's no token, redirect to login
//         }
//     }, [navigate]); // This will run only once after the component mounts
    
    

//     useEffect(() => {
//         const fetchRoles = async () => {
//           try {
//             const res = await axios.get("http://localhost:5000/api/role/active/R");
//             setemployeeRoleData(res.data)
//           } catch (error) {
//             console.log("Error Fetching Employees Data", error)
//           }
//         }
//         fetchRoles();
//       }, [])

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = {
//             employeeName,
//             employeeEmail,
//             employeePassword,
//             employeeSalary,
//             employeeRole
//         }
//         try {
//             const response  = await axios.post("http://localhost:5000/api/employee", formData);
//             showSuccessAlert(response.data.msg);
//             setTimeout(() => {
//                     navigate("/showemployee");
//             }, 2000);
//         } catch (error) {
//             showErrorAlert(error.response?.data?.err || "Failed to add Employee");
//         }
//     }

//     return (
//         <>
//             <div class="container-fluid">
//                 <button type="button" class="btn mb-3 btn-primary" onClick={() => navigate(-1)}>
//                     <i class="fa-solid fa-arrow-left-long" style={{ fontSize: "20px", fontWeight: "900" }}></i>
//                 </button>
//                 <div class="row">
//                     <div class="col-lg-12">
//                         <div class="card">
//                             <div class="card-body">
//                                 <h4 class="card-title">Add Employee</h4>
//                                 <div class="basic-form">
//                                     <form onSubmit={handleSubmit}>
//                                         <div class="form-row">
//                                             <div class="form-group col-md-6">
//                                                 <label>Employee Name:</label>
//                                                 <input type="text" class="form-control" placeholder="Employee Name" onChange={(e) => setEmployeeName(e.target.value)} required />
//                                             </div>
//                                             <div class="form-group col-md-6">
//                                                 <label>Employee Email: </label>
//                                                 <input type="email" class="form-control" placeholder="Employee Email" onChange={(e) => setEmployeeEmail(e.target.value)} />
//                                             </div>
//                                         </div>
//                                         <div class="form-row">
//                                             <div class="form-group col-md-6">
//                                                 <label>Password</label>
//                                                 <input type="password" class="form-control" placeholder="Password" onChange={(e) => setEmployeePassword(e.target.value)} />
//                                             </div>
//                                             <div class="form-group col-md-6">
//                                                 <label>Salary</label>
//                                                 <input type="text" class="form-control" placeholder="Salary" onChange={(e) => setemployeeSalary(e.target.value)} />
//                                             </div>
//                                             <div class="form-group col-md-12">
//                                                 <label>Employee Role</label>
//                                                 <select id="inputState" class="form-control" onChange={(e) => setEmployeeRole(e.target.value)}  >
//                                                     <option disabled  selected> Choose Employee Role</option>                                                  
//                                                     {
//                                                            employeeRoleData && employeeRoleData.length>0 ? (
//                                                                 employeeRoleData.map((role,index)=>(
//                                                                         <option value={role._id || ""} key={role._id  || index }>{role.roleName || "N/A"}</option>
//                                                                     ))
//                                                             ):(
//                                                                 <option disabled>Role Not Available</option>
//                                                             )
//                                                     }                                                    
//                                                 </select>
//                                             </div>
//                                         </div>
//                                         <button type="submit" class="btn btn-dark">Add Employee</button>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {/* <ToastContainer /> */}
//         </>
//     )
// }

// export default AddEmployee
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const AddEmployee = () => {
    const [employeeRoleData, setEmployeeRoleData] = useState([]);
    const [employeeName, setEmployeeName] = useState('');
    const [employeeEmail, setEmployeeEmail] = useState('');
    const [employeeSalary, setEmployeeSalary] = useState('');
    const [employeePassword, setEmployeePassword] = useState('');
    const [employeeRoles, setEmployeeRoles] = useState(['']); // Array for roles

    const navigate = useNavigate();

    const showErrorAlert = (message) => {
        Swal.fire({ icon: 'error', title: 'Oops...', text: message });
    };

    const showSuccessAlert = (message) => {
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: message,
            timer: 2000,
            showConfirmButton: false,
        });
    };

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
        const fetchRoles = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/role/active/R");
                setEmployeeRoleData(res.data);
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        };
        fetchRoles();
    }, []);

    const handleRoleChange = (index, value) => {
        const roles = [...employeeRoles];
        roles[index] = value;
        setEmployeeRoles(roles);
    };

    const addRoleField = () => {
        setEmployeeRoles([...employeeRoles, '']);
    };

    const removeRoleField = (index) => {
        const roles = [...employeeRoles];
        roles.splice(index, 1);
        setEmployeeRoles(roles);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            employeeName,
            employeeEmail,
            employeePassword,
            employeeSalary,
            employeeRoles, // Send array of roles
        };
        try {
            const response = await axios.post("http://localhost:5000/api/employee", formData);
            showSuccessAlert(response.data.msg);
            setTimeout(() => {
                navigate("/showemployee");
            }, 2000);
        } catch (error) {
            showErrorAlert(error.response?.data?.err || "Failed to add Employee");
        }
    };

    return (
        <div className="container-fluid">
            <button
                type="button"
                className="btn mb-3 btn-primary"
                onClick={() => navigate(-1)}
            >
                <i
                    className="fa-solid fa-arrow-left-long"
                    style={{ fontSize: "20px", fontWeight: "900" }}
                ></i>
            </button>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Add Employee</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Employee Name:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Employee Name"
                                            onChange={(e) => setEmployeeName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Employee Email: </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Employee Email"
                                            onChange={(e) => setEmployeeEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Password"
                                            onChange={(e) => setEmployeePassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Salary</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Salary"
                                            onChange={(e) => setEmployeeSalary(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Employee Roles:</label>
                                    {employeeRoles.map((role, index) => (
                                        <div key={index} className="d-flex align-items-center mb-2">
                                            <select
                                                className="form-control"
                                                value={role}
                                                onChange={(e) =>
                                                    handleRoleChange(index, e.target.value)
                                                }
                                                required
                                            >
                                                <option value="">Choose Employee Role</option>
                                                {employeeRoleData.map((roleOption) => (
                                                    <option
                                                        key={roleOption._id}
                                                        value={roleOption._id}
                                                    >
                                                        {roleOption.roleName}
                                                    </option>
                                                ))}
                                            </select>
                                            {employeeRoles.length > 1 && (
                                                <button
                                                    type="button"
                                                    className="btn btn-danger ml-2"
                                                    onClick={() => removeRoleField(index)}
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="btn btn-primary mt-2"
                                        onClick={addRoleField}
                                    >
                                        Add Another Role
                                    </button>
                                </div>
                                <button type="submit" className="btn btn-dark">
                                    Add Employee
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEmployee;
