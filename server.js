const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const knex = require('knex');
const bcrypt = require('bcrypt');
const User = require('./models/user')
const connectDB=  async () => {
  try {

  const conn = await mongoose.connect(`mongodb+srv://omishashree:qSScofbgMmbGL0nc@cluster0.3tfqrci.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



    console.log(`MongoDB Connected:${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};



const app = express();

let initialPath = path.join(__dirname, "public");
let initialPath1 = path.join(__dirname, "recipe-api");

app.use(bodyParser.json());
app.use(express.static(initialPath));
app.use(express.static(initialPath1));
connectDB();



app.get('/', (req, res) => {
    res.sendFile(path.join(initialPath, "index.html"));
})

app.get('/explore', (req, res) => {
    res.sendFile(path.join(initialPath1, "index.html"));
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(initialPath, "login.html"));
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(initialPath, "register.html"));
})

app.post('/register-user', async (req, res) => {
    const { name, email, password } = req.body;

    // Check for missing fields
    if (!name || !email || !password || !name.length || !email.length || !password.length) {
        return res.json({ success: false, message: 'Fill all the fields' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({ success: false, message: 'User already exists with this email' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return res.json({ success: true, user: { name: newUser.name, email: newUser.email } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.post('/login-user', async (req, res) => {
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
        return res.json({ success: false, message: 'Fill all the fields' });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'Email or password is incorrect' });
        }

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: 'Email or password is incorrect' });
        }

        // Successful login
        res.json({
            success: true,
            user: {
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.listen(8080, (req, res) => {
    console.log('listening on port 8080.....')
})