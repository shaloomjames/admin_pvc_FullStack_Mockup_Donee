import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Cookies from 'js-cookie';     
import { jwtDecode } from 'jwt-decode';  // Correct import for jwt-decode

const UpdateExpance = () => {
    const [expanceName, setExpanceName] = useState('');
    const [expanceAmount, setExpanceAmount] = useState('');
    const [expanceImage, setExpanceImage] = useState('');
    const [expanceDate, setExpanceDate] = useState('');
    const [addedBy, setAddedBy] = useState('');
    const [imageFile, setImageFile] = useState(null); // Store image file if uploaded
    const [expanceCategory, setExpanceCategory] = useState(''); // Store selected category ID
    const [expanceCategoryData, setExpanceCategoryData] = useState([]);

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
        // Fetch active expense categories
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

    useEffect(() => {
        // Fetch existing expense details to pre-fill the form
        const fetchExpance = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/expance/${id}`);
                setExpanceName(res.data.expanceName);
                setExpanceAmount(res.data.expanceAmount);
                setExpanceDate(new Date(res.data.expanceDate).toISOString().split('T')[0]);
                setExpanceImage(res.data.expanceImage);
                setAddedBy(res.data.addedBy.employeeName);
                setExpanceCategory(res.data.expanceCategory._id); // Set initial category by ID
            } catch (error) {
                console.error("Error Fetching Expance Data", error);
            }
        };
        fetchExpance();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Prepare form data for submission
            const formData = new FormData();
            formData.append('expanceName', expanceName);
            formData.append('expanceAmount', expanceAmount);
            formData.append('expanceDate', expanceDate);
            formData.append('expanceCategory', expanceCategory); // Submit selected category ID

            if (imageFile) {
                formData.append('expanceImage', imageFile);
            } else {
                formData.append('expanceImage', expanceImage);
            }

            const res = await axios.put(`http://localhost:5000/api/expance/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            successNotify(res.data.msg);
            setTimeout(() => navigate("/showexpance"), 4000);
        } catch (error) {
            notify(error.response?.data?.err || "Failed to update Expance");
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
                                <h2>Update Expance</h2>
                                <center>
                                    <h4 className="card-title">
                                        Added By <span style={{ fontWeight: "900", fontSize: "30px", color: "#7571f9" }}>
                                            {addedBy}
                                        </span>
                                    </h4>
                                </center>
                                <div className="basic-form">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label>Expance Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={expanceName}
                                                    placeholder="Expance Name"
                                                    onChange={(e) => setExpanceName(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Expance Amount</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    value={expanceAmount}
                                                    placeholder="Expance Amount"
                                                    onChange={(e) => setExpanceAmount(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label>Expance Date</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    value={expanceDate}
                                                    placeholder="Expance Date"
                                                    onChange={(e) => setExpanceDate(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Expense Image</label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    onChange={(e) => setImageFile(e.target.files[0])}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-12">
                                                <label>Expance Category</label>
                                                <select
                                                    className="form-control"
                                                    value={expanceCategory}
                                                    onChange={(e) => setExpanceCategory(e.target.value)}
                                                >
                                                    <option disabled>Choose Expance Category</option>
                                                    {expanceCategoryData.length > 0 ? (
                                                        expanceCategoryData.map((category) => (
                                                            <option key={category._id} value={category._id}>
                                                                {category.ExpanceCategoryName}
                                                            </option>
                                                        ))
                                                    ) : (
                                                        <option disabled>No Categories Available</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-dark">Update Expance</button>
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

export default UpdateExpance;