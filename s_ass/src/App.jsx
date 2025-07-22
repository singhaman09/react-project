import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//React.lazy()
//dynamic import()
const Home = React.lazy(() => import("./components/Home"));
const Login = React.lazy(() => import("./components/Login"));
const Contact = React.lazy(() => import("./components/Contact"));

import './index.css'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/"
                    element={
                        <React.Suspense fallback={<>...Loading</>}>
                            <Home />
                        </React.Suspense>
                    } />
                <Route path="Login"
                    element={
                        <React.Suspense fallback={<>...Loading</>}>
                            <Login />
                        </React.Suspense>
                    } />
                <Route path='Contact'
                    element={
                        <React.Suspense fallback={<>...Loading</>}>
                            <Contact/>
                        </React.Suspense>
                    }
                 />

            </Routes>
        </Router>
    );
};

export default App;