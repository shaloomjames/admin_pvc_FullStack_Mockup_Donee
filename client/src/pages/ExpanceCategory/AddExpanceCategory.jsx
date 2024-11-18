import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';     
import { jwtDecode } from 'jwt-decode';  // Correct import for jwt-decode

const AddExpanceCategory = () => {
    const [ExpanceCategoryName, setExpanceCategoryName] = useState('');
    const [ExpanceCategoryColor, setExpanceCategoryColor] = useState('');

    const navigate = useNavigate();

    const notify = (error) => toast.error(error);
    const successNotify = (success) => toast.success(success);

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
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            ExpanceCategoryName,
            ExpanceCategoryColor
        }
        try {
            const response  = await axios.post("http://localhost:5000/api/expance/category", formData);
            successNotify(response.data.msg);
            setTimeout(() => {
                    navigate("/showexpanceCategory");
            }, 4000);
        } catch (error) {
            notify(error.response?.data?.err || "Failed to add Employee");
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
                                <h4 class="card-title">Add Expance Category</h4>
                                <div class="basic-form">
                                    <form onSubmit={handleSubmit}>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label>Expance Category Name</label>
                                                <input type="text" class="form-control" placeholder="Expance Category Name" onChange={(e) => setExpanceCategoryName(e.target.value)} />
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label>Expance Category Color</label>
                                                <input type="color" class="form-control" placeholder="Expance Category Color" onChange={(e) => setExpanceCategoryColor(e.target.value)} />
                                            </div>
                                        </div>
                                        <button type="submit" class="btn btn-dark">Add Expance Category</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default AddExpanceCategory