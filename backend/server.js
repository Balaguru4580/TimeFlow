const PORT = process.env.PORT ?? 8000;
const express = require('express');
const app = express();
const pool = require('./db');

// Get 
app.get('/clock', async (req, res) => {
    try{
        const clock = await pool.query('SELECT * FROM clock');
        res.json(clock.rows)

    } catch (err){
        console.error(err);
    }
})

app.listen(PORT, ()=> console.log(`Server Running on Port ${PORT}`))

