# 🔥 NameDrop — Firebase Deployment Guide
> Get this app live in under 10 minutes

---

## STEP 0 — Prerequisites

```bash
# Install Node.js (if not already installed)
# → https://nodejs.org  (LTS version)

# Install Firebase CLI globally
npm install -g firebase-tools

# Verify installation
firebase --version
```

---

## STEP 1 — Create Firebase Project

1. Go to **https://console.firebase.google.com**
2. Click **"Add project"**
3. Name it: `namedrop` (or anything you like)
4. Disable Google Analytics (optional, not needed)
5. Click **"Create project"** → Wait ~30 seconds

---

## STEP 2 — Enable Firestore

1. In your project console → left sidebar → **"Firestore Database"**
2. Click **"Create database"**
3. Choose **"Start in test mode"** ← allows reads/writes without auth
4. Select a region (pick closest to you, e.g., `us-central`)
5. Click **"Enable"**

> ⚠️ **Test mode security rule** (auto-applied):
> ```
> rules_version = '2';
> service cloud.firestore {
>   match /databases/{database}/documents {
>     match /{document=**} {
>       allow read, write: if request.time < timestamp.date(2025, 12, 31);
>     }
>   }
> }
> ```
> Fine for prototyping. Lock it down before production (see STEP 7).

---

## STEP 3 — Enable Firebase Hosting

1. In your project console → left sidebar → **"Hosting"**
2. Click **"Get started"**
3. Skip the CLI steps shown (we'll do it ourselves)
4. Click through until **"Continue to console"**

---

## STEP 4 — Get Your Firebase Config

1. In Firebase Console → **Project Settings** (gear icon ⚙️, top left)
2. Scroll down to **"Your apps"** section
3. Click **"</>"** (Web) icon → Register app
4. App nickname: `namedrop-web` → Click **"Register app"**
5. Copy the `firebaseConfig` object. It looks like:

```javascript
const firebaseConfig = {
  apiKey:            "AIzaSy...",
  authDomain:        "namedrop-xxxxx.firebaseapp.com",
  projectId:         "namedrop-xxxxx",
  storageBucket:     "namedrop-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId:             "1:123456789012:web:abc123def456"
};
```

6. **Paste this config into `index.html`** — find the comment:
   ```
   // ─── 🔑 YOUR FIREBASE CONFIG ────
   ```
   Replace the placeholder values with your real config.

---

## STEP 5 — Configure the .firebaserc

Create a `.firebaserc` file in your project folder:

```json
{
  "projects": {
    "default": "YOUR_PROJECT_ID"
  }
}
```

Replace `YOUR_PROJECT_ID` with your actual Firebase project ID
(e.g., `namedrop-xxxxx` — same as what's in `projectId` in your config).

---

## STEP 6 — Deploy 🚀

```bash
# 1. Open terminal in your project folder (where index.html lives)
cd /path/to/firebase-names-app

# 2. Login to Firebase
firebase login
# → Opens browser → Sign in with your Google account

# 3. Initialize project (if first time)
firebase use --add
# → Select your project from the list
# → Give it alias: default

# 4. Deploy!
firebase deploy --only hosting

# ✅ You'll see:
# Hosting URL: https://namedrop-xxxxx.web.app
```

Your app is now **live** at:
- `https://YOUR_PROJECT_ID.web.app`
- `https://YOUR_PROJECT_ID.firebaseapp.com`

---

## STEP 7 — Lock Down Firestore (Before Going Public)

Replace test mode rules with proper rules in **Firestore → Rules**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /names/{docId} {
      // Anyone can read names
      allow read: if true;

      // Anyone can create — but validate the data
      allow create: if
        request.resource.data.keys().hasAll(['name', 'createdAt']) &&
        request.resource.data.name is string &&
        request.resource.data.name.size() > 0 &&
        request.resource.data.name.size() <= 60;

      // Nobody can update or delete
      allow update, delete: if false;
    }
  }
}
```

Click **"Publish"** to apply.

---

## STEP 8 — Redeploy After Changes

```bash
# Edit files, then:
firebase deploy --only hosting

# To see deploy history:
firebase hosting:channel:list
```

---

## 📁 File Structure

```
firebase-names-app/
├── index.html      ← Main app (Firebase SDK + logic inline)
├── style.css       ← Styles (glassmorphism, themes)
├── app.js          ← Theme toggle (light/dark)
├── firebase.json   ← Hosting config
├── .firebaserc     ← Project alias (you create this)
└── DEPLOY.md       ← This guide
```

---

## 🧯 Troubleshooting

| Problem | Fix |
|---|---|
| `firebase: command not found` | Run `npm install -g firebase-tools` |
| Firestore permission denied | Make sure test mode is enabled, or check security rules |
| Names don't appear | Open browser DevTools → Console → check for errors |
| App shows blank page | Check that your `firebaseConfig` values are correct in `index.html` |
| `ENOENT firebase.json` | Make sure you're in the right directory |

---

## 🔗 Quick Links

- Firebase Console: https://console.firebase.google.com
- Firebase Hosting docs: https://firebase.google.com/docs/hosting
- Firestore docs: https://firebase.google.com/docs/firestore
- Firebase CLI reference: https://firebase.google.com/docs/cli
