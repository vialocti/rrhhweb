import { useState } from 'react'

export const useModal = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState)
    const [modi, setModi] = useState(false)
    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)
    const modifica = () => setModi(!modi)
    return [isOpen, modi, openModal, closeModal, modifica]
}