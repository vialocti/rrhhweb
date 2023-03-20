import React, {useState, useEffect} from 'react'
import { Button, Col, Container, Form, Row, FormControl } from 'react-bootstrap'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es'
import axios from 'axios'

import '../../css/estilospage.css'
import { CSVLink } from 'react-csv';

import ReporteAsistenciaPage from '../../components/asistencia/ReporteAsistenciaPage'
import { CabTitulo } from '../../styles-components/formularios/FormAgente';
registerLocale("es", es)

const FindPersonaComponent = () => {

  //esto a service luego
  const uri = 'http://200.12.136.74:4000/biometrico/'
  const [ruta, setRuta] = useState(`${uri}/horario_persofechas/5/666668/2022-01-01/2022-01-01`)
  const [asistencia, setAsistencia] = useState([])
  const [agentes, setAgentes] =useState([])
  const [patronb, setPatronb] = useState('')
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
  
   useEffect(()=>{
    const buscarAgentes =async ()=>{
      let rutaag = `${uri}agente_name/${patronb}`
      if (patronb.length>0){
      try{
        const res = await axios.get(rutaag)
          
            await setAgentes(res.data)
            
          
      }catch(error){
          console.log(error)
      }
    }
    }


    buscarAgentes()

   },[patronb])
 

  

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
      let legajocondi = document.getElementById('agenteb').value
      var legajo=''
      var condi=''
      if (legajocondi.length===5){
        legajo=legajocondi.slice(0,4)
        condi =legajocondi.slice(4)
      }else if (legajocondi.length=== 6){
        legajo=legajocondi.slice(0,5)
        condi =legajocondi.slice(5)
      }
      //console.log(legajocondi,legajo, condi)
      
      //let url = uri + 'horas_area_fecha/' + area + '/' + fi + '/' + ff
      let url = `${uri}horario_persofechas/${condi}/${legajo}/${fi}/${ff}`
      //setUrlsec(sede + '/' + carrera + '/' + plan)
      setRuta(url)
     // console.log(area, url)
      
  }

  const onHandleChange =()=>{
    // 
    setPatronb(document.getElementById("busqueda").value)
    // buscarAgentes()

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
        <Col xs={12} md={2}>
        <Form.Label htmlFor="busqueda"> Buscar </Form.Label>
          <FormControl 
            type="text"
            id="busqueda"
            onChange={onHandleChange}
            value={patronb}
            
          />
        </Col>
        <Col xs={12} md={3}>
        <Form.Label htmlFor="agenteb"> Agentes </Form.Label>
        <Form.Select id="agenteb">
            { agentes.length>0 ? agentes.map((age,ind)=>
               <option key={ind} value={age.legajo.toString()+age.condicion.toString()}>{age.apellido}</option>
            ):null}
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
       
        <Col xs={12} md={1}>
         <Button variant="primary" style={{marginTop:30}}
         onClick={buscarAsistencia}
         >Buscar
         </Button>
        </Col>
        <Col xs={12} md={1}>
        {asistencia.length > 0 ? 
        <Button variant='outline'>
        <CSVLink data={asistencia} filename={"asistenciaPersona_" + Date.now() + ".csv"}>Exportar</CSVLink>
        </Button>
        :null}
        </Col>
      </Row>
     
      <Row>
      <CabTitulo style={{marginLeft:'20px'}}>Información Asistencia Colaborador</CabTitulo>
      </Row>
      <Row>
      {asistencia.length > 0 ? <ReporteAsistenciaPage datosasistencia={asistencia} />: null} 
      </Row>
    </Container>
  )
}

export default FindPersonaComponent