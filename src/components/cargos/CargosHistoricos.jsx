import React from 'react'

import { useAgenteCargos } from '../../hooks/useAgenteCargos'
import CargosConsulta from './CargosConsulta'

const CargosHistoricos = () => {

  const {loading,error,cargoshAgente} = useAgenteCargos()

  if(loading) return <p>Cargando datos .....</p>
  if(error) return <p>Error de Carga</p> 
  //console.log(cargoshAgente)

  return (
    <>
    {cargoshAgente.length > 0?<CargosConsulta  cargos={cargoshAgente} title={'Cargos Historicos'} tipo={3}/>:null
    }
    </>
    )
}

export default CargosHistoricos