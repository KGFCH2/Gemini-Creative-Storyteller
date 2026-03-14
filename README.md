# 🎬 Gemini Creative Storyteller: Multimodal Interleaved Output Agent

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Google Cloud](https://img.shields.io/badge/Cloud-Google%20Cloud-4285F4?logo=google-cloud&logoColor=white)](https://cloud.google.com/)
[![Gemini API](https://img.shields.io/badge/AI-Gemini%20API-blue?logo=google-gemini&logoColor=white)](https://ai.google.dev/)

## 🚀 Hackathon Problem Statement

**Focus: Multimodal Storytelling with Interleaved Output**
Built for the evpost platform hackathon, this project addresses the challenge of creating an agent that thinks and creates like a creative director. It seamlessly weaves together **text, high-fidelity images, and cinematic audio** in a single, fluid interleaved output stream.

## 🌟 The "Creative Director" Agent

The heart of this project is the `CreativeDirectorAgent`. It doesn't just generate text; it orchestrates a mixed-media experience by leveraging Gemini's native interleaved output capabilities to produce:

- **Cinematic Narrative**: Rich, evocative storytelling context.
- **Interleaved Visuals**: Scene-by-scene generated illustrations that match the narrative timeline.
- **Voiceover Narration**: Automated, emotional voiceovers for an immersive "read-aloud" book experience.
- **Interactive Archives**: A history system to revisit and playback generated cinematic constructs.

## 🧰 Mandatory Tech Integration

- **Gemini Interleaved Output**: Uses the Gemini API (`gemini-2.0-flash`, `gemini-1.5-flash`) to generate structured mixed-media responses.
- **Google Cloud Platform**: Designed for deployment on Google Cloud infrastructure.
- **Multimodal Synthesis**: Combines visual generation (Pollinations AI sync) with audio synthesis and large language models.

## 🎥 Key Features

1. **Fluid Interleaved UI**: A custom-built timeline scroll that alternates text and imagery dynamically.
2. **Global Audio Control**: A sticky cinematic narration bar stays with the user as they scroll through the story.
3. **Smart Failover System**: Innovative fallback logic that cascades through **8 API keys** and **4 distinct Gemini models** to ensure zero downtime.
4. **Cinematic Splash Engine**: An immersive entry experience with video-driven synthesis loaders.

## 📂 Project Structure

- `/frontend`: React (Vite) + TailwindCSS cinematic dashboard.
- `/backend`: FastAPI Python orchestrator.
- `INSTRUCTIONS.md`: Step-by-step setup guide for judges and users. See [INSTRUCTIONS.md](INSTRUCTIONS.md) for full setup instructions and running the project.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*Created for the Hackathon - Highlighting the power of Gemini's Multimodal Interleaving.*

*Happy hacking!*
