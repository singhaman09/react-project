```
# Product Showcase Web App

A clean, responsive React application that displays a product showcase page with routing, lazy loading, component-level optimizations, and Tailwind CSS for styling.

---

## Features

- React Routing – Navigate between `Home`, `Login`, and `Contact Us` pages using React Router.
- React Memoization Techniques – Uses `useMemo`, `useCallback`, and `React.memo` for optimized rendering.
- Lazy Loading & Dynamic Imports – Reduces bundle size by loading components only when needed.
- Tailwind CSS – Beautiful and mobile-responsive layout with utility-first CSS.
- Header/Footer Layout – Shared components that persist across routes.
- Login UI – Basic login form with placeholder functionality.
- Responsive Design – Product grid adjusts based on screen size.

---
```
## Folder Structure

```
S_ASS/
├──index.html
├──package.json
├──package-lock.json
├──README.md
├──src/ 
├── App.jsx 
├── index.css
├── main.jsx
├── component/ 
│       ├── Home.jsx 
│       ├── Login.jsx 
│       └── Contact.jsx 
├── layout/  
|       ├── Header.jsx 
|       └── Footer.jsx 

```


---

## Clone the repo
```
git clone https://github.com/your-username/product-showcase.git
```
```
cd product-showcase
```
```
npm install
```
```
npm run dev
```



## Available Routes
```
/ → Home (Product page)

/login → Login form

/contact → Contact Us page

```


## Technologies
```
React 18+
React Router DOM
Tailwind CSS
React Lazy/Suspense
JavaScript ES6+
```

## Contributing
```
Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.
```
