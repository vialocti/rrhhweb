import React, {useState, useEffect} from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es'
//import axios from 'axios'

import '../../css/estilospage.css'
import { CSVLink } from 'react-csv';
//import ReporteAsistenciaPage from '../../components/asistencia/ReporteAsistenciaPage'
import { CabTitulo } from '../../styles-components/formularios/FormAgente';
import InasistenciaMuestraReporte from '../../components/inasistencia/InasistenciaMuestraReporte';
import LicenciaMuestraReporte from '../../components/licencia/LicenciaMuestraReporte';
import { getLicenciasReporte, getInasistenciasReporte } from '../../services/f_axioscargos';
registerLocale("es", es)

const FindInasLicComponent = ({opera}) => {

  //esto a service luego
  
  const [datos, setDatos] = useState([])

  const [fechai,setFechai]=useState(new Date())
  const [fechaf,setFechaf]=useState(new Date())

  useEffect(() => {
    setDatos([])
   
  }, [opera])
  



 //funcion de conversion de fecha para consulta
   
 const convertirfecha = (fecha)=>{
      
      let dia=fecha.getDate()
      let mes = fecha.getMonth() +1
      let anio = fecha.getFullYear()
      if (dia < 10){
        dia = '0' + dia
      }
      if (mes<10){
        mes = '0' + mes
      }

      return anio + '-' + mes + '-' + dia

   }
   
   const getReport = async  (fi,ff) => {
    try{
      
      if(opera==='I'){
        setDatos(await getInasistenciasReporte(fi,ff))
        
      }else{
       setDatos(await getLicenciasReporte(fi,ff))
       
      }
      
  }catch(error){
      console.log(error)
  }
  }

  const onChangeFi = (fecha)=>{
      setFechai(fecha) 
      setFechaf(fecha)
  }

  const onChangeFf = (fecha)=>{
    setFechaf(fecha)

}

  const buscarInaLiceAsistencia = async ()=>{
      var ff = ''
      var fi =''
      
      if (fechaf-fechai < 0){
        alert('La fecha Final no puede ser menor a la fecha inicial')
      //}else if (fechaf-fechai===0){
      //  ff = '0'
      //  fi = convertirfecha(fechai)
      //  console.log(fi)
      //  console.log(ff)
      }else{
        ff = convertirfecha(fechaf)
        fi = convertirfecha(fechai)
      //  console.log(fi)
      //  console.log(ff)
      }
      getReport(fi,ff)
      
  }

  return (
    <Container fluid>
      <br />
      <Row className='busqueda'
      style={{
        backgroundColor:'lightgrey',
        padding:'10px',
        margin:'10px'
      }}
      >
        
        
        <Col xs={12} md={3}>
        <Form.Label htmlFor="fechainicial">Fecha Inicio</Form.Label>
          <ReactDatePicker 
          id='fechai' 
          selected={fechai}
          onChange={onChangeFi}
          locale="es" className="pickers" dateFormat='dd-MM-yyyy'
          />

        </Col>
        <Col xs={12} md={3}>
        <Form.Label htmlFor="fechafinal">Fecha Fin</Form.Label>
        <ReactDatePicker 
          id='fechaf' 
          selected={fechaf}
          onChange={onChangeFf}
          locale="es" className='pickers' dateFormat='dd-MM-yyyy'
          />
         
        </Col>
       
        <Col xs={12} md={3}>
         <Button variant="primary" style={{marginTop:30}}
         onClick={buscarInaLiceAsistencia}
         >Ejecutar Busqueda
         </Button>
        </Col>
        <Col xs={12} md={2}>
        {datos.length > 0 ? 
        <Button variant='outline'>
        <CSVLink data={datos} filename={"inasistencias" + "_" + Date.now() + ".csv"}>Exportar</CSVLink>
        </Button>
        :null}
        </Col>
      </Row>
      
      <Row>
      {opera==='I'
        
        ?<CabTitulo style={{marginLeft:'20px'}}>Información Inasistencias Por Periodo</CabTitulo>
        :<CabTitulo style={{marginLeft:'20px'}}>Información Licencias Por Periodo</CabTitulo>  
      }
        </Row>
      {opera==='I'
      ?<Row>
      {datos.length > 0 ? <InasistenciaMuestraReporte datos={datos} />:null} 
      </Row>

      :<Row>
      {datos.length > 0 ? <LicenciaMuestraReporte datos={datos} />:null} 
      </Row>
      }
    </Container>
  )
}

export default FindInasLicComponent