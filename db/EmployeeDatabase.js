const Database = require("./database");
const mysql = require("mysql2/promise");

class EmployeeDatabase extends Database {
  constructor(options) {
    super(options);
  }

  async viewDepartments() {
    const [rows] = await this.db.execute("SELECT * FROM department");
    return rows;
  }

  async viewRoles() {
    const [rows] = await this.db.execute(`
      SELECT role.id, role.title, department.name AS role_department, role.salary
      FROM role
      INNER JOIN department ON role.department_id = department.id;
    `);
    return rows;
  }

  async viewEmployees() {
    const [rows] = await this.db.execute(`
      SELECT 
        employee.id, 
        employee.first_name,
        COALESCE(employee.last_name, "") AS last_name,
        role.title AS job_title,
        department.name AS department,
        role.salary AS salary,
        CONCAT(COALESCE(managers.first_name, ""), " ", COALESCE(managers.last_name, "")) AS manager
      FROM employee
      INNER JOIN role ON employee.role_id = role.id
      INNER JOIN department ON role.department_id = department.id
      LEFT JOIN employee AS managers ON employee.manager_id = managers.id
      ORDER BY employee.id;
    `);
    return rows;
  }

  async addDepartment(name) {
    await this.db.execute("INSERT INTO department(name) VALUES(?)", [name]);
  }

  async addRole(roleOptions) {
    const { role, salary, department } = roleOptions;
    await this.db.execute(
      "INSERT INTO role(title, salary, department_id) VALUES(?, ?, ?)",
      [role, salary, department]
    );
  }

  async addEmployee(employeeOptions) {
    const { firstName, lastName, managerId, roleId } = employeeOptions;
    await this.db.execute(
      "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)",
      [firstName, lastName, roleId, managerId]
    );
  }



  async connect() {
    this.db = await mysql.createConnection(this.options);
    console.log("Database connected");
  }

  async disconnect() {
    if (this.db) {
      await this.db.end();
      console.log("Database disconnected");
    }
  }
}

module.exports = EmployeeDatabase;
