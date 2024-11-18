import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from 'js-cookie';     
import { jwtDecode } from 'jwt-decode';  // Correct import for jwt-decode
import { useNavigate } from "react-router-dom";


const ShowExpance = () => {
  const [ExpanceData,setExpanceData] = useState([]);
  const [search, setSearch] = useState(""); // State to store search query
  const [filteredData, setFilteredData] = useState([]); // State for filtered data

  const notify = (error) => toast.error(error);
  const successNotify = (success) => toast.success(success);
  const navigate = useNavigate();

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
    const fetchExpance = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/expance");
        setExpanceData(res.data)
      } catch (error) {
        console.log("Error Fetching Expance Data", error)
      }
    }
    fetchExpance();
  }, [])

  const deleteExpance = async(expanceid)=>{
        // Show a confirmation popup before deleting
        const isConfirmed = window.confirm("Are you sure you want to delete this Employee?");

        if (isConfirmed) {
          try {
            const res = await axios.delete(`http://localhost:5000/api/expance/${expanceid}`);
            setExpanceData(ExpanceData.filter((expance) => expance._id !== expanceid));
            setTimeout(() => {
              successNotify(res.data.msg);
            },);
          } catch (error) {
            console.log("Error Deleting Expanceid");
          }
        }
    
  }
  // <td>{expance.expanceName}</td>
  // <td>{expance.expanceAmount}</td>
  // <td>{new Date(expance.expanceDate).toLocaleString()}</td>
  // <td>{expance.expanceCategory?.ExpanceCategoryName}</td>
  // <td>{expance.addedBy.employeeName || "N/A"}</td>

  useEffect(()=>{
    const filteredExpances = ExpanceData.filter((expance)=>
    (expance.expanceName || "").toLowerCase().includes(search.toLowerCase()) ||
    (expance.expanceAmount || "").toString().includes(search.toLowerCase()) ||
    (expance.expanceCategory?.ExpanceCategoryName || "").toLowerCase().includes(search.toLowerCase()) ||
    (expance.addedBy.employeeName || "").toLowerCase().includes(search.toLowerCase()) 
    );
    setFilteredData(filteredExpances)
  },[search,ExpanceData]);


  return (
    <>
    <div class="container-fluid">
       <Link type="button" class="btn mb-1 btn-primary" to="/addexpance">
            Add Expance
            <span class="btn-icon-right">
            <i class="fa-solid fa-sack-dollar"></i>
            </span>
          </Link>
                  {/* Search Field */}
        <div className="row mt-3">
          <div className="col-lg-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Category Name or Status"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

            <div class="row mt-5 mb-5" >
            <div class="col-lg-12">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Expances</h4>
                                <div class="table-responsive">
                                    <table class="table header-border ">
                                        <thead>
                                        <tr>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Amount</th>
                                                <th>Date</th>
                                                <th>Expance Category</th>
                                                <th>Added By</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                         {
                                          filteredData.length >0?(
                                            filteredData.map((expance,index)=>(
                                              <tr>
                                              <td><img src={`/uploads/ExpanceImg/${expance.expanceImage}`} width={120} style={{borderRadius:"40px"}} alt={expance.expanceImage || "Expance Image "} /></td>
                                              <td>{expance.expanceName}</td>
                                              <td>{expance.expanceAmount}</td>
                                              <td>{new Date(expance.expanceDate).toLocaleString()}</td>
                                              <td>{expance.expanceCategory?.ExpanceCategoryName}</td>
                                              <td>{expance.addedBy.employeeName || "N/A"}</td>
                                              <td>
                                                  <span>
                                                      <Link data-toggle="tooltip" data-placement="top" title="Edit" to={`/updateexpance/${expance._id}`}>
                                                        <i class="fa fa-pencil color-muted mx-2"></i>
                                                      </Link>
                                                      <Link data-toggle="tooltip" data-placement="top" title="Close" onClick={()=>deleteExpance(expance._id)}>
                                                        <i class="fa fa-close color-danger mx-2"></i>
                                                      </Link>
                                                  </span>
                                               </td>
                                          </tr>
                                            ))
                                          ):(
                                            <tr>
                                            <td>No Expances FOund</td>
                                        </tr>
                                          )
                                         }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
    </div>
    <ToastContainer/>
    </>
      )
}

export default ShowExpance
