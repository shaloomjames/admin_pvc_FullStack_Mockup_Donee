import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2"; // Import SweetAlert2
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode
import { useNavigate } from "react-router-dom";

const ShowExpance = () => {
  const [ExpanceData, setExpanceData] = useState([]);
  const [search, setSearch] = useState(""); // State to store search query
  const [filteredData, setFilteredData] = useState([]); // State for filtered data
  const [startingDate, setStartingDate] = useState(""); // Starting date filter
  const [endingDate, setEndingDate] = useState(""); // Ending date filter

  // const notify = (error) => toast.error(error);
  // const successNotify = (success) => toast.success(success);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = Cookies.get("UserAuthToken");

    if (userToken) {
      try {
        const decodedToken = jwtDecode(userToken); // Get the user role from the decoded token
        const userRole = decodedToken.userrole; // If user role is not Admin, redirect to login
        if (userRole !== "Admin") {
          navigate("/login");
        }
      } catch (error) {
        // If token decoding fails, redirect to login
        navigate("/login");
      }
    } else {
      navigate("/login"); // If there's no token, redirect to login
    }
  }, [navigate]);

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

const deleteExpance = async (expanceid) => {
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
        const response = await axios.delete(`http://localhost:5000/api/expance/${expanceid}`);
        setExpanceData(ExpanceData.filter((expance) => expance._id !== expanceid));
        Swal.fire("Deleted!", response.data.msg, "success");
      } catch (error) {
        Swal.fire("Error", error?.response?.data?.err || "An unexpected error occurred. Please try again.", "error");
        console.error("Error deleting expance:", error);
      }
    }
  });
};


  useEffect(() => {
    const filteredExpances = ExpanceData.filter((expance) => {
      const expanceDate = new Date(expance.expanceDate);
      const startDate = startingDate ? new Date(startingDate) : null;
      const endDate = endingDate ? new Date(endingDate) : null;

      // Check if expance falls within the selected date range
      const isWithinDateRange =
        (!startDate || expanceDate >= startDate) &&
        (!endDate || expanceDate <= endDate);

      return (
        isWithinDateRange &&
        ((expance.expanceName || "").toLowerCase().includes(search.toLowerCase()) ||
          (expance.expanceAmount || "").toString().includes(search.toLowerCase()) ||
          (expance.expanceCategory?.ExpanceCategoryName || "").toLowerCase().includes(search.toLowerCase()) ||
          (expance.addedBy.employeeName || "").toLowerCase().includes(search.toLowerCase()))
      );
    });

    setFilteredData(filteredExpances);
  }, [search, ExpanceData, startingDate, endingDate]);

  // Function to clear filters
  const clearFilters = () => {
    setSearch("");
    setStartingDate("");
    setEndingDate("");
  };

  return (
    <>
      <div className="container-fluid">
        <Link type="button" className="btn mb-1 btn-primary" to="/addexpance">
          Add Expance
          <span className="btn-icon-right">
            <i className="fa-solid fa-sack-dollar"></i>
          </span>
        </Link>

        {/* Search Field */}
        <div className="row mt-3">
          <div className="col-lg-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Category, Name, Amount or Added By "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Date Filters */}
        <div className="row mt-3">
          <div className="col-lg-3">
            <label>Starting Date:</label>
            <input
              type="date"
              className="form-control"
              value={startingDate}
              onChange={(e) => setStartingDate(e.target.value)}
            />
          </div>
          <div className="col-lg-3">
            <label>Ending Date:</label>
            <input
              type="date"
              className="form-control"
              value={endingDate}
              onChange={(e) => setEndingDate(e.target.value)}
            />
          </div>
          <div className="col-lg-3 d-flex align-items-end">
            <button className="btn btn-secondary" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        </div>

        <div className="row mt-5 mb-5">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Expances</h4>
                <div className="table-responsive">
                  <table className="table header-border">
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
                      {filteredData.length > 0 ? (
                        filteredData.map((expance, index) => (
                          <tr key={index}>
                            {/* <td>
                              <img
                                src={`/uploads/ExpanceImg/${expance.expanceImage}`}
                                width={120}
                                style={{ borderRadius: "40px" }}
                                alt={expance.expanceImage || "Expance Image "}
                              />
                            </td> */}
                            <td>
                              <img
                                src={
                                  expance.expanceImage
                                    ? `/uploads/ExpanceImg/${expance.expanceImage}`
                                    : `/uploads/ExpanceImg/defaultExpance.jpg` // Path to your default image
                                }
                                width={120}
                                style={{ borderRadius: "40px" }}
                                alt={expance.expanceName || "Default Expance"}
                              />
                            </td>

                            <td>{expance.expanceName}</td>
                            <td>{expance.expanceAmount}</td>
                            <td>{new Date(expance.expanceDate).toLocaleString()}</td>
                            <td>{expance.expanceCategory?.ExpanceCategoryName}</td>
                            <td>{expance.addedBy.employeeName || "N/A"}</td>
                            <td>
                              <span>
                                <Link
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Edit"
                                  to={`/updateexpance/${expance._id}`}
                                >
                                  <i className="fa fa-pencil color-muted mx-2"></i>
                                </Link>
                                <Link
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Close"
                                  onClick={() => deleteExpance(expance._id)}
                                >
                                  <i className="fa fa-close color-danger mx-2"></i>
                                </Link>
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7">No Expances Found</td>
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
      {/* <ToastContainer /> */}
    </>
  );
};

export default ShowExpance;
