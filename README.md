# QuickBite

QuickBite is a food delivery web app built with React. Browse restaurants, filter by category, view menus, add items to your cart, and place orders with delivery details. Everything runs in the browser, with no backend required.

## Features

- Browse restaurants with ratings and delivery times
- Filter restaurants by category (Pizza, Burger, Biryani, etc.)
- View each restaurant's menu
- Add and remove items in the cart, with quantity controls
- Checkout form with validation (name, 10-digit Indian mobile number, address)
- Order history, saved in the browser's localStorage

## Tech Stack

- React 19
- React Router DOM 7
- Vite
- Context API for cart state
- Oxlint for linting

## Getting Started

```bash
git clone https://github.com/YOUR-USERNAME/quickbite.git
cd quickbite
npm install
npm run dev
```

The app will run at http://localhost:5173.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run Oxlint |

## Project Structure

```
src/
├── components/   # Navbar, RestaurantCard, FoodItemCard, CartItem, OrderCard, CategoryFilter
├── context/      # CartContext (cart state)
├── data/         # Restaurant and menu data
├── pages/        # Home, Menu, Cart, Checkout, Orders
└── App.jsx       # Routes
```

## Notes

Restaurant data is static and orders are stored in localStorage, so this is a frontend-only project.