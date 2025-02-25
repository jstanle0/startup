import React from 'react';
import Modal from 'react-modal';
import './community.css';

import { Notifier } from './postNotifier';

export function Community() {
    const [posts, setPosts] = React.useState([]);
    const [recentEvents, setRecentEvents] = React.useState(JSON.parse(localStorage.getItem('recentEvents'))||'')
    

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
    function AddPostModal() {
        const [isOpen, setIsOpen] = React.useState(false)
        const openModal = () => setIsOpen(true)
        const closeModal = () => setIsOpen(false)
        const customStyles = {
            content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#FAFAFF',
            },
        };

        return (<div>
        <button type="button" className="btn btn-primary btn-lg" style={{"maxWidth": "200px"}} onClick={openModal}>Create a post!</button>

        <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='create post modal'
        >

        </Modal>
        </div>)
    }
    return <main className="community-main">
    <h3>Welcome to the community page!</h3>
    <AddPostModal />
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