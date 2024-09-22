const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const nodemailer = require("nodemailer");
const crypto = require("crypto"); // For generating OTPs
const UserModel = require('./model/User');
const AdminModel = require('./model/Admin'); 





dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day
}));

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// OTP storage
const otpStore = {};
// Send OTP for signup
app.post("/send-otp", async (req, res) => {
    const { email } = req.body;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    otpStore[email] = otp;

    try {
        await transporter.sendMail({
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
        });
        res.status(200).json({ message: 'OTP sent successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send OTP.' });
    }
});

// Verify OTP and finalize signup
app.post("/verify-otp", async (req, res) => {
    const { email, otp, name, password } = req.body;

    if (otpStore[email] && otpStore[email] === otp) {
        delete otpStore[email]; // Remove OTP after successful verification

        // Proceed with user creation here
        const newUser = new UserModel({ name, email, password });
        await newUser.save();

        req.session.user = { id: newUser._id, name: newUser.name, email: newUser.email }; // Log in user
        res.status(201).json({ message: 'User registered successfully!' });
    } else {
        res.status(400).json({ error: 'Invalid OTP.' });
    }
});
// User Signup
app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const newUser = new UserModel({ name, email, password });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// User Login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user && user.password === password) {
            req.session.user = { id: user._id, name: user.name, email: user.email };
            res.json("Success");
        } else {
            res.status(401).json("Invalid email or password");
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Admin Login
app.post("/admin/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await AdminModel.findOne({ username });
        if (admin && admin.password === password) {
            req.session.admin = { id: admin._id, username: admin.username };
            res.json("Admin login successful");
        } else {
            res.status(401).json("Invalid username or password");
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/logout", (req, res) => {
    console.log("Current session:", req.session);  // Log session for debugging
    if (req.session && req.session.user) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).json({ error: "Failed to logout" });
            } else {
                res.status(200).json("Logout successful");
            }
        });
    } else {
        res.status(400).json({ error: "No session found" });
    }
});



// Admin Logout
app.post("/admin/logout", (req, res) => {
    if (req.session.admin) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).json({ error: "Failed to logout" });
            } else {
                res.status(200).json("Admin logout successful");
            }
        });
    } else {
        res.status(400).json({ error: "No session found" });
    }
});

// Get Current User
app.get('/user', (req, res) => {
    if (req.session.user) {
        res.json({ user: req.session.user });
    } else {
        res.status(401).json("Not authenticated");
    }
});

// Get Current Admin
app.get('/admin', (req, res) => {
    if (req.session.admin) {
        res.json({ admin: req.session.admin });
    } else {
        res.status(401).json("Not authenticated");
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = app; // Export the app if needed for testing

