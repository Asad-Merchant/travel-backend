# ✈️ Travel Booking Website - Backend

This is the backend for the Travel Booking Website, built using **Node.js, Express.js, and MongoDB**. It handles user authentication, package management, bookings, payments (Razorpay), and email notifications.

## 🚀 Features

- **Package Management**: Add and delete travel packages.
- **Booking System**: Users can book travel packages with email OTP verification.
- **Payment Gateway**: Integrated **Razorpay** for handling online transactions.
- **Admin Panel**: View, manage bookings, and generate PDFs for bookings.
- **Image Uploads**: Uses **Multer** and **Cloudinary** for file handling.
- **Secure API**: Implements authentication and authorization using JWT.

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** & **Mongoose**
- **JWT Authentication**
- **Razorpay Payment Gateway**
- **Multer & Cloudinary** (for image uploads)
- **Nodemailer** (for OTP verification and booking emails)

## 📂 Installation & Setup

### Prerequisites
- Install **Node.js** and **MongoDB**.
- Get API keys for **Razorpay** and **Cloudinary**.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/travel-backend.git
   cd travel-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add the required environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   GMAIL_ACCOUNT=your_email
   GMAIL_ACCOUNT_PASS_KEY=your_pass_key
   ```
4. Start the server:
   ```bash
   npm start
   ```

## Deployment
The backend is deployed on **Render**.

## 🔗 Frontend Repository
Frontend of this project is available at:
- **Frontend Repository:** [GitHub Link](https://github.com/Asad-Merchant/travel-frontend)
- **Admin Repository:** [GitHub Link](https://github.com/Asad-Merchant/travel-admin)

## License
This project is licensed under the **MIT License**.

---
Feel free to modify and enhance this backend as needed. Happy coding! ✈️🚀
