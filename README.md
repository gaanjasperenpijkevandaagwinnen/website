# Website

This repository contains a small static site for tracking and displaying match scores.

## Structure
- **index.html** — Main page that shows a daily prediction and the most recent score. It includes inline JavaScript for the scoreboard logic and confetti animation.
- **add.html** — Form for entering new match results. Submitted scores are sent to the SheetDB API.
- **sukkels.png** — Image used by the confetti effect.
- **.htaccess** — Rewrite rules that map URLs like `/add` to `/add.html` when hosted on Apache.

## Usage
Open `index.html` directly or host the files on a static web server. To add scores, navigate to `/add` and submit the form. Scores are stored in the associated SheetDB account.

