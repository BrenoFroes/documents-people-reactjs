import React from 'react'
import ReactDOM from 'react-dom'
import './Menu.css'
import Modal from 'react-modal'
import ModalCustom from '../ModalCustom'


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
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className='menu'>
      <ModalCustom title='Cadastrar usuário' button='Cadastrar usuário'>
      </ModalCustom>
      <ModalCustom title='Criar contrato' button='Criar contrato'>
      </ModalCustom>
    </div>
  );
}