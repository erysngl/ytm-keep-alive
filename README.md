# 🎵 YTM Keep-Alive

<img width="1919" height="1079" alt="screenshot (3)" src="https://github.com/user-attachments/assets/cec301b1-2d8d-49bf-8288-2192fa0441bf" />
<br> <div align="center">
  <img src="https://github.com/user-attachments/assets/254a8d7b-50ee-4673-904d-335dd96314a1" width="49%" alt="screenshot (1)" />
  <img src="https://github.com/user-attachments/assets/69bb4f2b-cfac-4f47-b6b3-1140a6aef72b" width="49%" alt="screenshot (2)" />
</div>

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
