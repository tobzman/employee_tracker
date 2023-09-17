function validateInput(input, errorMessage) {
  if (input) {
    return true;
  }
  return errorMessage;
}

const menuQuestions = [
  {
    type: "list",
    name: "options",
    message: "Select an option:",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add a Department",
      "Add a Role",
      "Add an Employee",
      "Update an Employee",
    ],
  },
];

const addDepartmentQuestions = [
  {
    type: "text",
    name: "department",
    message: "Enter the new department name:",
    validate: function (input) {
      return validateInput(input, "Please enter a department name.");
    },
  },
];

const addRoleQuestions = [
  {
    type: "text",
    name: "roleName",
    message: "Enter the new role name:",
    validate: function (input) {
      return validateInput(input, "Please enter a role name.");
    },
  },
  {
    type: "text",
    name: "roleSalary",
    message: "Enter the salary for this role:",
    validate: function (input) {
      if (!isNaN(input)) {
        return true;
      }
      return "Please enter a valid number for the salary.";
    },
  },
  {
    type: "list",
    name: "roleDepartment",
    message: "Select the department for this role:",
    choices: [],
  },
];

const addEmployeeQuestions = [
  {
    type: "text",
    name: "firstName",
    message: "Enter the employee's first name:",
    validate: function (input) {
      return validateInput(input, "Please enter the employee's first name.");
    },
  },
  {
    type: "text",
    name: "lastName",
    message: "Enter the employee's last name:",
  },
  {
    type: "list",
    name: "role",
    message: "Select the employee's role:",
    choices: [],
  },
  {
    type: "list",
    name: "manager",
    message: "Select the employee's manager:",
    choices: ["None"],
  },
];

const updateEmployeeQuestions = [
  {
    type: "list",
    name: "employee",
    message: "Select the employee to update:",
    choices: [],
  },
  {
    type: "list",
    name: "options",
    message: "What do you want to update for this employee?",
    choices: ["Update Role", "Update Manager"],
  },
];

const updateEmployeeRoleQuestion = [
  {
    type: "list",
    name: "role",
    message: "Select the new role for the employee:",
    choices: [],
  },
];

const updateEmployeeManagerQuestion = [
  {
    type: "list",
    name: "manager",
    message: "Select the new manager for the employee:",
    choices: [],
  },
];

module.exports = {
  menuQuestions,
  addDepartmentQuestions,
  addEmployeeQuestions,
  addRoleQuestions,
  updateEmployeeQuestions,
  updateEmployeeRoleQuestion,
  updateEmployeeManagerQuestion,
};
