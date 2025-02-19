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
    
      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
      }
  return (
    <div>
    <button type="button" className="btn btn-primary btn-lg" style={{"maxWidth": "200px"}} onClick={openModal}>Create new Goal!</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        //style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
      </div>
  );
}