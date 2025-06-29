const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: 'dpg-d1gjn4bipnbc73aqilf0-a',
        user:'recipe_generator_nqnd_user',
        password: 'sCTQwM9LgUbUCHUShuJipGs4cxjvim50',
        database: 'recipe_generator_nqnd',
        ssl:{rejectUnauthorized:false}
    }
})

const app = express();

let initialPath = path.join(__dirname, "public");
let initialPath1 = path.join(__dirname, "recipe-api");

app.use(bodyParser.json());
app.use(express.static(initialPath));
app.use(express.static(initialPath1));



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

app.post('/register-user', (req, res) => {
    const { name, email, password } = req.body;

    if(!name.length || !email.length || !password.length){
        res.json('fill all the fields');
    } else{
        db("users").insert({
            name: name,
            email: email,
            password: password
        })
        .returning(["name", "email"])
        .then(data => {
            res.json(data[0])
        })
        .catch(err => {
            if(err.detail.includes('already exists')){
                res.json('email already exists');
            }
        })
    }
})

app.post('/login-user', (req, res) => {
    const { email, password } = req.body;

    db.select('name', 'email')
    .from('users')
    .where({
        email: email,
        password: password
    })
    .then(data => {
        if(data.length){
            res.json(data[0]);
        } else{
            res.json('email or password is incorrect');
        }
    })
})


app.listen(8080, (req, res) => {
    console.log('listening on port 8080.....')
})