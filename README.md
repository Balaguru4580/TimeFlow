# Timeflow

Timeflow is a simple timer app designed with psychology-based incentive features to help users stay motivated while managing their time. It uses positive reinforcement and rewards to encourage productive habits.

## Project Structure

This project contains two main folders:

* **frontend**: Contains the front-end code for the user interface of the app.
* **backend**: Contains the back-end code that manages the server, database, and other functionalities.

Nginx is used to server as a reverse proxy for the front and backend.

---

### Run with Docker (recommended)

To run the full app (frontend, backend, and database) using Docker:

```bash
docker compose up --build
```

Then open your browser at localhost, at port 8080. This can be changed in the nginx entry within docker-compose.yml

> Docker will automatically start all services (frontend, backend, database, and Nginx).

To stop everything:

```bash
docker compose down
```

---

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

---

## Database Setup

Timeflow uses PostgreSQL to store user and reward data.

* With **Docker**, the database runs automatically as a container.
* For **local setup**, you’ll need to install PostgreSQL manually on your PC and configure the environment variables in a `.env` file.
