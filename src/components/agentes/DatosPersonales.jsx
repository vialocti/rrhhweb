import React,{useEffect, useState} from 'react'
//import {useAgenteInfoPersonal} from '../../hooks/useAgenteInfoPersonal'

import { CabSubTitulo, Label, LabelM } from '../../styles-components/formularios/FormAgente'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { useModal } from '../../hooks/useModal'
import { useSelector } from 'react-redux'
import { ModalComponente } from '../ModalComponente'
import FormDatosPersonales from '../../formModales/agentes/FormDatosPersonales'
import { traerDatosAgenteApi } from '../../services/f_axiospersonas'

const DatosPersonales = () => {
  

  const [tipo, setTipo] = useState('')
  const legajo=useSelector(state=>state.agente.legajo)
  const [datosAgente, setDatosAgente]= useState(null)
  //const [isOpen,openModal,closeModal] = useModal()
  const [isOpen,modi,openModal,closeModal,modifica] = useModal()

  //const {datosAgente,loading,error} = useAgenteInfoPersonal() traerDatosAgenteApi


  useEffect(() => {
    
    
    const getDatosAgenteInfo = async()=>{
    setDatosAgente(await traerDatosAgenteApi(legajo))
    }
    
    if(legajo){
    getDatosAgenteInfo()
    }
  }, [modi])
  
  useEffect(() => {
    
    
    const getDatosAgenteInfo = async()=>{
    setDatosAgente(await traerDatosAgenteApi(legajo))
    
    }
    
    if(legajo){
    getDatosAgenteInfo()
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
  //console.log(datosAgente)
    
    return (
    <div className='container-fluid'>
        <ModalComponente isOpen={isOpen} closeModal={closeModal} >
          <FormDatosPersonales legajo={legajo} modifica={modifica} funcion={closeModal} tipo={tipo} datos={datosAgente} /> 
        </ModalComponente>
        {datosAgente?
        <>
        <div className='row'>
          <CabSubTitulo>Datos Personales <button onClick={handleModiDatos} style={{'marginLeft':'10px'}}><FontAwesomeIcon icon={faEdit} /></button></CabSubTitulo>
        </div>
        <div className="row">
            <div className='col-md-2'>
                Fecha Nacimiento<LabelM>{datosAgente.fechanac}</LabelM>
              </div>

              <div className='col-md-2'>
                Lugar Nacimiento<LabelM>{datosAgente.lugarn}</LabelM>
              </div>

            <div className='col-md-2'>
                Nacionalidad<LabelM> {datosAgente.nacionalidad}</LabelM>
            </div>

            <div className='col-md-2'>
                Sexo<LabelM> {datosAgente.sexo==='1'?'M':datosAgente.sexo==='2'?'F':null}</LabelM>
            </div>

             <div className='col-md-2'>
                Grupo y Factor Sanguineo<LabelM>{datosAgente.gs}{datosAgente.rh}</LabelM>
              </div>
          </div>
          <div className="row">

            <div className='col-md-2'>
              Estado Civil<LabelM>{datosAgente.ecivil}</LabelM>
            </div>  
            <div className='col-md-2'>
              Ingreso FCE<LabelM>{datosAgente.fechaIFCE}</LabelM>
            </div>
          
            
            <div className='col-md-2'>
            Ingreso UNcuyo<LabelM>{datosAgente.fechaIUNC}</LabelM>
            </div>

                      
            <div className='col-md-2'>
            Ingreso APN<LabelM>{datosAgente.fechaIAPN}</LabelM>
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