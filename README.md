# 🥘 Recipebook

Eine digitale Rezeptsammlung als Full-Stack-Webanwendung – gebaut mit React, TypeScript, Supabase und Tailwind CSS.


---

## ✨ Features

- **Rezepte durchsuchen** – Volltextsuche über Titel und Zutaten
- **Kategorien** – Filterung nach Rezeptkategorien
- **Rezeptdetailseite** – Zutaten, Zubereitung und Metadaten auf einen Blick
- **Authentifizierung** – Registrierung und Login via Supabase Auth
- **Eigene Rezepte** – Erstellen, Bearbeiten und Löschen eigener Einträge
- **Datenbankanbindung** – Persistente Datenhaltung via Supabase (PostgreSQL)
- **CI/CD** – Automatisiertes Deployment via GitHub Actions

---

## 🛠️ Tech Stack

| Bereich | Technologie |
|---|---|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS |
| Backend / DB | Supabase (PostgreSQL, Auth, Storage) |
| State | React Context API |
| Routing | React Router v6 |
| Deployment | Vercel + GitHub Actions |

---

## 📁 Projektstruktur

```
src/
├── components/     # Wiederverwendbare UI-Komponenten
├── context/        # React Context (Auth, Rezepte)
├── lib/            # Supabase-Client & Hilfsfunktionen
├── pages/          # Seitenkomponenten (Home, Detail, Login, ...)
├── types/          # TypeScript-Typdefinitionen
└── assets/         # Statische Assets
```

---

## 🚀 Lokale Entwicklung

### Voraussetzungen

- Node.js ≥ 18
- Ein Supabase-Projekt (kostenlos unter [supabase.com](https://supabase.com))

### Installation

```bash
# Repository klonen
git clone https://github.com/TOezdemir/project-recipebook.git
cd project-recipebook

# Abhängigkeiten installieren
npm install
```

### Umgebungsvariablen

Erstelle eine `.env`-Datei im Projektroot:

```env
VITE_SUPABASE_URL=deine-supabase-url
VITE_SUPABASE_ANON_KEY=dein-anon-key
```

Die Werte findest du in deinem Supabase-Projekt unter **Settings → API**.

### Starten

```bash
npm run dev
```

Die App läuft dann unter `http://localhost:5173`.

---

## 🔧 Scripts

```bash
npm run dev       # Entwicklungsserver starten
npm run build     # Produktions-Build erstellen
npm run preview   # Build lokal vorschauen
npm run lint      # ESLint ausführen
```

---

## 👤 Autor

**Tolgay Özdemir**

[![Portfolio](https://img.shields.io/badge/Portfolio-tolgay--oezdemir.de-000000?style=flat&logo=vercel&logoColor=white)](https://tolgay-oezdemir.de)
[![GitHub](https://img.shields.io/badge/GitHub-TOezdemir-181717?style=flat&logo=github&logoColor=white)](https://github.com/TOezdemir)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-tolgay--oezdemir-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tolgay-oezdemir)
