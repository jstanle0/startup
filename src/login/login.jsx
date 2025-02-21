import React from 'react';
import './login.css';
import { usernameContext } from '../app';
import { authenticatedContext } from '../app';

export function Login() {
    const {username, setUsername} = React.useContext(usernameContext);
    const {authenticated, setAuthenticated} = React.useContext(authenticatedContext);
    const [usernameInput, setUsernameInput] = React.useState('');
    const [passwordInput, setPasswordInput] = React.useState('');

    if (authenticated) {
        return <p>authenticated {username}</p>
    }
    async function processLogin() {
        setUsername(usernameInput);
        setAuthenticated(true);
        localStorage.setItem('username', usernameInput)
    }
    return <main className="form-signin w-100 m-auto login-main">
    <div className="content-container">
        <form onSubmit={()=>processLogin()}>
            <h3>Welcome to Shoot for the Stars!!</h3>
            <div className="form-floating mb-2">
                <input id="floatingInput" className="form-control" placeholder="username" value={usernameInput} onChange={(e)=>setUsernameInput(e.target.value)}  autoComplete='off' required/>
                <label for="floatingInput">Username</label>
            </div>
            <div className="form-floating mb-2">
                <input id="floatingPassword" className="form-control" placeholder="Password" value={passwordInput} onChange={(e)=>setPasswordInput(e.target.value)} autoComplete='off' required/>
                <label for="floatingPassword">Password</label>
            </div>
            <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
        </form>
    </div>
</main>;
}