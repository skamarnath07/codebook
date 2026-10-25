# Codebook

Codebook is an Express app for saving code snippets and notes.

## Deploy on Render

1. Push this project to a GitHub repository.
2. In Render, choose **New +** → **Blueprint** and connect that repository.
3. Render reads `render.yaml` to create the web service and PostgreSQL database. The database uses Render's `basic-256mb` plan.
4. Select **Apply** and wait for the service to finish deploying. Render supplies the database connection string as `DATABASE_URL`; the app creates its table at startup.

## Run locally

1. Install Node.js and PostgreSQL.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and set the local PostgreSQL credentials.
4. Run `npm start` and open `http://localhost:3000`.

The app creates the `users_content` table automatically when it connects to the database.
