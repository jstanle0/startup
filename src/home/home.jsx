import React from 'react';
import Modal from 'react-modal'
import { CurrentGoals } from './goals';
import { DisplayReward } from './reward.jsx';
import './home.css';
import { usernameContext } from '../app';

Modal.setAppElement(document.getElementById('root'));

export const starCountContext = React.createContext(null)

export function Home() {
    const [starCount, setStarCount] = React.useState(0)
    const {username, _} = React.useContext(usernameContext)
    return <main>
    <starCountContext.Provider value={{starCount: starCount, setStarCount: setStarCount}}>
    <div className="home-content-container">
        <span className="star-counter"><img src="/images/star.png" alt="star" height="20"/> Number of stars: <b>{starCount}</b></span>
        <h3>Welcome {username}!</h3>
        <DisplayReward />
        <h3>Current Goals</h3>
        <CurrentGoals/>
    </div>
    </starCountContext.Provider>
</main>;
}

/*
This is some HTML that I'm going to cannibalize for pop-up menus:
        <h3>Create Reward Placeholder</h3>
        <table>
            <tr>
                <th>Select an image:</th>
                <th>Write a title:</th>
                <th>Write a description:</th>
            </tr>   
            <tr>
               
                <td>
                    <table class="embedded-table">
                        <tr>
                            <td> <img src="../assets/images/ferrari.jpeg" alt="ferrari" height="75"/> </td>
                            <td> <img src="../assets/images/lawnmower.jpeg" alt="lawnmower" height="75"/> </td>
                        </tr>
                        <tr>
                            <td> <img src="../assets/images/camera.jpeg" alt="camera" width="75"/> </td>
                            <td> 
                                <div class="mb-3">
                                    <input class="form-control" type="file" id="formFile"/>
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
                
                <td>
                    <div class="form-floating">
                        <input id="floatingInput" class="form-control" placeholder="Title"/>
                        <label for="floatingInput" style="opacity: .5;background-color: transparent;">Title</label>
                    </div>
                </td>
                
                <td>
                    <div class="form-floating">
                        <input id="floatingInput" class="form-control" placeholder="Description"/>
                        <label for="floatingInput" style="opacity: .5;background-color: transparent;">Description</label>
                    </div>
                </td>
            </tr>
        </table>*/