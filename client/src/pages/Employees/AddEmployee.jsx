import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'; // Import SweetAlert2
import Cookies from 'js-cookie';     
import { jwtDecode } from 'jwt-decode';  // Correct import for jwt-decode

const AddEmployee = () => {
    const [employeeRoleData, setemployeeRoleData] = useState([]);
    const [employeeName, setEmployeeName] = useState('');
    const [employeeEmail, setEmployeeEmail] = useState('');
    const [employeeSalary, setemployeeSalary] = useState('');
    const [employeePassword, setEmployeePassword] = useState('');
    const [employeeRole, setEmployeeRole] = useState('');

    const navigate = useNavigate();

    // const notify = (error) => toast.error(error);
    // const successNotify = (success) => toast.success(success);

    
    const showErrorAlert = (message) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message,
            // timer: 2000, // Automatically closes after 2 seconds
            // showConfirmButton: false,
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


    useEffect(() => {
        const userToken = Cookies.get("UserAuthToken");
    
        if (userToken) {
            try {
                // Decode the token
                const decodedToken = jwtDecode(userToken);  // Get the user role from the decoded token
                const userRole = decodedToken.userrole;     // If user role is not Admin, redirect to login                
                if (userRole !== "Admin") {
                    navigate("/login");
                }
            } catch (error) {
                // If token decoding fails, redirect to login
                navigate("/login");
            }
        } else {
            navigate("/login");  // If there's no token, redirect to login
        }
    }, [navigate]); // This will run only once after the component mounts
    
    

    useEffect(() => {
        const fetchRoles = async () => {
          try {
            const res = await axios.get("http://localhost:5000/api/role/active/R");
            setemployeeRoleData(res.data)
          } catch (error) {
            console.log("Error Fetching Employees Data", error)
          }
        }
        fetchRoles();
      }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            employeeName,
            employeeEmail,
            employeePassword,
            employeeSalary,
            employeeRole
        }
        try {
            const response  = await axios.post("http://localhost:5000/api/employee", formData);
            showSuccessAlert(response.data.msg);
            setTimeout(() => {
                    navigate("/showemployee");
            }, 2000);
        } catch (error) {
            showErrorAlert(error.response?.data?.err || "Failed to add Employee");
        }
    }

    return (
        <>
            <div class="container-fluid">
                <button type="button" class="btn mb-3 btn-primary" onClick={() => navigate(-1)}>
                    <i class="fa-solid fa-arrow-left-long" style={{ fontSize: "20px", fontWeight: "900" }}></i>
                </button>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Add Employee</h4>
                                <div class="basic-form">
                                    <form onSubmit={handleSubmit}>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label>Employee Name:</label>
                                                <input type="text" class="form-control" placeholder="Employee Name" onChange={(e) => setEmployeeName(e.target.value)} required />
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label>Employee Email: </label>
                                                <input type="email" class="form-control" placeholder="Employee Email" onChange={(e) => setEmployeeEmail(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label>Password</label>
                                                <input type="password" class="form-control" placeholder="Password" onChange={(e) => setEmployeePassword(e.target.value)} />
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label>Salary</label>
                                                <input type="text" class="form-control" placeholder="Salary" onChange={(e) => setemployeeSalary(e.target.value)} />
                                            </div>
                                            <div class="form-group col-md-12">
                                                <label>Employee Role</label>
                                                <select id="inputState" class="form-control" onChange={(e) => setEmployeeRole(e.target.value)}  >
                                                    <option disabled  selected> Choose Employee Role</option>                                                  
                                                    {
                                                           employeeRoleData && employeeRoleData.length>0 ? (
                                                                employeeRoleData.map((role,index)=>(
                                                                        <option value={role._id || ""} key={role._id  || index }>{role.roleName || "N/A"}</option>
                                                                    ))
                                                            ):(
                                                                <option disabled>Role Not Available</option>
                                                            )
                                                    }                                                    
                                                </select>
                                            </div>
                                        </div>
                                        <button type="submit" class="btn btn-dark">Add Employee</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <ToastContainer /> */}
        </>
    )
}

export default AddEmployee