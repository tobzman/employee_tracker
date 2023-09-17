
INSERT INTO department (id, name) VALUES
  (1, 'Sales'),
  (2, 'Engineering'),
  (3, 'Finance'),
  (4, 'Legal'),
  (5, 'Marketing'),
  (6, 'Operations'),
  (7, 'IT');

INSERT INTO role (id, title, salary, department_id) VALUES
  (1, 'Sales Lead', 100000, 1),
  (2, 'Salesperson', 80000, 1),
  (3, 'Lead Engineer', 150000, 2),
  (4, 'Software Engineer', 120000, 2),
  (5, 'Account Manager', 160000, 3),
  (6, 'Accountant', 125000, 3),
  (7, 'Legal Team Lead', 250000, 4),
  (8, 'Lawyer', 190000, 4);


INSERT INTO employee (id, first_name, last_name, age, email, role_id, manager_id) VALUES
  (1, 'John', 'Doe', 30, 'john.doe@example.com', 1, NULL),
  (2, 'Mike', 'Chan', 28, 'mike.chan@example.com', 2, 1),
  (3, 'Ashley', 'Rodriguez', 35, 'ashley.rodriguez@example.com', 3, NULL),
  (4, 'Kevin', 'Tupik', 32, 'kevin.tupik@example.com', 4, 3),
  (5, 'Kunal', 'Singh', 29, 'kunal.singh@example.com', 5, NULL),
  (6, 'Malia', 'Brown', 31, 'malia.brown@example.com', 6, 5),
  (7, 'Sarah', 'Lourd', 27, 'sarah.lourd@example.com', 7, NULL),
  (8, 'Tom', 'Allen', 33, 'tom.allen@example.com', 8, 7);
