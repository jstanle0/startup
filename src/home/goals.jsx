import React from "react";
import Modal from 'react-modal'

export function CurrentGoals(){
    
    return <div className="currentGoals">
        <div className='goal-container'>
        <Goal name="Mow Lawn" timeframe="This week" starvalue="5"/>
        <Goal name="Do CS260 HW" timeframe="Today" starvalue="3"/>
        <Goal name="Complete React Deliverable" timeframe="Tomorrow" starvalue="4"/>
        </div>
        
        <ExampleModal />
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

function ExampleModal (props) {
    let subtitle;
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