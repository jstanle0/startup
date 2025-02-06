import React from 'react';
import './community.css'

export function Community() {
    return <main className="community-main">
    <h3>Welcome to the community page!</h3>
    <p>Finding posts near you...</p>
        <div className="community-content-container">
          <Post name="Suzy reached their reward!" caption="I earned 500 stars and got the ferrari!" image="/images/ferrari.jpeg"/>
          <Post name="Chris acheived their goal!" caption="I mowed my lawn!" image="/images/lawnmower.jpeg"/>
          <Post name="Russel acheived their goal!" caption="I did my CS260 Homework!" image="/images/sketch1.jpeg"/>
          <Post name="Terrie earned their reward!" caption="I got 10000 stars and earned a camera!" image="/images/camera.jpeg"/>
        </div>
    </main>;
}

function Post({name, caption, image}) {
    return <div className='post'>
      <div className='post-name'>{name}</div>
      <div className='post-body'>   
        <img alt='image' src={image}/>
        <p>{caption}</p>
      </div> 
    </div>
}