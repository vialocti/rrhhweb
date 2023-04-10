
import React, {useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'

import axios from 'axios'
import { addAgente } from '../../dominio/store/agente-slice'
import '../../css/estilosforminasistencia.css'

import FormInasistencia from '../../components/inasistencia/FormInasistencia'
import BuscarPersona from '../../components/BuscarPersona'
import { CabTitulo } from '../../styles-components/formularios/FormAgente'
import { useMotivosInasistencia } from '../../hooks/useMotivosInasistencia'
import CabeceraFuncion_simple from '../../components/CabeceraFuncion_simple'

const InasistenciaPage = () => {
  //const uri = 'http://localhost:4000/'
  const uri = 'http://200.12.136.74:4000/'
   const dispatch = useDispatch()  
   const legajo = useSelector((state) => state.agente.legajo)
   
   const [motivos, setMotivos]= useState([])/*'Incompatibilidad',
    'Estudio',
   'Asistencia técnica',
    'Razones particulares',
   'Enfermedad prolongada',
   'Enfermedad',
   'Mesa examinadora',
   'Matrimonio-Nacimiento',
   'Maternidad-Fallecimiento',
   'Familiar enfermo',
   'Congresos',
    'Incapacidad',
    'Sindical',
    'Servicio militar',
    'Actividad deportiva',    
   'Licencia anual',
   'Accidente de trabajo',
   'Razones especiales',
   'Donación sangre',
   'Asignación dedicación',
   'Reducción horaria',
   'Lactancia',
   'Asistencia tribunales',
   'Sanción disciplinaria',
   'Licencia extraordinaria 25',
   'Compensación',
   'Docencia pasiva',
   'Año sabático',
   'Cambio función',
   'Alta médica',
   'Permiso particular',
   'Permiso excepcional',
   'Licencia unificación',
   'Renuncia condicionada',
   'Comisión de servicio',
])*/

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
    //console.log(motivosLI)

  
  return (
    <div className="container-fluid">
    
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
    <CabTitulo style={{marginLeft:'20px'}}>Registro de Inasistencia</CabTitulo>
    <CabeceraFuncion_simple /> 
   </>
    :<CabTitulo style={{marginLeft:'20px'}}>Registro de Inasistencia</CabTitulo>
   }  
  
  </div>  
    <div className="inasistencia">
      {legajo &&
      <>
      <FormInasistencia agente={legajo} motivos={motivos}/>
      
      </>
      }
      </div>

    </div>
  )
}

export default InasistenciaPage