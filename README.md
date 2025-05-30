# 🛒 Grocery Store – Modern Online Grocery Store (MERN Stack)

[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D14-green?logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-%3E%3D16.8-blue?logo=react)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-%3E%3D5-green?logo=mongodb)](https://mongodb.com/)
[![Express](https://img.shields.io/badge/Express-%3E%3D4-yellow?logo=express)](https://expressjs.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5-purple?logo=bootstrap)](https://getbootstrap.com/)

---

**Grocery Store** is a modern, full-featured e-commerce web app for online grocery shopping, built with the MERN stack. It offers a seamless shopping experience for users and a powerful admin dashboard for store management.

---

## 🚀 Features

- Product listing with pagination
- Category-based filtering
- **Keyword-based search** 🔍 (newly added feature)
- Voice-enabled search (microphone icon in search bar)
- Dark/Light mode toggle
- Add to cart and wishlist
- Checkout and order confirmation flow
- Admin panel for managing products/orders

---

## 🛠️ Technologies Used

- **Frontend:** React.js, Bootstrap 5 (or Tailwind CSS)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (or MySQL)
- **Other:** REST API, Postman, JWT/Auth, .env for secrets

---

## 🆕 New Feature: Search Products by Keyword

- Instantly search for products by name, brand, category, or description from the header.
- Implemented in [`Header.js`](./frontend/src/components/Header.js), [`HomeScreen.js`](./frontend/src/screens/HomeScreen.js), and [`productController.js`](./backend/controllers/productController.js)
- Automatically redirects to `/search/:keyword` and filters products using regex.

```js
// Example backend filtering (productController.js)
const keyword = req.query.keyword
  ? {
      $or: [
        { name: { $regex: req.query.keyword, $options: 'i' } },
        { brand: { $regex: req.query.keyword, $options: 'i' } },
        { category: { $regex: req.query.keyword, $options: 'i' } },
        { description: { $regex: req.query.keyword, $options: 'i' } },
      ],
    }
  : {};
```

---

## 📸 Screenshots

![Search Demo](frontend/public/images/surf.jpg)

---

## 🚀 Deployment Instructions

1. **Clone the repo:**
   ```bash
   git clone https://github.com/yourusername/grocery-store.git
   cd grocery-store
   ```
2. **Install dependencies:**
   ```bash
   npm install
   cd frontend && npm install
   cd ..
   ```
3. **Setup environment variables:**
   Create a `.env` file in the root and add:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PAYPAL_CLIENT_ID=your_paypal_client_id
   ```
4. **Run the app:**
   ```bash
   npm run dev
   ```
   The frontend runs on [http://localhost:3000](http://localhost:3000) and backend on [http://localhost:5000](http://localhost:5000).

---

## 👨‍💻 Author

**Gyan Chandra**  
Reliance Foundation Scholar | IIITDM Kancheepuram

---

## 🌐 Live Demo

[Live Demo Link](https://your-live-demo-link.com)

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

