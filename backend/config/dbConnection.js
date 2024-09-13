// Import required modules
const mysql = require("mysql2");

// Define your TiDB Cloud configuration
const YOUR_REGION = "ap-southeast-1"; // Replace with your actual region
const YOUR_DATA_APP_ID = "dataapp-ZqMyqfcz"; // Replace with your actual data app ID

// Create the connection object
const connection = mysql.createConnection({
  host: `gateway01.ap-southeast-1.prod.aws.tidbcloud.com`,
  port: "4000", // Constructed host
  user: "2nk1Gg5ssyNRz36.root", // Public key from environment variable
  password: "Kwun6QWArjEPdesS", // Private key from environment variable
  database: "eduportal", // Your database name
  ssl: {
    rejectUnauthorized: false, // Enable this if SSL is required
  },
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }

  console.log("Successfully connected to TiDB Cloud!");
});

// Export the connection for use in other modules
module.exports = connection;
