import BuscarPersona from '../../components/BuscarPersona'
import CabeceraFuncion from '../../components/CabeceraFuncion'
import DatosPersona from '../../components/agentes/DatosPersona'
import React from 'react'
import {useSelector} from 'react-redux'
import DatosPersonales from '../../components/agentes/DatosPersonales'
import DatosDomiconta from '../../components/agentes/DatosDomiconta'
import DatosFamilia from '../../components/agentes/DatosFamilia'
import CargosVigentes from '../../components/cargos/CargosVigentes'
import CargosHistoricos from '../../components/cargos/CargosHistoricos'
import DatosAntiguedad from '../../components/agentes/DatosAntiguedad'

const FichaAgentePage = () => {
  const legajo =useSelector(state=>state.agente.legajo)
  return (
    <>
      <BuscarPersona />
      {legajo?<>
      <CabeceraFuncion titulo='Información Agente'/>
      <DatosPersona />
     <DatosPersonales />
     <DatosDomiconta />
     <DatosFamilia />
     <DatosAntiguedad />
     <CargosVigentes page={2} legajo={legajo} />
     <CargosHistoricos legajo={legajo}/>
     
      </>:null
      }
    </>
  )
}

export default FichaAgentePage