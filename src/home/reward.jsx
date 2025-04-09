import React from 'react';
import Modal from 'react-modal';
import { starCountContext, serverErrorContext } from './home';
import { Reward } from './reward';

export function DisplayReward(props) {
    const {starCount, setStarCount} = React.useContext(starCountContext)
    const [currentReward, setCurrentReward] = React.useState('')
    const [rewardExists, setRewardExists] = React.useState(false)
    const [catImage, setCatImage] = React.useState('')
    const {serverError, setServerError} = React.useContext(serverErrorContext)

    const getReward = async()=>{
        const response = await fetch('/api/home/reward', {
            method:'get',
        })
        if (response.ok) {
            const body = await response.json()
            if (body.reward) {
                setCurrentReward(body.reward)
                setRewardExists(true)
            } 
        }
    }
    const getCatImage = async()=>{
        const response = await fetch('https://cataas.com/cat?json=true&width=200', {
            method: 'get',
            headers: {'Content-type': 'application/json'}
        })
        if (response.ok) {
            const body = await response.json()
            setCatImage(body.url)
        }
    }

    React.useEffect(()=>{
        getReward();
        getCatImage();
    }, [])
    React.useEffect(()=>{
        setRewardExists(false);
        props.setRemoveReward(false);
    }, [props.removeReward])
    
    const updateReward = async (reward, starChange=0, image=null) => {
        const formData = new FormData()
        formData.append('reward',JSON.stringify(reward))
        formData.append('starChange', starChange)
        formData.append('image', image)
        const response = await fetch('/api/home/reward', {
            method: 'post',
            body: formData,
        })
        if (response.ok) {
            const body = await response.json()
            setServerError('')
            setCurrentReward(body.reward)
        }
        if (!response.ok) {
            try {const body = await response.json()
            if (body.type==="MulterError") {
                setServerError('Error 406: File too large')
                setRewardExists(false)
            } else {
                setServerError(`Error ${response.status}: Unable to save reward.`)
            }} catch {
                setServerError(`Error ${response.status}: Unable to save reward.`)
            }
        }
    }

    function ConstructReward({reward}) {
        function completeReward() {
            let newCount = starCount - reward.value
            setStarCount(newCount)
            setRewardExists(false)
            updateReward('', -reward.value)
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
    <div className="card mb-3" style={{maxWidth: '540px', border: 'none'}}>
        <div className="row g-0">
            <div className="col-md-4 bg-primary rounded-start" style={{display: 'flex', alignItems: 'center'}}>      
            <img src={reward.url} onError={(e)=>{e.target.onError = null; e.target.src = catImage}} className='img-fluid' style={{maxHeight: 400}} alt={reward.url}/>
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
            const handleSubmit = (name, desc, img, value) => {
            setRewardExists(true)
            let tempReward = new Reward(name, desc, 'image', value)
            setCurrentReward(tempReward)
            updateReward(tempReward, 0, img)
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
                        <label htmlFor="descriptionInput" className="form-label">Image</label>
                        <input type="file" className="form-control" id="urlInput" accept=".png, .jpeg, .jpg" onChange={(e) => setImageURL(e.target.files[0])} autoComplete="off"/>
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