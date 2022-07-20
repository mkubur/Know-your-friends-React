const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

app.use(cors());
app.use(express.json())

const dp = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '4165681M1026',
    database: 'homie',
});
/*
app.post("/create", (req, res)=> {
    console.log(req.body)
    const name = req.body.name;
    const age = req.body.age;
    const position = req.body.position;
    const country = req.body.country;
    const wage = req.body.wage;
    // first parameter of query is the statement of the query, 2nd value in form of array, 3rd
    // callback function

    dp.query(
        "INSERT INTO employee (name, age, country, position , wage) VALUES(?,?,?,?,?)",
        [name, age, country, position, wage],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send('values inserted');
            }
        }
    );
});
*/

app.get("/questions", (req, res)=> {

    dp.query(
        "SELECT question_body, option1, option2, option3, option4, correct, form_id " +
        "FROM questions join options " +
        "where options.option_id = questions.question_id",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result)
                res.send(result);
            }
        }
    );
});

app.post("/submitScore", (req, res)=> {
    console.log(req.body)
    const name = req.body.name;
    const score = req.body.score;
    const form_id = req.body.form_id;

    // first parameter of query is the statement of the query, 2nd value in form of array, 3rd
    // callback function

    dp.query(
        "INSERT INTO scores (form_id, user_name, score) VALUES(?,?,?)",
        [form_id, name, score],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send('values inserted');
            }
        }
    );
});

app.get("/dashboard", (req, res)=> {
    const formId = req.query.form_id
    console.log(formId)
    const queryText = "SELECT user_name, score FROM scores where form_id = " + formId + " order by score DESC LIMIT 10"
    dp.query(
        queryText,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.listen(3001, () => {
    console.log('The server is running!')
});