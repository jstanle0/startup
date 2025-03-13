import React from 'react';
import Modal from 'react-modal';
import { starCountContext } from './home';
import { Reward } from './reward';

export function DisplayReward(props) {
    const {starCount, setStarCount} = React.useContext(starCountContext)
    const [currentReward, setCurrentReward] = React.useState(JSON.parse(localStorage.getItem('reward')) || '')
    const [rewardExists, setRewardExists] = React.useState(currentReward ? true : false)

    async function save(name, item) {
        localStorage.setItem(name, JSON.stringify(item))
    }

    const updateStarCount = async (starChange) => {
        fetch('/api/home/starCount', {
          method: 'put',
          body: JSON.stringify({starCount: starChange}),
          headers: {'Content-type': 'application/json; charset=UTF-8'},
        })
    }

    function ConstructReward({reward}) {
        function completeReward() {
            let newCount = starCount - reward.value
            setStarCount(newCount)
            //save('starCount', newCount)
            updateStarCount(-reward.value)
            props.handleRecentEvent(['reward', reward])
            setRewardExists(false)
            save('reward', '')
        }
        function ProgressBar() {
            if (starCount >= reward.value) {
                return <button type="button" className="btn btn-secondary btn-lg" style={{"maxWidth": "200px"}} onClick={()=>completeReward()} >Complete!</button>
            } else {
                return <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={starCount} aria-valuemin="0" aria-valuemax={reward.value}>
                <div className='progress-bar' style={{width: ((starCount/reward.value) * 100).toFixed(2) + '%'}}></div>
            </div>
                
            }
        }
    return <>
    {/*<div className='card bg-primary-subtle mb-3'>
      <img src={image} className="card-img-top" alt="reward image"/>
      <div className="card-body bg-warning rounded-bottom">
          <h5 className="card-title bg-warning">{title}</h5>
          <p className="card-text bg-warning">{caption}</p>
          <p className="card-text bg-warning">{starCount}/{starValue} <img alt="star" src="/images/star.png" height="15" className='bg-warning'></img></p>
          <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={starCount} aria-valuemin="0" aria-valuemax={starValue}>
              <div className='progress-bar' style={{width: ((starCount/starValue) * 100).toFixed(2) + '%'}}></div>
          </div>
      </div>
    </div>*/}
    <div className="card mb-3" style={{maxWidth: '540px', border: 'none'}}>
        <div className="row g-0">
            <div className="col-md-4 bg-primary rounded-start" style={{display: 'flex', alignItems: 'center'}}>
            <img src={reward.url} className="img-fluid rounded-start" alt={reward.url}/>
            </div>
            <div className="col-md-8">
                <div className="card-body bg-warning rounded-end">
                    <h5 className="card-title bg-warning">{reward.name}</h5>
                    <p className="card-text bg-warning">{reward.desc}</p>
                    <p className="card-text bg-warning">{starCount}/{reward.value} <img alt="star" src="/images/star.png" height="15" className='bg-warning'></img></p>
                    <ProgressBar />
                </div>
            </div>
        </div>
    </div>
    </>
    }
    function RewardModal() {
        
            const [modalIsOpen, setIsOpen] = React.useState(false);
          
            function openModal() {
                setIsOpen(true);
            }
          
            function closeModal() {
                setIsOpen(false);
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
              
                /*function afterOpenModal() {
                  // references are now sync'd and can be accessed.
                  subtitle.style.color = '#f00';
                }*/
            const handleSubmit = (name, desc, url, value) => {
            setRewardExists(true)
            let tempReward = new Reward(name, desc, url, value)
            setCurrentReward(tempReward)
            save('reward', tempReward)
            }
    
            const [rewardName, setRewardName] = React.useState("");
            const [rewardDesc, setRewardDesc] = React.useState("");
            const [imageURL, setImageURL] = React.useState("");
            const [starValue, setStarValue] = React.useState("");
        
        return (
            <div>
            <button type="button" className="btn btn-secondary btn-lg" style={{"maxWidth": "200px"}} onClick={openModal}>Create a reward!</button>

            <Modal
                isOpen={modalIsOpen}
                //onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Reward Modal"
            >
                <form onSubmit={()=>handleSubmit(rewardName, rewardDesc, imageURL, parseInt(starValue))}>
                    <div className="mb-3">
                        <label htmlFor="goalInput" className="form-label">Reward</label>
                        <input type="goal" className="form-control" id="goalInput" value={rewardName} onChange={(e) => setRewardName(e.target.value)} required autoComplete="off"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="descriptionInput" className="form-label">Description</label>
                        <input type="description" className="form-control" id="descriptionInput" value={rewardDesc} onChange={(e) => setRewardDesc(e.target.value)} required autoComplete="off"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="descriptionInput" className="form-label">Image URL</label>
                        <input type="imageURL" className="form-control" id="urlInput" value={imageURL} onChange={(e) => setImageURL(e.target.value)} required autoComplete="off"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="starCountInput" className="form-label">Star Count</label>
                        <input type="number" className="form-control" id="starCountInput" value={starValue} onChange={(e)=> setStarValue(e.target.value)} required autoComplete="off"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
            </Modal>
            </div>
        );
        
    }
    if (rewardExists) {
        return  <ConstructReward reward={currentReward}/>

    } else {
    return (
        <>
        <RewardModal/>
        </>
    )
  }}