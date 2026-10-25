# Codebook

Codebook is an Express app for saving code snippets and notes.

## Deploy on Render

1. Push this project to a GitHub repository.
2. Create a PostgreSQL database with a provider such as Neon and copy its connection string. Keep the connection string private.
3. In Render, choose **New +** → **Blueprint** and connect this repository.
4. When prompted for `DATABASE_URL`, paste the database connection string directly into Render.
5. Select **Apply** and wait for the service to finish deploying. The app creates its table at startup.

## Run locally

1. Install Node.js and PostgreSQL.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and set the local PostgreSQL credentials.
4. Run `npm start` and open `http://localhost:3000`.

The app creates the `users_content` table automatically when it connects to the database.
