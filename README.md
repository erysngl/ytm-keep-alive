# 🎵 YTM Keep-Alive

A lightweight, pure DOM bookmarklet to prevent YouTube and YouTube Music from pausing with the *"Video paused. Continue watching?"* prompt.

## ✨ Features
* **No Extensions Required:** Keeps your browser fast and clean.
* **100% Safe (TrustedHTML Bypass):** Built entirely with pure DOM elements (`document.createElement`). It does not use `innerHTML`, completely bypassing YouTube's strict Content Security Policy (CSP).
* **Draggable UI:** Features a sleek, dark-themed floating timer that you can drag anywhere on the screen.
* **Smart Detection:** Clicks the "Yes" confirmation button automatically within seconds of it appearing.

## 🚀 Easy Installation
You don't need to copy or paste any code. 

1. Go to the **[Installation Page](https://erysngl.github.io/ytm-keep-alive/)**
2. Drag and drop the red **"Drag to Bookmarks"** button to your browser's bookmarks bar.
3. Open YouTube Music, click the bookmark, and enjoy uninterrupted music!

## 🛠️ How it Works
Once activated, it creates a small floating widget. Every 60 seconds, it performs a 1-pixel micro-scroll to simulate user activity and scans the DOM for the confirmation prompt. If found, it automatically clicks it and logs "Pause Prevented!" on the widget.
