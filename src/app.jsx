import React from 'react';
import './custom_bootstrap.css';
import 'bootstrap/js/dist/dropdown';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { About } from './about/about';
import { Community } from './community/community';
import { Home } from './home/home';
import { Login } from './login/login';

export const usernameContext = React.createContext(null);
export const authenticatedContext = React.createContext(null);

export default function App() {

    const [username, setUsername] = React.useState(localStorage.getItem('username') || '');
    const authstate = username ? true : false
    const [authenticated, setAuthenticated] = React.useState(authstate)
    const [imageSrc, setImageSrc] = React.useState('loading...')

    React.useState(()=>setImageSrc('/images/logo.png'))

    return <BrowserRouter>
        <usernameContext.Provider value={{username: username, setUsername: setUsername}}>
            <authenticatedContext.Provider value={{authenticated: authenticated, setAuthenticated: setAuthenticated}}>
                <div className='app' id='app'>
                    <Header />
                    <Main />
                    <Footer />
                </div>
            </authenticatedContext.Provider>    
        </usernameContext.Provider>
    </BrowserRouter>;
async function logout() {
    localStorage.removeItem('username');
    setAuthenticated(false);
    fetch ('/api/account/logout', {method: 'delete'});
}

function Header() {
    return <header>
        <div className="aligned-header">
            {authenticated && (
            <NavLink to="/home" className="logo">
                <img src="/images/logo.png" alt="logo" height="75"/>
            </NavLink>)}
            {!authenticated && (<div className='logo'><img src={imageSrc} alt="logo" height="75"/></div>)}
            <h1>Shoot for the Stars!</h1>
            <nav>
                {!authenticated && (<NavLink to="" className="nav-element">Login</NavLink>) }
                <NavLink to="about" className="nav-element">About</NavLink> 
                <NavLink to="community" className="nav-element">Community</NavLink>
                {authenticated && (<NavLink to="" className="nav-element" onClick={()=>logout()}>Logout</NavLink>)} 
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
    return <Routes>
    <Route path='/' element={<Login />} exact />
    <Route path='/community' element={<Community />} />
    <Route path='/home' element={<Home />} />
    <Route path='/about' element={<About />} />
    <Route path='*' element={<NotFound />} />
  </Routes>;
}

function NotFound() {
    return <main>
        <p>404: Return to sender. Address unknown.</p>
        </main>;
  }

}