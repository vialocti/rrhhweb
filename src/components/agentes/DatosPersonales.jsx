import React,{useState} from 'react'
import {useAgenteInfoPersonal} from '../../hooks/useAgenteInfoPersonal'

import { CabSubTitulo, Label } from '../../styles-components/formularios/FormAgente'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { useModal } from '../../hooks/useModal'
import { useSelector } from 'react-redux'
import { ModalComponente } from '../ModalComponente'
import FormDatosPersonales from '../../formModales/agentes/FormDatosPersonales'

const DatosPersonales = () => {
  

  const [tipo, setTipo] = useState('')
  const legajo=useSelector(state=>state.agente.legajo)
  const [isOpen,openModal,closeModal] = useModal()
  const {datosAgente,loading,error} = useAgenteInfoPersonal()
  
  const handleNewDato=()=>{
    setTipo('A')
    openModal()
  }

  const handleModiDatos =()=>{
    setTipo('U')
    openModal()
  }
  if(loading) return <p>Cargando datos .....</p>
  if(error) return <p>Error de Carga</p>
  
    
    return (
    <div className='container-fluid'>
        <ModalComponente isOpen={isOpen} closeModal={closeModal} >
          <FormDatosPersonales legajo={legajo} funcion={closeModal} tipo={tipo} datos={datosAgente} /> 
        </ModalComponente>
        {datosAgente?
        <>
        <div className='row'>
          <CabSubTitulo>Datos Personales <button onClick={handleModiDatos} style={{'marginLeft':'10px'}}><FontAwesomeIcon icon={faEdit} /></button></CabSubTitulo>
        </div>
        <div className="row">
            <div className='col-md-2'>
                Fecha Nacimiento<Label>{datosAgente.fechanac}</Label>
              </div>

              <div className='col-md-2'>
                Lugar Nacimiento<Label>{datosAgente.lugarn}</Label>
              </div>

            <div className='col-md-2'>
                Nacionalidad<Label> {datosAgente.nacionalidad}</Label>
            </div>

            <div className='col-md-2'>
                Sexo<Label> {datosAgente.sexo==='1'?'M':datosAgente.sexo==='2'?'F':null}</Label>
            </div>

             <div className='col-md-2'>
                Grupo y Factor Sanguineo<Label>{datosAgente.gs}{datosAgente.rh}</Label>
              </div>
          </div>
          <div className="row">  
            <div className='col-md-2'>
              Ingreso FCE.<Label>{datosAgente.fechaIFCE}</Label>
            </div>
          
            
            <div className='col-md-2'>
            Ingreso Uncu<Label>{datosAgente.fechaIUNC}</Label>
            </div>

                      
            <div className='col-md-2'>
            Ingreso APN<Label>{datosAgente.fechaIAPN}</Label>
            </div>

           
            
         </div>
         </>:
         <div className='row'>
            <label>Sin Datos Personales</label>
            <button className='button'  onClick={handleNewDato} >Agregar</button>
         </div>
         
         }
    </div>
  )
}

export default DatosPersonales