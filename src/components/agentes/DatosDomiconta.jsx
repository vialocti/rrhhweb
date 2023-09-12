import React,{useEffect, useState} from 'react'

//import {useAgenteInfoDomiConta} from '../../hooks/useAgenteInfoDomiConta'
import { useModal } from '../../hooks/useModal'

import { CabSubTitulo, Label, LabelEt, LabelM } from '../../styles-components/formularios/FormAgente'
import { ModalComponente} from '../ModalComponente'
import FormDomiContacto from '../../formModales/agentes/FormDomiContacto'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { traerDatosDomiContaAgenteApi } from '../../services/f_axiospersonas'

const DatosDomiconta = () => {
  
  const [tipo, setTipo] = useState('')
  const [datosDomiContaAgente, setDatosDomiContaAgente] = useState(null)
  const legajo=useSelector(state=>state.agente.legajo)
  //const [isOpen,openModal,closeModal] = useModal()
  const [isOpen,modi,openModal,closeModal,modifica] = useModal()

  //traerDatosDomiContaAgenteApi

  useEffect(() => {
    
    
    const getAgenteDCInfo = async()=>{
    setDatosDomiContaAgente(await traerDatosDomiContaAgenteApi(legajo))
    }
    
    if(legajo){
    getAgenteDCInfo()
    }
  }, [modi])
  
  useEffect(() => {
    
    
    const getAgenteDCInfo = async()=>{
    setDatosDomiContaAgente(await traerDatosDomiContaAgenteApi(legajo))
    }
    
    if(legajo){
    getAgenteDCInfo()
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
   // const {loading,error,datosDomiContaAgente} = useAgenteInfoDomiConta()
   
    //if(loading) return <p>Cargando datos .....</p>
    //if(error) return <p>Error de Carga</p> 
    //console.log(datosDomiContaAgente)



    return (
    <div className='container-fluid'>
    
    <ModalComponente isOpen={isOpen} closeModal={closeModal}>
        <FormDomiContacto legajo={legajo} modifica={modifica} funcion={closeModal} tipo={tipo} datos={datosDomiContaAgente}/>
    </ModalComponente>


    {datosDomiContaAgente?
    <div className='card'>
      <div className="card-header">
        <div className='row'>
            <div className="col-md-10">
              <CabSubTitulo>Datos de Contacto</CabSubTitulo>
            </div>
            <div className="col-md-2">
            <button className='btn btn-secondary'onClick={handleModiDatos} style={{'marginLeft':'10px'}}>Editar <FontAwesomeIcon icon={faEdit} style={{marginLeft:'5px'}}/></button>

            </div>
        </div>
    </div>
    <div className="card-body">
    <div className="row">
          <div className='col-md-5'>
          <LabelEt>Domicilio</LabelEt><LabelM>{datosDomiContaAgente.domicilio}</LabelM>
          </div>

        <div className='col-md-4'>
        <LabelEt>Localidad</LabelEt><LabelM> {datosDomiContaAgente.localidad}</LabelM>
        </div>

        <div className='col-md-1'>
        <LabelEt>C.Postal</LabelEt><LabelM> {datosDomiContaAgente.cp}</LabelM>
        </div>
        <div className='col-md-2'>
        <LabelEt>Telefono</LabelEt><LabelM>{datosDomiContaAgente.telefonoFijo}</LabelM>
        </div>
       
        
       </div>
     
     <div className='row'>
     
     <div className='col-md-2'>
     <LabelEt>Telef.Movil</LabelEt><LabelM>{datosDomiContaAgente.telefonoCelular}</LabelM>
        </div>
       
        <div className='col-md-2'>
        <LabelEt>Telef.Contacto</LabelEt><LabelM>{datosDomiContaAgente.telefonocontacto}</LabelM>
        </div>
            
        <div className='col-md-4'>
        <LabelEt>Email Personal</LabelEt><LabelM>{datosDomiContaAgente.emailpersonal}</LabelM>
        </div>
        <div className='col-md-4'>
        <LabelEt>Email Institucional</LabelEt><LabelM>{datosDomiContaAgente.emailinstitucional}</LabelM>
        </div>
          
       <div className="row">
       
       </div>
     </div>
     </div>
     </div>
     :
     <div className='row'>
     <label>Sin Datos Domicilio y Contacto</label>
     <button className='button' onClick={handleNewDato}>Agregar</button>
  </div>
     }
</div>
  )
}

export default DatosDomiconta