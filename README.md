🎬 Movie Recommendation App
📌 Project Overview

The Movie Recommendation App is a dynamic web application built with Next.js and TypeScript that allows users to browse trending movies and save their favorite selections.

This project demonstrates real-world frontend development skills, including API integration, dynamic routing, local data storage, reusable component design, and responsive UI implementation.

The application fetches live movie data from The Movie Database (TMDB) API and provides an interactive and seamless browsing experience.

🎯 Project Objectives

This project was developed to:

Integrate and consume data from a third-party API (TMDB)

Implement dynamic routing using Next.js

Enable user personalization through local storage

Build reusable and scalable components

Design a responsive and interactive user interface

Follow proper Git commit workflow and version control practices



🛠️ Technologies Used

Next.js – Server-side rendering and routing

TypeScript – Type safety and scalable development

Styled Components – Component-based styling

TMDB API – Fetching movie data

Local Storage – Saving user favorite movies

Vercel / Netlify – Deployment

✨ Key Features
1️⃣ API Integration

Fetches trending movies dynamically from TMDB API

Handles loading and error states properly

Displays real-time movie data

2️⃣ Dynamic Routing

Implements dynamic movie detail pages using Next.js routing

Each movie has its own dedicated page

Optimized navigation and rendering

3️⃣ Save Favorite Movies

Users can save movies to their favorites

Favorites are stored locally using browser local storage

Dedicated favorites section for easy management

4️⃣ Responsive & Interactive UI

Responsive grid layout for movie cards

Hover effects and smooth transitions

Mobile-friendly design using media queries

📂 Project Structure
movie-recommendation-app/
│
├── components/
│   ├── MovieCard.tsx
│   └── Layout.tsx
│
├── lib/
│   └── api.ts
│
├── pages/
│   ├── index.tsx
│   ├── movie/
│   │   └── [id].tsx
│   └── favorites.tsx
│
├── styles/
├── .env.local
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/favouriweala/movie-recommendation-app.git
cd movie-recommendation-app

2️⃣ Install Dependencies
npm install

3️⃣ Set Up Environment Variables

Create a .env.local file in the root directory:

NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here


You can get your API key from:
https://www.themoviedb.org/settings/api

⚠️ Do not commit your .env.local file.

4️⃣ Run the Development Server
npm run dev


Visit:

http://localhost:3000

🔄 Git Commit Workflow

This project follows a structured commit format:

feat: for new features

fix: for bug fixes

style: for styling improvements

docs: for documentation updates

Example commits:

feat: initialize Next.js project with TypeScript
feat: integrate TMDB API for fetching trending movies
feat: implement dynamic movie detail pages
feat: add functionality to save favorite movies
style: design responsive UI using Styled Components
fix: resolve rendering issues on dynamic pages
docs: add API setup and usage instructions

📊 Evaluation Criteria Coverage
✅ Functionality

Successfully fetches and displays trending movies

Implements dynamic routing for movie details

Allows saving and managing favorite movies

✅ Code Quality

Uses TypeScript for type safety

Modular and reusable components

Clean and well-structured folder organization

✅ User Experience

Responsive across devices

Smooth navigation between pages

Interactive and visually appealing movie cards

✅ Version Control

Regular, descriptive commits

Organized repository structure

Proper documentation

📈 Future Improvements

Add search functionality

Add movie genre filtering

Implement user authentication

Store favorites in a backend database

Add dark mode support

👩🏽‍💻 Author

Nkeiruka Iweala
Software Engineer solving real-world problems with code.
