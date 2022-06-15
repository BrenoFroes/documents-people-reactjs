import React from 'react'
import ReactDOM from 'react-dom'
import './ModalCustom.css'
import Modal from 'react-modal'
import { MdPersonAddAlt1 } from "react-icons/md"
import { MdNoteAdd } from "react-icons/md"

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function(props) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>
        <span>
          { props.button === 'Cadastrar usuário' ? 
            <MdPersonAddAlt1/>
            :
            <MdNoteAdd/>
          }
        </span>
        <p>
          {props.button}
        </p>
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Modal"
        ariaHideApp={false}
      >
        <h1>{props.title}</h1>
        {props.children}
      </Modal>
    </div>
  );
}