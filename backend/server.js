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

app.post('/clock', async (req, res) => {
    const { user_email, small_reward_time, big_rewards_time, small_rewards, big_rewards } = req.body;
    

    try {
        const existingRecord = await pool.query('SELECT * FROM clock WHERE user_email = $1', [user_email]);

        if (existingRecord.rows.length > 0) {
            await pool.query(`
                UPDATE clock 
                SET small_reward_time = $1, 
                    big_rewards_time = $2, 
                    small_rewards = $3, 
                    big_rewards = $4 
                WHERE user_email = $5
            `, [small_reward_time, big_rewards_time, small_rewards, big_rewards, user_email]);

            return res.status(200).json({ message: "Data updated!" });
        } else {
            const id = uuidv4();
            
            await pool.query(`
                INSERT INTO clock (id, user_email, small_reward_time, big_rewards_time, small_rewards, big_rewards)
                VALUES ($1, $2, $3, $4, $5, $6)
            `, [id, user_email, small_reward_time, big_rewards_time, small_rewards, big_rewards]);

            return res.status(201).json({ message: "Data inserted!" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed request!" });
    }
});



app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`))

