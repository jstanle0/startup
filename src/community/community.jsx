import React from 'react';
import Modal from 'react-modal';
import './community.css';

import { Notifier, Post } from './postNotifier';
import { usernameContext } from '../app';

export function Community() {
    const [posts, setPosts] = React.useState([]);
    const [recentEvents, setRecentEvents] = React.useState('')
    const [images, setImages] = React.useState([])
    const {username, setUsername} = React.useContext(usernameContext)
    
    async function getRecentEvents() {
      async function appendImage(image) {
        if (image[1]) {
          images.push(image)
        } else {
          const response = await fetch('https://cataas.com/cat?json=true&width=100', {
            method: 'get',
            headers: {'Content-type': 'application/json'}
        })
        if (response.ok) {
            const body = await response.json()
            images.push(["Cat Image", body.url])
        }
        }
      }
      const response = await fetch('/api/community/recentEvents', {method: 'get'})
      if (response.ok) {
        const body = await response.json()
        setRecentEvents(body.recentEvents)
        await appendImage(["Current reward image", body.curImage])
        await appendImage(["Previous reward image", body.prevImage])
      }
    }

    React.useEffect(()=> {
      getRecentEvents();
      Notifier.addHandler(notificationHandler);
      return () => Notifier.removeHandler(notificationHandler);
    }, []);

    function notificationHandler(post) {
          setPosts((prevPosts)=>{
            let newPosts = [post, ...prevPosts]
            if (newPosts.length > 9) {
              newPosts = newPosts.slice(0, 9)
            } 
             return newPosts
          })
          
    };
    function displayPosts() {
      const postArray = []
      for (const [i, post] of posts.entries()) {
          let title = 'unknown';
          if (post.type == 'reward') {
            title = post.username + " has reached their reward: " + post.name
          } else {
            title = post.username + " has finished their goal: " + post.name
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
        const openModal = () => {
          setIsOpen(true)
          Notifier.pause()
        }
        const closeModal = () => {
          setIsOpen(false)
          Notifier.resume()
        }
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

        const [selectedEvent, setSelectedEvent] = React.useState()
        const [comments, setComments] = React.useState('')
        const [imageURL, setImageURL] = React.useState('')

        async function handleSubmit(e, currentEventIndex, comment, src) {
          e.preventDefault();
          closeModal()
          let currentEvent = recentEvents[currentEventIndex]
          Notifier.brodcastPost(username, currentEvent[1].name, currentEvent[0], comment, src)
          /*fetch('/api/community/post', {
            method:'post',
            body: JSON.stringify({post: new Post(username, currentEvent[1].name, currentEvent[0], comment, src)}),
            headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                  },
          })*/
        }

        if (recentEvents && username) { 
          return (<div>
          <button type="button" className="btn btn-primary btn-lg" style={{"maxWidth": "200px"}} onClick={openModal}>Create a post!</button>

          <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel='create post modal'
          >
            <form onSubmit={(e)=>handleSubmit(e, selectedEvent, comments, imageURL)}>
              <div className="mb-3">  
              <select className="form-select" aria-label="Select post topic" onChange={(e)=>setSelectedEvent(e.target.value)} required>
                <option defaultValue="">Select a recent event to post about</option>
                {recentEvents.map((recentEvent, index) => <option key={index} value={index}>{recentEvent[0]}: {recentEvent[1].name}</option>)}
              </select>
              </div>
              <div className="mb-3">
                <label htmlFor="modalTextarea" className="form-label">Comments</label>
                <textarea className="form-control" placeholder="Leave a comment here" id="modalTextarea" required autoComplete="off" value={comments} onChange={(e)=>setComments(e.target.value)}></textarea>
              </div>
              <div className="mb-3">
                        <label htmlFor="descriptionInput" className="form-label">Image</label>
                        {images.map((i, index)=> {return <div><input type="radio" className="form-check-input" name="image" value={i[1]} id={`radio${index}`} checked={imageURL === i[1]} onChange={(e)=>setImageURL(e.target.value)}/>
                        <label htmlFor={`radio${index}`} className="form-check-label">{i[0]}</label></div>})}
                    </div>
              <button type="submit" className="btn btn-warning" style={{"maxWidth": "200px"}} disabled={!selectedEvent||!comments||!imageURL}>Post it!</button>

            </form>
          </Modal>
        </div>)} else {
          return <p>Acheive some goals or complete a reward to make your own post!</p>
        }
        
    }
    return <main className="community-main">
    <h3>Welcome to the community page!</h3>
    <AddPostModal />
    {!Notifier.connected && <p>Connecting to server...</p>}
    {Notifier.connected && <p>Finding posts near you...</p>}
        <div className="community-content-container">
          {displayPosts()}
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