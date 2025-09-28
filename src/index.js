const express = require("express");
const { v4: uuidv4 } = require("uuid"); 

const app = express();
app.use(express.json());

let users = [];

app.post("/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: "Missing fields" });

  const user = { id: uuidv4(), name, email };
  users.push(user);
  res.status(201).json(user);
});

app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});


app.put("/users/:id", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: "Missing fields" });

  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "Username not found" });

  user.name = name;
  user.email = email;
  res.json(user);
});


app.delete("/users/:id", (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Username not found" });

  users.splice(index, 1);
  res.status(204).send(); 
});

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

module.exports = app; 
