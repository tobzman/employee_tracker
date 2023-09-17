const inquirer = require("inquirer");
const EmployeeDatabase = require("./db/EmployeeDatabase");
const {
  menuQuestions,
  addEmployeeQuestions,
  addRoleQuestions,
  addDepartmentQuestions,
  updateEmployeeQuestions,
  updateEmployeeRoleQuestion,
  updateEmployeeManagerQuestion,
} = require("./questions");

const db = new EmployeeDatabase({
  host: "localhost",
  user: "root",
  password: "",
  database: "employee_db",
});

function init() {
  db.connect();
  displayMenu();
}

init();

function displayMenu() {
  inquirer.prompt(menuQuestions).then(function (response) {
    switch (response.options) {
      case "View All Departments":
        viewDepartments();
        break;
      case "View All Roles":
        viewRoles();
        break;
      case "View All Employees":
        viewEmployees();
        break;
      case "Add a Department":
        addDepartment();
        break;
      case "Add a Role":
        addRole();
        break;
      case "Add an Employee":
        addEmployee();
        break;
      case "Update an Employee":
        updateEmployee();
        break;
    }
  });
}

function viewDepartments() {
  db.viewDepartments().then((response) => {
    console.table(response);
    displayMenu();
  });
}

function viewRoles() {
  db.viewRoles().then((response) => {
    console.table(response);
    displayMenu();
  });
}

function viewEmployees() {
  db.viewEmployees().then((response) => {
    console.table(response);
    displayMenu();
  });
}

function addDepartment() {
  inquirer.prompt(addDepartmentQuestions).then((response) => {
    db.addDepartment(response.department).then((response) => {
      console.log(response);
      displayMenu();
    });
  });
}

function addRole() {
  db.viewDepartments().then((response) => {
    const roleQuestions = addRoleQuestions;

    response.forEach(function ({ name }) {
      roleQuestions[2].choices.push(name);
    });

    inquirer.prompt(roleQuestions).then((response) => {
      const { roleName, roleSalary, roleDepartment } = response;

      db.getDepartmentID(roleDepartment).then((response) => {
        db.addRole({
          role: roleName,
          salary: roleSalary,
          department: response[0].id,
        }).then((response) => {
          console.log(response);
          displayMenu();
        });
      });
    });
  });
}

function updateEmployee() {
  const updateEmployeeQ = updateEmployeeQuestions;
  getAllEmployees().then((response) => {
    updateEmployeeQuestions[0].choices.push(...response);

    inquirer.prompt(updateEmployeeQ).then((response) => {
      const { employee, options } = response;
      db.getEmployeeID(employee).then((response) => {
        const { id: employeeID } = response[0];

        switch (options) {
          case "Update Role":
            updateEmployeeRole(employeeID);
            break;
          case "Update Manager":
            updateEmployeeManager(employeeID, employee);
            break;
        }
      });
    });
  });
}

function updateEmployeeRole(employeeID) {
  const updateEmployeeRoleQ = updateEmployeeRoleQuestion;

  getAllRoles().then((response) => {
    updateEmployeeRoleQ[0].choices.push(...response);

    inquirer.prompt(updateEmployeeRoleQ).then((response) => {
      const { role } = response;
      db.getRoleID(role).then((response) => {
        const { id: roleID } = response[0];

        db.updateEmployeeRole(roleID, employeeID).then((response) => {
          console.log(response);
        });
        displayMenu();
      });
    });
  });
}

function updateEmployeeManager(employeeID, employeeName) {
  const updateEmployeeManagerQ = updateEmployeeManagerQuestion;
  console.log(employeeName);
  getAllEmployees(employeeName).then((response) => {
    updateEmployeeManagerQ[0].choices.push(...response);

    inquirer.prompt(updateEmployeeManagerQ).then((response) => {
      db.getEmployeeID(response.manager).then((response) => {
        const { id: managerID } = response[0];

        db.updateEmployeeManager(employeeID, managerID).then((response) => {
          console.log(response);
          displayMenu();
        });
      });
    });
  });
}

function addEmployee() {
  const employeeQuestions = addEmployeeQuestions;

  getAllRoles().then((response) => {
    employeeQuestions[2].choices.push(...response);

    getAllEmployees().then((response) => {
      employeeQuestions[3].choices.push(...response);
      addEmployeeToDB(employeeQuestions);
    });
  });
}

function addEmployeeToDB(employeeQuestions) {
  inquirer.prompt(employeeQuestions).then((response) => {
    const { firstName, lastName, role, manager } = response;

    db.getEmployeeID(manager).then((response) => {
      const { id: managerId } = response[0];

      db.getRoleID(role).then((roleResponse) => {
        const { id: roleId } = roleResponse[0];

        db.addEmployee({
          firstName: firstName,
          lastName: lastName,
          managerId: managerId,
          roleId: roleId,
        }).then((response) => {
          console.log(response);
          displayMenu();
        });
      });
    });
  });
}

function getAllRoles() {
  return new Promise((resolve, reject) => {
    db.viewRoles().then((response) => {
      const roles = response.map(({ title }) => title);
      resolve(roles);
    });
  });
}
function getAllEmployees(selfName = "") {
  return new Promise((resolve, reject) => {
    db.viewEmployees().then((response) => {
      const managers = response
        .filter(({ first_name, last_name }) => {
          const fullName = `${first_name} ${last_name}`;

          return fullName.trimEnd() !== selfName.trimEnd();
        })
        .map(({ first_name, last_name }) => `${first_name} ${last_name}`);

      resolve(managers);
    });
  });
}
