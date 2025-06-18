"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Simplified fadeInUp variant
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
};

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-full h-full bg-gradient-to-tr from-primary-500 to-primary-700 opacity-20 animate-gradient-slow"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 py-24 text-center">
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          YOUR-MP4
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl md:text-2xl max-w-2xl mb-10"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          Upload & share videos with ease. Powerful, secure, and blazing fast streaming for everyone.
        </motion.p>

<motion.div
  className="flex flex-wrap justify-center gap-6"
  variants={fadeInUp}
  initial="hidden"
  animate="visible"
>
  {/* Log In */}
  <Link href="/login">
    <div className="group relative inline-block px-8 py-3 text-lg font-medium overflow-hidden rounded-lg bg-primary-600 hover:bg-primary-700">
      <span className="relative z-10">Log In</span>
      <span className="absolute inset-0 bg-white opacity-10 transform scale-0 group-hover:scale-100 transition-transform duration-500" />
    </div>
  </Link>

  {/* Sign Up */}
  <Link href="/register">
    <div className="group relative inline-block px-8 py-3 text-lg font-medium overflow-hidden rounded-lg border-2 border-primary-400 hover:border-primary-500">
      <span className="relative z-10 text-primary-400 group-hover:text-primary-500">Sign Up</span>
      <span className="absolute inset-0 bg-primary-400 opacity-20 transform scale-0 group-hover:scale-100 transition-transform duration-500" />
    </div>
  </Link>

  {/* Explore Gallery */}
  <Link href="/upload-video">
    <div className="inline-block px-8 py-3 text-lg font-medium rounded-lg bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 transition">
      See Our Videos
    </div>
  </Link>
</motion.div>

      </section>

      {/* Features Section */}
      <section className="relative z-10 bg-gray-900 py-20 px-6">
        <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-3">
          {[
            { title: 'Instant Uploads', text: 'Drag & drop any video, any format – we handle the rest.' },
            { title: 'Bulletproof Security', text: 'End-to-end encryption ensures only you control access.' },
            { title: 'Ultra Fast CDN', text: 'Global streaming with minimal buffering—everywhere.' }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="card group p-6 hover:scale-105 transition-transform duration-300"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-2xl font-semibold mb-4 group-hover:text-primary-500 transition-colors">{item.title}</h2>
              <p className="text-gray-300">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 py-6 text-center text-gray-500">
        &copy; {new Date().getFullYear()} YOUR-MP4. All rights reserved.
      </footer>
    </main>
  );
}
