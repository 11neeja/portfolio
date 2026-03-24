# 🎮 Neeja Suva — Game Portfolio

A **Next.js** pixel-art RPG-style portfolio website for **Neeja Suva**, Full Stack Developer from India.

## ✨ Features

- 🎮 **Game-style UI** — pixel art aesthetic with RPG HUD, XP bars, quest log
- 🌍 **Multiple Biomes** — Forest (Skills), Cyber City (Experience), Item Dungeon (Projects), Trophy Hall (Achievements)
- 👾 **Custom Character** — Pixel art Indian girl character with kurta, bindi & bangles that follows your cursor
- 📜 **Typewriter Hero** — Animated role titles cycling through her specialties
- 🗡️ **Skill Tree** — Animated XP bars with per-category biome colors
- 📋 **Quest Log** — Experience formatted as completed RPG quests
- 🎁 **Inventory** — Projects as collectible items with stat panels
- 🏆 **Trophy Hall** — Achievements & certifications as unlocked loot
- 🖱️ **Pixel Cursor** — Custom pink pixel cursor with follower
- ✨ **Scroll Animations** — Elements reveal as you scroll through biomes

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Fonts**: Press Start 2P (pixel) + Outfit (body)
- **Animation**: CSS keyframes + Tailwind animation utilities

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open in browser
http://localhost:3000
```

## 🗂️ Project Structure

```
neeja-portfolio/
├── pages/
│   ├── _app.js          # App wrapper with global styles
│   └── index.js         # Main page assembling all sections
├── components/
│   ├── Navbar.jsx        # Fixed pixel nav with scroll effect
│   ├── Hero.jsx          # Hero with character, biome ground, HUD panels
│   ├── CharacterSprite.jsx  # SVG pixel art character (Indian girl)
│   ├── Skills.jsx        # Skill tree with animated XP bars
│   ├── Experience.jsx    # Quest log (internships)
│   ├── Projects.jsx      # Inventory (project cards)
│   └── AchievementsContact.jsx  # Trophies + contact section
├── data/
│   └── portfolio.js      # All of Neeja's info (easy to update!)
├── styles/
│   └── globals.css       # Global styles, animations, cursor, scrollbar
├── tailwind.config.js
├── next.config.js
└── package.json
```

## ✏️ Customization

All content lives in **`data/portfolio.js`** — update projects, skills, experience, achievements there.

To change the character sprite, edit **`components/CharacterSprite.jsx`** (pixel SVG art).

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🌐 Deploy

Works perfectly on **Vercel** — just connect your GitHub repo:
```bash
npm i -g vercel
vercel
```

## 🔎 SEO Setup

This project now includes:

- Canonical URLs, Open Graph, Twitter Card, and robots metadata
- Structured data (JSON-LD) for the portfolio and project pages
- Dynamic `robots.txt` at `/robots.txt`
- Dynamic sitemap at `/sitemap.xml`

Set your production domain so canonical and sitemap links are correct:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```
