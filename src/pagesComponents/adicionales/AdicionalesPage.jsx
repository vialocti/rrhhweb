
import React, {useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'

import axios from 'axios'
//import { addAgente } from '../../dominio/store/agente-slice'
import '../../css/estilosforminasistencia.css'

//import FormInasistencia from '../../components/inasistencia/FormInasistencia'
import BuscarPersona from '../../components/BuscarPersona'
import { CabTitulo } from '../../styles-components/formularios/FormAgente'
//import { useMotivosInasistencia } from '../../hooks/useMotivosInasistencia'
import CabeceraFuncion_simple from '../../components/CabeceraFuncion_simple'
import FormAdicional from '../../components/adicionales/FormAdicional'

const AdicionalesPage = () => {
  //const uri = 'http://localhost:4000/'
  const uri = 'http://200.12.136.74:4000/'
   const dispatch = useDispatch()  
   const legajo = useSelector((state) => state.agente.legajo)
   
  

   //const {motivosLI, loading,error} = useMotivosInasistencia()
   useEffect(()=>{
      //traer motivos de inasistencias
      
    },[])


    //if(loading) return <p>Cargando datos .....</p>
    //if(error) return <p>Error de Carga</p>
    //console.log(motivosLI)

  
  return (
    <div className="container">
    
    <BuscarPersona />
    {/**
    <div className="row" style={{height:'50px', alignItems:'center'}}>
      <FormBusqueda />
    </div>
    
      <hr/>
  */}
  <div className='row'>
  {legajo
   ?<>
    <CabTitulo>Registro de Adicionales</CabTitulo>
    <CabeceraFuncion_simple /> 
   </>
    :<CabTitulo>Registro de Adicionales</CabTitulo>
   }  
  
  </div>  
    <div className="inasistencia">
      {legajo &&
      <>
          <FormAdicional  agente={legajo} />
      </>
      }
      </div>

    </div>
  )
}

export default AdicionalesPage