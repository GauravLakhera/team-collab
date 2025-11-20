
````md
# Team Collab Task Manager – Frontend

This is the **frontend** for the Team Collab Task Manager application, built with:

- **Next.js (App Router)**
- **Tailwind CSS**
- **Axios**
- Communicates with a backend made using **Node.js + Express + Mongoose**

The app allows you to:

✔ Create Boards  
✔ View Boards  
✔ Create Tasks inside a Board  
✔ Update Task Status  
✔ Update Task Priority  
✔ Delete Tasks  
✔ Clean UI with Tailwind CSS  

---

## 🌐 Live URLs

### **Frontend (Live URL)**
👉 https://team-collab-delta.vercel.app/

### **Backend API (Live URL)**
👉 https://team-collab-backend-fibv.onrender.com/


---

## 1. Install dependencies

```bash
npm install
# or
yarn install
````

---

## 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Your Axios instance (in `/lib/api.js`) will use this value.

---

## 3. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open your browser at:

👉 **[http://localhost:5000](http://localhost:5000)**

---

## 📁 Project Structure

```
app/
 ├── page.js                // Board listing page
 ├── board/[id]/page.js     // Board details + tasks
components/                 // UI components (if any)
lib/
 └── api.js                 // Axios API instance
public/                     // Static assets
styles/
 └── globals.css            // Tailwind base styles
```

---

## 🛠 Tech Stack

### Frontend

* Next.js 13+ (App Router)
* Tailwind CSS
* Axios
* React Hooks

### Backend (Separate Repository)

* Node.js
* Express.js
* MongoDB + Mongoose

---

## 🔌 API Endpoints (Used by Frontend)

### Boards

| Method | Endpoint  | Description        |
| ------ | --------- | ------------------ |
| GET    | `/boards` | Get all boards     |
| POST   | `/boards` | Create a new board |

### Tasks

| Method | Endpoint                | Description                                 |
| ------ | ----------------------- | ------------------------------------------- |
| GET    | `/boards/:id/tasks`     | Get tasks for a specific board              |
| POST   | `/tasks/:boardId/tasks` | Create task under board                     |
| PUT    | `/tasks/:taskId`        | Update task fields (status, priority, etc.) |
| DELETE | `/tasks/:taskId`        | Delete a task                               |

---

## 📦 Build for Production

```bash
npm run build
npm start
```

The app will compile optimized production assets.

