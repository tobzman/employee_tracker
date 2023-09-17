const mysql = require("mysql2");

class Database {
  constructor(options) {
    this.options = options;
    this.connection = null;
  }

  
  connect() {
    const { host, user, password, database } = this.options;

    
    this.connection = mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    
    this.connection.connect((err) => {
      if (err) {
        console.error("Error connecting to the database:", err.message);
      } else {
        console.log("Connected to the database");
      }
    });
  }

 
  disconnect() {
    if (this.connection) {
      this.connection.end((err) => {
        if (err) {
          console.error("Error disconnecting from the database:", err.message);
        } else {
          console.log("Disconnected from the database");
        }
      });
    }
  }
}

module.exports = Database;
