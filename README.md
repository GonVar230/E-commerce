# 🏆 Vintage Jerseys

E-commerce of vintage football jerseys built with React and Firebase.

---

## 📋 Project Description

Vintage Jerseys is an online store for vintage football jerseys that allows users to explore, filter and purchase historical jerseys from iconic national teams and clubs around the world.

---

## 🛠️ Tools & Technologies

- **React** — Main library for building the UI
- **Vite** — Bundler and development environment
- **React Router DOM** — Navigation and routing
- **Firebase / Firestore** — Database for products and orders
- **Bootstrap Icons** — UI iconography
- **Context API** — Global cart state management
- **Custom Hooks** — Business logic separation from components

---

## 📁 Project Structure
src/

├── Components/     # UI components (Cart, Checkout, Payment, NavBar, etc.)

├── Context/        # CartContext and useCart hook

├── hooks/          # Custom hooks (useCheckout, useItemDetail, usePayment, useSearchBar)

├── service/        # Firebase configuration

└── App.jsx         # Main app with routes

---

## 🚀 Installation & Usage

This project uses environment variables for Firebase. Create a `.env` file in the root with:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

```bash
npm install
npm run dev
```

---

## ✨ Features

- 🔍 Real-time search by player or team with suggestions
- 🗂️ Filter by category and confederation
- 🛒 Shopping cart with stock control per size
- 💳 Payment simulation (Visa, MercadoPago, Bank Transfer, PayPal)
- 🔥 Firebase Firestore integration for products and orders

---

## 👤 Author

**Gonzalo Varela**  
GitHub: [@GonVar230](https://github.com/GonVar230)  
Repository: [https://github.com/GonVar230/E-commerce](https://github.com/GonVar230/E-commerce)

---

## 📄 License

Project developed for educational purposes at CoderHouse.
