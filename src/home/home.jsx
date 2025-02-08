import React from 'react';
import './home.css';

export function Home() {
    return <main>
    <div className="home-content-container">
        <span className="star-counter"><img src="/images/star.png" alt="star" height="20"/> Number of stars: <b>35</b></span>
        <h3>Welcome [username]!</h3>
        <Reward image="/images/ferrari.jpeg" title="Ferrari" caption="Don't you want a ferrari??"/>
        <button className="btn btn-secondary btn-lg">Create Reward!</button>
        <h3>Current Goals Placeholder</h3>
        <CurrentGoals/>
        <button type="button" className="btn btn-primary btn-lg">Create new Goal!</button>
    </div>
</main>;
}
function CurrentGoals(){
    return <div className='goal-container'>
      <Goal name="Mow Lawn" timeframe="This week" starvalue="5"/>
      <Goal name="Do CS260 HW" timeframe="Today" starvalue="3"/>
      <Goal name="Complete React Deliverable" timeframe="Tomorrow" starvalue="4"/>
    </div>;
}
function Goal({name, timeframe, starvalue}) {
    return <div className='item-wrapper'>
      <div className='goal-title'>{name}</div>
      <div className='goal-caption'>{timeframe}</div>
      <div className='goal-counter'><img alt="star" src="/images/star.png" height="15" /><text>{starvalue}</text></div>
      <button className='btn btn-outline-secondary'>Complete!</button>
    </div>
}
function Reward({image, title, caption}) {
  return <div className='card bg-primary-subtle'>
    <img src={image} className="card-img-top" alt="reward image"/>
    <div className="card-body bg-warning">
    <h5 className="card-title bg-warning">{title}</h5>
    <p className="card-text bg-warning">{caption}</p>
    <p className="card-text bg-warning">35/70 <img alt="star" src="/images/star.png" height="15" className='bg-warning'></img></p>
      <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
      <div className="progress-bar w-50"></div>
   

    </div>
  </div>

  </div>
}
/*
<table>
            <tr>
                <th>Name |</th>
                <th>Timeframe |</th>
                <th># of <img src="../assets/images/star.png" alt="star" height="15"/></th> 
            </tr>
            <tr>
                <td>Mow Lawn |</td>
                <td>This week |</td>
                <td>5</td>
                <td><button>Complete!</button></td>
            </tr>
            <tr>
                <td>Do CS260 HW |</td>
                <td>Today |</td>
                <td>3</td>
                <td><button>Complete!</button></td>
            </tr>
        </table>
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