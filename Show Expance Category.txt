import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from 'js-cookie';     
import {jwtDecode} from 'jwt-decode';  // Correct import for jwt-decode
import { useNavigate } from "react-router-dom";

const ShowExpanceCategory = () => {
  const [ExpanceCategoryData, setExpanceCategoryData] = useState([]); // Raw data
  const [search, setSearch] = useState(""); // Search query
  const [filteredData, setFilteredData] = useState([]); // Filtered data for rendering

  const notify = (error) => toast.error(error);
  const successNotify = (success) => toast.success(success);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = Cookies.get("UserAuthToken");

    if (userToken) {
      try {
        const decodedToken = jwtDecode(userToken);
        const userRole = decodedToken.userrole;
        if (userRole !== "Admin") {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      }
    } else {
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
    const filteredCategories = ExpanceCategoryData.filter((category) =>
      (category.ExpanceCategoryName || "").toLowerCase().includes(search.toLowerCase()) ||
      (category.ExpanceCategoryStatus || "").toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filteredCategories);
  }, [search, ExpanceCategoryData]);


  const deleteExpanceCategory = async (ExpanceCategoryid) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this Expance Category?");
    if (isConfirmed) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/expance/category/${ExpanceCategoryid}`);
        setExpanceCategoryData(ExpanceCategoryData.filter((category) => category._id !== ExpanceCategoryid));
        successNotify(response.data.msg);
      } catch (error) {
        notify(error?.response?.data?.err || "An unexpected error occurred. Please try again.");
        console.log("Error Deleting Expance Category");
      }
    }
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
      <ToastContainer />
    </>
  );
};

export default ShowExpanceCategory;
