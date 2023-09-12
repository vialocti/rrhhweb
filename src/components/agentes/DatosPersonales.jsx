import React,{useEffect, useState} from 'react'
//import {useAgenteInfoPersonal} from '../../hooks/useAgenteInfoPersonal'

import { CabSubTitulo, Label, LabelEt, LabelM } from '../../styles-components/formularios/FormAgente'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { useModal } from '../../hooks/useModal'
import { useSelector } from 'react-redux'
import { ModalComponente } from '../ModalComponente'
import FormDatosPersonales from '../../formModales/agentes/FormDatosPersonales'
import {traerCodLugar, traerDatosAgenteApi } from '../../services/f_axiospersonas'

const DatosPersonales = () => {
  

  const [tipo, setTipo] = useState('')
  const legajo=useSelector(state=>state.agente.legajo)
  const [datosAgente, setDatosAgente]= useState(null)
  //const [isOpen,openModal,closeModal] = useModal()
  const [isOpen,modi,openModal,closeModal,modifica] = useModal()
  const [lugaresNac, setLugaresNac]=useState(null)

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
     setLugaresNac(await  traerCodLugar())
    
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
  
  const traerEC =(civil)=>{
    if(civil==='1'){
        return 'Soltero'
    }else if(civil==='2'){
        return 'Unido de Hecho'
    }else if(civil==='3'){
      return 'Casado'
    }else if(civil==='4'){
      return 'Separado Legalmente'
    }else if(civil==='5'){
      return 'Separado de Hecho'
    }else if(civil==='6'){
      return 'Viudo'
    }else if(civil==='7'){
      return 'Separ.de Hecho y Unido de Hecho'
    }else if(civil==='8'){
      return 'Separ.Legal y Unido de Hecho'
    }else if(civil==='9'){
      return 'Viudo y Unido de Hecho'
    }else if(civil==='10'){
      return 'Divorciado'
    }
  }

  const traerNac =(nac)=>{
    if(nac==='1'){
      return 'Argentino Nativo'
    }else if(nac==='2'){
      return 'Argentino Naturalizado'
    }else if(nac==='3'){
      return 'Argentino por Opcion'
    }else if(nac==='4'){
      return 'Extranjero'
    }else if(nac==='5'){
      return 'Nativo Naturalizado Extranjero'
    }
  }

  const getLugarNac =(ln)=>{
     if(ln && lugaresNac){
    const lugarnombre= lugaresNac.find(ele=>ele.cdln===ln)
    return lugarnombre.lugar

     }else{
      return ''
     }
    //console.log(datosAgente)
  }
    return (
    <div className='container-fluid'>
        <ModalComponente isOpen={isOpen} closeModal={closeModal} >
          <FormDatosPersonales legajo={legajo} modifica={modifica} funcion={closeModal} tipo={tipo} datos={datosAgente} /> 
        </ModalComponente>
        {datosAgente?
        <div className='card'>
          
          <div className="card-header">
            <div className='row'>
              <div className="col-md-10">
                <CabSubTitulo>Datos Personales</CabSubTitulo>
              </div>
              <div className="col-md-2">
              <button className='btn btn-secondary'onClick={handleModiDatos} style={{'marginLeft':'10px'}}>Editar <FontAwesomeIcon icon={faEdit} style={{marginLeft:'5px'}}/></button>

              </div>
            </div>
          </div>
        <div className="card-body">
        <div className="row">
            <div className='col-md-2'>
                <LabelEt>Fecha Nacimiento</LabelEt><LabelM>{datosAgente.fechanac}</LabelM>
              </div>

              <div className='col-md-2'>
              <LabelEt>Lugar Nacimiento</LabelEt><LabelM>{getLugarNac(datosAgente.lugarn)}</LabelM>
              </div>

            <div className='col-md-2'>
            <LabelEt>Nacionalidad</LabelEt><LabelM> {traerNac(datosAgente.nacionalidad)}</LabelM>
            </div>

            <div className='col-md-2'>
            <LabelEt>Sexo</LabelEt><LabelM> {datosAgente.sexo==='1'?'Masculino':datosAgente.sexo==='2'?'Femenino':'No Binario'}</LabelM>
            </div>

             <div className='col-md-2'>
             <LabelEt>Grupo y Factor Sanguineo</LabelEt><LabelM>{datosAgente.gs}{datosAgente.rh}</LabelM>
              </div>
          </div>
          <div className="row">

            <div className='col-md-2'>
            <LabelEt>Estado Civil</LabelEt><LabelM>{traerEC(datosAgente.ecivil)}</LabelM>
            </div>  
            <div className='col-md-2'>
            <LabelEt>Ingreso FCE</LabelEt><LabelM>{datosAgente.fechaIFCE}</LabelM>
            </div>
          
            
            <div className='col-md-2'>
            <LabelEt>Ingreso UNcuyo</LabelEt><LabelM>{datosAgente.fechaIUNC}</LabelM>
            </div>

                      
            <div className='col-md-2'>
            <LabelEt>Ingreso APN</LabelEt><LabelM>{datosAgente.fechaIAPN}</LabelM>
            </div>

           
            
         </div>
         </div>
         </div>:
         <div className='row'>
            <label>Sin Datos Personales</label>
            <button className='button'  onClick={handleNewDato} >Agregar</button>
         </div>
         
         }
    </div>
  )
}

export default DatosPersonales