import React from 'react';
import './login.css'

export function Login() {
    return <main className="form-signin w-100 m-auto">
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
            <a href="html/main.html"><button>Login</button></a>
        </form>
    </div>
</main>;
}