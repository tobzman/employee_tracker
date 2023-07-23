const inquirer = require("inquirer");

const questions = {
  mainMenu: [
    {
      type: "list",
      name: "menuOption",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Exit",
      ],
    },
  ],

  addDepartment: [
    {
      type: "input",
      name: "departmentName",
      message: "Enter the name of the department:",
      validate: (input) => {
        if (input.trim() === "") {
          return "Please enter a valid department name.";
        }
        return true;
      },
    },
  ],

  addRole: [
    {
      type: "input",
      name: "roleTitle",
      message: "Enter the title of the role:",
      validate: (input) => {
        if (input.trim() === "") {
          return "Please enter a valid role title.";
        }
        return true;
      },
    },
    {
      type: "input",
      name: "roleSalary",
      message: "Enter the salary for this role(must be numeric)...",
      validate: (input) => {
        if (isNaN(input)) {
          return "Please enter a valid number for the salary.";
        }
        return true;
      },
    },
    {
      type: "input",
      name: "departmentId",
      message: "Enter the department ID for this role:",
      validate: (input) => {
        if (isNaN(input)) {
          return "Please enter a valid number for the department ID.";
        }
        return true;
      },
    },
  ],

  addEmployee: [
    {
      type: "input",
      name: "firstName",
      message: "Enter the employee's first name:",
      validate: (input) => {
        if (input.trim() === "") {
          return "Please enter a valid first name.";
        }
        return true;
      },
    },
    {
      type: "input",
      name: "lastName",
      message: "Enter the employee's last name:",
      validate: (input) => {
        if (input.trim() === "") {
          return "Please enter a valid last name.";
        }
        return true;
      },
    },
    {
      type: "input",
      name: "mangerId",
      message: "Enter the employee's manager:",
      validate: (input) => {
        if (input.trim() === "") {
          return "";
        }
        return true;
      },
    },

    // Add additional questions for role selection and manager selection if needed
  ],

  updateEmployeeRole: [
    // Add questions for selecting an employee and their new role
  ],
};

module.exports = questions;
