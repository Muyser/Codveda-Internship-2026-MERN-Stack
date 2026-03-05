import express from 'express';


const app = express();
app.use(express.json());
const PORT = 5000;

// Temporary data (acts like database)
let users = [
    { id: 1, name: "muyser", email: "muyser@gmail.com" },
    { id: 2, name: "bakhit", email: "bakhit@gmail.com" }
];

// GET all users
app.get("/users", (req, res) => {
    res.status(200).json(users);
});

// GET single user
app.get("/users/:id", (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
});

// CREATE new user
app.post("/users", (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ message: "Name and email are required" });
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
})

// UPDATE user
app.put("/users/:id", (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, email } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    res.status(200).json({ message: "User updated successfully", user });
});

// DELETE user
app.delete("/users/:id", (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).json({ message: "User not found" });
    users.splice(userIndex, 1);
    res.status(200).json({ message: "User deleted successfully" });
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

