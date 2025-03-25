import React from "react";
import Modal from 'react-modal';
import {Goal} from './goal';
import { starCountContext } from "./home";

export function CurrentGoals(props){
    const [goals, setGoals] = React.useState([]);
    const {starCount, setStarCount} = React.useContext(starCountContext);

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

    const addGoal = async (newGoal) =>
        {
          fetch('/api/home/goal', {
            method: 'post',
            body: JSON.stringify({goal: newGoal}),
            headers: {'Content-type': 'application/json; charset=UTF-8',},
          });
        setGoals(()=> {
          let newGoals = [...goals, newGoal]
          return newGoals
        })
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
        <div className='goal-caption'>{goal.description}</div>
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
       const handleSubmit = (name, description, count) => {
        if (name && description && count) {
          addGoal(new Goal(name, description, count))
        } 
       }

       const [goalName, setGoalName] = React.useState("");
       const [goalDesc, setGoalDesc] = React.useState("");
       const [starValue, setStarValue] = React.useState("")
  
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
                  <label htmlFor="descriptionInput" className="form-label">Description</label>
                  <input type="description" className="form-control" id="descriptionInput" value={goalDesc} onChange={(e) => setGoalDesc(e.target.value)} required autoComplete="off"/>
              </div>
              <div class="mb-3">
                  <label htmlFor="starCountInput" className="form-label">Star Count</label>
                  <input type="number" className="form-control" id="starCountInput" value={starValue} onChange={(e)=> setStarValue(e.target.value)} required autoComplete="off"/>
              </div>
              <button type="submit" className="btn btn-primary" onClick={()=>handleSubmit(goalName, goalDesc, parseInt(starValue)) }>Submit</button>
              </form>
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


