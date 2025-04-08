import express from 'express';   // For creating the server
import { db } from './db.js';    // Import the database connection
import cors from 'cors';         // Enable Cross-Origin Resource Sharing

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies


//default route
app.get('/', (req, res) => {
    res.send('Welcome to the Defense Management System API');
});

//routes 

//soldier form routes
//get soldier by id
app.get('/soldier/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Soldier WHERE soldier_id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result[0]);
    });
});


//update soldier 
app.put('/soldier', (req, res) => {
    const { id, name, rank, role, dob } = req.body;
    const query = 'UPDATE Soldier SET name = ?, rank = ?, role = ?, dob = ? WHERE soldier_id = ?';
    db.query(query, [name, rank, role, dob, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Soldier updated successfully' });
    });
});
//soldier squad details from its id
app.get('/squad/:id', (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT Squad.* FROM Squad
        JOIN Squad_soldier ON Squad.squad_id = Squad_soldier.squad_id
        WHERE Squad_soldier.soldier_id = ?
    `;
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result[0]);
    });
});


//recruitment_officer routes to add soldier 
app.post('/api/soldiers', (req, res) => {
    const { name, rank, role, dob } = req.body; // Extract data from request body
    const query = 'INSERT INTO Soldier (name, rank, role, dob) VALUES (?, ?, ?, ?)';
  
    db.query(query, [name, rank, role, dob], (err, result) => {
      if (err) {
        console.error('Error inserting soldier:', err);
        return res.status(500).json({ error: 'Failed to insert soldier' });
      }
      res.json({ message: 'Soldier added successfully', soldierId: result.insertId });
    });
  });
  



  
// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


app.get('/', (req, res) => {
  res.send('Welcome to the Defense Management System API');
});
