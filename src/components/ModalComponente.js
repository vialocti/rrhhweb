import React from 'react'
import '../css/modal.css'
//<button className='modal-close' onClick={closeModal}>X</button>

export const ModalComponente = ({ children, isOpen, closeModal }) => {
  return (
    <article className={`modal ${isOpen && "is-open"}`}>

      <div className='modal-container'>

        {children}

      </div>


    </article>
  )
}
