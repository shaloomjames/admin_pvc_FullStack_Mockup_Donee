import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';     
import { jwtDecode } from 'jwt-decode';  // Correct import for jwt-decode
import axios from 'axios';

const AddExpance = () => {
    const [expanceName, setExpanceName] = useState('');
    const [expanceAmount, setExpanceAmount] = useState('');
    const [expanceImage, setExpanceImage] = useState(null);
    const [expanceDate, setExpanceDate] = useState('');
    const [addedBy, setAddedBy] = useState('');
    const [expanceCategory, setExpanceCategory] = useState('');
    const [expanceCategoryData, setExpanceCategoryData] = useState([]);

    const navigate = useNavigate();

    const notify = (error) => toast.error(error);
    const successNotify = (success) => toast.success(success);

    useEffect(() => {

        const userToken = Cookies.get("UserAuthToken");
        if(userToken) {
            const decodedToken = jwtDecode(userToken); 
        setAddedBy(decodedToken.userid || '');
        }
    }, []);


    // useEffect(() => {

    //     const userToken = Cookies.get("UserAuthToken");
    //     if(userToken) {
    //         const decodedToken = jwtDecode(userToken); 
    //         const UserRole = decodedToken.userrole;
    //         if(UserRole === "Admin") 
    //     }else(
    //         navigate("/login")
    //     )
    // }, []);

    useEffect(() => {
        const userToken = Cookies.get("UserAuthToken");

        if (userToken) {
            try {
                // Decode the token
                const decodedToken = jwtDecode(userToken); 

                // Get the user role from the decoded token
                const userRole = decodedToken.userrole;

                // If user role is not Admin, redirect to login
                if (userRole !== "Admin") {
                    navigate("/login");
                }
            } catch (error) {
                // If token decoding fails, redirect to login
                navigate("/login");
            }
        } else {
            // If there's no token, redirect to login
            navigate("/login");
        }
    }, [navigate]); // This will run only once after the component mounts



    useEffect(() => {
        const fetchExpanceCategory = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/expance/category/active/E");
                setExpanceCategoryData(res.data);
            } catch (error) {
                console.error("Error Fetching Expance Category Data", error);
            }
        };
        fetchExpanceCategory();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("expanceAmount", expanceAmount);
            formData.append("expanceName", expanceName);
            if (expanceImage) formData.append("expanceImage", expanceImage);
            formData.append("expanceDate", expanceDate);
            formData.append("expanceCategory", expanceCategory); 
            formData.append("addedBy", addedBy);

            const response = await axios.post("http://localhost:5000/api/expance", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            successNotify(response.data.msg);

            // Redirect after 4 seconds
            setTimeout(() => {
                navigate("/showexpance");
            }, 4000);
        } catch (error) {
            notify(error.response?.data?.err || "Failed to add Expense");
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
                                <h4 className="card-title">Add Expense</h4>
                                <div className="basic-form">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label>Expense Name</label>
                                                <input type="text" className="form-control" placeholder="Expense Name" value={expanceName} onChange={(e) => setExpanceName(e.target.value)} />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Expense Amount</label>
                                                <input type="number" className="form-control" placeholder="Expense Amount" value={expanceAmount} onChange={(e) => setExpanceAmount(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label>Expense Image</label>
                                                <input type="file" className="form-control" onChange={(e) => setExpanceImage(e.target.files[0])} />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Expense Date</label>
                                                <input type="date" className="form-control" value={expanceDate} onChange={(e) => setExpanceDate(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-12">
                                                <label>Expense Category</label>
                                                <select className="form-control" value={expanceCategory} onChange={(e) => setExpanceCategory(e.target.value)} >
                                                    <option disabled selected value={""}>Choose Expense Category</option>
                                                    {expanceCategoryData.length > 0 ? (
                                                        expanceCategoryData.map((category) => (
                                                            <option key={category._id} value={category._id}>{category.ExpanceCategoryName}</option>
                                                        ))
                                                    ) : (
                                                        <option disabled>No Categories Available</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-dark">Add Expense</button>
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

export default AddExpance;
