# 🌱 FreshAm Backend API

FreshAm is an AI-powered tomato supply chain platform that connects farmers, buyers, warehouse operators, logistics providers, and administrators to reduce post-harvest tomato losses in Nigeria.

The platform combines a digital marketplace with Digital Twin technology to monitor tomato freshness, predict spoilage risks, and improve supply chain efficiency.

---

# 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Joi Validation
- Cloudinary
- Multer
- Nodemailer
- bcryptjs

---

# Current Architecture

```
Authentication
│
├── Users
│
├── Farmer Profile
│
├── Buyer Profile
│
├── Tomato Batch
│
└── Marketplace Listing
```

Upcoming Modules

```
Orders
│
Storage Booking
│
Logistics Booking
│
Payments
│
Notifications
│
Digital Twin
│
Admin Dashboard
```

---

# Project Structure

```
src/

config/

constants/

controllers/

middlewares/

models/

repositories/

routes/

services/

utils/

validators/
```

---

# Features Completed ✅

## Authentication

- User Registration
- Login
- JWT Authentication
- Email Verification (OTP)
- Resend Verification OTP
- Forgot Password
- Reset Password
- Role-based Authorization
- Secure Password Hashing

---

## User Module

- Get Current User
- Update User Profile

---

## Farmer Profile

- Create Farmer Profile
- View Farmer Profile
- Update Farmer Profile

---

## Buyer Profile

- Create Buyer Profile
- View Buyer Profile
- Update Buyer Profile

---

## Tomato Batch Module

Farmers can:

- Register Tomato Batch
- Upload Batch Image
- View Their Batches
- Update Batch Information

Tomato Batch includes:

- Batch Number
- Tomato Variety
- Grade
- Quantity
- Unit
- Harvest Date
- Expiry Date
- Farm Location
- Image
- Status

Images are uploaded to Cloudinary.

---

## Marketplace Module

Farmers can:

- Publish Tomato Batch
- Set Selling Price
- Add Description

Buyers can:

- Browse Published Listings

---

# Database Relationships

```
User
│
├── FarmerProfile
│        │
│        ▼
│   TomatoBatch
│        │
│        ▼
│ MarketplaceListing
│
├── BuyerProfile
│
├── WarehouseProfile (Upcoming)
│
└── LogisticsProfile (Upcoming)
```

---

# Authentication Flow

```
Register

↓

Verify Email

↓

Login

↓

Create Role Profile

↓

Use Platform
```

---

# API Modules

## Completed

- Authentication
- Users
- Farmer Profile
- Buyer Profile
- Tomato Batch
- Marketplace Listing

---

## In Progress

Marketplace

- Browse Listings
- Search Listings
- Filter Listings

---

# Remaining Development

## Marketplace

- Listing Details
- Search
- Filters
- Pagination

---

## Orders

- Buyer Places Order
- Farmer Accepts Order
- Farmer Rejects Order
- Order Status
- Order History

---

## Warehouse

- Warehouse Profile
- Storage Search
- Storage Booking
- Booking History

---

## Logistics

- Logistics Provider Profile
- Search Providers
- Book Transport
- Delivery Tracking

---

## Payments

- Paystack Integration
- Payment Verification
- Farmer Payout
- Transaction History

---

## Notifications

- Email Notifications
- Order Updates
- Booking Updates
- Spoilage Alerts

---

## Digital Twin (AI)

Each Tomato Batch receives a Digital Twin.

Features:

- Freshness Score
- Shelf Life Prediction
- Spoilage Risk Prediction
- AI Recommendations
- Risk Alerts

---

## Admin

- Dashboard
- User Management
- Marketplace Moderation
- Warehouse Management
- Logistics Management
- Payment Monitoring
- Reports

---

# Security

Implemented

- JWT Authentication
- Password Hashing
- Role-based Authorization
- Joi Validation
- Helmet
- CORS
- Rate Limiting (Ready)

Upcoming

- Audit Logs
- Session Timeout
- Suspicious Login Detection

---

# Environment Variables

```
PORT=

NODE_ENV=

MONGO_URI=

JWT_SECRET=

JWT_EXPIRES_IN=

EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASSWORD=

CLIENT_URL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

# Current Development Progress

| Module | Status |
|---------|--------|
| Authentication | ✅ Complete |
| Users | ✅ Complete |
| Farmer Profile | ✅ Complete |
| Buyer Profile | ✅ Complete |
| Tomato Batch | ✅ Complete |
| Marketplace Listing | ✅ Complete |
| Browse Marketplace | 🟡 In Progress |
| Orders | ⏳ Pending |
| Warehouse | ⏳ Pending |
| Logistics | ⏳ Pending |
| Payments | ⏳ Pending |
| Notifications | ⏳ Pending |
| Digital Twin | ⏳ Pending |
| Admin | ⏳ Pending |

---

# Immediate Next Sprint

1. Improve Marketplace
    - Search
    - Filter
    - Pagination

2. Order Management
    - Place Order
    - Accept Order
    - Reject Order
    - Order Tracking

3. Warehouse Module

4. Logistics Module

5. Payments

6. Digital Twin

7. Admin Dashboard

---

# Vision

FreshAm aims to become Nigeria's leading intelligent tomato supply chain platform by combining:

- Digital Marketplace
- AI-powered Digital Twin
- Smart Logistics
- Cold Storage Integration
- Secure Payments
- Real-time Supply Chain Visibility

to reduce post-harvest losses and improve farmer profitability.

## Contributors

Backend Team

Bankole Fatai Olayemi
---

## License

MIT