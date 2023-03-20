import React,{useState, useEffect} from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es'
import axios from 'axios'
import '../../css/estilospage.css'
import { CSVLink } from 'react-csv';
import ReportePromediosPage from '../../pages/asistencia/ReportePromediosPage';

registerLocale("es", es)

const FindClaustroPromediosComponent = () => {
    
    
    const uri = 'http://200.12.136.74:4000/biometrico/'
    const [ruta, setRuta] = useState(`${uri}horasestadisticasnodoc/10/2000-01-01/2000-01-21`)
    const [promedios, setPromedios] = useState([])
  
    const [fechai,setFechai]=useState(new Date())
    const [fechaf,setFechaf]=useState(new Date())
  
    useEffect(() => {
      
      const getPromedios = async  () => {
        try{
          const res = await axios.get(ruta)
          await setPromedios(res.data)
          
          
      }catch(error){
          console.log(error)
      }
      }
      
  
      getPromedios()
      
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
  
    const buscarPromedio = async ()=>{
        var ff = ''
        var fi =''
        
        if (fechaf-fechai < 0){
          alert('La fecha Final no puede ser menor a la fecha inicial')
     
        }else{
          ff = convertirfecha(fechaf)
          fi = convertirfecha(fechai)
  
        }
        let condi = document.getElementById('condi').value
        
        //et url = uri + 'horas_area_fecha/' + area + '/' + fi + '/' + ff
        //let url = uri + horario_claustrofechas/' + condi +'/'+ fi + '/' + ff'
        let url = `${uri}horasestadisticasnodoc/${condi}/${fi}/${ff}`
        //setUrlsec(sede + '/' + carrera + '/' + plan)
        setRuta(url)
        
        
    }
  
    return (
      <Container fluid>
        <br />
        <Row className='busqueda'>
          <Col xs={12} md={4}>
          <Form.Label htmlFor="condi"> Claustro: Promedios </Form.Label>
            <Form.Select id="condi">
              <option>SELECCIONE CLAUSTRO</option>
              <option value="1">Personal Docentes</option>
              <option value="0">Personal No Docente</option>
              
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
           onClick={buscarPromedio}
           >Ejecutar Busqueda
           </Button>
          </Col>
          <Col xs={12} md={2}>
          {promedios.length > 0 ? 
          <Button variant='outline'>
          <CSVLink data={promedios} filename={"promedioClaustro_" + document.getElementById('condi').value +"_" + Date.now() + ".csv"}>Exportar</CSVLink>
          </Button>
          :null}
          </Col>
        </Row>
        <hr />
      
        <Row>
        {promedios.length > 0 ? <ReportePromediosPage datospromedios={promedios} />:null} 
        </Row>
      </Container>
    )
}

export default FindClaustroPromediosComponent