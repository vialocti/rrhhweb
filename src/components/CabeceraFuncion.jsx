import React from 'react'
import { useSelector } from 'react-redux'

import {CabTitulo, CabTituloAgente} from '../styles-components/formularios/FormAgente' 


const CabeceraFuncion = ({titulo}) => {

  const legajo = useSelector(state=>state.agente.legajo)
  const nombre = useSelector(state=>state.agente.nombre)
return (

    <div className='container-fluid'>
       
       <CabTitulo>{titulo}</CabTitulo>
      <CabTituloAgente>Colaborador:{nombre} - Legajo:{legajo}</CabTituloAgente>
      

   </div>

  )
}




export default CabeceraFuncion