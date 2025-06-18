# YOUR‑MP4

**YOUR‑MP4** is a modern, responsive video‑sharing platform built with Next.js App Router. Users can sign up, log in, upload videos with custom thumbnails (via ImageKit), and browse a public gallery. Authentication is powered by NextAuth, storage via MongoDB, and uploads handled securely on the client and server.

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
- **Styling:** Tailwind CSS v4 (CSS‑first, custom properties)
- **Auth:** NextAuth.js (JWT strategy, Credentials provider)
- **Database:** MongoDB Atlas + Mongoose
- **Uploads:** ImageKit.io (`@imagekit/next`)
- **Animations:** Framer Motion
- **Language:** TypeScript
- **Deployment:** Vercel (static + serverless functions)

---

## 📦 Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/your‑org/your‑mp4.git
   cd your‑mp4
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. **Configure environment variables**
   Create a `.env.local` at project root:

   ```env
   # NextAuth
   NEXTAUTH_SECRET=<a-strong-random-string>
   NEXTAUTH_URL=http://localhost:3000

   # MongoDB
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/your‑db?retryWrites=true&w=majority

   # ImageKit
   IMAGEKIT_PRIVATE_KEY=private_<your_private_key>
   NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=public_<your_public_key>
   NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/<your_imagekit_id>
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   Visit `http://localhost:3000` to see the landing page.

## 🌟 Future Enhancements

- Pagination or infinite scroll for gallery
- Video transcoding / multiple resolutions
- User profiles & video analytics
- Like / comment features
- Dark/light mode toggle

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your‑feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to your branch: `git push origin feat/your‑feature`
5. Open a pull request

Please keep code style consistent and add tests for new functionality.
