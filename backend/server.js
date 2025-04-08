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

//read from soldier table
app.get('/soldier/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Soldier WHERE soldier_id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result[0]);
    });
});


//update solider table
app.put('/soldier', (req, res) => {
    const { id, name, rank, role, dob } = req.body;
    const query = 'UPDATE Soldier SET name = ?, rank = ?, role = ?, dob = ? WHERE soldier_id = ?';
    db.query(query, [name, rank, role, dob, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Soldier updated successfully' });
    });
});
//get Squad details from soldier id
app.get('/squad-by-soldier/:id', (req, res) => {
  const { id } = req.params;
  const query = `
      SELECT Squad.* FROM Squad
      JOIN Squad_soldier ON Squad.squad_id = Squad_soldier.squad_id
      WHERE Squad_soldier.soldier_id = ?
  `;
  db.query(query, [id], (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error', details: err.message });
      if (result.length === 0) return res.status(404).json({ error: 'No squad found for this soldier' });
      res.json(result[0]); // Returns the first matching squad
  });
});


//get squad details from squad id
// Fetch Squad Details by squad_id
app.get('/squad/:id', (req, res) => {
  const { id } = req.params; // Extract squad_id from the URL parameters

  const query = `SELECT * FROM Squad WHERE squad_id = ?`;

  db.query(query, [id], (err, results) => {
      if (err) {
          return res.status(500).json({ error: 'Database error', details: err });
      }
      if (results.length === 0) {
          return res.status(404).json({ error: 'Squad not found' });
      }
      res.json(results[0]); // Return squad details as JSON
  });
});


//add to soldier table 
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
  
//delete from soldier table
app.delete('/soldier/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM soldier WHERE soldier_id = ?`;
  db.query(query, [id], (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error', details: err });
      if (results.affectedRows === 0) return res.status(404).json({ error: 'Soldier not found' });
      res.json({ message: 'Soldier deleted successfully' });
  });
});
// Fetch Equipment Details by id
app.get('/equipment/:id', (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM equipment WHERE equipment_id = ?`;
  db.query(query, [id], (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error', details: err });
      if (results.length === 0) return res.status(404).json({ error: 'Equipment not found' });
      res.json(results[0]);
  });
});


// Issue Equipment to Soldier
app.post('/equipment/soldier', (req, res) => {
  const { equipmentId, soldierId, equipmentCount } = req.body; // Destructure request body

  const query = `
      INSERT INTO equipment_soldier (equipment_id, soldier_id, issue_date, equipment_count) 
      VALUES (?, ?, CURDATE(), ?)
  `;

  db.query(query, [equipmentId, soldierId, equipmentCount], (err, results) => {
      if (err) {
          return res.status(500).json({ error: 'Database error', details: err });
      }
      res.json({ message: 'Equipment issued to soldier successfully' });
  });
});


  
// Issue Equipment to Squad
app.post('/equipment/squad', (req, res) => {
  const {equipmentId , squadId } = req.body;
  const query = `INSERT INTO equipment_squad (equipment_id,squad_id) VALUES (?, ?)`;
  db.query(query, [ equipmentId,squadId], (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error', details: err });
      res.json({ message: 'Equipment issued to soldier successfully' });
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
