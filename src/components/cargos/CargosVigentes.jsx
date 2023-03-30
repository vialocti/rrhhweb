import React,{useEffect} from 'react'

import { useAgenteCargos } from '../../hooks/useAgenteCargos'
import CargosConsulta from './CargosConsulta'

const CargosVigentes = ({page}) => {
  
 
  const {loading,error,cargosAgente} = useAgenteCargos()
 
  if(loading) return <p>Cargando datos .....</p>
    if(error) return <p>Error de Carga</p> 
  //console.log(cargosAgente)
  return (
    <>
    {cargosAgente.length > 0?<CargosConsulta  cargos={cargosAgente} title={'Cargos Vigentes'} tipo={page} />:null
    }
    </>
    )
}

export default CargosVigentes
