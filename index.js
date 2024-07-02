const express = require("express");
const app = express();
const cors = require('cors');


const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: 'GET,POST,PUT,DELETE',
    optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
const PORT = 3000;


app.use(express.json());

let todos = []


app.get("/api/", (req, res) => {
  res.send("Hello, World!");
});


app.get("/api/todos/", (req, res) => {
  res.json(todos);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
