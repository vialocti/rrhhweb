import React, { useEffect, useState } from 'react'
//import { useAgenteInfoAntiguedad } from '../../hooks/useAgenteInfoAntiguedad'


import { CabSubTitulo} from '../../styles-components/formularios/FormAgente'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { useSelector } from 'react-redux'
import { useModal } from '../../hooks/useModal'
import { ModalComponente } from '../ModalComponente'
import FormAgenteAntiguedad from '../../formModales/agentes/FormAgenteAntiguedad'
import { traerDatosAntiguedadAgenteApi } from '../../services/f_axiospersonas'

const DatosAntiguedad = () => {
  const [tipo, setTipo] = useState('')
  const legajo=useSelector(state=>state.agente.legajo)
//  const [isOpen,openModal,closeModal] = useModal()
  const [isOpen,modi,openModal,closeModal,modifica] = useModal()
  const[datosAntiguedadAgente, setDatosAntiguedadAgente]= useState(null)
  
  //const {datosAntiguedadAgente,loading,error} = useAgenteInfoAntiguedad()

  useEffect(() => {
    
    
    const getAgenteAntInfo = async()=>{
    setDatosAntiguedadAgente(await traerDatosAntiguedadAgenteApi(legajo))
    }
    
    if(legajo){
    getAgenteAntInfo()
    }
  }, [modi])
  
  useEffect(() => {
    
    
    const getAgenteAntInfo = async()=>{
    setDatosAntiguedadAgente(await traerDatosAntiguedadAgenteApi(legajo))
    }
    
    if(legajo){
    getAgenteAntInfo()
    }
  }, [legajo])
  



  const handleNewDato=()=>{
    setTipo('A')
    openModal()
  }

  const handleModiDatos =()=>{
    setTipo('U')
    openModal()
  }
  
  //if(loading) return <p>Cargando datos .....</p>
  //if(error) return <p>Error de Carga</p>
  
  
    
    return (
    
        <div className='container-fluid'>
          <ModalComponente isOpen={isOpen} closeModal={closeModal}>
             <FormAgenteAntiguedad legajo={legajo} modifica={modifica} funcion={closeModal} tipo={tipo} datos={datosAntiguedadAgente} />
          </ModalComponente>
        {datosAntiguedadAgente?
        <div className='card'>
          <div className="card-header">
            <div className='row'>
                <div className="col-md-10">
                  <CabSubTitulo>Datos Antiguedad Reconocida </CabSubTitulo>
                </div>
                <div className="col-md-2">
                <button className='btn btn-secondary'onClick={handleModiDatos} style={{'marginLeft':'10px'}}>Editar <FontAwesomeIcon icon={faEdit} style={{marginLeft:'5px'}}/></button>

                </div>
            </div>
        </div>
        <div className="card-body">
          <div className='row' style={{margin:'10px'}}>
        <table className="table" >
            <thead>
                <tr>
                    <th>AñosA.Doc.</th>
                    <th>MesesA.Doc</th>
                    <th>DiasA.Doc</th>
                    <th>Fec.Recon.</th>
                    <th>Nro.Resol.</th>
                    <th>AñosA.NoDoc.</th>
                    <th>MesesA.NoDoc</th>
                    <th>DiasA.NoDoc</th>
                    <th>Fec.Recon.</th>
                    <th>Nro.Resol.</th>
                </tr>
            </thead>
            <tbody>
               
            
                
                    <tr>
                        
                        <td>{datosAntiguedadAgente.aad}</td>
                        <td>{datosAntiguedadAgente.mad}</td>
                        <td>{datosAntiguedadAgente.dad}</td>
                        <td>{datosAntiguedadAgente.fechardoc}</td>
                        <td>{datosAntiguedadAgente.nresd}</td>
                        <td>{datosAntiguedadAgente.aand}</td>
                        <td>{datosAntiguedadAgente.mand}</td>
                        <td>{datosAntiguedadAgente.dand}</td>
                        <td>{datosAntiguedadAgente.fecharndoc}</td>
                        <td>{datosAntiguedadAgente.nresnd}</td>
                    </tr>
                
            </tbody> 
        </table>    
        </div>
        </div>
        </div>
    :
    <div className='row'>
    <label>Sin Datos de Reconocimeinto de Antiguedad</label>
    <button className='button' onClick={handleNewDato}>Agregar</button>
    </div>
    }          
    </div>
    
  )
}

export default DatosAntiguedad