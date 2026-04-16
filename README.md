# HelloWorld

A live collaborative name board where anyone can drop their name and see others appear in real time.

**Live:** [hello-world-samsad.web.app](https://hello-world-samsad.web.app/)

## What It Does

- Submit your name via a simple input form
- See all names update in real time across every connected client
- Toggle between light and dark themes (persisted in localStorage)
- Color-coded avatar initials and timestamps for each entry

## Tech Stack

- **Frontend:** Vanilla HTML/CSS/JS (no build step)
- **Styling:** Bootstrap 5.3.3 (CDN)
- **Database:** Firebase Firestore (real-time sync)
- **Hosting:** Firebase Hosting

## Project Structure

```
firebase-names-app/
  index.html      # Single-page app with inline Firebase logic
  app.js          # Theme toggle (light/dark mode)
  style.css       # Custom styles on top of Bootstrap
  firebase.json   # Firebase Hosting config
  DEPLOY.md       # Deployment guide
```

## Run Locally

No build tools needed. Open `index.html` in a browser, or serve it with any static server:

```bash
npx serve .
```

Firestore reads/writes work directly from the browser via the Firebase SDK (loaded from CDN).

## Deploy

```bash
firebase login
firebase deploy --only hosting
```

See [DEPLOY.md](DEPLOY.md) for the full deployment guide including Firestore security rules.

## How It Works

The app connects to a Firestore `names` collection using `onSnapshot` for real-time updates. When a user submits a name, it's written to Firestore with a server timestamp, and every connected client receives the update instantly -- no polling, no refresh needed.
