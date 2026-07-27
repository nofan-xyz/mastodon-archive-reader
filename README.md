# ActivityPub Archive Reader

A local-first web app for importing, parsing, and browsing ActivityPub / Mastodon exported archive files. All processing happens in your browser — no server, no upload.

## Features

- **Import**: Drag & drop `.zip` or `.json` archive files
- **Overview**: Profile card + stats dashboard
- **Posts**: Timeline with hashtags, media previews, interaction data
- **Media**: Image/video grid with full-screen viewer
- **Likes & Bookmarks**: Browse your liked and saved posts
- **Search**: Full-text search across posts, likes, and bookmarks
- **i18n**: English / Chinese language toggle
- **Privacy-first**: Everything runs locally in your browser

## Tech Stack

- React 18 + TypeScript 5
- Vite 5
- Tailwind CSS 3 (Neo-Brutalism design system)
- JSZip for archive extraction

## Getting Started

```bash
npm install
npm run dev      # Development server at localhost:5173
npm run build    # Production build to dist/
npm run preview  # Preview production build
```

## Design

Neo-Brutalism visual style with:
- Thick borders (3px) and hard offset shadows
- Saturated candy colors (pink, yellow, blue, green, purple)
- Bold display fonts (Archivo Black, Inter, JetBrains Mono)
- Playful but ordered layout

## License

MIT
