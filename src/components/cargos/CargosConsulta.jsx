import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState,useEffect} from 'react'
import { faDownload, faRegistered} from '@fortawesome/free-solid-svg-icons'
import {  CabTituloCargo } from '../../styles-components/formularios/FormAgente'

//import { Container, Row, Table } from 'react-bootstrap'
// {/*<RenovacionCargoForm dato={dato} nrocargoG={nrocargos[0]} funcion={closeModal}  />*/}
import {useModal} from '../../hooks/useModal'
import { ModalComponente } from '../ModalComponente'
//import RenovacionCargoForm from '../../formModales/RenovacionCargoForm'
import { getLastNroCargo } from '../../services/f_axioscargos'
import { useSelector } from 'react-redux'
//import BajaCargoForm from '../../formModales/BajaCargoForm'
import FormRenovacionCargo from '../../formModales/FormRenovacionCargo'
import FormBajaCargo from '../../formModales/FormBajaCargo'
import Swal from 'sweetalert2'


const CargosConsulta = (props) => {
  
  const {legajo}=useSelector(state=>state.agente) 
  const {materias}=useSelector(state=>state.datosfce)
  const [isOpen,openModal,closeModal] = useModal()
  const [tipoOpera, setTipoOpera] = useState('R')
  const [dato, setDato] = useState(null)
  const [nrocargos, setNrocargos] =useState('')
  const [idMat, setIdMat]= useState('')
  

  useEffect(() => {
    const cargardatos=async()=>{
      setNrocargos(await getLastNroCargo(legajo))
      
      }
      //console.log(materias)
      cargardatos()
  }, [])
  

    const {cargos, title,tipo} = props
   // console.log(cargos)
   
   const mostrarmat =(id_mat)=>{
   
   
   try{
    let [materia] =materias.filter(materia => materia.id_materia == id_mat)
    let carrera=''
    if(materia.car ===2){
      carrera ='CONTADOR PUBLICO NACIONAL'
    }else if(materia.car === 3){
      carrera ='LICENCIATURA EN ADMINISTRACION'
    }else if(materia.car === 4){
      carrera ='LICENCIATURA EN ECONOMIA'
    }else if(materia.car === 6){
      carrera ='CICLO LIC.EN NEGOCIOS REGIONALES'
    }else if(materia.car === 7){
      carrera ='LICENCIATURA EN LOGISTICA'
    }else if(materia.car === 8){
      carrera ='CONTADOR PUBLICO'
    }
    
    Swal.fire({
      
      text: `(${id_mat})${materia.materia}`,
      icon: 'info',
      showCancelButton: true,})

    }catch(error){
      console.log(error)
    }
   }

   const RenovacionCargo =(ele)=>{
    if(ele.legajo > 0){
      setDato(ele)
      setIdMat(ele.pl+ele.mat)
      setTipoOpera('R')
      openModal()
      }
   }

   const bajaCargo =(ele)=>{
    if(ele.legajo > 0){
        setDato(ele)
        setIdMat(ele.pl+ele.mat)
        setTipoOpera('B')
        openModal()
      }
   }
  
  
  
   return (
    <div className='container'>

      <ModalComponente isOpen={isOpen} closeModal={closeModal}>
          
         { tipoOpera==='R'?
         <FormRenovacionCargo dato={dato}  nrocargoG={nrocargos} funcion={closeModal} materias={materias} idmat={idMat} />
        
          :
          <FormBajaCargo dato={dato} funcion={closeModal} materias={materias} idmat={idMat}/>
        }
      </ModalComponente> 
    <CabTituloCargo>{title}</CabTituloCargo>   
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
            <th>Nro.Res.B</th>
            <th>M.Baja</th>
            <th>Sit.</th>
            <th>NCG</th>
          </tr>
        </thead>
        <tbody>
        {cargos.map((ele, ind) =>
          
          <tr key={ind}>
              <td>{ele.nc} </td>
              <td>{ele.inst}</td>
              <td>{ele.ca}</td>
              <td>{ele.es}</td>
              <td>{ele.ppal}</td>
              <td>{ele.nv}</td>
              <td>{ele.car}</td>
              <td>{ele.pl}</td>
              <td onMouseOver={ele.pl?()=>mostrarmat(ele.pl+ele.mat):null}>{ele.mat}</td>
              
              <td>{ele.fechaAlta}</td>
              <td>{ele.nresa}</td>
              <td>{ele.fechaBaja}</td>
              <td>{ele.nresb}</td>
              <td>{ele.mb}</td>
              <td>{ele.st}</td>
              <td>{ele.ncg}</td>
              {tipo===1?<>

                <td>
                  {ele.ca !=='1'?
                <button
              onClick={()=>RenovacionCargo(ele)}
            >
               <FontAwesomeIcon icon={faRegistered} />
              </button>
               :null }
              </td>
              <td>
                <button
              onClick={()=>bajaCargo(ele)}
            >
               <FontAwesomeIcon icon={faDownload} />
              </button>
              </td>
                </>
              :null}

              
          </tr>

          
          )}
          </tbody>
      </table>
    </div>

    </div>
  )
}

export default CargosConsulta