# TDS Toolkit

A browser toolkit for the **Tower Defense Simulator** game.

## Tools

- **Map wheel** — random map spinner.
- **DPS & efficiency** — damage and efficiency calculations.
- **Skill tree** — plan and explore tower skill trees.

## Running

This is a static site. Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Layout

- `index.html` — app shell and tabs
- `js/wheel.js` — map wheel
- `js/calculator.js` — DPS/efficiency calculator
- `js/skilltree.js` — skill-tree tool
- `js/data.js` — tower data and constants
- `styles.css` — styling

## Status

Small standalone fan tool.
