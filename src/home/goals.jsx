import React from "react";

export function CurrentGoals(){
    return <div className="currentGoals">
        <div className='goal-container'>
        <Goal name="Mow Lawn" timeframe="This week" starvalue="5"/>
        <Goal name="Do CS260 HW" timeframe="Today" starvalue="3"/>
        <Goal name="Complete React Deliverable" timeframe="Tomorrow" starvalue="4"/>
        </div>
        <button type="button" className="btn btn-primary btn-lg" style={{"maxWidth": "200px"}}>Create new Goal!</button>
    </div>
}
function Goal({name, timeframe, starvalue}) {
    return <div className='item-wrapper'>
      <div className='goal-title'>{name}</div>
      <div className='goal-caption'>{timeframe}</div>
      <div className='goal-counter'><img alt="star" src="/images/star.png" height="15" /><text>{starvalue}</text></div>
      <button className='btn btn-outline-secondary'>Complete!</button>
    </div>
}