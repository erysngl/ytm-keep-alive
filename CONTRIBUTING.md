# Contributing to YTM Keep-Alive

First off, thank you for considering contributing to YTM Keep-Alive! It's people like you that make the open-source community such a fantastic place to learn, inspire, and create.

## How Can I Contribute?

### Reporting Bugs
If you find a bug or the bookmarklet stops working due to a YouTube UI update:
* Check if the issue has already been reported in the **Issues** tab.
* If not, open a new issue. Please include your browser version, the language of your YouTube Music interface, and a screenshot of the DOM element if possible.

### Suggesting Enhancements
Have a great idea to make this bookmarklet even better or lighter?
* Open an issue proposing the feature.
* Keep in mind our core philosophy: **Zero extensions, pure DOM, and maximum privacy.**

### Pull Requests
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Make sure your changes work globally (language-agnostic selectors are required).
4. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
5. Push to the Branch (`git push origin feature/AmazingFeature`).
6. Open a Pull Request.

## Development Guidelines
* **No External Dependencies:** This project must remain a standalone bookmarklet. Do not introduce external libraries or remote script fetching, as this will violate YouTube's strict CSP.
* **Language-Agnostic:** Always use structural DOM selectors (like `ytmusic-you-there-renderer [dialog-confirm]`) instead of hardcoded text (like 'YES').

Thank you for helping keep the music playing! 🎵
