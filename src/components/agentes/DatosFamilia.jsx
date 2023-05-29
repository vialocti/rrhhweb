import React,{useState} from 'react'
import {useAgenteInfoFamilia} from '../../hooks/useAgenteInfoFamilia'

import { CabSubTitulo, Label } from '../../styles-components/formularios/FormAgente'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faUser } from '@fortawesome/free-regular-svg-icons'
import { ModalComponente } from '../ModalComponente'
import FormDatosFamilia from '../../formModales/agentes/FormDatosFamilia'
import { useSelector } from 'react-redux'
import { useModal } from '../../hooks/useModal'
import { faAdd } from '@fortawesome/free-solid-svg-icons'

const DatosFamilia = () => {
  const legajo=useSelector(state=>state.agente.legajo)
  const [isOpen,openModal,closeModal] = useModal()
  
  const {datosFamiliaAgente,loading,error} = useAgenteInfoFamilia()

  const[tipo, setTipo]= useState('')


  if(loading) return <p>Cargando datos .....</p>
  if(error) return <p>Error de Carga</p>
  //console.log(datosFamiliaAgente)
  
  const convertir =(fn)=>{
    return fn.substring(0,10)
  }

  const handleNewDato=()=>{
    setTipo('A')
    openModal()
  }

  const handleModiDatos =()=>{
    setTipo('U')
    openModal()
  }

    return (
    
        <div className='container-fluid'>
          <ModalComponente isOpen={isOpen} closeModal={closeModal}>
            <FormDatosFamilia legajo={legajo} funcion={closeModal} tipo={tipo} datos={datosFamiliaAgente} />
          </ModalComponente>
        {datosFamiliaAgente.length > 0?
        <>
        <div className='row'>
          <CabSubTitulo>Datos Familiares<button onClick={handleNewDato} style={{marginLeft:'10px'}}><FontAwesomeIcon icon={faUser} /></button></CabSubTitulo>
        </div>
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
                        <td>{ele.vinculo?ele.vinculo:'Sin dato'}</td>
                        <td>{ele.tdoc?ele.tdoc:'Sin dato'}</td>
                        <td>{ele.nrodoc?ele.nrodoc:'Sin dato'}</td>
                        <td>{ele.fechanac?convertir(ele.fechanac):'Sin dato'}</td>
                       <td><button onClick={handleModiDatos}><FontAwesomeIcon icon={faEdit} /></button></td>
                    </tr>
                )}
            </tbody> 
        </table>    
        </div>
        </>
    :
    <div className='row'>
    <label>Sin Datos Familiares del Colaborador</label>
    <button className='button' onClick={handleNewDato}>Agregar</button>
    </div>
    }          
    </div>
    
  )
}

export default DatosFamilia