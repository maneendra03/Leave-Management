# LeaveFlow — Leave Management System

A production-ready **Leave Management System** built with **Vue.js 3**, **Node.js/Express**, and **MongoDB**. Features JWT authentication, role-based access control (Employee / Employer), and a premium dark-themed UI.

---

## 🏗️ Tech Stack

| Layer      | Technology                        |
| ---------- | --------------------------------- |
| Frontend   | Vue.js 3 (Composition API), Vite  |
| Styling    | Tailwind CSS 3                    |
| State      | Pinia                             |
| Backend    | Node.js, Express.js               |
| Database   | MongoDB Atlas                     |
| Auth       | JWT, bcrypt                       |
| HTTP       | Axios                             |

---

## 📁 Project Structure

```
leave-management/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/     # Business logic
│   ├── middleware/       # Auth, validation, errors
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API endpoints
│   ├── utils/           # Helpers (JWT generation)
│   ├── server.js        # Entry point
│   ├── .env.example     # Environment template
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/  # Reusable UI components
    │   ├── views/       # Page views
    │   ├── router/      # Vue Router + guards
    │   ├── stores/      # Pinia state stores
    │   ├── services/    # Axios API layer
    │   ├── App.vue
    │   ├── main.js
    │   └── style.css
    ├── tailwind.config.js
    ├── index.html
    └── package.json
```

---

## 🚀 Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone and Install

```bash
git clone <repo-url>
cd leave-management

# Backend
cd backend
cp .env.example .env   # Edit .env with your MongoDB URI and JWT secret
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure Environment Variables

Edit `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/leave-management
JWT_SECRET=your_secure_random_secret
NODE_ENV=development
```

### 3. Run

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint           | Access  | Description         |
| ------ | ------------------ | ------- | ------------------- |
| POST   | /api/auth/signup   | Public  | Register new user   |
| POST   | /api/auth/login    | Public  | Login, returns JWT  |
| GET    | /api/auth/me       | Private | Get current user    |

### Leave Management
| Method | Endpoint               | Access   | Description                 |
| ------ | ---------------------- | -------- | --------------------------- |
| POST   | /api/leave/apply       | Employee | Submit leave request        |
| GET    | /api/leave/my-leaves   | Employee | Get own leaves (paginated)  |
| GET    | /api/leave/all         | Employer | Get all leaves (paginated)  |
| PUT    | /api/leave/:id/status  | Employer | Approve or reject a leave   |
| GET    | /api/leave/stats       | Private  | Dashboard statistics        |

**Query Parameters** (for GET endpoints): `?page=1&limit=10&status=pending`

---

## 🔐 Security Features

- **JWT Authentication** with 7-day token expiry
- **bcrypt** password hashing (12 salt rounds)
- **Role-based access** (employee / employer middleware)
- **Helmet** for HTTP security headers
- **Rate limiting** (100 req/15min general, 20 req/15min auth)
- **CORS** restricted to frontend origin
- **Input validation** via express-validator
- **Password excluded** from all query responses by default

---

## ☁️ AWS EC2 Deployment

### 1. Launch EC2 Instance
- AMI: **Ubuntu 22.04 LTS** (Free Tier eligible: t2.micro)
- Security Group: Open ports **22** (SSH), **80** (HTTP), **443** (HTTPS), **5000** (API)

### 2. SSH and Install Dependencies
```bash
ssh -i your-key.pem ubuntu@<EC2_PUBLIC_IP>

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 and Nginx
sudo npm install -g pm2
sudo apt-get install -y nginx
```

### 3. Deploy Backend
```bash
# Clone or upload project
git clone <repo-url> /home/ubuntu/leave-management
cd /home/ubuntu/leave-management/backend

npm install --production

# Create production .env
nano .env
# Fill in: PORT=5000, MONGODB_URI, JWT_SECRET, NODE_ENV=production

# Start with PM2
pm2 start server.js --name leave-api
pm2 save
pm2 startup
```

### 4. Build and Deploy Frontend
```bash
cd /home/ubuntu/leave-management/frontend

# Set API URL for production
echo "VITE_API_URL=http://<EC2_PUBLIC_IP>:5000/api" > .env.production

npm install
npm run build

# Copy build to Nginx
sudo cp -r dist/* /var/www/html/
```

### 5. Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/default
```

```nginx
server {
    listen 80;
    server_name _;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo nginx -t
sudo systemctl restart nginx
```

### 6. Access
Open `http://<EC2_PUBLIC_IP>` in your browser. The app should be live!

---

## ✨ Features

- 🔑 JWT auth with role-based access
- 📊 Dashboard with leave statistics
- 📝 Leave application with date/overlap validation
- ✅ Approve/reject workflow for employers
- 📄 Pagination on all list views
- 🔍 Status filter (pending/approved/rejected)
- 🍞 Toast notifications
- ⏳ Loading skeletons
- 🌙 Premium dark theme with glassmorphism
- 📱 Fully responsive design

---

## 📝 License

MIT
