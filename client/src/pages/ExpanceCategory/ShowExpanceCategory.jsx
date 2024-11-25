import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import Cookies from 'js-cookie';     
import {jwtDecode} from 'jwt-decode';  // Correct import for jwt-decode
import { useNavigate } from "react-router-dom";

const ShowExpanceCategory = () => {
  const [ExpanceCategoryData, setExpanceCategoryData] = useState([]); // Raw data
  const [search, setSearch] = useState(""); // Search query
  const [filteredData, setFilteredData] = useState([]); // Filtered data for rendering
  const [statusFilter, setStatusFilter] = useState(""); // State to store selected status

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

  useEffect(() => {
    const fetchExpanceCategory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/expance/category/");
        setExpanceCategoryData(res.data);
        setFilteredData(res.data); // Initialize filteredData with full data
      } catch (error) {
        console.log("Error Fetching Expance Category Data", error);
      }
    };
    fetchExpanceCategory();
  }, []);

  useEffect(() => {
    // Filter data whenever search query or data changes
    const filteredCategories = ExpanceCategoryData.filter((category) =>{
      const matchesName = (category.ExpanceCategoryName || "").toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter ? category.ExpanceCategoryStatus  === statusFilter : true;
      return matchesName && matchesStatus; // Both conditions must be true
    }

      // (category.ExpanceCategoryName || "").toLowerCase().includes(search.toLowerCase()) ||
      // (category.ExpanceCategoryStatus || "").toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filteredCategories);
  }, [search, statusFilter, ExpanceCategoryData]);


const deleteExpanceCategory = async (ExpanceCategoryid) => {
  // SweetAlert confirmation dialog
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to undo this action!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/expance/category/${ExpanceCategoryid}`);
        // Remove the deleted category from state
        setExpanceCategoryData(ExpanceCategoryData.filter((category) => category._id !== ExpanceCategoryid));
        
        // SweetAlert success notification
        Swal.fire("Deleted!", response.data.msg, "success");
      } catch (error) {
        // SweetAlert error notification
        Swal.fire("Error", error?.response?.data?.err || "An unexpected error occurred. Please try again.", "error");
        console.error("Error deleting Expance Category:", error);
      }
    }
  });
};

  return (
    <>
      <div className="container-fluid mb-5">
        <Link type="button" className="btn mb-1 btn-primary" to="/addexpanceCategory">
          Add Expance Category
          <span className="btn-icon-right">
            <i className="fa-solid fa-user-plus"></i>
          </span>
        </Link>

        {/* Search Field */}
        <div className="row mt-3">
          <div className="col-lg-5">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Category Name "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="form-group col-md-4">
            <select
              id="inputState"
              className="form-control"
              value={statusFilter} // Bind to state
              onChange={(e) => setStatusFilter(e.target.value)} // Update statusFilter
            >
              <option value="" selected disabled>Search by expance category Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="">All</option>
            </select>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Expance Categories</h4>
                <div className="table-responsive">
                  <table className="table header-border">
                    <thead>
                      <tr>
                        <th>Expance Category Name</th>
                        <th>Expance Category Color</th>
                        <th>Expance Category Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.length > 0 ? (
                        filteredData.map((category, index) => (
                          <tr key={index}>
                            <td>{category.ExpanceCategoryName || "N/A"}</td>
                            <td>{category.ExpanceCategoryColor || "N/A"}</td>
                            <td>{category.ExpanceCategoryStatus || "N/A"}</td>
                            <td>
                              <span>
                                <Link data-toggle="tooltip" data-placement="top" title="Edit" to={`/updateexpanceCategory/${category._id}`}>
                                  <i className="fa fa-pencil color-muted mx-2"></i>
                                </Link>
                                <Link data-toggle="tooltip" data-placement="top" title="Close" onClick={() => deleteExpanceCategory(category._id)}>
                                  <i className="fa fa-close color-danger mx-2"></i>
                                </Link>
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">No Expance Categories Found</td>
                        </tr>
                      )}
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

export default ShowExpanceCategory;
