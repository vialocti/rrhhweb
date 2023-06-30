import React, {useState, useEffect} from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es'
import axios from 'axios'

import '../../css/estilospage.css'
import { CSVLink } from 'react-csv';
//import ReporteAsistenciaPage from '../../components/asistencia/ReporteAsistenciaPage'
import { CabTitulo } from '../../styles-components/formularios/FormAgente';
import ReporteAusentesPage from '../../components/ausentes/ReporteAusentesPage';
import imageEspera from '../../assets/images/waiting-wait.gif' 


registerLocale("es", es)

const FindAusentesNDComponent = () => {

  //esto a service luego
  const uri = 'http://200.12.136.74:4000/biometrico/'
  const [ruta, setRuta] = useState(``)
  //const [rutaprev, setRutaprev] = useState(``)
  const [ausentes, setAusentes] = useState([])

  const [fechai,setFechai]=useState(new Date())
  const [visible, setVisible]=useState(false)
  

  useEffect(() => {
    
    const getAusentes = async  () => {
      try{
        setVisible(true)
        const res = await axios.get(ruta)
        await setAusentes(res.data)
        setVisible(false)
        
    }catch(error){
        console.log(error)
    }
    }
    
    if(ruta!==''){
      getAusentes()
    }
  }, [ruta])
  



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


  const onChangeFi = (fecha)=>{
      setFechai(fecha) 
      
  }

  

  const buscarAusentes = async ()=>{
      var fi =''
      
      
        fi = convertirfecha(fechai)
      
      let condi = document.getElementById('condi').value
            //et url = uri + 'horas_area_fecha/' + area + '/' + fi + '/' + ff
      //let url = uri + horario_claustrofechas/' + condi +'/'+ fi + '/' + ff'
      let url = `${uri}getausentes/${fi}`
      setRuta(url)
     
      //setAusentes([])


      
      //console.log(url)
      
      
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
        <Col xs={12} md={4}>
        <Form.Label htmlFor="condi"> Personal de Apoyo: Ausentes </Form.Label>
          <Form.Select id="condi">
            
            <option value="0">Personal No Docente</option>
            
          </Form.Select>
        </Col>
        
        <Col xs={12} md={2}>
        <Form.Label htmlFor="fechainicial">Fecha Reporte</Form.Label>
          <ReactDatePicker 
          id='fechai' 
          selected={fechai}
          onChange={onChangeFi}
          locale="es" className="pickers" dateFormat='dd-MM-yyyy'
          />
        </Col>
               
        <Col xs={12} md={2}>
         <Button variant="primary" style={{marginTop:30}}
         onClick={buscarAusentes}
         >Ejecutar Busqueda
         </Button>
        </Col>
        <Col xs={12} md={2}>
        {ausentes.length > 0 ? 
        <Button variant='outline'>
        <CSVLink data={ausentes} filename={"ausentes_" + fechai + ".csv"}>Exportar</CSVLink>
        </Button>
        :null}
        </Col>
        <Col xs={12} md={2}>
          {visible?
          <img src={imageEspera} width={'100px'} alt="espere un moment"/>
          :null}
        </Col>
      </Row>
      
      <Row>
        <CabTitulo style={{marginLeft:'20px'}}>Información Ausentes Día</CabTitulo>
        </Row>
      <Row>
      {ausentes.length > 0 ? <ReporteAusentesPage datosausentes={ausentes} />:null} 
      </Row>
    </Container>
  )
}

export default FindAusentesNDComponent