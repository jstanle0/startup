import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './login.css';
import { usernameContext } from '../app';
import { authenticatedContext } from '../app';

export function Login() {
    const {username, setUsername} = React.useContext(usernameContext);
    const {authenticated, setAuthenticated} = React.useContext(authenticatedContext);
    const [usernameInput, setUsernameInput] = React.useState('');
    const [passwordInput, setPasswordInput] = React.useState('');
    const navigate = useNavigate();

    if (authenticated) {
        React.useEffect(() =>navigate('/home'), [])
    }
    
    async function processLogin() {
        setUsername(usernameInput);
        setAuthenticated(true);
        localStorage.setItem('username', usernameInput)
        navigate('/home')
    }
    async function createAccount() {
        setUsername(usernameInput);
        setAuthenticated(true);
        localStorage.setItem('username', usernameInput)
        navigate('/home')
    }
    return <main className="form-signin w-100 m-auto login-main">
    <div className="content-container">
        <form onSubmit={()=>processLogin()}>
            <h3>Welcome to Shoot for the Stars!!</h3>
            <div className="form-floating mb-2">
                <input id="floatingInput" className="form-control bg-light" placeholder="username" value={usernameInput} onChange={(e)=>setUsernameInput(e.target.value)}  autoComplete='off' required/>
                <label for="floatingInput">Username</label>
            </div>
            <div className="form-floating mb-2">
                <input id="floatingPassword" className="form-control bg-light" placeholder="Password" value={passwordInput} onChange={(e)=>setPasswordInput(e.target.value)} autoComplete='off' required type="password"/>
                <label for="floatingPassword">Password</label>
            </div>
            <button class="btn btn-primary w-100 py-2" type="submit" disabled={!usernameInput||!passwordInput}>Sign in</button>
            <button class="btn w-100 py-2" onClick={()=>createAccount()} disabled={!usernameInput||!passwordInput}>Create account</button>
        </form>
    </div>
</main>;
}