# Gimzy Proposal (Vite + React)

Playful mobile-first proposal page with an evasive "No" button and a celebratory "Yes" state. Swap in your own couple photo from your phone (works great on an iPhone 13).

## Quick start

1. Install deps: `npm install`
2. Run dev server: `npm run dev`
3. Open the URL shown in the terminal (default http://localhost:5173) on your phone (same Wi-Fi) to test the mobile view.

## Customize

- Replace the hero photo: put your image at `public/couple.jpg` (the app auto-loads it; falls back to the placeholder if missing).
- Tweak colors/animations: edit `src/styles.css` (gradients, heart floaters, button styles).
- Change the copy or prompt sequence: update the `prompts` array in `src/App.tsx`.

## Scripts

- `npm run dev` – start Vite dev server
- `npm run build` – production build
- `npm run preview` – preview the production build
- `npm run lint` – basic ESLint check