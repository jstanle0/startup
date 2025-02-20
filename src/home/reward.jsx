import React from 'react';
import Modal from 'react-modal';
import { starCountContext } from './home';

export function DisplayReward() {
    const {starCount, setStarCount} = React.useContext(starCountContext)
    const [rewardExists, setRewardExists] = React.useState(false)

    function Reward({image, title, caption, starValue}) {
        function completeReward() {
            setStarCount(starCount - starValue)
            setRewardExists(false)
        }
        function ProgressBar() {
            if (starCount >= starValue) {
                return <button type="button" className="btn btn-secondary btn-lg" style={{"maxWidth": "200px"}} onClick={()=>completeReward()} >Complete!</button>
            } else {
                return <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={starCount} aria-valuemin="0" aria-valuemax={starValue}>
                <div className='progress-bar' style={{width: ((starCount/starValue) * 100).toFixed(2) + '%'}}></div>
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
            <img src="/images/ferrari.jpeg" className="img-fluid rounded-start" alt="ferrari"/>
            </div>
            <div className="col-md-8">
                <div className="card-body bg-warning rounded-end">
                    <h5 className="card-title bg-warning">{title}</h5>
                    <p className="card-text bg-warning">{caption}</p>
                    <p className="card-text bg-warning">{starCount}/{starValue} <img alt="star" src="/images/star.png" height="15" className='bg-warning'></img></p>
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
            const handleSubmit = () => {
            setRewardExists(true)
            }
    
            const [goalName, setGoalName] = React.useState("");
            const [goalDesc, setGoalDesc] = React.useState("");
            const [starValue, setStarValue] = React.useState("")
        
        return (
            <div>
            <button type="button" className="btn btn-secondary btn-lg" style={{"maxWidth": "200px"}} onClick={openModal}>Create a reward!</button>

            <Modal
                isOpen={modalIsOpen}
                //onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Goal Modal"
            >
                <form>
                    <div className="mb-3">
                        <label htmlFor="goalInput" className="form-label">Goal</label>
                        <input type="goal" className="form-control" id="goalInput" value={goalName} onChange={(e) => setGoalName(e.target.value)} required autoComplete="off"/>
                    </div>
                    <div class="mb-3">
                        <label htmlFor="descriptionInput" className="form-label">Description</label>
                        <input type="description" className="form-control" id="descriptionInput" value={goalDesc} onChange={(e) => setGoalDesc(e.target.value)} required autoComplete="off"/>
                    </div>
                    <div class="mb-3">
                        <label htmlFor="starCountInput" className="form-label">Star Count</label>
                        <input type="number" className="form-control" id="starCountInput" value={starValue} onChange={(e)=> setStarValue(e.target.value)} required autoComplete="off"/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={()=>handleSubmit() }>Submit</button>
                    </form>
            </Modal>
            </div>
        );
        
    }
    if (rewardExists) {
        return  <Reward image="/images/ferrari.jpeg" title="ferrari" caption="i want ferrari pls" starValue={20}/>

    } else {
    return (
        <RewardModal/>
    )
  }}