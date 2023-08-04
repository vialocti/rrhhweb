import React, { useEffect, useState } from 'react'

//import { useAgenteCargos } from '../../hooks/useAgenteCargos'
import CargosConsulta from './CargosConsulta'
import { traerCargosHAgenteApi } from '../../services/f_axioscargos'

const CargosHistoricos = ({legajo}) => {

  //const {loading,error,cargoshAgente} = useAgenteCargos()

  //if(loading) return <p>Cargando datos .....</p>
  //if(error) return <p>Error de Carga</p> 
  //console.log(cargoshAgente) traerCargosHAgenteApi
  
  const [cargoshAgente, setCargoshAgente]= useState(null)

  useEffect(() => {
    const getCargos =async ()=>{
     setCargoshAgente(null)
       //setCargosAgente(await traerCargosAgenteApi(legajo))
    
    }
    
      getCargos()
    
  }, [])



  useEffect(() => {
    const getCargos =async ()=>{
       setCargoshAgente(await traerCargosHAgenteApi(legajo))
    
    }
    if(legajo){
      getCargos()
    }
  }, [legajo])
  
  
  //if(cargoshAgente){console.log(cargoshAgente,legajo)}
  return (
    <>
    {cargoshAgente?cargoshAgente.length > 0?<CargosConsulta  tipoCargo={'H'} title={'Cargos Historicos'} tipo={3}/>:null:null
    }
    </>
    )
}

export default CargosHistoricos