import React, { useEffect, useState } from "react";
import PieChart from "../components/PieChart";
import axios from "axios";
import Cookies from 'js-cookie';     
import { jwtDecode } from 'jwt-decode';  // Correct import for jwt-decode
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [ExpanceData, setExpanceData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [categoryTotals, setCategoryTotals] = useState({});
    const [employeeData, setEmployeeData] = useState([]);

    const navigate = useNavigate();
    
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
    

    const [expenseData, setExpenseData] = useState({
        labels: [],
        datasets: [{
            label: "Expense Distribution",
            data: [],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
            borderColor: "black",
            borderWidth: 1,
        }]
    });

    const [salaryData, setSalaryData] = useState({
        labels: ["Employee A", "Employee B", "Employee C"],
        datasets: [{
            label: "Salary Distribution",
            data: [7000, 5000, 8000],
            backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
            borderColor: "black",
            borderWidth: 1,
        }]
    });


    // Fetching Employees Data
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/employee");
                setEmployeeData(res.data)
            } catch (error) {
                console.log("Error Fetching Employees Data", error)
            }
        }
        fetchEmployees();
    }, [])

    // Fetching Expance Data
    useEffect(() => {
        const fetchExpance = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/expance");
                setExpanceData(res.data);
            } catch (error) {
                console.log("Error Fetching Expance Data", error);
            }
        };
        fetchExpance();
    }, []);

    // Calculate total amount and category-wise totals
    useEffect(() => {
        const total = ExpanceData.reduce((acc, expance) => acc + expance.expanceAmount, 0);
        setTotalAmount(total);

        const categoryTotals = ExpanceData.reduce((acc, expance) => {
            const category = expance.expanceCategory.ExpanceCategoryName;
            acc[category] = (acc[category] || 0) + expance.expanceAmount;
            return acc;
        }, {});
        setCategoryTotals(categoryTotals);
    }, [ExpanceData]);

    // Update chart data based on categoryTotals
    useEffect(() => {
        // const backgroundColors = ExpanceData.map(exp => exp.expanceCategory.ExpanceCategoryColor);
        const backgroundColors = ExpanceData.map(exp => exp.expanceCategory?.ExpanceCategoryColor || "#CCCCCC"); // Default color if undefined
        setExpenseData({
            labels: Object.keys(categoryTotals),
            datasets: [{
                label: "Expense Distribution",
                data: Object.values(categoryTotals),
                backgroundColor:backgroundColors,
                borderColor: "black",
                borderWidth: 1,
            }]
        });
    }, [categoryTotals]);




    return (
        <>
            <div className="container-fluid mt-3">
                <div class="row">
                    <div class="col-lg-3 col-sm-6">
                        <div class="card gradient-1">
                            <div class="card-body">
                                <h3 class="card-title text-white">Total Employees</h3>
                                <span class="float-right display-5 opacity-5"><i class="fa fa-user"></i></span>
                                <div class="d-inline-block mt-3">
                                    <h2 class="text-white">{employeeData.length}</h2>
                                    {/* <p class="text-white mb-0">Jan - March 2019</p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6">
                        <div class="card gradient-2">
                            <div class="card-body">
                                <h3 class="card-title text-white">Total Expance</h3>
                                <span class="float-right display-5 opacity-5"><i class="fa fa-money"></i></span>
                                <div class="d-inline-block mt-3">
                                    <h2 class="text-white">Rs: {totalAmount}</h2>
                                    {/* <p class="text-white mb-0">Jan - March 2019</p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6">
                        <div class="card gradient-3">
                            <div class="card-body">
                                <h3 class="card-title text-white">New Customers</h3>
                                <div class="d-inline-block">
                                    <h2 class="text-white">4565</h2>
                                    <p class="text-white mb-0">Jan - March 2019</p>
                                </div>
                                <span class="float-right display-5 opacity-5"><i class="fa fa-users"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6">
                        <div class="card gradient-4">
                            <div class="card-body">
                                <h3 class="card-title text-white">Customer Satisfaction</h3>
                                <div class="d-inline-block">
                                    <h2 class="text-white">99%</h2>
                                    <p class="text-white mb-0">Jan - March 2019</p>
                                </div>
                                <span class="float-right display-5 opacity-5"><i class="fa fa-heart"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="text-center chart-container">
                                    <PieChart chartData={expenseData} title="Expense Chart" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="text-center chart-container">
                                    <PieChart chartData={salaryData} title="Salary Chart" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5 mb-5">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Expenses</h4>
                                <div className="table-responsive">
                                    <table className="table header-border">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Amount</th>
                                                <th>Expense Category</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ExpanceData.length > 0 ? (
                                                ExpanceData.map((expance, index) => (
                                                    <tr key={index}>
                                                        <td>{expance.expanceName || "N/a"}</td>
                                                        <td>{expance.expanceAmount || "N/a"}</td>
                                                        <td>{expance.expanceCategory.ExpanceCategoryName || "N/a"}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4">No Expenses Found</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <h4 className="mt-4">Category Totals</h4>
                                <div className="table-responsive">
                                    <table className="table header-border">
                                        <thead>
                                            <tr>
                                                <th>Expense Category</th>
                                                <th>Total Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.entries(categoryTotals).map(([category, amount], index) => (
                                                <tr key={index}>
                                                    <td>{category || "N/a"}</td>
                                                    <td>{amount || "N/a"}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
         

            </div>

        </>
    );
};

export default Home;