Vibe Cart - Full Stack Shopping Cart Application

A basic full-stack shopping cart application for Vibe Commerce, built using React (frontend), Node.js / Express (backend), and SQLite (database). Users can browse products, add/remove items to the cart, view totals, and perform a mock checkout.

This project demonstrates REST APIs, frontend-backend integration, and deployment.

🚀 Features

Display products with name, price, and details

Add/remove items from cart

Update item quantities

View cart totals dynamically

Mock checkout (collects name & email)

Responsive design for desktop and mobile

SQLite database for backend persistence

RESTful APIs with Express

🛠️ Tech Stack
Frontend

React 18

Axios for API calls

Vite for build tooling

Tailwind CSS for styling (optional if you add it)

Backend

Node.js with Express

SQLite for lightweight database

CORS & body-parser

📁 Project Structure
vibe-cart/
├── backend/
│   ├── server.js        # Express server
│   ├── seed.js          # Seed database
│   ├── database.sqlite  # SQLite database file
│   ├── package.json
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/  # Cart, ProductList, CheckoutModal
│   │   ├── api.js       # Axios API functions
│   │   ├── App.jsx
│   │   └── ...
│   ├── dist/            # Production build
│   ├── package.json
│   └── ...
└── README.md

⚡ Backend APIs
Method	Endpoint	Description
GET	/api/products	Get all products
GET	/api/cart	Get all items in cart
POST	/api/cart	Add product to cart {productId, qty}
POST	/api/cart/:id	Update quantity of a cart item
DELETE	/api/cart/:id	Remove an item from cart
POST	/api/checkout	Mock checkout {name, email}
💾 Setup & Installation
Backend
cd backend
npm install
npm run seed       # Seed database with sample products
npm run dev        # Start server on localhost:5000

Frontend
cd frontend
npm install
# Set your backend URL
echo "VITE_API_URL=http://localhost:5000" > .env
npm run dev        # Run development server
npm run build      # Build production bundle
npm run deploy     # Deploy to GitHub Pages

🌐 Live Demo

Frontend: https://anjuprajapati14.github.io/vibe-cart/

Backend: https://vibe-cart-eh28.onrender.com

Note: The live frontend now communicates with the deployed backend on Render.

🧪 Sample Data

Products: iPhone, Samsung Galaxy, Google Pixel (mock data)

Cart: Dynamically generated when items are added

Checkout: Shows mock receipt with total and timestamp

📦 Deployment
Frontend

Hosted on GitHub Pages via gh-pages

Environment variable VITE_API_URL points to backend

Backend

Hosted on Render

Express server running on /api endpoints

🔧 Development Notes

Axios handles all API requests

Cart state is managed via React useState hooks

Checkout does not process real payments

SQLite database persists products and cart items

CORS is enabled for frontend-backend communication

📄 License

This project is created for Vibe Commerce SDE Assignment. Use for learning and demo purposes only.
