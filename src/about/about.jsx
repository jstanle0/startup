import React from 'react';
import './about.css'

export function About() {
    const [imageSrc, changeImageSrc] = React.useState("loading...")
    React.useEffect( () => {
        changeImageSrc("/images/space.jpeg")
    }, []);
    return <main className='aboutMain'>
    <img alt="Space" src={imageSrc}/>
    <h3>About:</h3>
    <p>
    Many of us have a lot of different things that we want to get done, but lack the self-motivation to complete it. Shoot for the Stars is a solution to that! Just pick a thing you want, and Shoot for the Stars will help you use it as a motivator to achieve your goals and start good habits. With a simple and intuitve design, it'll keep you coming back until you achieve everything you'd hoped, if not more!
    </p>
    <h3>Key Features: </h3>
    <ul>
        <li><b>Treat yourself!</b> Pick a reward, write a description of it, add a photo -- Whatever helps you remember why your're achieving your goals.</li>
        <li><b>Set goals!</b> Set goals to earn stars, and add a due date to help you complete them.</li>
        <li><b>Share with friends!</b> Proud of your achivements? Post them to the community on the community board!</li>
    </ul>
</main>;
}