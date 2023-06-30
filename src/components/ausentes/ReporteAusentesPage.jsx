import { faHandPointLeft } from '@fortawesome/free-regular-svg-icons'
import React,{useEffect, useState} from 'react'
//import moment from 'moment'
import { Container, Table } from 'react-bootstrap'
import SignupForm1 from '../../formModales/SignupForm1'
//import { CSVLink } from 'react-csv'
import {useModal} from '../../hooks/useModal'
import { ModalComponente } from '../ModalComponente'

const ReporteAusentesPage = ({datosausentes}) => {
  
  //const [isOpen,openModal,closeModal] = useModal()
  
  const [ausentes, setAusentes] = useState([])
  const [dato, setDato] = useState(null)

  useEffect(() => {
    
    setAusentes(datosausentes)
  }, [datosausentes])
  
  
 
  return (
       <Container fluid>
      
    

      <Table striped bordered hover size="sm" className='table'>
      <thead>
        <tr>
          
          <th>Legajo</th>
          <th>Nombre</th>
          <th>Area Trabajo</th>
          <th>Inasistencia Estado</th>
          
        </tr>
      </thead>
      <tbody>
      {ausentes.map((ele, ind) =>
      
      <tr key={ind}>
          <td>{ele.legajo} </td>
          <td>{ele.apellido}</td>
          <td>{ele.area}</td>
          <td>{ele.asistencia==='L'?"Licencia":"Ausente"}</td>
          
      </tr>
      
      )}
      </tbody>
      </Table>
      
     </Container>  
  )
}

export default ReporteAusentesPage