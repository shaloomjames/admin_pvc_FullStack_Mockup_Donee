import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'; // Import SweetAlert2_
import Cookies from 'js-cookie';     
import { jwtDecode } from 'jwt-decode';  // Correct import for jwt-decode

const UpdateEmployee = () => {
    const [RoleData, setRoleData] = useState([]);
    const [employeeName, setEmployeeName] = useState('');
    const [employeeEmail, setEmployeeEmail] = useState('');
    const [employeeSalary, setemployeeSalary] = useState('');
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

    const { id } = useParams();

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
        const fetchEmployee = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/employee/${id}`);
                setEmployeeName(res.data.employeeName);
                setEmployeeEmail(res.data.employeeEmail);
                setEmployeeRole(res.data.employeeRole._id);
                setemployeeSalary(res.data.employeeSalary);
            } catch (error) {
                console.log("Error Fetching Employee Data", error);
            }
        };
        fetchEmployee();
    }, [id]);

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/role/`);
                setRoleData(res.data);
            } catch (error) {
                console.log("Error Fetching Roles", error);
            }
        };
        fetchRole();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            employeeName,
            employeeEmail,
            employeeSalary,
            employeeRole
        };
        try {
            const res = await axios.put(`http://localhost:5000/api/employee/${id}`, formData);
            showSuccessAlert(res.data.msg);
            setTimeout(() => {
                navigate("/showemployee");
            }, 4000);
        } catch (error) {
            showErrorAlert(error.response?.data?.err || "Failed to update Employee");
        }
    };

    return (
        <>
            <div className="container-fluid">
                <button type="button" className="btn mb-3 btn-primary" onClick={() => navigate(-1)}>
                    <i className="fa-solid fa-arrow-left-long" style={{ fontSize: "20px", fontWeight: "900" }}></i>
                </button>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Update Employee</h4>
                                <div className="basic-form">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label>Employee Name:</label>
                                                <input type="text" className="form-control" placeholder="Employee Name" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Employee Email:</label>
                                                <input type="email" className="form-control" placeholder="Employee Email" value={employeeEmail} onChange={(e) => setEmployeeEmail(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                        <div class="form-group col-md-6">
                                                <label>Salary</label>
                                                <input type="text" class="form-control" placeholder="Salary" value={employeeSalary} onChange={(e) => setemployeeSalary(e.target.value)} />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Employee Role</label>
                                                <select id="inputState" className="form-control" value={employeeRole} onChange={(e) => setEmployeeRole(e.target.value)}>
                                                    <option disabled value="">Choose Employee Role</option>
                                                    {RoleData && RoleData.length > 0 ? (
                                                        RoleData.map((role,index) => (
                                                            <option value={role._id || ""} key={role._id || index}>{role.roleName || "N/A"}</option>
                                                        ))
                                                    ) : (
                                                        <option disabled>Role Not Available</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-dark">Update Employee</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <ToastContainer /> */}
        </>
    );
};

export default UpdateEmployee;
