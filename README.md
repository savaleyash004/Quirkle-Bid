# Qirkle-Bid Auction Website (MERN Stack)

A full-featured online auction platform built with the MERN stack (MongoDB, Express, React, Node.js) supporting real-time bidding, user authentication, admin panel, Stripe payments, and image uploads via Cloudinary.

---

## 🚀 Features

- **User Authentication:** Register, login, password reset, JWT-based sessions
- **Auction Management:** Create, edit, delete, and view auctions
- **Real-Time Bidding:** Live updates with Socket.io
- **Profile & Account:** User profile, account settings, password change
- **Admin Panel:** Manage users, auctions, categories, analytics
- **Notifications:** Real-time bid and system notifications
- **Payments:** Stripe integration for secure payments
- **Image Uploads:** Cloudinary integration for auction images
- **Responsive UI:** Built with React, Tailwind CSS, and Vite

---

## 🗂️ Project Structure

```
Auction-website-MERN-Stack-main/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   ├── db/
│   │   ├── app.js
│   │   ├── index.js
│   │   └── ...
│   ├── package.json
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── admin/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── ...
│   ├── package.json
│   └── ...
└── README.md
```

---

## ⚙️ Setup & Installation

### 1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/auction-website-mern.git
cd auction-website-mern
```

### 2. **Backend Setup**
```bash
cd backend
npm install
# Create a .env file with your MongoDB, JWT, and Cloudinary credentials
npm start
```

#### **.env Example**
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
STRIPE_KEY=your_stripe_key
```

### 3. **Frontend Setup**
```bash
cd ../frontend
npm install
npm run dev
```

---

## 🌐 Deployment

- **Frontend:** Deploy to [Render](https://render.com/), Vercel, or Netlify.
- **Backend:** Deploy to [Render](https://render.com/) or Heroku.
- **Environment Variables:** Set all secrets in your deployment dashboard.

---

## 🖼️ File Uploads (Cloudinary)

- Uses `multer.memoryStorage()` for file uploads (no disk storage needed).
- Images are uploaded as buffers and converted to base64 for Cloudinary.
- **Field name for image upload must be `"image"`** in FormData.

---

## 🔒 Authentication

- JWT tokens are stored in HTTP-only cookies.
- Redux state manages user session on the frontend.
- Protected routes use custom React components and backend middleware.

---

## 🛠️ Troubleshooting

### **File Uploads Not Working?**
- Make sure you use `FormData` and append the file as `"image"`.
- Do **not** set the `Content-Type` header manually in axios.
- Backend route must use `upload.single("image")`.
- Check backend logs for `req.file` and `req.body`.

### **Authentication Issues?**
- Ensure cookies are set with `withCredentials: true` in axios.
- CORS must allow your frontend domain in the backend.
- JWT secret and cookie settings must match between frontend and backend.

---

## 👨‍💻 Main Technologies

- **Frontend:** React, Redux Toolkit, Vite, Tailwind CSS, Socket.io-client, Stripe
- **Backend:** Node.js, Express, MongoDB, Mongoose, Socket.io, Multer, Cloudinary, Stripe, JWT
- **Deployment:** Render, Vercel, Netlify

---

