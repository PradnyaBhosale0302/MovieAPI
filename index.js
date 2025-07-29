const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3001;

app.use(express.json());

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'moviesdb'
});

db.connect(err => {
    if(err)
    {
        console.log('Error :', err);
    }
    else
    {
        console.log('Connected to mysql');
    }
});

app.get('/', (req, res) => {
    res.send('Welcome to the movie API');
});

app.post('/movies', (req, res) => {
    const{title, year} = req.body;
    const sql = 'INSERT INTO movies(title, year) VALUES (?, ?)';
    db.query(sql, [title, year], (err, result) => {
        if(err) res.status(500).json({error : err});
        res.status(201).json({id : result.insertId, title, year});
    });
});

app.get('/movies', (req, res) => {
    db.query('SELECT * FROM movies', (err, results) => {
        if(err) return res.status(500).json({error : err});
        res.json(results);
    });
});

app.get('/movies/:id', (req, res) => {
    db.query('SELECT * FROM movies WHERE id = ?', req.params.id, (err, results) => {
        if(err) return res.status(500).json({error : err});
        if(res.results==0) return res.status(404).json({message : 'Movie not found'});
        res.json(results[0]);
    });
});

app.put('/movies/:id', (req, res) => {
    const{title, year} = req.body;
    const sql = 'UPDATE movies SET title = ?, year = ? WHERE id = ?';
    db.query(sql, [title, year, req.params.id], (err, results) => {
        if(err) return res.status(500).json({error : err});
        res.json({message : 'Movie updated'});
    });
});

app.delete('/movies/:id', (req, res) => {
    db.query('DELETE FROM movies WHERE id = ?', [req.params.id], (err, results) => {
        if(err) return res.status(500).json({error : err});
        res.json({message : 'Movie deleted'});
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});