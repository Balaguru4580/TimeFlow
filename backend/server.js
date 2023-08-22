const PORT = process.env.PORT ?? 8000;
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const app = express();
const pool = require('./db');

app.use(cors());
app.use(express.json());

// Get Data for user
app.get('/clock/:userEmail', async (req, res) => {
    const { userEmail: user_email } = req.params; //Destructuring Example
    try {
        const clock = await pool.query('SELECT * FROM clock WHERE user_email = $1', [user_email]);
        res.json(clock.rows)

    } catch (err) {
        console.error(err);
    }
})

//POST data for user

app.post('/clock', (req, res) => {
    const { user_email, small_reward_time, big_rewards_time, small_rewards, big_rewards } = req.body;
    console.log(user_email);
    const id = "3"; // Fix the database to accept UUID on the is section
    try {
        pool.query(`INSERT INTO clock (id, user_email, small_reward_time, big_rewards_time, small_rewards, big_rewards)
        VALUES ($1, $2, $3, $4, $5, $6)`, [id, user_email, small_reward_time, big_rewards_time, small_rewards, big_rewards])
    }
    catch (err) {
        console.log(err);
    }
});


app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`))

