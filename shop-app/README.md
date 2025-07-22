# Smart Shop

Smart Shop is a simple and user-friendly e-commerce web application built using React and Material-UI. The application allows users to browse products, add them to a shopping cart, and proceed to checkout. It integrates Redux for state management, providing an efficient way to handle user authentication, cart management, and product data.

## Features

Product Listing: Displays a list of available products with options to add them to the cart.

Shopping Cart: Allows users to view, update quantities, or remove items from their cart.

Authentication: Supports user login and protects routes that require authentication.

Order Summary: Displays the total price of the cart with a checkout button.

## Technologies Used

React: For building the user interface.

Material-UI: For pre-built UI components like buttons, typography, cards, etc.

Redux: For state management (cart, user authentication).

React Router: For handling page navigation.

TypeScript: To ensure type safety and better developer experience.

## Folder Structure

```
smart-shop/
├── src/
│   ├── App.tsx                    # Main app component
│   ├── index.tsx                  # Entry point for React application
│   ├── components/                # All React components
│   │   ├── Header.tsx             # Navigation and header component
│   │   ├── ProductList.tsx        # Displays list of products
│   │   ├── ProductCard.tsx        # Individual product card
│   │   ├── CartList.tsx           # Shopping cart content
│   │   ├── CartItem.tsx           # Individual cart item
│   │   ├── LoginForm.tsx          # Login form for user authentication
│   │   └── ProtectedRoute.tsx     # Route protection for authenticated users
│   ├── pages/                     # Page components
│   │   ├── LoginPage.tsx          # Login page component
│   │   ├── HomePage.tsx           # Home/Products page
│   │   └── CartPage.tsx           # Cart page component
│   ├── context/                   # Auth context management
│   │   └── AuthContext.tsx        # Handles user authentication context
│   ├── redux/                     # Redux state management
│   │   ├── store.ts               # Redux store configuration
│   │   └── cartSlice.ts           # Cart-related Redux logic
│   └── api.ts                     # API calls for product data 

```

### Contributions

Feel free to fork this repository, clone it, and make your contributions. If you want to contribute, open an issue or submit a pull request!