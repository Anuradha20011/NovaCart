const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Sample product data
const products = [
    { id: 1, name: "Laptop", price: 45000 },
    { id: 2, name: "Smartphone", price: 30000 },
    { id: 3, name: "Headphones", price: 2000 }
];

// Home route
app.get("/", (req, res) => {
    res.send("NovaCart Backend Running 🚀");
});

// Products API route
app.get("/products", (req, res) => {
    res.json(products);
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
