# SOVEREIGN

A Solo Leveling-inspired real-life RPG system powered by AEON.

## What is included

- React + Vite frontend with 7-page sidebar navigation
- AEON chat interface that calls a server-side `/api/chat` endpoint
- Journal page with structured prompts and quick-log UI
- Mission Hub and Skills pages with placeholder RPG panels
- Knowledge page with adaptive video recommendation support via Serper + Gemini
- Solar Exchange shop and finance learning UI

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example` and add keys:

```bash
GEMINI_API_KEY=your_google_gemini_key
SERPER_API_KEY=your_serper_api_key
```

3. Start development server:

```bash
npm run dev
```

## API endpoints

- `POST /api/chat` — forwards messages to the Gemini API
- `POST /api/video-recommendation` — uses Serper search results and Gemini analysis to recommend a current YouTube video

## Notes

- The frontend never calls AI APIs directly.
- The backend keeps `GEMINI_API_KEY` and `SERPER_API_KEY` server-side only.
- The learning path system is adaptive: AEON evaluates your awareness level and current goal before recommending the next video.

## Deployment

Deploy to Vercel or Replit. Ensure environment variables are set in the server environment.
