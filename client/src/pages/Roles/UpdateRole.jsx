    import React, { useEffect, useState } from 'react';
    import { Link, useNavigate, useParams } from 'react-router-dom';
    import axios from 'axios';
    import Cookies from 'js-cookie';     
import { jwtDecode } from 'jwt-decode';  // Correct import for jwt-decode
    import { ToastContainer, toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';

    const UpdateRole = () => {
        const [roleName, setRoleName] = useState('');
        const [roleStatus, setRoleStatus] = useState('');

        const navigate = useNavigate();
        const notify = (error) => toast.error(error);
        const successNotify = (success) => toast.success(success);
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
                successNotify(res.data.msg);
                setTimeout(() => {
                    navigate("/showrole");
                }, 4000);
            } catch (error) {
                notify(error.response?.data?.err || "Failed to Update Role");
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
                <ToastContainer />
            </>
        );
    };

    export default UpdateRole;
