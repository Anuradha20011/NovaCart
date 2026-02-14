const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Nova@12345",
    database: "novacart"
});

db.connect((err) => {
    if (err) {
        console.log("Connection Error ❌", err);
    } else {
        console.log("MySQL Connected ✅");
    }
});

// Home Route
app.get("/", (req, res) => {
    res.send("NovaCart Backend Running 🚀");
});

// Get Products
app.get("/products", (req, res) => {
    db.query("SELECT * FROM products", (err, result) => {
        if (err) {
            res.status(500).json({ error: "Error fetching products" });
        } else {
            res.json(result);
        }
    });
});

// Add Product
app.post("/products", (req, res) => {
    const { name, description, price, image_url, stock, category, rating, oldPrice } = req.body;

    const sql = `
        INSERT INTO products 
        (name, description, price, image_url, stock, category, rating, oldPrice) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, 
        [name, description, price, image_url, stock, category, rating, oldPrice],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Product Added ✅" });
        }
    );
});

// Delete Product
app.delete("/products/:id", (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM products WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Product Deleted ❌" });
    });
});

// Update Product
app.put("/products/:id", (req, res) => {
    const id = req.params.id;
    const { name, price } = req.body;

    db.query(
        "UPDATE products SET name = ?, price = ? WHERE id = ?",
        [name, price, id],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Product Updated ✏" });
        }
    );
});


// Create Order
app.post("/orders", (req, res) => {
    const { items, total } = req.body;

    const query = `
        INSERT INTO orders (items, total, status)
        VALUES (?, ?, 'Pending')
    `;

    db.query(
        query,
        [JSON.stringify(items), total],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: "Error saving order" });
            } else {
                res.json({ message: "Order placed successfully ✅" });
            }
        }
    );
});


// Get Orders
app.get("/orders", (req, res) => {
    db.query("SELECT * FROM orders ORDER BY id DESC", (err, result) => {
        if (err) {
            res.status(500).json({ error: "Error fetching orders" });
        } else {

            result.forEach(order => {
                order.items = JSON.parse(order.items);
            });

            res.json(result);
        }
    });
});


// Update Order Status
app.put("/orders/:id", (req, res) => {
    const { status } = req.body;
    const orderId = req.params.id;

    const query = "UPDATE orders SET status = ? WHERE id = ?";

    db.query(query, [status, orderId], (err, result) => {
        if (err) {
            res.status(500).json({ error: "Error updating status" });
        } else {
            res.json({ message: "Status updated successfully ✅" });
        }
    });
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
