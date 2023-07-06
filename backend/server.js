const PORT = process.env.PORT ?? 8000;
const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');

app.use(cors());

// Get 
app.get('/clock/:userEmail', async (req, res) => {
    const { userEmail: user_email } = req.params; //Destructuring Example
    try {
        const clock = await pool.query('SELECT * FROM clock WHERE user_email = $1', [user_email]);
        res.json(clock.rows)

    } catch (err) {
        console.error(err);
    }
})

app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`))

