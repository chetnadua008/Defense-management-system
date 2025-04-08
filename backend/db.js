import mysql from 'mysql2';

// Create a connection to the MySQL database
export const db = mysql.createConnection({
  host: 'localhost',        // Database host
  user: 'root',             // Database username
  password: 'usbw',             // Database password (leave blank if none)
  database: 'defense_db'    // Your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
    process.exit(1); // Exit the application if connection fails
  } else {
    console.log('✅ Connected to the MySQL database!');
  }
});
