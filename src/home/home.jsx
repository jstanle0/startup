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
    const [starCount, setStarCount] = React.useState(0);
    const {username, _} = React.useContext(usernameContext);
    const {authenticated, setAuthenticated} = React.useContext(authenticatedContext);
    const [starSrc, setStarSrc] = React.useState(null);
    const [serverError, setServerError] = React.useState(null);
    const [removeReward, setRemoveReward] = React.useState(false);
    const [removeGoals, setRemoveGoals] = React.useState(false);

    async function getStarCount() {
        const response = await fetch('/api/home/starCount', {method: 'get'});
        if (response.ok) {
            const body = await response.json();
            setStarCount(body.starCount);
        } else if (response.status === 401) {
            setAuthenticated(false)
        }
    }

    async function deleteStarCount() {
        const response = await fetch('/api/home/starCount', {method: 'delete'});
        if (response.ok) {
            setStarCount(0)
        } else {
            setServerError("Error 500: Unable to delete star count")
        }
    }

    async function deleteReward() {
        const response = await fetch('/api/home/reward', {method: 'delete'});
        if (response.ok) {
            setRemoveReward(true)
        } else {
            setServerError(`Error ${response.status}: Unable to delete reward`)
        }
    }

    async function deleteGoals() {
        const response = await fetch('/api/home/goals', {method: 'delete'});
        if (response.ok) {
            setRemoveGoals(true)
        } else {
            setServerError(`Error ${response.status}: Unable to delete goals`)
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
        <span className="star-counter">
            <img src={starSrc} alt="star" height="30" className='bg-secondary'/><p className='bg-secondary d-inline'> Number of stars: <b className='bg-secondary text-warning'>{starCount}</b></p>
            <div className="dropdown d-inline bg-secondary" style={{marginLeft: '.5em'}}>
                <button className="btn btn-primary dropdown-toggle text-dark" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Options
                </button>
                <ul className="dropdown-menu">
                    <li><button className="dropdown-item text-dark" type="button" onClick={deleteStarCount}>Reset Star Count</button></li>
                    <li><button className="dropdown-item text-dark" type="button" onClick={deleteReward}>Delete Reward</button></li>
                    <li><button className="dropdown-item text-dark" type="button" onClick={deleteGoals}>Delete Goals</button></li>
                </ul>
            </div>

        </span>
        {serverError && (<div className="alert alert-secondary">{serverError}</div>)}
        <h3>Welcome {username}!</h3>
        <DisplayReward removeReward={removeReward} setRemoveReward={setRemoveReward}/>
        <h3>Current Goals</h3>
        <CurrentGoals removeGoals={removeGoals} setRemoveGoals={setRemoveGoals}/>
    </div>
    </serverErrorContext.Provider>
    </starCountContext.Provider>
</main>;
}