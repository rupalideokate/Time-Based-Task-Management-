# Express + MySQL Starter

A minimal Node.js/Express backend connected to a local MySQL database, with a working `users` CRUD example.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create the database**
   Run the SQL in `schema.sql` against your local MySQL server (via MySQL Workbench, `mysql` CLI, or any client):
   ```bash
   mysql -u root -p < schema.sql
   ```

3. **Configure environment variables**
   Copy `.env.example` to `.env` and fill in your local MySQL credentials:
   ```bash
   cp .env.example .env
   ```
   ```
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_password_here
   DB_NAME=your_database_name
   ```

4. **Run the server**
   ```bash
   npm start
   ```
   or, for auto-reload during development:
   ```bash
   npm run dev
   ```

5. **Verify it's working**
   - `GET http://localhost:3000/` → health check
   - `GET http://localhost:3000/api/users` → list users
   - `POST http://localhost:3000/api/users` with JSON body `{ "name": "Jane", "email": "jane@example.com" }` → create a user

## Project structure

```
express-mysql-app/
├── src/
│   ├── app.js                # Express app entry point
│   ├── config/db.js          # MySQL connection pool (mysql2)
│   ├── controllers/          # Route handler logic
│   └── routes/               # Route definitions
├── schema.sql                # Database + table creation
├── .env.example               # Environment variable template
└── package.json
```

## Notes

- The connection uses a **pool** (`mysql2/promise`) rather than a single connection, which is the recommended pattern for a live server.
- All queries use parameterized placeholders (`?`) to prevent SQL injection.
- On startup, the app tests the DB connection before listening on the port — if MySQL isn't reachable, it will fail fast with a clear error instead of silently starting.
