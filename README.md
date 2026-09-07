# instaaaaa 📸

A modern, responsive, feature-rich Instagram clone web application built with **React**, **Vite**, and **Tailwind CSS**.

---

## ✨ Features

- 🔐 **User Authentication**:
  - Sign in, Sign up, and Logout with instant session persistence (`localStorage`).
  - 1-Click Demo account switcher to test multiple user profiles (`@nikhil_p`, `@sarah_adventures`, `@alex.design`, etc.).
- 🌟 **User Stories**:
  - Horizontal stories tray with animated gradient rings for unviewed stories.
  - Fullscreen Story Viewer modal with auto-advancing segmented progress bars (5 seconds per slide).
  - Story tap navigation (tap left for previous, right for next) and pause on touch/click.
  - Interactive story replies and quick emoji reactions with confetti animation.
  - "Add Story" modal with photo upload and curated sample presets.
- 📱 **Interactive Instagram Feed**:
  - Clean photographic posts with user avatars, verified badges, and locations.
  - **Double-tap on post photo** triggers an animated Instagram floating heart pop!
  - Heart toggle with dynamic like counter.
  - Bookmark / Save posts to your personal collection.
  - Share post link with instant toast notification.
- 💬 **Commenting System**:
  - Inline comment preview and instant posting.
  - Instagram-style split-view **Post Detail Modal** with full scrollable comments stream.
  - Like individual comments and delete your own comments.
- ➕ **Create Post**:
  - Upload photos directly or choose from high-resolution presets or enter image URLs.
  - Location tagger and caption writer with quick emoji shortcuts.
  - Confetti burst on publishing.
- 👤 **Profile View**:
  - User stats (Posts, Followers, Following), bio, and external link.
  - Tabs for **Posts** and **Saved** collections with hover metrics.
  - "Edit Profile" modal to update avatar, name, bio, and website.
- 🧭 **Explore Grid**:
  - Responsive Instagram explore masonry grid with category filter chips (Architecture, Tech, Nature, Food, Design).
  - Search bar to find inspiring content.
- 🌓 **Theme & Responsiveness**:
  - Dark mode & Light mode toggle with seamless transitions.
  - Desktop: Left navigation sidebar & right suggestions column.
  - Mobile: Top header with Instagram cursive branding & bottom 5-tab navigation bar.

---

## 🚀 Getting Started

### 1. Installation

```bash
cd /Users/nikhilpainala/Desktop/instaaaaa
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Visit the local URL (usually `http://localhost:5173`) in your browser.

### 3. Build for Production

```bash
npm run build
npm run preview
```

---

## 🛠 Tech Stack

- **React 18**
- **Vite 6**
- **Tailwind CSS 3**
- **Lucide React** (Instagram icon pack)
- **Canvas Confetti**

