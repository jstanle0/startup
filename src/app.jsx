import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return <div className='app'>
    <Header />
    <Footer />
  </div>;
}

function Header() {
    return <header>
        <div class="aligned-header">
            <a href="../html/main.html" class="logo"><img src="../public/images/logo.png" alt="logo" height="75"/></a>
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