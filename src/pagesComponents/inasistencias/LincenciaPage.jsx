import React,{ useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BuscarPersona from '../../components/BuscarPersona'
import CabeceraFuncion_simple from '../../components/CabeceraFuncion_simple'
//import CabeceraFuncion from '../../components/CabeceraFuncion'

import FormLicencia from '../../components/licencia/FormLicencia'
import { addAgente } from '../../dominio/store/agente-slice'
import { useMotivosInasistencia } from '../../hooks/useMotivosInasistencia'
import { CabTitulo } from '../../styles-components/formularios/FormAgente'

const LincenciaPage = () => {

  //const uri = 'http://200.12.136.74:4000/'
  const dispatch = useDispatch()  
  const legajo = useSelector((state) => state.agente.legajo)
  
  //const [motivos, setMotivos]= useState([])

  

  useEffect(()=>{
     //traer motivos de inasistencias
     
    // if(motivosLI){
    //   setMotivos(motivosLI)
    // }
     dispatch(addAgente(null))
    
   },[dispatch])

   
  const {motivosLI, loading,error} = useMotivosInasistencia()
  if(loading) return <p>Cargando datos .....</p>
  if(error) return <p>Error de Carga</p>
  
  return (
    <div className="container-fluid">
    
    <BuscarPersona />
    <div className='row'>
  
   {legajo
   ?<>
    <CabTitulo style={{marginLeft:'20px'}}>Registro de Licencia</CabTitulo>
    <CabeceraFuncion_simple /> 
   </>
    :<CabTitulo style={{marginLeft:'20px'}}>Registro de Licencia</CabTitulo>
   }
  </div>  
    <div className="inasistencia">
      {legajo &&
      <>
      <FormLicencia agente={legajo} motivos={motivosLI} />
      
      </>
      }
      </div>

    
    </div>
  )
}

export default LincenciaPage