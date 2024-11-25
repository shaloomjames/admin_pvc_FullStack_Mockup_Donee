// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// import Swal from 'sweetalert2'; // Import SweetAlert2_
// import Cookies from 'js-cookie';     
// import { jwtDecode } from 'jwt-decode';  // Correct import for jwt-decode

// const UpdateEmployee = () => {
//     const [RoleData, setRoleData] = useState([]);
//     const [employeeName, setEmployeeName] = useState('');
//     const [employeeEmail, setEmployeeEmail] = useState('');
//     const [employeeSalary, setemployeeSalary] = useState('');
//     const [employeeRole, setEmployeeRole] = useState('');

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

//     const { id } = useParams();

//     useEffect(() => {
//         const userToken = Cookies.get("UserAuthToken");
    
//         if (userToken) {
//           try {
//             const decodedToken = jwtDecode(userToken); // Decode the JWT token
//             const userRole = decodedToken.userrole; // Get the user role(s)
    
//             // Check if userRole contains "Admin"
//             if (Array.isArray(userRole) && userRole.includes("Admin")) {
//               // The user has "Admin" role, allow access
//               console.log("User is an Admin");
//             } else {
//               // Redirect to login if "Admin" role is not present
//               navigate("/login");
//             }
//           } catch (error) {
//             // If token decoding fails, redirect to login
//             console.error("Token decoding failed:", error);
//             navigate("/login");
//           }
//         } else {
//           // If there's no token, redirect to login
//           navigate("/login");
//         }
//       }, [navigate]);
    
    

//     useEffect(() => {
//         const fetchEmployee = async () => {
//             try {
//                 const res = await axios.get(`http://localhost:5000/api/employee/${id}`);
//                 setEmployeeName(res.data.employeeName);
//                 setEmployeeEmail(res.data.employeeEmail);
//                 setEmployeeRole(res.data.employeeRole._id);
//                 setemployeeSalary(res.data.employeeSalary);
//             } catch (error) {
//                 console.log("Error Fetching Employee Data", error);
//             }
//         };
//         fetchEmployee();
//     }, [id]);

