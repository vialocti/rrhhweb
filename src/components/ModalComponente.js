import React from 'react'
import '../css/modal.css'


export const ModalComponente = ({ children, isOpen, closeModal }) => {
  return (
    <article className={`modal ${isOpen && "is-open"}`}>

      <div className='modal-container'>
        <button className='modal-close' onClick={closeModal}>X</button>
        {children}

      </div>


    </article>
  )
}
