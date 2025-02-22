import React from 'react';
import './community.css';

import { Notifier } from './postNotifier';

export function Community() {
    const [posts, setPosts] = React.useState([]);

    React.useEffect(()=> {
      Notifier.addHandler(notificationHandler);
      return () => Notifier.removeHandler(notificationHandler);
    }, []);

    function notificationHandler(post) {
          setPosts((prevPosts)=>{
            let newPosts = [post, ...prevPosts]
            if (newPosts.length > 10) {
              newPosts = newPosts.slice(1, 10)
            } 
             return newPosts
          })
          
    };
    function displayPosts() {
      const postArray = []
      for (const [i, post] of posts.entries()) {
          let title = 'unknown';
          if (post.type == 'reward') {
            title = post.username + " has reached their reward!"
          } else {
            title = post.username + " has finished their goal!"
          }
          postArray.push(
          <div key={i}>
            <FormatPost name={title} caption={post.message} image={post.imageSrc}/>
          </div>
          );
      }
      
      return postArray;
    }
    return <main className="community-main">
    <h3>Welcome to the community page!</h3>
    <p>Finding posts near you...</p>
        <div className="community-content-container">
          {displayPosts()/*<FormatPost name="Suzy reached their reward!" caption="I earned 500 stars and got the ferrari!" image="/images/ferrari.jpeg"/>
          <FormatPost name="Chris acheived their goal!" caption="I mowed my lawn!" image="/images/lawnmower.jpeg"/>
          <FormatPost name="Russel acheived their goal!" caption="I did my CS260 Homework!" image="/images/sketch1.jpeg"/>
          <FormatPost name="Terrie earned their reward!" caption="I got 10000 stars and earned a camera!" image="/images/camera.jpeg"/>*/}
        </div>
    </main>;
}

function FormatPost({name, caption, image}) {
    return <div className='post'>
      <div className='post-name'>{name}</div>
      <div className='post-body'>   
        <img alt='image' src={image}/>
        <p>{caption}</p>
      </div> 
    </div>
}