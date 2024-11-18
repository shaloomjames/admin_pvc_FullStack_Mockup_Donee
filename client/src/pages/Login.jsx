import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';  // Correct import for jwt-decode
import Cookies from 'js-cookie';     // Corrected to js-cookie
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [employeeEmail, setEmployeeEmail] = useState('');
    const [employeePassword, setEmployeePassword] = useState('');
    const [tokenUserEmail,setTokenUserEmail] = useState('');
    const [tokenUserId,setTokenUserId] = useState('');
    const [tokenUserRole , setTokenUserRole] = useState('')

    const navigate = useNavigate();

    const notify = (error) => toast.error(error);
    const successNotify = (success) => toast.success(success);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            employeeEmail,
            employeePassword,
        };

        try {
            const response = await axios.post("http://localhost:5000/api/employee/login", formData);
            successNotify(response.data.msg);

            const userToken = response.data.token;
            const decodedToken = jwtDecode(userToken); 
            // setTokenUserEmail(decodedToken.useremail)
            // setTokenUserRole(decodedToken.userrole)
            // setTokenUserId(decodedToken.userid)
            // Cookies.set("email",decodedToken.useremail)
            // Cookies.set("role",decodedToken.userrole)
            // Cookies.set("id",decodedToken.userid)
            console.log(decodedToken)
            // Set the token in cookies
            Cookies.set("UserAuthToken", userToken);

            setTimeout(() => {
                navigate("/");
            }, 4000);
        } catch (error) {
            notify(error.response?.data?.err || "Failed to Login");
        }
    };

    return (
        <>
           <center className='mt-5'>
           <div className="login-form-bg h-100 mt-3 mb-5">
                <div className="container h-100">
                    <div className="row justify-content-center h-100">
                        <div className="col-xl-6">
                            <div className="form-input-content">
                                <div className="card login-form mb-0">
                                    <div className="card-body pt-5">
                                        <a className="text-center" href="index.html"> 
                                            <h4>Prime Vertex</h4>
                                        </a>
                                        <form className="mt-5 mb-5 login-input" onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Email"
                                                    value={employeeEmail}
                                                    onChange={(e) => setEmployeeEmail(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    value={employeePassword}
                                                    onChange={(e) => setEmployeePassword(e.target.value)}
                                                />
                                            </div>
                                            <button className="btn login-form__btn submit w-100" type="submit">
                                                Log In
                                            </button>
                                        </form>
                                        <p className="mt-5 login-form__footer">
                                            Don't have an account? <a href="page-register.html" className="text-primary">Sign Up</a> now
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           </center>
            <ToastContainer />
        </>
    );
};

export default Login;
