
import React, { useEffect, useState } from 'react'

//import { useSelector} from 'react-redux'
//import { AgenteConsulta } from '../../dominio/store/agente-thunx'
import { CabSubTitulo, Label, LabelEt, LabelF, LabelM } from '../../styles-components/formularios/FormAgente'
//import {useAgenteInfo} from '../../hooks/useAgenteInfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { useModal } from '../../hooks/useModal'
import { useSelector } from 'react-redux'
import FormAgentePrincipal from '../../formModales/agentes/FormAgentePrincipal'
import { ModalComponente } from '../ModalComponente'
import { traerAgenteApi } from '../../services/f_axiospersonas'
//import { useNavigate } from 'react-router-dom'

const DatosPersona = () => {
  //const legajo =useSelector(state=>state.agente.legajo)
  //const user =useSelector(state=>state.agente.user)
  //const dispatch = useDispatch()
  //const navigate = useNavigate() 
  //const {agente,error,loading} = useAgenteInfo()
  const [tipo, setTipo] = useState('')
  const legajo=useSelector(state=>state.agente.legajo)
  const [agente, setAgente]=useState(null) 
  const [isOpen,modi,openModal,closeModal,modifica] = useModal()

  /*
  const handleNewDato=()=>{
    setTipo('A')
    openModal()
  }
*/

  useEffect(() => {
    
    
    const getAgenteInfo = async()=>{
    setAgente(await traerAgenteApi(legajo))
    }
    
    if(legajo){
    getAgenteInfo()
    }
  }, [modi])
  
  useEffect(() => {
    
    
    const getAgenteInfo = async()=>{
    setAgente(await traerAgenteApi(legajo))
    }
    
    if(legajo){
    getAgenteInfo()
    }
  }, [legajo])

  const handleModiDatos =()=>{
    
    openModal()
   
     
  }

 //  if(loading) return <p>Cargando datos .....</p>
 //  if(error) return <p>Error de Carga</p>

return (
    <div className='container-fluid'>
       
       <ModalComponente isOpen={isOpen} closeModal={closeModal}>
             <FormAgentePrincipal modifica={modifica} funcion={closeModal} datos={agente} />
        </ModalComponente>
         
        
          
      

      {agente?
        <div className="card">
          <div className='card-header'>
            <div className="row">
               <div className="col-md-10">
               <CabSubTitulo>Datos Principales Agente </CabSubTitulo>
               </div>
               <div className="col-md-2">
               <button className='btn btn-secondary'onClick={handleModiDatos} style={{'marginLeft':'10px'}}>Editar <FontAwesomeIcon icon={faEdit} style={{marginLeft:'5px'}}/></button>
               </div>
            </div>
          </div>
             
          <div className='card-body'>
            <div className='row'>
               
                <div className='col-md-3' style={{display:'flex', flexDirection:'column', alignContent:'flex-start'}}>
                <LabelEt>Tipo Documento</LabelEt><LabelM> {agente.tipodocumento==='1'?'DNI':agente.tipodocumento==='2'?'LC':'LE'}</LabelM>
                </div>
                <div className="col-md-1"></div>
                <div className='col-md-3'>
                  <LabelEt>Número Documento</LabelEt><LabelM>{agente.nrodocumento}</LabelM>
                </div>
                <div className="col-md-1"></div>
                <div className='col-md-3'>
                <LabelEt>Número Cuil</LabelEt><LabelM >{agente.nrocuil}</LabelM>
                </div>
                 <div className="col-md-1"></div>
            </div>

            <div className="row">   
                 
                  <div className='col-md-3'>
                    <LabelEt>Sede</LabelEt> <LabelM> {agente.sede==='1'?'Mendoza':agente.sede==='2'?'San Rafael':agente.sede==='3'?'Gral.Alvear':'Este'}</LabelM>
                  </div>  
                  <div className="col-md-1"></div>
                  <div className='col-md-3'>
                  <LabelEt>Claustro</LabelEt><LabelM>{agente.condicion==='1'?'Docente':'No Docente'}</LabelM>
                  </div>

                  <div className="col-md-1"></div>

                  <div className='col-md-3'>
                    <LabelEt>Area Trabajo</LabelEt><LabelM> {agente.area}</LabelM>
                  </div>
            <div className="col-md-1"></div>
                 
            </div>
            </div>

         </div>
        :null}
        
    </div>

  )
}

export default DatosPersona