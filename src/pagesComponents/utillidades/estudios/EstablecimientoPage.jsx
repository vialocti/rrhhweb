import React,{useState, useEffect} from 'react'
import { traerDatosEstablecimientosApi, traerDatosInstitucionesApi } from '../../../services/f_axiospersonas'
import { CabSubTitulo, LabelF, SelectorV } from '../../../styles-components/formularios/FormAgente'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faVirus } from '@fortawesome/free-solid-svg-icons'
import { faEdit, faUser } from '@fortawesome/free-regular-svg-icons'
import { useModal } from '../../../hooks/useModal'

import FormDatosInstituciones from '../../../formModales/utiles/FormDatosInstituciones'
import { ModalComponente } from '../../../components/ModalComponente'
import FormDatosEstablecimientos from '../../../formModales/utiles/FormDatosEstablecimientos'
import Swal from 'sweetalert2'
import { deleteEstablecimiento, deleteInstitucion } from '../../../services/f_axioscargos'

const EstablecimientoPage = () => {
   

 
  
  const [establecimientos, setEstablecimientos] = useState([])
  const [instituciones, setInstituciones] = useState([]) 
  const [establecimiento, setEstablecimiento] = useState(null)
  const [institucionM, setInstitucionM] = useState(1)
  const [institucionName, setInstitucionName] = useState('UNIVERSIDAD NACIONAL DE CUYO')
  const [institucion, setInstitucion] = useState(null) 
  const [tipo, setTipo]= useState('')
  const [tipoI, setTipoI]= useState('')

  const [isOpen,modi,openModal,closeModal,modifica] = useModal()
  
  useEffect(() => {
    const traerDatos =async ()=>{
        setEstablecimientos(await traerDatosEstablecimientosApi(1))
        setInstituciones(await traerDatosInstitucionesApi())
    }
  
    traerDatos()
  }, [])
  
  useEffect(() => {
    const traerDatos =async ()=>{
        setEstablecimientos(await traerDatosEstablecimientosApi(1))
        setInstituciones(await traerDatosInstitucionesApi())
    }
  
    traerDatos()
  }, [modi])


  const onHandleChangeI =async (inst,nombre)=>{
    setInstitucionName(nombre)
    setInstitucionM(inst)
    setEstablecimientos(await traerDatosEstablecimientosApi(inst))
  }

  const onHandleModiI =(ele)=>{
    
    setTipoI('I')
    setTipo('U')
    setInstitucion(ele)
    openModal()
   }
  
  const onHandleModiE =(ele)=>{
    setTipoI('E')
    setTipo('U')
    setEstablecimiento(ele)
    openModal()
  }

  const handleNewDatoE=()=>{
    setTipoI('E')
    setTipo('A')
    openModal()
  }
  const handleNewDatoI=()=>{
    setTipoI('I')
    setTipo('A')
    openModal()
  }

//
  const eliminarRegistro =async(id,tp)=>{
    let resp=''
    if(tp==='I'){
      resp = await deleteInstitucion(id)

    }else if (tp==='E'){
      resp = await deleteEstablecimiento(id)

    }
    modifica()
    //console.log(resp)
  }
//
const eliminarEstablecimiento =(id, nombre)=>{
    
    
  Swal
  .fire({
      title: `Nro de Establecimiento:${id}`,
      text: `¿Eliminar: ${nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
  })
  .then(resultado => {
      if (resultado.value) {
          // Hicieron click en "Sí"
          eliminarRegistro(id, 'E')
          
      } else {
          // Dijeron que no
          
      }
  });
}


const eliminarInstitucion =(id, nombre)=>{
    
    
  Swal
  .fire({
      title: `Nro de Institucion:${id}`,
      text: `¿Eliminar: ${nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
  })
  .then(resultado => {
      if (resultado.value) {
          // Hicieron click en "Sí"
          eliminarRegistro(id, 'I')
          
      } else {
          // Dijeron que no
          
      }
  });
}


//
  return (
    <div className="container-fluid" style={{marginTop:'15px', padding:'10px'}}>

          
          <ModalComponente isOpen={isOpen} closeModal={closeModal}>
            
            {tipoI==='I'

              ?<FormDatosInstituciones modifica={modifica} funcion={closeModal} tipo={tipo} datos={institucion} />
              :<FormDatosEstablecimientos modifica={modifica} funcion={closeModal} tipo={tipo} datos={establecimiento} nameI={institucionName} idI={institucionM}/>
              }
          </ModalComponente>


        <div className="card">
      
            <div className="card-header">
      
            <div className="row">
               <div className="col-md-12 col-md-12">
               <CabSubTitulo>Instituciones y Establecimientos</CabSubTitulo>
               </div>
            </div>

            <div className="row">
                  
                  <div className="col-md-4">
                      <LabelF htmlFor='institucion'>Institucion: {institucionName}</LabelF>
                  </div>
                  <div className="col-md-2">
                  <button className='btn btn-secondary'onClick={handleNewDatoI} style={{'marginLeft':'10px'}}>Agregar<FontAwesomeIcon icon={faUser} style={{marginLeft:'5px'}} /></button>

                  </div>
                  <div className="col-md-4">
                      <LabelF htmlFor='establecimiento'>Establecimientos</LabelF>
                  </div>
                  <div className="col-md-2">
                  <button className='btn btn-secondary'onClick={handleNewDatoE} style={{'marginLeft':'10px'}}>Agregar<FontAwesomeIcon icon={faUser} style={{marginLeft:'5px'}} /></button>

                  </div>
                  
              </div>

            </div>

            <div className="card-body">
               
                
                <div className="row">
                    <div className="col-md-6 col-xs-12">
                
                                
                        <table className='table table-sm'> 
                          <thead className='thead-dark'>
                          <tr>
                            <th>Id</th>
                            <th>Sigla</th>
                            <th>Nombre</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {instituciones?instituciones.map((ele,index)=>(
                                  <tr key={index}>
                                    <td>{ele.id_row}</td>
                                    <td>{ele.codigoI}</td>
                                    <td>{ele.nombre}</td>
                                    <td><button
                                    onClick={()=>onHandleChangeI(ele.id_row,ele.nombre)}
                                      >
                                <FontAwesomeIcon icon={faVirus} />
                              </button></td>
                              <td><button
                                    onClick={()=>onHandleModiI(ele)}
                                      >
                                <FontAwesomeIcon icon={faEdit} />
                              </button></td>

                              <td>
                                <button
                                  onClick={()=>eliminarInstitucion(ele.id_row, ele.nombre)}
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                  </button>
                                </td>
                                  </tr>
                            )):null}
                          </tbody> 
                        </table>
                    </div>
                    
                    <div className="col-md-6 col-xs-12">
                      
          
                     <table className='table table-sm'>
                         <thead>
                              <tr>
                                <th>Id</th>
                                <th>Nombre Establecimiento</th>
                                <th></th>
                                <th></th>
                              </tr>
                          </thead>  
                          <tbody>     
                        {establecimientos?establecimientos.map((ele,index)=>(
                           <tr key={index}> 
                            <td>{ele.id_row}</td>
                            <td>{ele.nombre}</td>
                            <td><button
                                    onClick={()=>onHandleModiE(ele)}
                                      >
                                <FontAwesomeIcon icon={faEdit} />
                              </button></td>
                              <td>
                                <button
                                  onClick={()=>eliminarEstablecimiento(ele.id_row, ele.nombre)}
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                  </button>
                                </td>
                            </tr>
                     )):null}
                     
                     </tbody>
                    </table>
                      
                    </div>               
               
                </div>
               
            

            </div>

            <div className="card-footer">
               
            </div>
        </div>

    </div>
  )
}

export default EstablecimientoPage