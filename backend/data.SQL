CREATE DATABASE timeflow_db;

CREATE TABLE clock(
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255),
    small_reward_time INT,
    big_rewards_time INT

);

CREATE TABLE users(
   user_email VARCHAR(255),
   hashed_password VARCHAR(255) 
);