//     useEffect(() => {
//         const fetchRole = async () => {
//             try {
//                 const res = await axios.get(`http://localhost:5000/api/role/`);
//                 setRoleData(res.data);
//             } catch (error) {
//                 console.log("Error Fetching Roles", error);
//             }
//         };
//         fetchRole();
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = {
//             employeeName,
//             employeeEmail,
//             employeeSalary,
//             employeeRole
//         };
//         try {
//             const res = await axios.put(`http://localhost:5000/api/employee/${id}`, formData);
//             showSuccessAlert(res.data.msg);
//             setTimeout(() => {
//                 navigate("/showemployee");
//             }, 4000);
//         } catch (error) {
//             showErrorAlert(error.response?.data?.err || "Failed to update Employee");
//         }
//     };

//     return (
//         <>
//             <div className="container-fluid">
//                 <button type="button" className="btn mb-3 btn-primary" onClick={() => navigate(-1)}>
//                     <i className="fa-solid fa-arrow-left-long" style={{ fontSize: "20px", fontWeight: "900" }}></i>
//                 </button>
//                 <div className="row">
//                     <div className="col-lg-12">
//                         <div className="card">
//                             <div className="card-body">
//                                 <h4 className="card-title">Update Employee</h4>
//                                 <div className="basic-form">
//                                     <form onSubmit={handleSubmit}>
//                                         <div className="form-row">
//                                             <div className="form-group col-md-6">
//                                                 <label>Employee Name:</label>
//                                                 <input type="text" className="form-control" placeholder="Employee Name" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} />
//                                             </div>
//                                             <div className="form-group col-md-6">
//                                                 <label>Employee Email:</label>
//                                                 <input type="email" className="form-control" placeholder="Employee Email" value={employeeEmail} onChange={(e) => setEmployeeEmail(e.target.value)} />
//                                             </div>
//                                         </div>
//                                         <div className="form-row">
//                                         <div class="form-group col-md-6">
//                                                 <label>Salary</label>
//                                                 <input type="text" class="form-control" placeholder="Salary" value={employeeSalary} onChange={(e) => setemployeeSalary(e.target.value)} />
//                                             </div>
//                                             <div className="form-group col-md-6">
//                                                 <label>Employee Role</label>
//                                                 <select id="inputState" className="form-control" value={employeeRole} onChange={(e) => setEmployeeRole(e.target.value)}>
//                                                     <option disabled value="">Choose Employee Role</option>
//                                                     {RoleData && RoleData.length > 0 ? (
//                                                         RoleData.map((role,index) => (
//                                                             <option value={role._id || ""} key={role._id || index}>{role.roleName || "N/A"}</option>
//                                                         ))
//                                                     ) : (
//                                                         <option disabled>Role Not Available</option>
//                                                     )}
//                                                 </select>
//                                             </div>
//                                         </div>
//                                         <button type="submit" className="btn btn-dark">Update Employee</button>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {/* <ToastContainer /> */}
//         </>
//     );
// };

// export default UpdateEmployee;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const UpdateEmployee = () => {
    const [RoleData, setRoleData] = useState([]);
    const [employeeName, setEmployeeName] = useState('');
    const [employeeEmail, setEmployeeEmail] = useState('');
    const [employeeSalary, setEmployeeSalary] = useState('');
    const [employeeRoles, setEmployeeRoles] = useState(['']); // Array for roles

    const navigate = useNavigate();
    const { id } = useParams();

    const showErrorAlert = (message) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message,
        });
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

    // Check if user is an Admin
    useEffect(() => {
        const userToken = Cookies.get("UserAuthToken");
        if (userToken) {
            try {
                const decodedToken = jwtDecode(userToken);
                const userRole = decodedToken.userrole;
                if (!Array.isArray(userRole) || !userRole.includes("Admin")) {
                    navigate("/login");
                }
            } catch {
                navigate("/login");
            }
        } else {
            navigate("/login");
        }
    }, [navigate]);

    // Fetch Employee Data
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/employee/${id}`);
                setEmployeeName(res.data.employeeName);
                setEmployeeEmail(res.data.employeeEmail);
                setEmployeeSalary(res.data.employeeSalary);
                setEmployeeRoles(res.data.employeeRoles.map(role => role._id)); // Pre-fill roles
            } catch (error) {
                console.error("Error Fetching Employee Data", error);
            }
        };
        fetchEmployee();
    }, [id]);

    // Fetch Role Data
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/role/active/R");
                setRoleData(res.data);
            } catch (error) {
                console.error("Error Fetching Roles", error);
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
            employeeSalary,
            employeeRoles, // Array of roles
        };
        try {
            const res = await axios.put(`http://localhost:5000/api/employee/${id}`, formData);
            showSuccessAlert(res.data.msg);
            setTimeout(() => {
                navigate("/showemployee");
            }, 2000);
        } catch (error) {
            showErrorAlert(error.response?.data?.err || "Failed to update Employee");
        }
    };

    return (
        <div className="container-fluid">
            <button type="button" className="btn mb-3 btn-primary" onClick={() => navigate(-1)}>
                <i className="fa-solid fa-arrow-left-long" style={{ fontSize: "20px", fontWeight: "900" }}></i>
            </button>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Update Employee</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Employee Name:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Employee Name"
                                            value={employeeName}
                                            onChange={(e) => setEmployeeName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Employee Email:</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Employee Email"
                                            value={employeeEmail}
                                            onChange={(e) => setEmployeeEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label>Salary</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Salary"
                                            value={employeeSalary}
                                            onChange={(e) => setEmployeeSalary(e.target.value)}
                                            required
                                        />
                                    </div>
                                    
                                </div>
                                <div className="form-row">
                                <div className="form-group col-md-12">
                                        <label>Employee Roles:</label>
                                        {employeeRoles.map((role, index) => (
                                            <div key={index} className="d-flex align-items-center mb-2">
                                                <select
                                                    className="form-control"
                                                    value={role}
                                                    onChange={(e) => handleRoleChange(index, e.target.value)}
                                                >
                                                    <option disabled value="">
                                                        Choose Role
                                                    </option>
                                                    {RoleData.map((r) => (
                                                        <option key={r._id} value={r._id}>
                                                            {r.roleName}
                                                        </option>
                                                    ))}
                                                </select>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger ml-2"
                                                    onClick={() => removeRoleField(index)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="btn btn-success mt-2"
                                            onClick={addRoleField}
                                        >
                                            Add Role
                                        </button>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-dark">
                                    Update Employee
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateEmployee;
