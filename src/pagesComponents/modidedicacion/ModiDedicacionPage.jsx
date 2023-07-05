import React,{ useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BuscarPersona from '../../components/BuscarPersona'
import CabeceraFuncion_simple from '../../components/CabeceraFuncion_simple'
//import CabeceraFuncion from '../../components/CabeceraFuncion'

//import FormLicencia from '../../components/licencia/FormLicencia'
import { addAgente } from '../../dominio/store/agente-slice'
//import { useMotivosInasistencia } from '../../hooks/useMotivosInasistencia'
import { CabTitulo } from '../../styles-components/formularios/FormAgente'
import FormDedicacion from '../../components/modidedicacion/FormDedicacion'

const ModiDedicacionPage = () => {

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

   
 // const {motivosLI, loading,error} = useMotivosInasistencia()
 // if(loading) return <p>Cargando datos .....</p>
// if(error) return <p>Error de Carga</p>
  
  return (
    <div className="container-fluid">
    
    <BuscarPersona />
    <div className='row'>
  
   {legajo
   ?<>
    <CabTitulo style={{marginLeft:'20px'}}>Registrar Cambio de Dedicacion Cargo</CabTitulo>
    <CabeceraFuncion_simple /> 
   </>
    :<CabTitulo style={{marginLeft:'20px'}}>Registrar Cambio de Dedicacion Cargo</CabTitulo>
   }
  </div>  
    <div className="inasistencia">
      {legajo &&
      <>
      <FormDedicacion />
      
      </>
      }
      </div>

    
    </div>
  )
}

export default ModiDedicacionPage