import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';  // Correct import for jwt-decode
import Cookies from 'js-cookie';
import Swal from "sweetalert2"; // Import SweetAlert2

const ShowRoles = () => {
  const [RoleData, setRoleData] = useState([]); // Raw roles data
  const [search, setSearch] = useState(""); // State to store search query
  const [statusFilter, setStatusFilter] = useState(""); // State to store selected status
  const [filteredData, setFilteredData] = useState([]); // State for filtered data

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
    const fetchRole = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/role");
        setRoleData(res.data);
        setFilteredData(res.data); // Initialize filtered data with all roles
      } catch (error) {
        console.error("Error Fetching Roles Data:", error);
        Swal.fire("Error", "Failed to fetch roles data. Please try again.", "error");
      }
    };
    fetchRole();
  }, []);

  useEffect(() => {
    // Update filteredData based on both search and statusFilter
    const filteredRoles = RoleData.filter((role) => {
      const matchesName = role.roleName.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter ? role.roleStatus === statusFilter : true;
      return matchesName && matchesStatus; // Both conditions must be true
    });
    setFilteredData(filteredRoles);
  }, [search, statusFilter, RoleData]);

  const deleteRole = async (roleid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this role? This action cannot be undone, and all employees assigned to this role will be removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`http://localhost:5000/api/role/${roleid}`);
          setRoleData(RoleData.filter((role) => role._id !== roleid)); // Update RoleData
          Swal.fire("Deleted!", response.data.msg, "success");
        } catch (error) {
          Swal.fire("Error", error?.response?.data?.err || "An unexpected error occurred. Please try again.", "error");
          console.error("Error deleting role:", error);
        }
      }
    });
  };

  return (
    <>
      <div className="container-fluid mb-5">
        <Link type="button" className="btn mb-1 btn-primary" to="/addrole">
          Add Role
          <span className="btn-icon-right">
            <i className="fa-solid fa-user-shield"></i>
          </span>
        </Link>

        {/* Search Field */}
        <div className="row mt-3">
          <div className="col-lg-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Role Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)} // Update search query
            />
          </div>
          <div className="form-group col-md-3">
            <select
              id="inputState"
              className="form-control"
              value={statusFilter} // Bind to state
              onChange={(e) => setStatusFilter(e.target.value)} // Update statusFilter
            >
              <option value="" selected disabled>Search by Role Status</option>
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
                <h4 className="card-title">Roles</h4>
                <div className="table-responsive">
                  <table className="table header-border">
                    <thead>
                      <tr>
                        <th>Role Name</th>
                        <th>Role Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.length > 0 ? (
                        filteredData.map((role, index) => (
                          <tr key={index}>
                            <td>{role.roleName || "N/A"}</td>
                            <td>{role.roleStatus || "N/A"}</td>
                            <td>
                              <span>
                                <Link
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Edit"
                                  to={`/updaterole/${role._id}`}
                                >
                                  <i className="fa fa-pencil color-muted mx-2"></i>
                                </Link>
                                <Link
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Close"
                                  onClick={() => deleteRole(role._id)}
                                >
                                  <i className="fa fa-close color-danger mx-2"></i>
                                </Link>
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-center">
                            No Role Found
                          </td>
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

export default ShowRoles;
