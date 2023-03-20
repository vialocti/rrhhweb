import React,{ useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BuscarPersona from '../../components/BuscarPersona'

import FormLicencia from '../../components/licencia/FormLicencia'
import { addAgente } from '../../dominio/store/agente-slice'
import { useMotivosInasistencia } from '../../hooks/useMotivosInasistencia'
import { CabTitulo } from '../../styles-components/formularios/FormAgente'

const LincenciaPage = () => {

  //const uri = 'http://200.12.136.74:4000/'
  const dispatch = useDispatch()  
  const legajo = useSelector((state) => state.agente.legajo)
  
  const [motivos, setMotivos]= useState([])

  const {motivosLI, loading,error} = useMotivosInasistencia()

  useEffect(()=>{
     //traer motivos de inasistencias
     
     if(motivosLI){
       setMotivos(motivosLI)
     }
     dispatch(addAgente(null))
    
   },[dispatch,motivosLI])


  if(loading) return <p>Cargando datos .....</p>
  if(error) return <p>Error de Carga</p>
  return (
    <div className="container-fluid">
    
    <BuscarPersona />
    <div className='row'>

  <CabTitulo style={{marginLeft:'20px'}}>Registro de Licencia</CabTitulo>
  </div>  
    <div className="inasistencia">
      {legajo &&
      <>
      <FormLicencia/>
      
      </>
      }
      </div>

    
    </div>
  )
}

export default LincenciaPage