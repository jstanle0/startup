import React from "react";
import Modal from 'react-modal';
import {Goal} from './goal';
import { starCountContext, serverErrorContext } from "./home";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import moment from "moment";

export function CurrentGoals(props){
    const [goals, setGoals] = React.useState([]);
    const {starCount, setStarCount} = React.useContext(starCountContext);
    const {serverError, setServerError} = React.useContext(serverErrorContext);

    async function getGoals() {
      const response = await fetch('/api/home/goals', {
        method: 'get',
      })
      if (response.status===200) {
        const body = await response.json();
        setGoals(body.goals);
      }
    }

    React.useEffect(()=>{
      getGoals()
    }, [])

    const addGoal = async (newGoal) => {
        setGoals(()=> {
          let newGoals = [...goals, newGoal]
          return newGoals
        })
        const response = await fetch('/api/home/goal', {
          method: 'post',
          body: JSON.stringify({goal: newGoal}),
          headers: {'Content-type': 'application/json; charset=UTF-8',},
        });
        if (!response.ok) {
          setServerError(`Error ${response.status}: Unable to save goal.`)
        }
    }

    async function changeGoals(goalId, starChange) {
      const response = await fetch('/api/home/goal', {
        method: 'delete',
        body: JSON.stringify({index: goalId, starChange: starChange}),
        headers: {'Content-type': 'application/json; charset=UTF-8',},
      })
      if (response.ok) {
        const body = await response.json()
        setGoals(body.goals || [])
        setServerError('')
      } else {
        setServerError(`Error ${response.status}: Unable to save goal.`)
      }
    }

    const removeGoal = (goalId) => {
      let newCount = starCount + goals[goalId].count
      setStarCount(newCount)
      changeGoals(goalId, goals[goalId].count);
    }

    function createGoalArray() {
        const goalArray = []
        for (const [i, goal] of goals.entries()) {
            goalArray.push(<DisplayedGoal key={i} index={i} goal={goal}/>)
            
        }
        if (goalArray.length === 0) {
          return <p>No goals right now. It's time to make some new ones!</p>
        }
        return goalArray;
    }

    function DisplayedGoal({goal, index}) {
      return <div className='item-wrapper'>
        <div className='goal-title'>{goal.name}</div>
        {goal.date && 
        (moment(goal.date, "MM/DD").isAfter(moment()) &&
        <div className='goal-caption'>{goal.date}</div>)
        || <div className='goal-caption text-secondary'>{goal.date}</div>
        }
        <div className='goal-counter'><img alt="star" src="/images/star.png" height="15" />{goal.count}</div>
        <button className='btn btn-outline-secondary' onClick={()=>{removeGoal(index)}}>Complete!</button>
      </div>
    }

    function GoalModal (props) {

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
       const handleSubmit = (e, name, date, count) => {
        e.preventDefault();
        if (name && count) {
          addGoal(new Goal(name, date, count))
        }
        setModalError("Invalid information")
       }

       const [goalName, setGoalName] = React.useState("");
       const [goalDate, setGoalDate] = React.useState("");
       const [starValue, setStarValue] = React.useState("");
       const [modalError, setModalError] = React.useState("");
  
    return (
      <div>
      <button type="button" className="btn btn-primary btn-lg" style={{"maxWidth": "200px"}} onClick={openModal}>Create new Goal!</button>
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
                  {/*<label htmlFor="descriptionInput" className="form-label">Description</label>
                  <input type="description" className="form-control" id="descriptionInput" value={goalDesc} onChange={(e) => setGoalDesc(e.target.value)} required autoComplete="off"/>*/}
                  <label htmlFor="dateInput" className="form-label">Due Date</label>
                  <Datetime id="dateInput" timeFormat={false} value={goalDate} onChange={(e)=>{try {setGoalDate(moment(e._d).format("MM/DD"))} catch {setGoalDate("")}}}/>
              </div>
              <div class="mb-3">
                  <label htmlFor="starCountInput" className="form-label">Star Count</label>
                  <input type="number" className="form-control" id="starCountInput" value={starValue} onChange={(e)=> setStarValue(e.target.value)} required autoComplete="off"/>
              </div>
              <button type="submit" className="btn btn-primary" onClick={(e)=>handleSubmit(e, goalName, goalDate, parseInt(starValue)) }>Submit</button>
              </form>
              {modalError && <div className="badge text-bg-secondary">Error: {modalError}</div>}
        </Modal>
        </div>
    );
  }
    
    return <div className="currentGoals">
        <div className='goal-container'>
            {createGoalArray()}
    
        </div>
        <GoalModal />
    </div>
}


