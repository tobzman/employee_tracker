const inquirer = require("inquirer");
const mysql = require("mysql2");

// Create a MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "your_mysql_password",
  database: "employee_db",
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database.");
  startApp();
});

// Function to display the main menu and handle user choices
function startApp() {
  inquirer
    .prompt([
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
    ])
    .then((answers) => {
      switch (answers.menuOption) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;
        case "Exit":
          connection.end();
          console.log("Goodbye!");
          break;
        default:
          console.log("Invalid choice. Please try again.");
          startApp();
      }
    });
}

// Implement functions for each action (viewAllDepartments, viewAllRoles, etc.)

// Example function to view all departments
function viewAllDepartments() {
  connection.query("SELECT * FROM department", (err, departments) => {
    if (err) throw err;
    console.table(departments);
    startApp();
  });
}

// Example function to add a department
function addDepartment() {
  inquirer
    .prompt([
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
    ])
    .then((answers) => {
      connection.query(
        "INSERT INTO department (name) VALUES (?)",
        [answers.departmentName],
        (err, result) => {
          if (err) throw err;
          console.log("Department added successfully!");
          startApp();
        }
      );
    });
}

// Implement other functions for remaining actions (viewAllRoles, viewAllEmployees, addRole, addEmployee, updateEmployeeRole)

// Start the application
function init() {
  console.log("Welcome to the SQL Employee Tracker!");
  startApp();
}

// Call the init function to start the application
init();
