import { faHandPointLeft } from '@fortawesome/free-regular-svg-icons'
import React,{useEffect, useState} from 'react'
//import moment from 'moment'
import { Container, Table } from 'react-bootstrap'
import SignupForm1 from '../../formModales/SignupForm1'
//import { CSVLink } from 'react-csv'
import {useModal} from '../../hooks/useModal'
import { ModalComponente } from '../ModalComponente'

const ReporteAsistenciaPage = ({datosasistencia}) => {
  
  //const [isOpen,openModal,closeModal] = useModal()
  const [isOpen,modi,openModal,closeModal,modifica] = useModal()

  
  const [asistencia, setAsistencia] = useState([])
  const [dato, setDato] = useState(null)

  useEffect(() => {
    
    setAsistencia(datosasistencia)
  }, [datosasistencia])
  
  
  const handlehorario =(ele)=>{
    if(ele.legajo > 0){
    setDato(ele)
    openModal()
    }
  }
  return (
       <Container fluid>
      
      <ModalComponente  isOpen={isOpen} closeModal={closeModal} >
      
        <SignupForm1 dato={dato} funcion={closeModal}/>
      </ModalComponente>


      <Table striped bordered hover size="sm" className='table'>
      <thead>
        <tr>
          
          <th>Legajo</th>
          <th>Nombre</th>
          <th>Fecha</th>
          <th>Entrada</th>
          <th>Salida</th>
          <th>Modificar</th>
        </tr>
      </thead>
      <tbody>
      {asistencia.map((ele, ind) =>
      
      <tr key={ind}>
          <td>{ele.legajo} </td>
          <td>{ele.apellido}</td>
          <td>{ele.fecha}</td>
          <td>{ele.Hentrada}</td>
          <td>{ele.Hsalida}</td>
          {ele.Hsalida==='X'?
          <td><button onClick={()=>handlehorario(ele)}>M</button></td>
          :null
          }

      </tr>
      
      )}
      </tbody>
      </Table>
      
     </Container>  
  )
}

export default ReporteAsistenciaPage