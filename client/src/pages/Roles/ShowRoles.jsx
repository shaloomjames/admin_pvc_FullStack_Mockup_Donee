// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ShowRoles = () => {
//   const [RoleData, setRoleData] = useState([]); // Raw roles data
//   const [search, setSearch] = useState(""); // State to store search query
//   const [filteredData, setFilteredData] = useState([]); // State for filtered data

//   const notify = (error) => toast.error(error);
//   const successNotify = (success) => toast.success(success);

//   useEffect(() => {
//     const fetchRole = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/role");
//         setRoleData(res.data);
//         setFilteredData(res.data); // Initialize filtered data with all roles
//       } catch (error) {
//         console.log("Error Fetching Roles Data", error);
//       }
//     };
//     fetchRole();
//   }, []);

//   useEffect(() => {
//     // Update filteredData whenever search changes
//     const filteredRoles = RoleData.filter((role) =>
//       role.roleName.toLowerCase().includes(search.toLowerCase()) ||
//       role.roleStatus.toLowerCase().includes(search.toLowerCase())
//     );
//     setFilteredData(filteredRoles);
//   }, [search, RoleData]);

//   const deleteRole = async (roleid) => {
//     const isConfirmed = window.confirm("Are you sure you want to delete this Role?");
//     if (isConfirmed) {
//       try {
//         const response = await axios.delete(`http://localhost:5000/api/role/${roleid}`);
//         setRoleData(RoleData.filter((role) => role._id !== roleid)); // Update RoleData
//         successNotify(response.data.msg);
//       } catch (error) {
//          notify(error?.response?.data?.err || "An unexpected error occurred. Please try again.");
//           console.error("Error deleting expance:", error);
//       }
//     }
//   };

//   return (
//     <>
//       <div className="container-fluid mb-5">
//         <Link type="button" className="btn mb-1 btn-primary" to="/addrole">
//           Add Role
//           <span className="btn-icon-right">
//             <i className="fa-solid fa-user-shield"></i>
//           </span>
//         </Link>

//         {/* Search Field */}
//         <div className="row mt-3">
//           <div className="col-lg-6">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search by Role Name or Status"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)} // Update search query
//             />
//           </div>
//         </div>

//         <div className="row mt-5">
//           <div className="col-lg-12">
//             <div className="card">
//               <div className="card-body">
//                 <h4 className="card-title">Roles</h4>
//                 <div className="table-responsive">
//                   <table className="table header-border">
//                     <thead>
//                       <tr>
//                         <th>Role Name</th>
//                         <th>Role Status</th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredData.length > 0 ? (
//                         filteredData.map((role, index) => (
//                           <tr key={index}>
//                             <td>{role.roleName || "N/A"}</td>
//                             <td>{role.roleStatus || "N/A"}</td>
//                             <td>
//                               <span>
//                                 <Link
//                                   data-toggle="tooltip"
//                                   data-placement="top"
//                                   title="Edit"
//                                   to={`/updaterole/${role._id}`}
//                                 >
//                                   <i className="fa fa-pencil color-muted mx-2"></i>
//                                 </Link>
//                                 <Link
//                                   data-toggle="tooltip"
//                                   data-placement="top"
//                                   title="Close"
//                                   onClick={() => deleteRole(role._id)}
//                                 >
//                                   <i className="fa fa-close color-danger mx-2"></i>
//                                 </Link>
//                               </span>
//                             </td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td colSpan="3" className="text-center">
//                             No Role Found
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </>
//   );
// };

// export default ShowRoles;

// // import axios from "axios";
// // import React, { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import Swal from "sweetalert2";

// // const ShowRoles = () => {
// //   const [RoleData, setRoleData] = useState([]); // Raw roles data
// //   const [search, setSearch] = useState(""); // State to store search query
// //   const [filteredData, setFilteredData] = useState([]); // State for filtered data

// //   useEffect(() => {
// //     const fetchRole = async () => {
// //       try {
// //         const res = await axios.get("http://localhost:5000/api/role");
// //         setRoleData(res.data);
// //         setFilteredData(res.data); // Initialize filtered data with all roles
// //       } catch (error) {
// //         console.error("Error Fetching Roles Data", error);
// //         Swal.fire("Error", "Failed to fetch roles data. Please try again later.", "error");
// //       }
// //     };
// //     fetchRole();
// //   }, []);

