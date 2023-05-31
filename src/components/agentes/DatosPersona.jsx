
import React, { useState } from 'react'

//import { useSelector} from 'react-redux'
//import { AgenteConsulta } from '../../dominio/store/agente-thunx'
import { CabSubTitulo, Label } from '../../styles-components/formularios/FormAgente'
import {useAgenteInfo} from '../../hooks/useAgenteInfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { useModal } from '../../hooks/useModal'
import { useSelector } from 'react-redux'
import FormAgentePrincipal from '../../formModales/agentes/FormAgentePrincipal'
import { ModalComponente } from '../ModalComponente'

const DatosPersona = () => {
  //const legajo =useSelector(state=>state.agente.legajo)
  //const user =useSelector(state=>state.agente.user)
  //const dispatch = useDispatch()
  const {agente,error,loading} = useAgenteInfo() 
  const [tipo, setTipo] = useState('')
  const legajo=useSelector(state=>state.agente.legajo)
  const [isOpen,openModal,closeModal] = useModal()

  /*
  const handleNewDato=()=>{
    setTipo('A')
    openModal()
  }
*/
  const handleModiDatos =()=>{
    
    openModal()
  }

   if(loading) return <p>Cargando datos .....</p>
   if(error) return <p>Error de Carga</p>

return (
    <div className='container-fluid'>
       
       <ModalComponente isOpen={isOpen} closeModal={closeModal}>
             <FormAgentePrincipal funcion={closeModal} datos={agente} />
        </ModalComponente>
         
         <div className='row'>
          <CabSubTitulo>Datos Principales Agente <button onClick={handleModiDatos} style={{'marginLeft':'10px'}}><FontAwesomeIcon icon={faEdit} /></button></CabSubTitulo>
        </div>

        <div className="row">
             

            <div className='col-md-1'>
            T.Doc.<Label> {agente.tipodocumento==='1'?'DNI':agente.tipodocumento==='2'?'LE':'LC'}</Label>
            </div>

            <div className='col-md-2'>
              Nro.Doc.<Label>{agente.nrodocumento}</Label>
            </div>

            <div className='col-md-2'>
            Cuil<Label>{agente.nrocuil}</Label>
            </div>

            
                     
            
            <div className='col-md-2'>
            Claustro<Label>{agente.condicion==='1'?'Docente':'No Docente'}</Label>
            </div>

            

            <div className='col-md-4'>
              Area Trabajo<Label> {agente.area}</Label>
            </div>
            
         </div>


    </div>

  )
}

export default DatosPersona