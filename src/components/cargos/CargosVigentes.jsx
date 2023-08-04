import React, { useEffect, useState } from 'react'

//import { useAgenteCargos } from '../../hooks/useAgenteCargos'
import CargosConsulta from './CargosConsulta'
import { traerCargosAgenteApi } from '../../services/f_axioscargos'

const CargosVigentes = ({page,legajo}) => {
  
 
  //const {loading,error,cargosAgente} = useAgenteCargos()
 
  //if(loading) return <p>Cargando datos .....</p>
  //if(error) return <p>Error de Carga</p> 
  //console.log(cargosAgente)
  
  const [cargosAgente, setCargosAgente]= useState(null)
  // console.log(page,legajo)
  useEffect(() => {
    const getCargos =async ()=>{
      setCargosAgente(null)
       //setCargosAgente(await traerCargosAgenteApi(legajo))
    
    }
    
      getCargos()
    
  }, [])
  
  
  useEffect(() => {
    const getCargos =async ()=>{
      setCargosAgente(null)
       setCargosAgente(await traerCargosAgenteApi(legajo))
    
    }
    if(legajo){
      getCargos()
    }
  }, [legajo])
  
  //if(cargosAgente){console.log(cargosAgente,legajo)}
  return (
    <>
    {cargosAgente?cargosAgente.length > 0?<CargosConsulta  tipoCargo={'V'} title={'Cargos Vigentes'} tipo={page} />:null:null
    }
    </>
    )
}

export default CargosVigentes