// //   useEffect(() => {
// //     // Update filteredData whenever search changes
// //     const filteredRoles = RoleData.filter((role) =>
// //       role.roleName.toLowerCase().includes(search.toLowerCase()) ||
// //       role.roleStatus.toLowerCase().includes(search.toLowerCase())
// //     );
// //     setFilteredData(filteredRoles);
// //   }, [search, RoleData]);

// //   const deleteRole = async (roleid) => {
// //     // Show confirmation dialog with SweetAlert
// //     Swal.fire({
// //       title: "Are you sure?",
// //       text: "You won't be able to revert this!",
// //       icon: "warning",
// //       showCancelButton: true,
// //       confirmButtonColor: "#3085d6",
// //       cancelButtonColor: "#d33",
// //       confirmButtonText: "Yes, delete it!",
// //       cancelButtonText: "Cancel",
// //     }).then(async (result) => {
// //       if (result.isConfirmed) {
// //         try {
// //           const response = await axios.delete(`http://localhost:5000/api/role/${roleid}`);
// //           setRoleData(RoleData.filter((role) => role._id !== roleid)); // Update RoleData
// //           Swal.fire("Deleted!", response.data.msg, "success");
// //         } catch (error) {
// //           Swal.fire(
// //             "Error!",
// //             error?.response?.data?.err || "An unexpected error occurred. Please try again.",
// //             "error"
// //           );
// //           console.error("Error deleting role:", error);
// //         }
// //       }
// //     });
// //   };

// //   return (
// //     <>
// //       <div className="container-fluid mb-5">
// //         <Link type="button" className="btn mb-1 btn-primary" to="/addrole">
// //           Add Role
// //           <span className="btn-icon-right">
// //             <i className="fa-solid fa-user-shield"></i>
// //           </span>
// //         </Link>

// //         {/* Search Field */}
// //         <div className="row mt-3">
// //           <div className="col-lg-6">
// //             <input
// //               type="text"
// //               className="form-control"
// //               placeholder="Search by Role Name or Status"
// //               value={search}
// //               onChange={(e) => setSearch(e.target.value)} // Update search query
// //             />
// //           </div>
// //         </div>

// //         <div className="row mt-5">
// //           <div className="col-lg-12">
// //             <div className="card">
// //               <div className="card-body">
// //                 <h4 className="card-title">Roles</h4>
// //                 <div className="table-responsive">
// //                   <table className="table header-border">
// //                     <thead>
// //                       <tr>
// //                         <th>Role Name</th>
// //                         <th>Role Status</th>
// //                         <th>Actions</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {filteredData.length > 0 ? (
// //                         filteredData.map((role, index) => (
// //                           <tr key={index}>
// //                             <td>{role.roleName || "N/A"}</td>
// //                             <td>{role.roleStatus || "N/A"}</td>
// //                             <td>
// //                               <span>
// //                                 <Link
// //                                   data-toggle="tooltip"
// //                                   data-placement="top"
// //                                   title="Edit"
// //                                   to={`/updaterole/${role._id}`}
// //                                 >
// //                                   <i className="fa fa-pencil color-muted mx-2"></i>
// //                                 </Link>
// //                                 <Link
// //                                   data-toggle="tooltip"
// //                                   data-placement="top"
// //                                   title="Delete"
// //                                   onClick={() => deleteRole(role._id)}
// //                                 >
// //                                   <i className="fa fa-close color-danger mx-2"></i>
// //                                 </Link>
// //                               </span>
// //                             </td>
// //                           </tr>
// //                         ))
// //                       ) : (
// //                         <tr>
// //                           <td colSpan="3" className="text-center">
// //                             No Role Found
// //                           </td>
// //                         </tr>
// //                       )}
// //                     </tbody>
// //                   </table>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default ShowRoles;

// const swalWithBootstrapButtons = Swal.mixin({
//   customClass: {
//     confirmButton: "btn btn-success",
//     cancelButton: "btn btn-danger"
//   },
//   buttonsStyling: false
// });
// swalWithBootstrapButtons.fire({
//   title: "Are you sure?",
//   text: "You won't be able to revert this!",
//   icon: "warning",
//   showCancelButton: true,
//   confirmButtonText: "Yes, delete it!",
//   cancelButtonText: "No, cancel!",
//   reverseButtons: true
// }).then((result) => {
//   if (result.isConfirmed) {
//     swalWithBootstrapButtons.fire({
//       title: "Deleted!",
//       text: "Your file has been deleted.",
//       icon: "success"
//     });
//   } else if (
//     /* Read more about handling dismissals below */
//     result.dismiss === Swal.DismissReason.cancel
//   ) {
//     swalWithBootstrapButtons.fire({
//       title: "Cancelled",
//       text: "Your imaginary file is safe :)",
//       icon: "error"
//     });
//   }
// });

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Swal from "sweetalert2"; // Import SweetAlert2

