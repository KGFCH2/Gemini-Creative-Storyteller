# 🎥 AI Creative StoryTeller Project Manual

## 🌟 Overview

**AI Creative StoryTeller** is a cinematic multimodal agent built for the **evpost platform hackathon**. It fulfills the "Creative Director" problem statement by leveraging **Gemini's native interleaved output** to seamlessly weave together text, generated imagery, and audio narration in a single, fluid flow.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🧰 Tech Stack

### 🎨 Frontend

- ⚛️ **Framework**: React (Vite)
- 💅 **Styling**: TailwindCSS, Glassmorphism UI
- 🎯 **Icons**: Lucide React

### 🐍 Backend

- 🐍 **Framework**: Python FastAPI
- 🤖 **AI Core**: Google Gemini (Story Generation)
- 🔊 **Audio & Image**: Respective Text-to-Speech / Text-to-Image models

---

## 🚀 Getting Started

> 🔒 **Gitignore**
> Only the backend and frontend directories have their own `.gitignore` files; the root file is not used.

### 1. 🛠️ Setting Up the Backend

1. 📁 Open the `/backend` folder.
2. 📦 Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. 🔑 Set up the `.env` file (copy from `.env.example`). Add your Gemini API keys here:

   ```env
   GEMINI_API_KEY_1="your_first_key"
   GEMINI_API_KEY_2="your_second_key"
   GEMINI_API_KEY_3="your_third_key"
   GEMINI_API_KEY_4="your_fourth_key"
   GEMINI_API_KEY_5="your_fifth_key"
   GEMINI_API_KEY_6="your_sixth_key"
   GEMINI_API_KEY_7="your_seventh_key"
   GEMINI_API_KEY_8="your_eighth_key"
   GEMINI_API_KEY_9="your_nineth_key"
   GEMINI_API_KEY_10="your_tenth_key"
   GEMINI_API_KEY_11="your_eleventh_key"
   GEMINI_API_KEY_12="your_twelfth_key"
   GEMINI_API_KEY_13="your_thirteenth_key"
   GEMINI_API_KEY_14="your_fourteenth_key"
   ```

4. 🚀 Start the backend server:

   ```bash
   uvicorn main:app --reload --port 8000
   ```

### 2. 💻 Setting Up the Frontend

1. 📁 Open the `/frontend` folder in your terminal.
2. 📦 Install Node dependencies:

   ```bash
   npm install
   ```

3. 🚀 Run the development server:

   ```bash
   npm run dev
   ```

4. 🌐 Open your browser to `http://localhost:5173` (or whichever port Vite reports). Do **not** navigate directly to `/src/main.jsx` or you'll see a 404; the HTML entrypoint serves that script automatically.

---

## 🗂️ File Structure & Workings

### 📦 Backend Files (`/backend`)

- 📄 **`main.py`**: The FastAPI entry point. It handles incoming requests for multimodal generation (`POST /generate`) and serves static files.
- 📄 **`creative_director_agent.py`**: A specialized AI orchestrator that acts as a creative director, weaving together interleaved text and images via Gemini's native API, into rich mixed-media timelines. It incorporates smart fallback logic that tests up to 14 API keys automatically.
- 📄 **`story_agent.py`**: Formats initial settings or handles secondary text generation logic.
- 📄 **`audio_agent.py`**: Runs text-to-speech creation for immersive narration.
- 📁 **`static/`**: Folder containing generated audio output.

### 🖥️ Frontend Files (`/frontend/src/`)

- 📄 **`App.jsx`**: Main React component. Sets up the global UI layers and the static ambient glowing background.
- 📄 **`main.jsx`**: Application entry point that loads the `<App />` and global contexts.
- 📄 **`index.css` & `tailwind.config.js`**: Core styling setup focusing on dark backgrounds (`#050510`), neon glows, and glassy floating panel implementations.

#### 🧩 Components (`/components`)

- 📄 **`PromptPanel.jsx`**: The floating glass UI dashboard where users input their story ideas. Contains the input field and triggers requests.
- 📄 **`InterleavedStoryBoard.jsx`**: Core modular visualizer that displays the resulting text and images generated inline within a cinematic scrolling timeline track.

---

## 🔄 Handling API Keys Failover

The `creative_director_agent.py` script automatically utilizes `GEMINI_API_KEY_1` to `..._14`. If one key exhausts its quota or encounters an error during multimodal visual generation, the script catches the error and silently attempts to query the next available key ensuring maximum uptime without user disruption.

---
