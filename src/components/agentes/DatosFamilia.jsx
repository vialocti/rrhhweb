import React,{useEffect, useState} from 'react'
//import {useAgenteInfoFamilia} from '../../hooks/useAgenteInfoFamilia'

import { CabSubTitulo, Label } from '../../styles-components/formularios/FormAgente'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faUser } from '@fortawesome/free-regular-svg-icons'
import { ModalComponente } from '../ModalComponente'
import FormDatosFamilia from '../../formModales/agentes/FormDatosFamilia'
import { useSelector } from 'react-redux'
import { useModal } from '../../hooks/useModal'
import { traerDatosFamiliaAgenteApi } from '../../services/f_axiospersonas'
//import { faAdd } from '@fortawesome/free-solid-svg-icons'

const DatosFamilia = () => {
  const legajo=useSelector(state=>state.agente.legajo)
  //const [isOpen,openModal,closeModal] = useModal()
  const [isOpen,modi,openModal,closeModal,modifica] = useModal()

  
  //const {datosFamiliaAgente,loading,error} = useAgenteInfoFamilia()

  const[tipo, setTipo]= useState('')
  const [datosFamiliar,setDatoFamiliar]=useState([])
  const [datosFamiliaAgente, setDatosFamiliaAgente]=useState(null)

  useEffect(() => {
    
    
    const getAgenteFamInfo = async()=>{
    setDatosFamiliaAgente(await traerDatosFamiliaAgenteApi(legajo))
    }
    
    if(legajo){
    getAgenteFamInfo()
    }
  }, [modi])
  
  useEffect(() => {
    
    
    const getAgenteFamInfo = async()=>{
    setDatosFamiliaAgente(await traerDatosFamiliaAgenteApi(legajo))
    }
    
    if(legajo){
    getAgenteFamInfo()
    }
  }, [legajo])
  
  
  
  
  
  //if(loading) return <p>Cargando datos .....</p>
  //if(error) return <p>Error de Carga</p>
  //console.log(datosFamiliaAgente)
  
  const convertir =(fn)=>{
    return fn.substring(0,10)
  }

  const handleNewDato=()=>{
    setTipo('A')
    openModal()
  }

  const handleModiDatos =(index)=>{
    setDatoFamiliar(datosFamiliaAgente[index])
    setTipo('U')
    openModal()
  }

  const mostrarTV =(vinculo)=>{
    //console.log(vinculo)
    if(vinculo==='1'){
      return 'Esposo'
    }else if(vinculo==='2'){
      return 'Esposa'
    }else if(vinculo==='3'){
      return 'Hijo'
    }else if(vinculo==='4'){
      return 'Hija'
    }else if(vinculo==='5'){
      return 'Madre'
    }else if(vinculo==='6'){
      return 'Padre'
    }else if(vinculo==='7'){
      return 'Hermano/a'
    }else if(vinculo==='8'){
      return 'Abuelo/a'
    }

  }

  return (
    
        <div className='container-fluid'>
          <ModalComponente isOpen={isOpen} closeModal={closeModal}>
            <FormDatosFamilia legajo={legajo} modifica={modifica} funcion={closeModal} tipo={tipo} datos={datosFamiliar} />
          </ModalComponente>
        {datosFamiliaAgente?datosFamiliaAgente.length > 0?
          <div className='card'>
            <div className="card-header">   
              <div className='row'>
                  <div className="col-md-10">
                    <CabSubTitulo>Datos Familiares</CabSubTitulo>
                  </div>
                  <div className="col-md-2">
                      <button className='btn btn-secondary'onClick={handleNewDato} style={{'marginLeft':'10px'}}>Agregar<FontAwesomeIcon icon={faUser} style={{marginLeft:'5px'}} /></button>
                  </div> 
            </div>
            </div>
            <div className="card-body">
                <div className='row' style={{margin:'10px'}}>
                  <table className="table" >
                    <thead>
                      <tr>
                          <th>Nombre</th>
                          <th>Vínculo</th>
                          <th>TipoDoc</th>
                          <th>Nro.Documento</th>
                          <th>Fecha Nac.</th>
                          <th></th>
                          
                      </tr>
                  </thead>
                  <tbody>
            
                    {datosFamiliaAgente.map((ele, index)=>
                        <tr key={index}>
                            
                            <td>{ele.nombre}</td>
                            <td>{ele.vinculo?mostrarTV(ele.vinculo):'Sin dato'}</td>
                            <td>{ele.tdoc?ele.tdoc:'Sin dato'}</td>
                            <td>{ele.nrodoc?ele.nrodoc:'Sin dato'}</td>
                            <td>{ele.fechanac?convertir(ele.fechanac):'Sin dato'}</td>
                          <td><button onClick={()=>{handleModiDatos(index)}}><FontAwesomeIcon icon={faEdit} /></button></td>
                        </tr>
                      )}
                  </tbody> 
              </table>    
            </div>
          </div>
      </div>

    :
    <div className='row'>
    <label>Sin Datos Familiares del Colaborador</label>
    <button className='button' onClick={handleNewDato}>Agregar</button>
    </div>
    :null  
  }
    </div>
    
  )
}

export default DatosFamilia