// const ShowRoles = () => {
//   const [RoleData, setRoleData] = useState([]); // Raw roles data
//   const [search, setSearch] = useState(""); // State to store search query
//   const [statusFilter, setStatusFilter] = useState(""); // State to store selected status
//   const [filteredData, setFilteredData] = useState([]); // State for filtered data

//   useEffect(() => {
//     const fetchRole = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/role");
//         setRoleData(res.data);
//         setFilteredData(res.data); // Initialize filtered data with all roles
//       } catch (error) {
//         console.error("Error Fetching Roles Data:", error);
//         Swal.fire("Error", "Failed to fetch roles data. Please try again.", "error");
//       }
//     };
//     fetchRole();
//   }, []);

//   useEffect(() => {
//     // Update filteredData whenever search changes
//     const filteredRoles = RoleData.filter((role) =>
//       role.roleName.toLowerCase().includes(search.toLowerCase()) ||
//       role.roleStatus.toLowerCase().includes(search.toLowerCase())
//     );
//     setFilteredData(filteredRoles);
//   }, [search,statusFilter, RoleData]);

//   const deleteRole = async (roleid) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to undo this action!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const response = await axios.delete(`http://localhost:5000/api/role/${roleid}`);
//           setRoleData(RoleData.filter((role) => role._id !== roleid)); // Update RoleData
//           Swal.fire("Deleted!", response.data.msg, "success");
//         } catch (error) {
//           Swal.fire("Error", error?.response?.data?.err || "An unexpected error occurred. Please try again.", "error");
//           console.error("Error deleting role:", error);
//         }
//       }
//     });
//   };

//   return (
//     <>
//       <div className="container-fluid mb-5">
//         <Link type="button" className="btn mb-1 btn-primary" to="/addrole">
//           Add Role
//           <span className="btn-icon-right">
//             <i className="fa-solid fa-user-shield"></i>
//           </span>
//         </Link>

//         {/* Search Field */}
//         <div className="row mt-3">
//           <div className="col-lg-6">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search by Role Name or Status"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)} // Update search query
//             />
//           </div>
//           <div className="form-group col-md-3">
//           <select id="inputState" className="form-control">
//             <option value="" disabled selected>Search by Role Status</option>
//             <option value="active">active</option>
//             <option value="inactive">inactive</option>
//           </select>
//         </div>
//         </div>

//         <div className="row mt-5">
//           <div className="col-lg-12">
//             <div className="card">
//               <div className="card-body">
//                 <h4 className="card-title">Roles</h4>
//                 <div className="table-responsive">
//                   <table className="table header-border">
//                     <thead>
//                       <tr>
//                         <th>Role Name</th>
//                         <th>Role Status</th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredData.length > 0 ? (
//                         filteredData.map((role, index) => (
//                           <tr key={index}>
//                             <td>{role.roleName || "N/A"}</td>
//                             <td>{role.roleStatus || "N/A"}</td>
//                             <td>
//                               <span>
//                                 <Link
//                                   data-toggle="tooltip"
//                                   data-placement="top"
//                                   title="Edit"
//                                   to={`/updaterole/${role._id}`}
//                                 >
//                                   <i className="fa fa-pencil color-muted mx-2"></i>
//                                 </Link>
//                                 <Link
//                                   data-toggle="tooltip"
//                                   data-placement="top"
//                                   title="Close"
//                                   onClick={() => deleteRole(role._id)}
//                                 >
//                                   <i className="fa fa-close color-danger mx-2"></i>
//                                 </Link>
//                               </span>
//                             </td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td colSpan="3" className="text-center">
//                             No Role Found
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ShowRoles;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

const ShowRoles = () => {
  const [RoleData, setRoleData] = useState([]); // Raw roles data
  const [search, setSearch] = useState(""); // State to store search query
  const [statusFilter, setStatusFilter] = useState(""); // State to store selected status
  const [filteredData, setFilteredData] = useState([]); // State for filtered data

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
