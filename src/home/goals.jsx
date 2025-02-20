import React from "react";
import Modal from 'react-modal';
import {Goal} from './goal'

export function CurrentGoals(){
    
    return <div className="currentGoals">
        <div className='goal-container'>
        <DisplayedGoal goal={new Goal("Mow Lawn", "This week", 5)}/>
        <DisplayedGoal goal={new Goal("Do CS260 HW","Today","3")}/>
        <DisplayedGoal goal={new Goal("Complete React Deliverable","Tomorrow","4")}/>
        </div>
        
        <GoalModal />
    </div>
}
function DisplayedGoal({goal}) {
    return <div className='item-wrapper'>
      <div className='goal-title'>{goal.name}</div>
      <div className='goal-caption'>{goal.description}</div>
      <div className='goal-counter'><img alt="star" src="/images/star.png" height="15" /><text>{goal.count}</text></div>
      <button className='btn btn-outline-secondary'>Complete!</button>
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
            <div class="mb-3">
                <label for="goalInput" class="form-label">Goal</label>
                <input type="goal" class="form-control" id="goalInput"/>
            </div>
            <div class="mb-3">
                <label for="descriptionInput" class="form-label">Description</label>
                <input type="description" class="form-control" id="descriptionInput"/>
            </div>
            <div class="mb-3">
                <label for="starCountInput" class="form-label">Star Count</label>
                <input type="number" class="form-control" id="starCountInput"/>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            </form>
      </Modal>
      </div>
  );
}