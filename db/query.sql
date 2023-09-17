
USE employee_db;


SELECT * FROM employee;

SELECT * FROM department;


SELECT * FROM role;


SELECT 
    role.id,
    role.title AS job_title,
    department.name AS department,
    role.salary
FROM role
INNER JOIN department ON role.department_id = department.id;


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
