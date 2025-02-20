import React from "react";
import Modal from 'react-modal';
import {Goal} from './goal'

export function CurrentGoals(){
    const [goals, setGoals] = React.useState([]);

    const addGoal = (newGoal) =>
        {
        setGoals(()=> {
          let newGoals = [...goals, newGoal]
          return newGoals
        })
    }
    const removeGoal = (goalId) => {
      setGoals(
        goals.filter((_, index) => index !== goalId)
      )
    }
    const goal1 = new Goal("Mow Lawn", "This week", 5)

    function createGoalArray() {
        const goalArray = []
        for (const [i, goal] of goals.entries()) {
            goalArray.push(<DisplayedGoal key={i} index={i} goal={goal}/>)
            
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
    return (
      <div>
      <button type="button" className="btn btn-primary btn-lg" style={{"maxWidth": "200px"}} onClick={openModal}>Create new Goal!</button>
        <Modal
          isOpen={modalIsOpen}
          //onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <form>
              <div className="mb-3">
                  <label for="goalInput" className="form-label">Goal</label>
                  <input type="goal" className="form-control" id="goalInput"/>
              </div>
              <div class="mb-3">
                  <label for="descriptionInput" className="form-label">Description</label>
                  <input type="description" className="form-control" id="descriptionInput"/>
              </div>
              <div class="mb-3">
                  <label for="starCountInput" className="form-label">Star Count</label>
                  <input type="number" className="form-control" id="starCountInput"/>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
              </form>
        </Modal>
        </div>
    );
  }
    
    return <div className="currentGoals">
        <div className='goal-container'>
            {createGoalArray()}
    
        </div>
        <button onClick={()=>(addGoal(goal1))}>add</button>
        <button onClick={()=>(removeGoal(0))}>remove</button>
        <GoalModal />
    </div>
}


