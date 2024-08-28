import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <LoginPage /> } />
                <Route path="/home/:username" element={ <HomePage /> } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;