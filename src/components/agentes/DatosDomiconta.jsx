import React,{useState} from 'react'

import {useAgenteInfoDomiConta} from '../../hooks/useAgenteInfoDomiConta'
import { useModal } from '../../hooks/useModal'

import { CabSubTitulo, Label } from '../../styles-components/formularios/FormAgente'
import { ModalComponente} from '../ModalComponente'
import FormDomiContacto from '../../formModales/agentes/FormDomiContacto'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'

const DatosDomiconta = () => {
  
  const [tipo, setTipo] = useState('')
  const legajo=useSelector(state=>state.agente.legajo)
  const [isOpen,openModal,closeModal] = useModal()
  
    const handleNewDato=()=>{
      setTipo('A')
      openModal()
    }

    const handleModiDatos =()=>{
      setTipo('U')
      openModal()
    }
    const {loading,error,datosDomiContaAgente} = useAgenteInfoDomiConta()
   
    if(loading) return <p>Cargando datos .....</p>
    if(error) return <p>Error de Carga</p> 
    console.log(datosDomiContaAgente)



    return (
    <div className='container-fluid'>
    
    <ModalComponente isOpen={isOpen} closeModal={closeModal}>
        <FormDomiContacto legajo={legajo} funcion={closeModal} tipo={tipo} datos={datosDomiContaAgente}/>
    </ModalComponente>


    {datosDomiContaAgente?
    <>
    <div className='row'>
          <CabSubTitulo>Datos de Contacto <button onClick={handleModiDatos} style={{'marginLeft':'10px'}}><FontAwesomeIcon icon={faEdit} /></button> </CabSubTitulo>
          
    </div>

    <div className="row">
          <div className='col-md-4'>
            Domicilio<Label>{datosDomiContaAgente.domicilio}</Label>
          </div>

        <div className='col-md-4'>
          Localidad<Label> {datosDomiContaAgente.localidad}</Label>
        </div>

        <div className='col-md-2'>
        C.Postal.<Label> {datosDomiContaAgente.cp}</Label>
        </div>
        <div className='col-md-2'>
          Telefono<Label>{datosDomiContaAgente.telefonoFijo}</Label>
        </div>
       
        
       </div>
     
     <div className='row'>
     
     <div className='col-md-2'>
           Telef.Movil<Label>{datosDomiContaAgente.telefonoCelular}</Label>
        </div>
       
        <div className='col-md-2'>
           Telef.Contacto<Label>{datosDomiContaAgente.telefonocontacto}</Label>
        </div>
            
        <div className='col-md-4'>
        Email Personal<Label>{datosDomiContaAgente.emailpersonal}</Label>
        </div>
        <div className='col-md-4'>
        Email Institucional<Label>{datosDomiContaAgente.emailinstitucional}</Label>
        </div>
          
       <div className="row">
       
       </div>
     </div>
     </>
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