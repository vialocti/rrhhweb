import React,{useState, useEffect} from 'react'
import { CabSubTitulo, LabelF, SelectorV } from '../../../styles-components/formularios/FormAgente'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faEdit, faUser } from '@fortawesome/free-regular-svg-icons'
import { useModal } from '../../../hooks/useModal'


import { ModalComponente } from '../../../components/ModalComponente'
import { traerDatosTitulosApi } from '../../../services/f_axiospersonas'
import FormDatosTitulos from '../../../formModales/utiles/FormDatosTitulos'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { deleteTitulo } from '../../../services/f_axioscargos'
import Swal from 'sweetalert2'

const TitulosPage = () => {
   

 
  const [titulos, setTitulos]=useState(null)
  const [tipo, setTipo]= useState('')
  const [titulo, setTitulo]=useState(null)
  
  const [isOpen,modi,openModal,closeModal,modifica] = useModal()
  
  useEffect(() => {
    const traerDatos =async ()=>{
        setTitulos(await traerDatosTitulosApi())
       
    }
  
    traerDatos()
  }, [])
  
  useEffect(() => {
    const traerDatos =async ()=>{
        
        setTitulos(await traerDatosTitulosApi())
    }
  
    traerDatos()
  }, [modi])


  /*
  const onHandleChangeI =async (inst,nombre)=>{
    setInstitucionName(nombre)
    setInstitucionM(inst)
    setEstablecimientos(await traerDatosEstablecimientosApi(inst))
  }
*/
  
const onHandleModiT =(ele)=>{
    
    setTitulo(ele)
    setTipo('U')
    openModal()
   }
  
    

  
  const handleNewDatoT=()=>{
    
    setTipo('A')
    openModal()
  }


  //

  const eliminarRegistro =async(id)=>{
    
    let resp=''
   
      resp = await deleteTitulo(id)

    
    modifica()
    //console.log(resp)
  }

  //
  const eliminarTitulo = (id, nombre) =>{

    Swal
    .fire({
        title: `Nro de Titulo:${id}`,
        text: `¿Eliminar: ${nombre}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    })
    .then(resultado => {
        if (resultado.value) {
            // Hicieron click en "Sí"
            eliminarRegistro(id)
            
        } else {
            // Dijeron que no
            
        }
    });

  }


  return (
    <div className="container-fluid" style={{marginTop:'15px', padding:'10px'}}>

          
          <ModalComponente isOpen={isOpen} closeModal={closeModal}>
            
          <FormDatosTitulos modifica={modifica} funcion={closeModal} tipo={tipo} datos={titulo} />
                             
          </ModalComponente>


        <div className="card">
      
            <div className="card-header">
      
            <div className="row">
               
               <div className="col-md-10 col-xs-12">
               <CabSubTitulo>Titulos</CabSubTitulo>
               </div>
               
                <div className="col-md-2">
                  <button className='btn btn-secondary'onClick={handleNewDatoT} style={{'marginLeft':'10px'}}>Agregar<FontAwesomeIcon icon={faUser} style={{marginLeft:'5px'}} /></button>

                  </div>
                  
            
            </div>

          </div>

          <div className="card-body">
               
                
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-8 col-xs-12">
                
                                
                        <table className='table table-sm'> 
                          <thead className='thead-dark'>
                          <tr>
                            <th>Id</th>
                            <th>Sigla</th>
                            <th>Nombre</th>
                            <th></th>
                            <th></th>
                            
                            </tr>
                          </thead>
                          <tbody>
                            {titulos?titulos.map((ele,index)=>(
                                  <tr key={index}>
                                    <td>{ele.id_row}</td>
                                    
                                    <td>{ele.nombre}</td>
                                                                <td><button
                                    onClick={()=>onHandleModiT(ele)}
                                      >
                                <FontAwesomeIcon icon={faEdit} />
                              </button></td>
                              
                                  <td>
                                    <button onClick ={()=>eliminarTitulo(ele.id_row, ele.nombre)}>
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

export default TitulosPage