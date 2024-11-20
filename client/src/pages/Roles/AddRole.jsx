import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'js-cookie';     
import { jwtDecode } from 'jwt-decode';  // Correct import for jwt-decode
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'; // Import SweetAlert2_

const AddRole = () => {
    const [roleName,setRoleName] = useState('');

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


    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const formData = {
                roleName
            }
            const response = await axios.post("http://localhost:5000/api/role", formData);
            showSuccessAlert(response.data.msg);
            console.log(response)
            setTimeout(() => {
                    navigate("/showrole");
            }, 2000);
        } catch (error) {
            showErrorAlert( error.response?.data?.err)
        }
    }

    return (
        <>

            <div class="container-fluid">
                <Link type="button" class="btn mb-3 btn-primary" onClick={() => navigate(-1)}>
                    <i class="fa-solid fa-arrow-left-long" style={{ fontSize: "20px", fontWeight: "900" }}></i>
                </Link>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Add Role</h4>
                                <div class="basic-form">
                                    <form onSubmit={handleSubmit}>
                                        <div class="form-row">
                                            <div class="form-group col-md-12">
                                                <label>Role Name:</label>
                                                <input type="text" class="form-control" placeholder="Role Name" onChange={(e)=> setRoleName(e.target.value)} />
                                            </div>
                                        </div>
                                        <button type="submit" class="btn btn-dark">Add Role</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <ToastContainer/> */}
        </>
    )
}

export default AddRole