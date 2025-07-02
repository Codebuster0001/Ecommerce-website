
# 🛍️ Shopy – Modern E-commerce Platform (Monorepo)

> A sleek, scalable, and real-world-ready e-commerce solution featuring a modern **React frontend** and **Node.js/Express backend**. Built with **Redux Toolkit**, **Tailwind CSS**, **Razorpay**, and more.

<br/>

<div align="center">

[🌐 Live Demo](https://shopyfrontend.vercel.app) • [📦 Installation](#-install--setup) • [🚀 Features](#-features)

</div>

---

## 📁 Project Structure

```bash
Ecommerce-website/
├── backend/     # Node.js + Express backend API
└── frontend/    # React + Redux + TailwindCSS frontend
```

---

## 🔥 Overview

**Shopy** is a full-stack, feature-rich e-commerce web app tailored for modern businesses and personal projects.

### 🌟 Core Highlights

* 🔐 JWT Authentication with secure cookies
* 💳 Razorpay integration for real payments
* 🧾 Invoice generation (PDF) & order export (CSV)
* 📈 Admin dashboard for real-time management
* 🛍️ Product filtering and category system
* 📱 Fully responsive design

---

## 🚀 Live Demo

> Hosted on **Vercel**

🔗 [https://shopyfrontend.vercel.app](https://shopyfrontend.vercel.app)

---

## 📦 Install & Setup

### 🧾 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Ecommerce-website-1.git
cd Ecommerce-website
```

### 🛠 2. Setup Backend

```bash
cd backend
npm install
```

📁 Create a `.env` file in the `backend/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

▶️ Start the backend:

```bash
npm run dev  # or use `npm start` for production
```

> Backend runs on [http://localhost:5000](http://localhost:5000)

---

### 💻 3. Setup Frontend

```bash
cd ../frontend
npm install
```

▶️ Start the frontend:

```bash
npm run dev
```

> Frontend runs on [http://localhost:5173](http://localhost:5173) (Vite default)

---

## ✨ Features

| Feature                   | Description                                           |
| ------------------------- | ----------------------------------------------------- |
| 🔐 **JWT Authentication** | Secure login/signup with token + cookies              |
| 💳 **Razorpay Payments**  | Real-time Razorpay payment gateway integration        |
| 🧾 **PDF Invoices**       | Auto-generated invoices using `jsPDF` & `html2canvas` |
| 📊 **CSV Export**         | Admin-only order export in CSV format                 |
| 📈 **Admin Dashboard**    | Track orders, users, and products dynamically         |
| 🛍️ **Product Filtering** | Filter by brand, size, gender                         |
| 🎨 **Responsive Design**  | Tailwind CSS with light/dark mode support             |
| 📱 **Mobile Optimized**   | Works seamlessly across all devices                   |

---

## 🧱 Tech Stack

### 💻 Frontend

* ⚛️ React
* 🛠 Redux Toolkit
* 💨 Tailwind CSS
* 🎞 Framer Motion
* 📄 jsPDF, html2canvas

### 🖥 Backend

* 🚀 Node.js & Express.js
* 🗄 MongoDB & Mongoose
* ☁️ Cloudinary (file uploads)
* 💳 Razorpay API

---

## 💡 Challenges Tackled

* 🔐 Auth flow + protected routes
* 💳 End-to-end payment handling
* 🧾 Cross-browser PDF generation
* 📤 Data export with encoding
* 📱 Maintaining responsive design

---

## 🎓 Key Learnings

* 🔁 Real-world Razorpay & Cloudinary integration
* 📄 Frontend PDF/CSV generation best practices
* ⚙️ Modular architecture using Redux Toolkit
* 🎨 Component reuse & abstraction
* 🧩 Managing real-time admin data

---

## 👨‍💻 Author & Role

**Full Stack Developer** — [Codebuster0001](https://github.com/Codebuster0001)
Designed and implemented the entire platform from scratch including:

* Frontend UI/UX & state management
* Backend REST APIs & database schema
* Secure authentication & payments
* PDF and CSV generation features
* Deployment on Vercel (frontend) and Render (backend)

---

## 🤝 Contributing

All contributions are welcome!
Follow these steps to contribute:

```bash
# 1. Fork the project
# 2. Create a new branch
git checkout -b feature/YourFeature

# 3. Commit your changes
git commit -m "Add your feature"

# 4. Push the changes
git push origin feature/YourFeature

# 5. Open a Pull Request
```

---

## 📄 License

Released under the **MIT License**
© 2025 [Codebuster0001](https://github.com/Codebuster0001)

