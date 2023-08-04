import React from 'react'
import { useSelector } from 'react-redux'

import { CabTituloAgente} from '../styles-components/formularios/FormAgente' 


const CabeceraFuncion_simple = () => {

  const legajo = useSelector(state=>state.agente.legajo)
  const nombre = useSelector(state=>state.agente.nombre)
return (

    <div className='container'>
       
       
      <CabTituloAgente>Colaborador:{nombre}, Legajo:{legajo}</CabTituloAgente>
      

   </div>

  )
}




export default CabeceraFuncion_simple