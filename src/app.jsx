import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { About } from './about/about';
import { Community } from './community/community';
import { Home } from './home/home';
import { Login } from './login/login';

export default function App() {
  return <div className='app'>
    <Header />
    <Main />
    <Footer />
  </div>;
}

function Header() {
    return <header>
        <div className="aligned-header">
            <a href="../html/main.html" className="logo"><img src="../public/images/logo.png" alt="logo" height="75"/></a>
            <h1>Shoot for the Stars!</h1>
            <nav>
                <a href="../index.html">Login</a> 
                <a href="../html/about.html">About</a> 
                <a href="../html/community.html">Community</a> 
            </nav>
        </div> 
    </header>;
}

function Footer() {
    return <footer>
        <p>Author Name: <a href="https://github.com/jstanle0/startup.git">Joshua Stanley</a></p>
    </footer>;
}

function Main() {
    return ;
}