import React from 'react'
import reactDOM from 'react-dom'

import './styles/Modal.scss'

function AddProductModal(props) {

  if(!props.isOpen){
    return null;
  }; 

  return reactDOM.createPortal (
    <div className='modal-cont'>
      <div className='modal-card'>
        <div 
          onClick={() => { props.setIsOpen(false) }}  
          className='closeButtonContainer'
        >
          <p >X</p>
        </div>
      </div>
    </div>,
    document.getElementById('add_prod')
  )
}

export { AddProductModal }