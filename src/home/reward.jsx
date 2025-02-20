import React from 'react';
import Modal from 'react-modal';
import { starCountContext } from './home';

export function DisplayReward() {
    const {starCount, setStarCount} = React.useContext(starCountContext)

    function Reward({image, title, caption, starValue}) {
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
    <div className="card mb-3 bg-primary-subtle" style={{maxWidth: '540px'}}>
        <div className="row g-0">
            <div className="col-md-4 bg-primary rounded-start" style={{display: 'flex', alignItems: 'center'}}>
            <img src="/images/ferrari.jpeg" className="img-fluid rounded-start" alt="ferrari"/>
            </div>
            <div className="col-md-8">
                <div className="card-body bg-warning rounded-end">
                    <h5 className="card-title bg-warning">{title}</h5>
                    <p className="card-text bg-warning">{caption}</p>
                    <p className="card-text bg-warning">{starCount}/{starValue} <img alt="star" src="/images/star.png" height="15" className='bg-warning'></img></p>
                    <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={starCount} aria-valuemin="0" aria-valuemax={starValue}>
                        <div className='progress-bar' style={{width: ((starCount/starValue) * 100).toFixed(2) + '%'}}></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    }
    return (
        <>
        <Reward image="/images/ferrari.jpeg" title="ferrari" caption="i want ferrari pls" starValue={20}/>
        <button type="button" className="btn btn-secondary btn-lg" style={{"maxWidth": "200px"}}>Create new Reward!</button>
        </>
    )
  }