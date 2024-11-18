import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShowRoles = () => {
  const [RoleData, setRoleData] = useState([]); // Raw roles data
  const [search, setSearch] = useState(""); // State to store search query
  const [filteredData, setFilteredData] = useState([]); // State for filtered data

  const notify = (error) => toast.error(error);
  const successNotify = (success) => toast.success(success);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/role");
        setRoleData(res.data);
        setFilteredData(res.data); // Initialize filtered data with all roles
      } catch (error) {
        console.log("Error Fetching Roles Data", error);
      }
    };
    fetchRole();
  }, []);

  useEffect(() => {
    // Update filteredData whenever search changes
    const filteredRoles = RoleData.filter((role) =>
      role.roleName.toLowerCase().includes(search.toLowerCase()) ||
      role.roleStatus.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filteredRoles);
  }, [search, RoleData]);

  const deleteRole = async (roleid) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this Role?");
    if (isConfirmed) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/role/${roleid}`);
        setRoleData(RoleData.filter((role) => role._id !== roleid)); // Update RoleData
        successNotify(response.data.msg);
      } catch (error) {
         notify(error?.response?.data?.err || "An unexpected error occurred. Please try again.");
          console.error("Error deleting expance:", error);
      }
    }
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
              placeholder="Search by Role Name or Status"
              value={search}
              onChange={(e) => setSearch(e.target.value)} // Update search query
            />
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
      <ToastContainer />
    </>
  );
};

export default ShowRoles;