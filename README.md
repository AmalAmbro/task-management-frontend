# React Task Management App

A simple task management frontend built with **React**

## Features

- JWT-based Login & Logout
- Task CRUD operations
- Auth-protected routes

## 🛠️ Setup Instructions

### 🔧 Prerequisites

- Node.js (v16+ recommended)
- npm (v8+)
- Backend API running (Django server with `/token/`, `/token/refresh/`, and `/tasks/` endpoints)

---

### ⚙️ Frontend Setup

sh setup.sh

This script will:

    Install all required npm packages

    Copy .env.sample to .env

## Run the app

npm run dev

## Authentication Flow

    User logs in via /token/ endpoint

    Access token is stored in localStorage

    On 401 Unauthorized, the app attempts to refresh the token using /token/refresh/

## Scripts
Script	        Description
npm install	    Installs dependencies
npm run dev	    Starts dev server
setup.sh	    One-time setup automation
