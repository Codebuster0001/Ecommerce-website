# 🛍️ Shopy – Modern E-commerce Platform (Monorepo)

> A sleek, scalable, and real-world-ready e-commerce platform – featuring a modern React frontend and Node.js/Express backend. Built with React, Redux Toolkit, TailwindCSS, Razorpay, and more.

[🌐 Live Demo](https://shopyfrontend.vercel.app) &nbsp;•&nbsp; [📦 Install](#install) &nbsp;•&nbsp; [📷 Screenshots](#screenshots) &nbsp;•&nbsp; [🚀 Features](#features)

---

## 🗂️ Project Structure

```
Ecommerce-website-1/
  ├── backend/      # Node.js/Express backend API
  └── frontend/     # React + Redux + TailwindCSS frontend
```

---

## 🔥 Overview

Shopy is a performant, modern e-commerce solution with:
- 🔐 Authentication (Login / Signup)
- 🧾 Invoices in PDF
- 💳 Razorpay payments
- 🛒 Real orders, real dashboards
- 📊 CSV export for admins

---

## 🚀 Live Demo

🌍 [https://shopyfrontend.vercel.app](https://shopyfrontend.vercel.app)

---

## 📦 Install & Setup

### 1. Clone the Repo

```bash
$ git clone https://github.com/yourusername/Ecommerce-website-1.git
$ cd Ecommerce-website-1
```

### 2. Setup Backend

```bash
$ cd backend
$ npm install
```

- Create a `.env` file in `backend/` (see `.env.example` if available) and set up your environment variables (e.g., database URI, JWT secret, Razorpay keys, etc).
- Start the backend server:

```bash
$ npm start
# or for development with auto-reload
$ npm run dev
```

> By default, backend runs on port `5000`.

### 3. Setup Frontend

```bash
$ cd ../frontend
$ npm install
```

- Start the frontend dev server:

```bash
$ npm run dev
```

> The frontend will run on port `5173` (or as configured in `vite.config.js`).

---

## ✨ Features

✅ Secure & scalable authentication system  
🎨 Responsive UI (Light/Dark) using TailwindCSS  
💳 Integrated Razorpay payment gateway  
🧾 Auto PDF invoice generation (jsPDF + html2canvas)  
📤 Export orders to CSV  
📱 Optimized for mobile and desktop  
🔄 Real-time order tracking dashboard  
🛍️ Filterable product listing by size, gender, brand

---

## 📷 Screenshots

> Make sure these images exist in your `screenshots/` folder or update their paths.

**Login Page**

![Login](https://res.cloudinary.com/dqmnflrlx/image/upload/v1751198214/portfolio/projects/dfzhuhx2iyhowpkeufvj.png)

**My Orders Page**

![Orders](https://res.cloudinary.com/dqmnflrlx/image/upload/v1751267718/portfolio/shopy-orders.png)

**User Profile Dashboard**

![Profile](https://res.cloudinary.com/dqmnflrlx/image/upload/v1751267719/portfolio/shopy-profile.png)

**Product Listing (Filterable)**

![Products](https://res.cloudinary.com/dqmnflrlx/image/upload/v1751267719/portfolio/shopy-collection.png)

**Product Page Detail Preview**

![Product Detail](https://res.cloudinary.com/dqmnflrlx/image/upload/v1751198214/portfolio/projects/dfzhuhx2iyhowpkeufvj.png)

---

## 📚 Stack

- ⚛️ React
- 🛠 Redux Toolkit
- 💨 Tailwind CSS
- 💳 Razorpay
- 📄 jsPDF, html2canvas
- 🎞 Framer Motion
- 🖥️ Node.js, Express (Backend)
- 🗄️ MongoDB (or your DB of choice)

---

## 💡 Challenges

- 🔐 Seamless Sign In / Sign Up UX
- 💳 End-to-end payment validation
- 🧾 Generating PDFs & exporting CSVs
- 📦 Real-time order listing
- 📲 Responsive consistency

---

## 🚀 Learnings

- 🔁 Deep Razorpay integration techniques
- 📄 Frontend data export best practices
- 🧠 Redux Toolkit usage in production
- ♻️ Component abstraction for scalability
- 🌍 Responsive UI design with Tailwind

---

## 🧑‍💻 Role

**Full Stack Developer** — Responsible for all UI, state logic, backend API, third-party integration (Razorpay), data export, responsiveness, and performance.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📄 License

MIT License © [Codebuster0001](https://github.com/Codebuster0001)
