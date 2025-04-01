import React from 'react';
import Modal from 'react-modal'
import { CurrentGoals } from './goals';
import { DisplayReward } from './reward.jsx';
import './home.css';
import { usernameContext } from '../app';
import { authenticatedContext } from '../app';

Modal.setAppElement(document.getElementById('root'));

export const starCountContext = React.createContext(null)
export const serverErrorContext = React.createContext(null)

export function Home() {
    const [starCount, setStarCount] = React.useState(0)
    const {username, _} = React.useContext(usernameContext)
    const {authenticated, setAuthenticated} = React.useContext(authenticatedContext)
    const [starSrc, setStarSrc] = React.useState(null)
    const [serverError, setServerError] = React.useState(null)

    async function getStarCount() {
        const response = await fetch('/api/home/starCount', {method: 'get'});
        if (response.ok) {
            const body = await response.json();
            setStarCount(body.starCount);
        } else if (response.status === 401) {
            setAuthenticated(false)
        }
    }

    React.useEffect(()=> {
        setStarSrc('/images/star.png')
        getStarCount();
        }, [])

    if (!authenticated) {
        return <main>please log in to see this content</main>
    }

    return <main>
    <starCountContext.Provider value={{starCount: starCount, setStarCount: setStarCount}}>
    <serverErrorContext.Provider value={{serverError: serverError, setServerError: setServerError}}>
    <div className="home-content-container">
        <span className="star-counter"><img src={starSrc} alt="star" height="20"/> Number of stars: <b>{starCount}</b></span>
        {serverError && (<div className="alert alert-secondary">{serverError}</div>)}
        <h3>Welcome {username}!</h3>
        <DisplayReward/>
        <h3>Current Goals</h3>
        <CurrentGoals/>
    </div>
    </serverErrorContext.Provider>
    </starCountContext.Provider>
</main>;
}