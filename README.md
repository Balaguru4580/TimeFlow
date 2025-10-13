# Timeflow
[![Build Status](https://github.com/Balaguru4580/TimeFlow/actions/workflows/docker-image.yml/badge.svg?branch=master)](https://github.com/Balaguru4580/TimeFlow/actions/workflows/docker-image.yml)

Timeflow is a simple timer app based on the Skinner Box concept. Uses psychology-based incentive features to help users stay motivated while managing their time, through positive reinforcement via customizable rewards.

## Project Structure

This project contains two main folders:

* **frontend**: Contains the front-end code for the user interface of the app.
* **backend**: Contains the back-end code that manages the server, database, and other functionalities.

Nginx is used to server as a reverse proxy for the front and backend, along with a PostgreSQL database to store user and reward data.

## Run this project

### Run with Docker (recommended)

To run the full app (frontend, backend, and database) using Docker:

```bash
docker compose up --build
```

Then open your browser at localhost, at port 80. This can be changed in the nginx entry within docker-compose.yml

> Docker will automatically start all services (frontend, backend, database, and Nginx).

To stop everything:

```bash
docker compose down
```

### Local Development (manual)

If you prefer to run locally without Docker:

1. **Frontend**
   Navigate to the `frontend` folder and run:

   ```bash
   yarn dev
   ```

   Starts the development server.

2. **Backend**
   Navigate to the `backend` folder and run:

   ```bash
   node ./server.js
   ```

   Starts the backend server.

You can find these commands in the `package.json` files.


### Production Deployment

For deploying Timeflow to a production environment (e.g. AWS EC2 or a VPS), use docker-compose.prod.yml as follows:

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

### Database Setup

* With **Docker**, the database runs automatically as a container.
* For **local setup**, you’ll need to install PostgreSQL manually on your PC and configure the environment variables in a `.env` file.
