 🌾 FarmLink 360 Frontend

FarmLink 360 is a digital agriculture management platform that helps farmers manage their farms, diagnose plant diseases, and connect with other farmers.

This is the **frontend** built with **React (Vite)**, **Tailwind CSS**, and **Firebase**, integrated with the **FarmLink Flask backend API**.

---

## 🚀 Features

- 🔐 Authentication (Sign up / Login via Firebase)
- 🌱 AI Diagnosis page connected to Gemini AI backend
- 🧾 Farm records dashboard
- 📤 Cloudinary image uploads via backend
- 💬 Community feed & marketplace pages
- ⚡ Fast and modern UI using Tailwind + React Router

---

## 🧰 Tech Stack

| Category | Technology |
|-----------|-------------|
| Framework | React + Vite |
| Routing | React Router DOM |
| Styling | Tailwind CSS |
| State Management | React Hooks / Context |
| Authentication | Firebase |
| Backend API | Flask (FarmLink Backend) |
| Deployment | Vercel / Netlify |

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the project
```bash
git clone https://github.com/your-username/farm-link-frontend.git
cd farm-link-frontend
2️⃣ Install dependencies
bash
Copy code
npm install
3️⃣ Create a .env file in the root of the project
Add your Firebase and backend API configuration here:

bash
Copy code
VITE_FIREBASE_CONFIG={"apiKey":"your-api-key","authDomain":"your-app.firebaseapp.com","projectId":"your-project-id","storageBucket":"your-app.appspot.com","messagingSenderId":"your-sender-id","appId":"your-app-id"}
VITE_BACKEND_URL=http://127.0.0.1:5000
⚠️ Note:
Make sure the Firebase config is wrapped in {} (valid JSON format) and matches your Firebase project settings.

🧩 Project Structure
pgsql
Copy code
farm-link-frontend/
├── src/
│   ├── components/
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Records.jsx
│   │   ├── Diagnose.jsx
│   │   └── Community.jsx
│   ├── contexts/
│   │   └── FirebaseContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
├── vite.config.js
└── README.md
🧠 Firebase Setup Guide
Go to Firebase Console.

Create a new Firebase project (or use an existing one).

Add a Web App and copy your config (apiKey, authDomain, etc.).

Enable Authentication → Email/Password in Firebase Console.

Paste your Firebase config inside .env → VITE_FIREBASE_CONFIG.

🏃‍♀️ Running the App Locally
Start the development server:
bash
Copy code
npm run dev
Then open:

arduino
Copy code
http://localhost:5173
Build for production:
bash
Copy code
npm run build
🔗 Connecting to Backend
Your backend API (Flask) should be running locally or deployed (e.g. Render or Railway).

Update your .env file with the backend URL:

bash
Copy code
VITE_BACKEND_URL=https://your-backend.onrender.com
The frontend will then automatically connect to that API for features like:

Record management

AI diagnosis

Cloudinary uploads

🧩 Common Issues
Issue	Fix
App reloads after login/signup	Ensure FirebaseContext uses useNavigate() for redirects
Firebase configuration string is empty	Check .env — ensure VITE_FIREBASE_CONFIG is correctly set
Network errors to backend	Ensure backend URL in .env is correct and running

🌐 Deployment
🟢 Deploy to Vercel
Push your project to GitHub.

Go to Vercel Dashboard.

Import your repo.

Add environment variables:

VITE_FIREBASE_CONFIG

VITE_BACKEND_URL

Deploy 🚀

❤️ Credits
Developed by Maggie & Team
Frontend built with 💚 React, Tailwind, and Firebase
Backend powered by Flask + PostgreSQL + Gemini
