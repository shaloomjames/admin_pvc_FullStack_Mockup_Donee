import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';  // Correct import for jwt-decode
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'; // Import SweetAlert2

const UpdateRole = () => {
    const [roleName, setRoleName] = useState('');
    const [roleStatus, setRoleStatus] = useState('');

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
        const fetchRole = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/role/${id}`);
                setRoleName(res.data.roleName);
                setRoleStatus(res.data.roleStatus);
            } catch (error) {
                console.log("Error Fetching Role Data", error);
            }
        };
        fetchRole();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                roleName,
                roleStatus
            };
            const res = await axios.put(`http://localhost:5000/api/role/${id}`, formData);
            showSuccessAlert(res.data.msg);
            setTimeout(() => {
                navigate("/showrole");
            }, 4000);
        } catch (error) {
            showErrorAlert(error.response?.data?.err || "Failed to Update Role");
        }
    };

    return (
        <>
            <div className="container-fluid">
                <Link type="button" className="btn mb-3 btn-primary" onClick={() => navigate(-1)}>
                    <i className="fa-solid fa-arrow-left-long" style={{ fontSize: "20px", fontWeight: "900" }}></i>
                </Link>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Update Role</h4>
                                <div className="basic-form">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-row">
                                            <div className="form-group col-md-12">
                                                <label>Role Name:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={roleName}
                                                    placeholder="Role Name"
                                                    onChange={(e) => setRoleName(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group col-md-12">
                                                <label>Role Status:</label>
                                                <select
                                                    id="inputState"
                                                    className="form-control"
                                                    value={roleStatus}
                                                    onChange={(e) => setRoleStatus(e.target.value)}
                                                >
                                                    <option value="" disabled>Choose Role Status</option>
                                                    <option value="active">active</option>
                                                    <option value="inactive">inactive</option>
                                                </select>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-dark">Update Role</button>
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

export default UpdateRole;
