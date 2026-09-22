# User Registry — Frontend

A React (Vite) interface for the Express + MySQL backend. Lists, adds, and removes entries from the `users` table via the API.

## Setup

1. **Make sure the backend is running first**, at `http://localhost:3000` (see the backend project's README).

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the dev server**
   ```bash
   npm run dev
   ```
   This starts the app at `http://localhost:5173`.

4. Open it in a browser. You should see the list of users pulled from MySQL, a form to add a new one, and a remove action on each row.

## How it talks to the backend

`src/api.js` calls the backend directly at `http://localhost:3000/api/users`. If you change the backend's `PORT` in its `.env`, update `BASE_URL` in `src/api.js` to match.

## Project structure

```
frontend/
├── index.html
├── src/
│   ├── main.jsx              # React entry point
│   ├── App.jsx                # Top-level state + data loading
│   ├── api.js                 # fetch calls to the Express API
│   ├── index.css              # design tokens + styles
│   └── components/
│       ├── AddEntryForm.jsx
│       └── Registry.jsx
└── package.json
```

## Design notes

The UI is styled like a paper ledger/register rather than a generic dashboard — a serif masthead, a single accent color, and hairline dividers instead of cards and shadows. Colors, type, and layout are all defined as CSS custom properties at the top of `src/index.css` if you want to adjust them.
