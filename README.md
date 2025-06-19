# 🎬 YOUR‑MP4

**YOUR‑MP4** is a modern, responsive video‑sharing platform built with Next.js App Router. Users can sign up, log in, upload videos with custom thumbnails (via ImageKit), and browse a public gallery. Authentication is powered by NextAuth, storage via MongoDB, and uploads handled securely on the client and server.

🌐 **Live App:**  
👉 [https://your-mp-4.vercel.app/](https://your-mp-4.vercel.app/)

---

## 🚀 Features

- **User Authentication**
  - Sign up / log in with email & password (NextAuth + CredentialsProvider)
  - Protected upload page; public gallery viewable by everyone

- **Video Upload & Management**
  - ImageKit client‑side upload with token‑based authentication (no private key on client)
  - Progress indicators, file‑type/size validation

- **Public Gallery**
  - Responsive grid of videos with **poster thumbnails** that disappear on play
  - Infinite scroll or pagination (future enhancement)

- **Modern UI**
  - Tailwind v4 CSS‑first styling with dark theme
  - Framer Motion animations on landing page
  - Reusable components: cards, buttons, forms

- **Backend**
  - Next.js “App Router” API routes for auth, upload‑auth, and video CRUD
  - MongoDB via Mongoose for video metadata storage
  - Secure server‑side ImageKit auth endpoint

---

## ⚙️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **Auth:** NextAuth.js (JWT strategy, Credentials provider)
- **Database:** MongoDB Atlas + Mongoose
- **Uploads:** ImageKit.io (`@imagekit/next`)
- **Animations:** Framer Motion
- **Language:** TypeScript
- **Deployment:** Vercel

---

## 📸 Screenshots

![image](https://github.com/user-attachments/assets/957c4c8c-6c49-47d8-a8c6-d70794618eb2)
![image](https://github.com/user-attachments/assets/d909bf33-0489-446a-bcfe-1d47052390fb)
![image](https://github.com/user-attachments/assets/f1adb3e6-2fb2-4874-a37c-66839663c2fd)

---

