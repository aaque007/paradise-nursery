# Paradise Nursery

A three-page houseplant shop built with React, React Router, and Redux Toolkit.
Browse the catalog, add plants to a cart, and adjust quantities before checkout.

**Pages**
- **Home** — landing page with a hero background, the company story, and a
  "Get Started" button into the catalog.
- **Plants** — the product listing, organized into three categories, each
  plant with a thumbnail, name, price, and an Add to Cart button.
- **Cart** — every item in the cart with quantity controls, a remove
  button, running totals, and checkout / continue shopping actions.

## Tech stack

- React 19 + Vite
- React Router (client-side routing across the three pages)
- Redux Toolkit + React Redux (`src/redux/CartSlice.jsx` holds all cart state)
- Plain CSS, no UI framework — all plant art is hand-built inline SVG, so
  there are no external image dependencies to break after deployment

## Project structure

```
src/
  App.jsx                 Routes + landing page markup
  App.css                 App-wide styling
  components/
    Header.jsx             Navbar shown on Plants and Cart pages, with live cart count
    AboutUs.jsx             Company paragraph used on the landing page
    ProductList.jsx         Catalog grouped by category
    CartItem.jsx            Cart page: quantities, totals, checkout
    PlantArt.jsx            Reusable inline-SVG plant illustrations
  redux/
    CartSlice.jsx           addItem / increment / decrement / removeItem + selectors
    store.js                Store setup
  data/
    plants.js               Catalog data (9 plants across 3 categories)
  assets/
    hero-bg.svg              Landing page background image
```

## Running locally

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

## Building

```bash
npm run build
npm run preview   # serve the production build locally to double-check it
```

## Deploying to GitHub Pages

1. Push this project to a public GitHub repository.
2. In `vite.config.js`, set `base` to match your repo name exactly:
   ```js
   base: '/your-repo-name/',
   ```
3. Install and deploy:
   ```bash
   npm run deploy
   ```
   This builds the app and pushes `dist/` to a `gh-pages` branch using the
   `gh-pages` package (already listed in `devDependencies`).
4. In your repo's **Settings → Pages**, set the source to the `gh-pages`
   branch (root). Your site will be live at
   `https://<your-username>.github.io/<your-repo-name>/`.

If you're on Windows/PowerShell, the same commands work as-is — no shell
scripts are used anywhere in this project.
