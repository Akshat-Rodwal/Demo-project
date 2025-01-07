
import express from 'express';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(express.json()); 
app.use(cors()); 


let users = [
  { id: 1, name: 'John Doe', age: 28 },
  { id: 2, name: 'Jane Smith', age: 24 },
];


app.get('/api/data', (req, res) => {
  res.json(users);
});


app.post('/api/data', (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    return res.status(400).json({ error: 'Name and age are required' });
  }

  const newUser = { id: users.length + 1, name, age };
  users.push(newUser);
  res.status(201).json(newUser);  
});


app.delete('/api/data/:id', (req, res) => {
  const { id } = req.params;
  users = users.filter(user => user.id !== parseInt(id));
  res.status(200).json({ message: 'User deleted successfully' });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
