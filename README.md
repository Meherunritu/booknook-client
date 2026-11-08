# BookNook

**A small online library: add a book, borrow a book, return a book.**

Live site: https://booknook-client-bay-three.vercel.app

Server repo: https://github.com/Meherunritu/booknook-server

## Features

- **Share your shelf**: add books with a cover (uploaded to imgbb), category, description and number of copies.
- **Borrow and return**: borrow for up to 30 days, see everything you are reading in My Borrows, return with one click.
- **Copy tracking**: borrowing decreases available copies, returning increases them, and a book with zero copies shows "Not Available".
- **One copy per reader**: the server blocks borrowing the same book twice at the same time.
- **Secure accounts**: BetterAuth with the MongoDB adapter, email and password with password rules, plus Google login.
- **JWT-protected API**: every write route on the Express server verifies a BetterAuth JWT.
- **Polished UI**: Swiper hero slider, Framer Motion animation, light and dark theme, responsive layout, toasts and modals instead of browser alerts.

## Tech stack

Next.js (App Router), DaisyUI and Tailwind CSS, BetterAuth, MongoDB, Swiper, Framer Motion, Express (server repo).
