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
import { Tab, Tabs } from 'react-bootstrap'

const FichaAgentePage = () => {
  const legajo =useSelector(state=>state.agente.legajo)
  return (
    <>
      <BuscarPersona /> 
      <CabeceraFuncion titulo='Información Agente'/>
      {legajo?<div className='container-fluid m-2'>
     
      
      <Tabs justify variant='pills' defaultActiveKey='persona' className='mb-1 p-0'>
      
      <Tab eventKey='persona' title="Datos Principales">
            <DatosPersona />
        </Tab>
        <Tab eventKey='personales' title="Datos Personal">
            <DatosPersonales />
        </Tab>
      
        <Tab eventKey='contacto' title="Datos Contacto">
          <DatosDomiconta />    
        </Tab>
        <Tab eventKey='familia' title='Datos Familia'>
          <DatosFamilia />    
        </Tab>
        <Tab eventKey='antiguedad' title='Datos Antiguedad'>
        <DatosAntiguedad />    
        </Tab>
        <Tab eventKey='cargosv' title='Cargos Vigetes'>
        <CargosVigentes page={2} legajo={legajo} />    
        </Tab>
        <Tab eventKey='cargosh' title='Cargos historicos'>
          <CargosHistoricos legajo={legajo}/>
        </Tab>
      </Tabs>
            
    
      </div>:null
      }
    </>
  )
}

export default FichaAgentePage