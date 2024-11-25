const mongoose = require("mongoose");
const employeeModel = require("../models/EmployeeModel");
const RoleModel = require("../models/RoleModel");
const bcrypt = require("bcrypt");

// @Request   GET
// @Route     http://localhost:5000/api/employee/
// @Access    Private
const getEmployee = async (req, res) => {
    try {
        const employees = await employeeModel.find().populate("employeeRoles");
        if (!employees.length) return res.status(404).json({ err: "No data found" });
        return res.status(200).json(employees);
    } catch (error) {
        console.log("Error Reading Employees:", error);
        return res.status(500).json({ err: "Internal Server Error" });
    }
};

// @Request   GET
// @Route     http://localhost:5000/api/employee/:id
// @Access    Private
const getSingleEmployee = async (req, res) => {
    try {
        const _id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({ err: "Invalid ID format" });

        const employee = await employeeModel.findById(_id).populate("employeeRoles");
        if (!employee) return res.status(404).json({ err: "Employee not found" });

        return res.status(200).json(employee);
    } catch (error) {
        console.log("Error Reading Employee:", error);
        return res.status(500).json({ err: "Internal Server Error" });
    }
};


const createEmployee = async (req, res) => {
    try {
        const { employeeName, employeeEmail, employeePassword, employeeSalary, employeeRoles } = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const nameRegex = /^[A-Za-z\s]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const numberRegex = /^\d+$/;

        if (!employeeName || !nameRegex.test(employeeName))
            return res.status(400).json({ err: "Invalid Employee Name." });
        if (!employeeEmail || !emailRegex.test(employeeEmail))
            return res.status(400).json({ err: "Invalid Employee Email." });
        if (!employeePassword || !passwordRegex.test(employeePassword))
            return res.status(400).json({ err: "Invalid Employee Password." });
        if (!employeeSalary || !numberRegex.test(employeeSalary))
            return res.status(400).json({ err: "Invalid Employee Salary." });

        if (!employeeRoles || !Array.isArray(employeeRoles) || !employeeRoles.length)
            return res.status(400).json({ err: "At least one role is required." });

        // Validate if each role exists in the Role collection
        for (const role of employeeRoles) {
            if (!mongoose.Types.ObjectId.isValid(role)) {
                return res.status(400).json({ err: `Invalid Role ID: ${role}` });
            }
            const roleExists = await RoleModel.findById(role);
            if (!roleExists) {
                return res.status(400).json({ err: `Role with ID ${role} does not exist.` });
            }
        }

        const existingEmployee = await employeeModel.findOne({ employeeEmail });
        if (existingEmployee) {
            return res.status(400).json({ err: "Employee with this email already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(employeePassword, salt);

        const newEmployee = await employeeModel.create({
            employeeName,
            employeeEmail,
            employeePassword: hashedPassword,
            employeeSalary,
            employeeRoles,
        });

        return res.status(201).json({
            msg: "Employee created successfully",
            employee: newEmployee,
        });
    } catch (err) {
        console.error("Error Creating Employee:", err);
        return res.status(500).json({ err: "Internal Server Error" });
    }
};


// @Request   PUT
// @Route     http://localhost:5000/api/employee/:id
// @Access    Private
// const updateEmployee = async (req, res) => {
//     try {
//         const _id = req.params.id;
//         const { employeeName, employeeEmail,employeeSalary, employeeRole } = req.body;

//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         const nameRegex = /^[A-Za-z\s]+$/;
//         const numberRegex = /^\d+$/; // Only digits

//         if (!employeeName || !nameRegex.test(employeeName)) return res.status(400).json({ err: "Invalid Username. Only letters and spaces are allowed." });
//         if (!employeeEmail || !emailRegex.test(employeeEmail)) return res.status(400).json({ err: "Invalid Email Address." });
//         if (!employeeSalary || !numberRegex.test(employeeSalary)) return res.status(400).json({ err: "Invalid Salary. Only Numbers are allowed." });
//         if (!mongoose.Types.ObjectId.isValid(employeeRole)) return res.status(400).json({ err: "Invalid Role ID format." });

//         const existingEmployee = await employeeModel.findById(_id);
//         if (!existingEmployee) return res.status(404).json({ err: "Employee not found" });

//         const updatedData = {
//             employeeName,
//             employeeEmail,
//             employeeSalary,
//             employeeRole
//         };

//         const updatedEmployee = await employeeModel.findByIdAndUpdate(_id, updatedData, { new: true, omitUndefined: true });
//         return res.status(200).json({ msg: "Employee updated successfully", updatedEmployee });
//     } catch (error) {
//         console.log("Error Updating Employee:", error);
//         return res.status(500).json({ err: "Internal Server Error" });
//     }
// };
const updateEmployee = async (req, res) => {
    try {
        const _id = req.params.id;
        const { employeeName, employeeEmail, employeeSalary, employeeRoles } = req.body;

        // Regex for validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const nameRegex = /^[A-Za-z\s]+$/;
        const numberRegex = /^\d+$/;

        // Validate the provided fields
        if (employeeName && !nameRegex.test(employeeName))
            return res.status(400).json({ err: "Invalid Employee Name. Only letters and spaces are allowed." });
        if (employeeEmail && !emailRegex.test(employeeEmail))
            return res.status(400).json({ err: "Invalid Email Address." });
        if (employeeSalary && !numberRegex.test(employeeSalary))
            return res.status(400).json({ err: "Invalid Salary. Only numbers are allowed." });

        // If roles are provided, validate them
        if (employeeRoles) {
            if (!Array.isArray(employeeRoles) || !employeeRoles.length)
                return res.status(400).json({ err: "At least one role is required." });

            for (const role of employeeRoles) {
                if (!mongoose.Types.ObjectId.isValid(role)) {
                    return res.status(400).json({ err: `Invalid Role ID: ${role}` });
                }
                const roleExists = await RoleModel.findById(role);
                if (!roleExists) {
                    return res.status(400).json({ err: `Role with ID ${role} does not exist.` });
                }
            }
        }

        // Find the employee
        const existingEmployee = await employeeModel.findById(_id);
        if (!existingEmployee) return res.status(404).json({ err: "Employee not found" });

        // Prepare updated data dynamically
        const updatedData = {};
        if (employeeName) updatedData.employeeName = employeeName;
        if (employeeEmail) updatedData.employeeEmail = employeeEmail;
        if (employeeSalary) updatedData.employeeSalary = employeeSalary;
        if (employeeRoles) updatedData.employeeRoles = employeeRoles;

        // Update employee in the database
        const updatedEmployee = await employeeModel.findByIdAndUpdate(_id, updatedData, {
            new: true, // Return the updated document
            omitUndefined: true, // Ignore undefined values
        });

        return res.status(200).json({
            msg: "Employee updated successfully",
            employee: updatedEmployee,
        });
    } catch (error) {
        console.error("Error Updating Employee:", error);
        return res.status(500).json({ err: "Internal Server Error" });
    }
};


// @Request   DELETE
// @Route     http://localhost:5000/api/employee/:id
// @Access    Private
const deleteEmployee = async (req, res) => {
    try {
        const _id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({ err: "Invalid ID format" });

        const deletedEmployee = await employeeModel.findByIdAndDelete(_id);
        if (!deletedEmployee) return res.status(404).json({ err: "Employee not found" });

        return res.status(200).json({ msg: "Employee deleted successfully", deletedEmployee });
    } catch (error) {
        console.log("Error Deleting Employee:", error);
        return res.status(500).json({ err: "Internal Server Error" });
    }
};

module.exports = { createEmployee, getEmployee, getSingleEmployee, updateEmployee, deleteEmployee };