# JLabs Assessment — IP Geolocation App (API + React)

A two-repo sample that demonstrates **auth + routing + IP geolocation** with a clean, centered UI.

- **Backend**: `jlabs_api_auth` (Node/Express + SQLite)  
  Exposes `POST /api/login` with a **seeded user** and **JWT** auth.
- **Frontend**: `jlabs_web` (React + Vite)  
  Login → protected Home → **your IP geolocation** on load → **search by IP** with validation → **history** (click to reload, delete selected, clear all) → **Leaflet map** that **auto recenters** on search/clear → **Logout**.

---

## ✨ Features

- **Authentication**
  - Login against SQLite user (seeded).
  - Returns JWT (2h); stored in `localStorage` for this demo.
  - Protected routes; logout clears token.

- **Home**
  - Detects your **public IP** via `https://api.ipify.org?format=json`.
  - Geolocates any IP via `https://ipinfo.io/<ip>/geo`.
  - Validates IPv4/IPv6 using `is-ip` (named exports).
  - **History** in `localStorage` (cap 50): click to reload, **Delete selected**, **Clear all**.
  - **Map** (Leaflet) with marker that **auto-recenters** on each search/clear.

---

## 🧱 Tech Stack

- **API**: Node.js (LTS 22), Express, SQLite3, bcrypt/bcryptjs, jsonwebtoken, CORS, dotenv  
- **Web**: React (Vite), React Router, Axios, `is-ip` (named exports), Leaflet (`react-leaflet`)  
- **Tools**: Postman, `nodemon`, optional `nvm` pinning

---