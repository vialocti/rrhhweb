import React, { useEffect, useState } from 'react'

//import { useAgenteCargos } from '../../hooks/useAgenteCargos'
import { faUpDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ModalComponente } from '../ModalComponente'
import { useSelector } from 'react-redux'
import { getLastNroCargo, traerCargosAgenteApi } from '../../services/f_axioscargos'
import FormCambioDedicacion from '../../formModales/FormCambioDedicacion'
import { useModal } from '../../hooks/useModal'
//import CargosConsulta from './CargosConsulta'

const FormDedicacion = () => {

    const {legajo}=useSelector(state=>state.agente) 
    const {materias}=useSelector(state=>state.datosfce)
    const [dato, setDato] = useState(null)
    const [nrocargos, setNrocargos] =useState('')
    const [idMat, setIdMat]= useState('')
    const [cargosAgente, setCargosAgente] = useState(null)
    //const [isOpen,openModal,closeModal] = useModal()
    const [isOpen,modi,openModal,closeModal,modifica] = useModal()
  
    useEffect(() => {
        const cargardatos=async()=>{
          setNrocargos(await getLastNroCargo(legajo))
          setCargosAgente(await traerCargosAgenteApi(legajo))
          
          }
          //console.log(materias)
          cargardatos()
      }, [modi, legajo])
 
  //const {loading,error,cargosAgente} = useAgenteCargos()
 
  //if(loading) return <p>Cargando datos .....</p>
  //  if(error) return <p>Error de Carga</p> 
  //console.log(cargosAgente)


  const CargoModificarDedicacion=(ele)=>{
    if(ele.legajo > 0){
        setDato(ele)
        setIdMat(ele.pl+ele.mat)
        openModal()
      }
    
  }
  return (
    <>
    {cargosAgente?cargosAgente.length > 0
    ?<div className='container'>
         <ModalComponente isOpen={isOpen} closeModal={closeModal}>
         <FormCambioDedicacion dato={dato} modifica={modifica} nrocargoG={nrocargos} funcion={closeModal} materias={materias} idmat={idMat}/>
         </ModalComponente>

         <div  className='row'>
         
                    
         <table className='table  table-striped bordered hover size="sm' >
          <thead>
            <tr>
          
            <th>NC</th>
            <th>INST</th>
            <th>CA</th>
            <th>ES</th>
            <th>PPAL</th>
            <th>NV</th>
            <th>CAR</th>
            <th>PL</th>
            <th>MAT</th>
            <th>FECHA ALTA</th>
            <th>Nro.Res.A</th>
            <th>FECHA BAJA</th>
            <th>Sit.</th>
            <th></th>
            
          </tr>
        </thead>
        <tbody>
        {cargosAgente.map((ele, ind) =>
          
          <tr key={ind}>
              <td>{ele.nc} </td>
              <td>{ele.inst}</td>
              <td>{ele.ca}</td>
              <td>{ele.es}</td>
              <td>{ele.ppal}</td>
              <td>{ele.nv}</td>
              <td>{ele.car}</td>
              <td>{ele.pl}</td>
              <td> {ele.mat}</td>
            
              <td>{ele.fechaAlta}</td>
              <td>{ele.nresa}</td>
              <td>{ele.fechaBaja}</td>
              <td>{ele.st}</td>
              <td>
                {ele.es==='1'?<button
              onClick={()=>CargoModificarDedicacion(ele)}
            >
               <FontAwesomeIcon icon={faUpDown} /> 
              </button>:null}

              </td>
              
                    
          </tr>

          
          )}
          </tbody>
      </table>
    </div>


    </div>
    :null:null
   }
    </>
    )
}




export default FormDedicacion