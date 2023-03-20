import React, {useState, useEffect} from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es'
import axios from 'axios'

import '../../css/estilospage.css'

import { CSVLink } from 'react-csv';
import ReporteAsistenciaPage from '../../components/asistencia/ReporteAsistenciaPage'
import { CabTitulo } from '../../styles-components/formularios/FormAgente';

registerLocale("es", es)

const FindAreaComponent = () => {

  //esto a service luego
  const uri = 'http://200.12.136.74:4000/biometrico/'
  const [ruta, setRuta] = useState(`${uri}horas_area_fecha/D/2022-01-01/2022-01-01`)
  const [asistencia, setAsistencia] = useState([])

  const [fechai,setFechai]=useState(new Date())
  const [fechaf,setFechaf]=useState(new Date())

  useEffect(() => {
    
    const getAsistencia = async  () => {
      try{
        const res = await axios.get(ruta)
        await setAsistencia(res.data)
        
        
    }catch(error){
        console.log(error)
    }
    }
    

    getAsistencia()
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
      setFechaf(fecha)
  }

  const onChangeFf = (fecha)=>{
    setFechaf(fecha)

}

  const buscarAsistencia = async ()=>{
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
      let area = document.getElementById('area').value
      
      //let url = uri + 'horas_area_fecha/' + area + '/' + fi + '/' + ff
      let url = `${uri}horas_area_fecha/${area}/${fi}/${ff}`
      //setUrlsec(sede + '/' + carrera + '/' + plan)
      setRuta(url)
      console.log(area, url)
      
  }

  return (
    <Container fluid>
      <br />
      <Row className='busqueda'
        style={{
          backgroundColor:'lightgrey',
          padding:'10px',
          margin:'10px'
        }}>
        <Col xs={12} md={4}>
        

        <Form.Label htmlFor="area"> Area:Asistencia </Form.Label>
          <Form.Select id="area">
            <option>SELECCIONE UN AREA</option>
            <option value="Carrera_Licenciatura_en_Administracion">Carrera Licenciatura en  Administracion</option>
            <option value="Carrera_Licenciatura_en_Economia">Carrera Licenciatura en Economia</option>
            <option value="Carrera_Contador_Publico">Carrera Contador Público</option>
            <option value="Carrera_Licenciatura_en_Logística">Carrera Licenciatura en Logística</option>            
            <option value="Decanato">Decanato</option>
            <option value="Departamento_Clases_y_Exámenes">Departamento Clases y Exámenes</option>
            <option value="Departamento_Mesa_de_Entradas">Departamento Mesa de Entradas</option>
            <option value="Dirección_de_Alumnos">Direccion de Alumnos</option>
            <option value="Dirección_de_RRHH">Dirección de RRHH</option>   
            <option value="Dirección_de_Servicios_Generales">Dirección de Servicios Generales</option>         
            <option value="Dirección_de_Informática">Dirección de Informática</option>
            <option value="Dirección_de_Biblioteca">Dirección de Biblioteca</option>
            <option value="Dirección_de_Despacho">Dirección de Despacho</option>
            <option value="Dirección_de_Publicaciones">Dirección de Publicaciones</option>
            <option value="Dirección_General_de_Gestión_Administrativo_Financiera">Dirección General de Gestión Administrativo Financiera</option>
            <option value="Dirección_General_de_Gestión_Académica">Dirección General de Gestión Académica</option>
            <option value="ECONET">ECONET</option>
            <option value="Secretaría_de_Administración_y_Finanzas">Secretaría de Administración y Finanzas</option>
            <option value="Secretaria_de_Asustos_Estudiantiles">Secretaria de Asustos Estudiantiles</option>
            <option value="Secretaría_de_Extensión_y_RRII">Secretaría de Extensión y RRII</option>
            <option value="Secretaría_de_Posgrado_e_Investigación">Secretaría de Posgrado e Investigación</option>
            <option value="Sede_Este">Sede Este</option>
            <option value="Sede_San_Rafael">Sede San Rafael</option>
            <option value="Sede_Gral_Alvear">Sede Gral.Alvear</option>
            
          </Form.Select>
        </Col>
        
        <Col xs={12} md={2}>
        <Form.Label htmlFor="fechainicial">Fecha Inicio</Form.Label>
          <ReactDatePicker 
          id='fechai' 
          selected={fechai}
          onChange={onChangeFi}
          locale="es" className="pickers" dateFormat='dd-MM-yyyy'
          />

        </Col>
        <Col xs={12} md={2}>
        <Form.Label htmlFor="fechafinal">Fecha Fin</Form.Label>
        <ReactDatePicker 
          id='fechaf' 
          selected={fechaf}
          onChange={onChangeFf}
          locale="es" className='pickers' dateFormat='dd-MM-yyyy'
          />
         
        </Col>
       
        <Col xs={12} md={2}>
         <Button variant="primary" style={{marginTop:30}}
         onClick={buscarAsistencia}
         >Ejecutar Busqueda
         </Button>
        </Col>
        <Col xs={12} md={2}>
        {asistencia.length > 0 ? 
        <Button variant='outline'>
        <CSVLink data={asistencia} filename={"asistenciaArea_" + document.getElementById('area').value +"_" + Date.now() + ".csv"}>Exportar</CSVLink>
        </Button>
      

        :null}
        </Col>
        
      </Row>
      
      
      <Row>
      <CabTitulo style={{marginLeft:'20px'}}>Información Asistencia Por Area de Trabajo</CabTitulo>
      </Row>
      <Row>
      {asistencia.length > 0 ? <ReporteAsistenciaPage datosasistencia={asistencia} />:null} 
      </Row>
    </Container>
  )
}

export default FindAreaComponent