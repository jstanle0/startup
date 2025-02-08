import React from 'react';
import './login.css'

export function Login() {
    return <main className="form-signin w-100 m-auto login-main">
    <div className="content-container">
        <form>
            <h3>Welcome to Shoot for the Stars!!</h3>
            <div className="form-floating">
                <input id="floatingInput" className="form-control" placeholder="username"/>
                <label for="floatingInput">Username</label>
            </div>
            <div className="form-floating">
                <input id="floatingPassword" className="form-control" placeholder="Password"/>
                <label for="floatingPassword">Password</label>
            </div>
            <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
        </form>
    </div>
</main>;
}