import React,{useEffect, useState} from 'react'
//import {useAgenteInfoFamilia} from '../../hooks/useAgenteInfoFamilia'

import { CabSubTitulo} from '../../styles-components/formularios/FormAgente'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faUser } from '@fortawesome/free-regular-svg-icons'
import { ModalComponente } from '../ModalComponente'
import FormDatosFamilia from '../../formModales/agentes/FormDatosFamilia'
import { useSelector } from 'react-redux'
import { useModal } from '../../hooks/useModal'
import { traerDatosEstudiosAgenteApi} from '../../services/f_axiospersonas'
import FormDatosEstudio from '../../formModales/agentes/FormDatosEstudio'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import { deleteDatoEstudio } from '../../services/f_axioscargos'
//import { faAdd } from '@fortawesome/free-solid-svg-icons'

const DatosEstudio = () => {
  const legajo=useSelector(state=>state.agente.legajo)
  //const [isOpen,openModal,closeModal] = useModal()
  const [isOpen,modi,openModal,closeModal,modifica] = useModal()

  
  //const {datosFamiliaAgente,loading,error} = useAgenteInfoFamilia()

  const[tipo, setTipo]= useState('')
  const [datosEstudios,setDatoEstudio]=useState([])
  const [datosEstudiosAgente, setDatosEstudiosAgente]=useState(null)

  useEffect(() => {
    
    
    const getAgenteInfo = async()=>{
    setDatosEstudiosAgente(await traerDatosEstudiosAgenteApi(legajo))
    }
    
    if(legajo){
    getAgenteInfo()
    }
  }, [modi])
  
  useEffect(() => {
    
    
    const getAgenteInfo = async()=>{
    setDatosEstudiosAgente(await traerDatosEstudiosAgenteApi(legajo))
    }
    
    if(legajo){
    getAgenteInfo()
    }
    //console.log(legajo)
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
  
    setDatoEstudio(datosEstudiosAgente[index])
    setTipo('U')
    openModal()
  }


  //

  const eliminarRegistro =async(id, legajo)=>{
    
    let resp=''
   
      resp = await deleteDatoEstudio(id, legajo)

    
    modifica()
    //console.log(resp)
  }


   //
   const eliminarEstudio = (id, legajo, nombre) =>{

    Swal
    .fire({
        title: `Nro y Legajo:${id} - ${legajo}`,
        text: `¿Eliminar Titulo: ${nombre}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    })
    .then(resultado => {
        if (resultado.value) {
            // Hicieron click en "Sí"
            eliminarRegistro(id, legajo)
            
        } else {
            // Dijeron que no
            
        }
    });

  }

  
  return (
       
      
        <div className='container-fluid'>
           <ModalComponente isOpen={isOpen} closeModal={closeModal}>
             <FormDatosEstudio legajo={legajo} modifica={modifica} funcion={closeModal} tipo={tipo} datos={datosEstudios} />
          </ModalComponente>
          
        {datosEstudiosAgente?datosEstudiosAgente.length > 0?
          <div className='card'>
            <div className="card-header">   
              <div className='row'>
                <div className="col-md-10">
                  <CabSubTitulo>Datos Estudio</CabSubTitulo>
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
                        <th>Titulo</th>
                        <th>Nivel</th> 
                        <th>Estado</th>
                        <th>Institucion</th>
                        <th>Establecimiento</th>
                        <th>Adicional</th>
                        <th></th>
                        
                    </tr>
                </thead>
                <tbody>
                
                    {datosEstudiosAgente.map((ele, index)=>
                        <tr key={index}>
                            
                            <td>{ele.titulo}</td>
                            <td>{ele.tp}</td>
                            <td>{ele.situacion}</td>
                            <td>{ele.insti}</td>
                            <td>{ele.esta}</td>
                            <td>{ele.adi}</td>
                          <td><button onClick={()=>{handleModiDatos(index)}}><FontAwesomeIcon icon={faEdit} /></button></td>
                          <td>
                                    <button onClick ={()=>eliminarEstudio(ele.id_row, ele.legajo,ele.titulo)}>
                                      <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                  </td>
                        
                        </tr>
                    )}
                </tbody> 
            </table>    
          </div>
          </div>
      </div>

      :
        <div className='row'>
          <label>Sin Datos de Estudios del Colaborador</label>
          <button className='button' onClick={handleNewDato}>Agregar</button>
        </div>
      :null
       }
    </div>
                  
  )
}

export default DatosEstudio