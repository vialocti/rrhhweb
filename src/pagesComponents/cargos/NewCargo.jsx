import React from 'react'
import CabeceraFuncion from '../../components/CabeceraFuncion'
import BuscarPersona from '../../components/BuscarPersona'
import CargosVigentes from '../../components/cargos/CargosVigentes'
import FormularioCargo from '../../components/cargos/FormularioCargo'
import { useSelector } from 'react-redux'



const NewCargo = () => {

  const legajo = useSelector(state=>state.agente.legajo)
  const nombre = useSelector(state=>state.agente.nombre)
  console.log(nombre)
  return (
    
    <>
    
    <BuscarPersona />
    {legajo?<>
      <CabeceraFuncion titulo={`Operación: Alta, Baja o Renovación de Cargos`} />
      <CargosVigentes page={1}/>
      <FormularioCargo />
      <br/>
    </>:null
    }
    </>
  )
}

export default NewCargo