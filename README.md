# B2B Marketplace - Frontend

This is the frontend of the mini B2B marketplace built using **React + TypeScript + Vite**.

## 🚀 Features

- List manufacturers
- Search by name, city, or category
- Filter using dropdown
- Manufacturer detail page
- Admin panel (Add/Edit/Delete)
- Login authentication using JWT
- Protected `/admin` route
- Clean UI with centered layout

---

## 🛠️ Tech Stack

- React + Vite
- TypeScript
- Axios
- React Router

---

## 📦 Installation

cd frontend
npm install
▶️ Run Locally
npm run dev
Access: http://localhost:5173

🌐 Environment Variables
Create a .env file in frontend/ with:

VITE_API_BASE_URL=http://localhost:8000
Replace with your Render backend URL after deployment.

🔐 Dummy Login
Username: admin
Password: admin123

🧪 Pages
/ → Homepage (public)

/manufacturer/:id → Manufacturer details

/login → Login page

/admin → Admin panel (protected)