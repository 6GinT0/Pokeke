# Pokémon Battle & Collect App

**Pokémon Battle & Collect App** is a **Pokémon-style web game** built with **Vue (Vite)**. It allows users to **collect, purchase, and unlock Pokémon** through a **virtual currency system**, and play a **Pokémon guessing mini-game**.

The project features **Firebase authentication**, a customizable UI with **Primevue**, and internationalization support.

---

## 🚀 Features

### Core Gameplay & Inventory

- 🎁 **Initial unlock**: 3 random Pokémon given to new users.
- 📦 **Pokémon inventory**: Display collected Pokémon with stats.
- 💰 **Virtual currency system**: Coins for purchasing Pokémon or packs.
- ⚡ **Special button**: Unlock all content with infinite coins (premium/cheat mode).

### Mini-game

- ❓ **Guess the Pokémon**: Show silhouette and let users guess the Pokémon.
- 🏆 **Reward system**: Points or coins for correct guesses.

### Authentication & User Profile

- 🔑 **Firebase Authentication**: Email and Google sign-in.
- 👤 **User profile**: Stores inventory, coins, and progress in Firebase.

---

## 📂 Technologies Used

- [Vue](https://vuejs.org/) - Frontend framework
- [Vite](https://vitejs.dev/) - Development tooling
- [PrimeVue](https://primevue.org/) - UI styling + TailwindCSS
- [Firebase](https://firebase.google.com/) - Authentication & database

---

## 📦 Installation & Usage

### 1. Clone the repository

```bash
git clone https://github.com/6GinT0/Pokeke.git
```

### 2. Navigate to the project directory

```bash
cd Pokeke
```

### 3. Install dependencies

```bash
npm install
```

### 4. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Enable **Authentication** (Email/Password and Google Sign-In).
3. Create a **Firestore Database** and set rules according to your needs.
4. Copy your Firebase config and paste it into `.env.local` (see `.env.dist` as reference).

### 6. Start the development server

```bash
npm run dev
```

### 7. Open in your browser

[http://localhost:5173](http://localhost:5173)

---

## 📸 Preview

![Screenshot](https://via.placeholder.com/800x400.png?text=Pok%C3%A9mon+Battle+%26+Collect+App+Screenshot)

---

## 🤝 Contribution

If you want to contribute to **Pokémon Battle & Collect App**, please:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/new-feature`)
3. Make your changes and commit (`git commit -m 'Add new feature'`)
4. Submit a pull request

---

## 📄 License

This project is licensed under the **MIT License**. You are free to use, modify, and distribute it.

---

Developed with ❤️ by Ulises
