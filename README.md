# Maisha Pesa - Multi-Role Order Management System

This is a full-featured order workflow platform for organizations where different actors participate in the lifecycle of an order. It includes:

- 🔐 Role-based access (Contractor, Broker, Investor, Sourcing Agent, Client, Admin)
- 📋 Order lifecycle management (creation → approval → funding → fulfillment)
- 🧾 Audit timeline tracking with timestamps and roles
- 💸 Revenue allocation tracking on fulfillment

---

## 📦 Tech Stack

- **Frontend:** React + TypeScript + MUI
- **Auth:** Firebase Authentication
- **Database:** Firebase Firestore
- **UI:** MUI v5+ with Timeline, Chips, and modern components

---

## 🚀 Getting Started

### 1. Clone and install

```bash
git clone https://github.com/your-username/maisha-pesa.git
cd maisha-pesa
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a project
3. Enable:
   - Firestore
   - Authentication (Email/Password)
4. Set Firestore rules like:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    match /users/{userId} {
      // Allow users to read/update their own document
      allow read, update: if request.auth.uid == userId;

      // Allow brokers and admins to list users
      allow list: if request.auth != null &&
        (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ["Admin", "Broker"]);

      // Allow get (single doc read) for brokers/admins
      allow get: if request.auth != null &&
        (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ["Admin", "Broker"]);

      // Allow anyone to create their user doc on registration
      allow create: if request.auth != null && request.auth.uid == userId;

      // Only admins can update others
      allow update: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "Admin";
    }
    match /orders/{orderId} {
      allow create, update, read: if request.auth.uid != null;
    }

    match /bids/{bidId} {
      allow create, update, read: if request.auth.uid != null;
    }

    match /tracking/{trackingId} {
      allow create, update, read: if request.auth.uid != null;
    }
  }
}

```

---

### 3. Environment Variables Setup

Add your environment variables into a `.env` file at the root:

```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

(Use the values from Firebase Console → Project Settings)

---

Paste your Firebase config:

```ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

### 4. Run the dev server

```bash
npm run dev
```

---

## 📂 Folder Structure

```
src/
│
├── admin/               # Admin module (approvals, management)
│   ├── components/      # Admin-specific UI components
│   └── pages/           # Admin-specific pages 
│
├── auth/                # Authentication module (login, register, auth context)
│   ├── components/      # Auth form components
│   ├── context/         # AuthContext provider
│   ├── hooks/           # Custom auth hooks
│   └── pages/           # Login and Register pages
│
├── order/               # Order management module
│   ├── components/      # Order-related components (Actions, Timeline, Chips)
│   ├── hooks/           # Order hooks (e.g., fetch, update)
│   ├── pages/           # Create Order, Order List, Single Order
│   └── services/        # Centralized OrderService for tracking and updates
│
├── common/              # Shared/common resources
│   ├── components/      # Shared components like Button overrides
│   ├── layouts/         # Layout wrappers like TopNav, AuthLayout
│   ├── pages/           # (If needed) Shared or fallback pages
│   ├── routes/          # Route configuration
│   ├── services/        # Firebase initialization, API utilities
│   ├── types/           # Global TypeScript types
│   └── utils/           # Helper functions
│
├── theme/               # Global MUI theming
│   ├── ThemeProvider.tsx
│   ├── components.tsx   # Theme overrides for components
│   └── theme.ts         # Custom theme definitions (colors, typography)
```

### ✅ Folder Decisions

- **`OrderService.ts`** ensures tracking is centralized and consistent.
- **Tracking** and **Revenue** are written to Firestore in structured, queryable formats.
- **UI** follows MUI design patterns using Timeline, Chips, and responsive layouts.

---

## ✅ Features

| Feature                  | Description                                                |
|--------------------------|------------------------------------------------------------|
| 🔐 Role-based login      | Contractor, Broker, Investor, Sourcing Agent, Admin, Client |
| 📋 Order lifecycle       | Broker → Contractor → Investor → Sourcing → Fulfilled     |
| 🧾 Tracking Timeline     | Shows full audit log of order status changes               |
| 💰 Revenue sharing       | On fulfillment: Contractor 20%, Broker 10%, Investor 40%, Admin 30% |
| 📊 Admin dashboard       | Revenue summary panel with total per actor                |

---
