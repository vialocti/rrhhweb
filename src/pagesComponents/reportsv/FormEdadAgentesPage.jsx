import React,{useEffect,useState} from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'
import { CSVLink } from 'react-csv'
import { getEdadAnio } from '../../services/f_axioscargos'
import { CabTitulo } from '../../styles-components/formularios/FormAgente'
import { Wrapper } from '../../styles-components/vistas/Personas'

const FormEdadAgentesPage = () => {

     const [datosper, setDatosper]=useState(null)
     const [edad, setEdad]=useState('')
     const [buscar,setBuscar]=useState('0')

  const onHandleChange =()=>{
    setEdad(document.getElementById('edad').value)
  }

  const buscarInfo=()=>{
    if(edad>40 && edad<75){
    setBuscar('1')
    }
  }

  useEffect(() => {
   
    const getInfoPer =async()=>{
      const response =await getEdadAnio(edad)
      .then(response =>{
          setDatosper(response.data)
          //console.log(response.data)
          setBuscar('0')

      }) 
      .catch (error=> {
          console.log(error)  
      }) 

  }
  if(edad>19 && buscar==='1'){
    getInfoPer()  
  }
  }, [buscar])
  
  return (
    <>
    <Wrapper>
    <div className='container ml-4'>

        <div className='row'>
          <div className='col-md-4'>
            <Form.Label htmlFor="busqueda">Seleccionar Edad </Form.Label>
            <FormControl 
              type="text"
              id="edad"
              onChange={onHandleChange}
              value={edad}
            
            />
          </div>
            
          <div className='col-md-2'>

          </div>

          <div className='col-md-2'>
            <br/>

            <Button onClick={buscarInfo}>
                Ver Información
            </Button>
          </div>
        </div>    

        {datosper?
          <div className='col-md-2'>
            <br />
          <CSVLink data={datosper} filename={"edadaniocorriente" + "_" + Date.now() + ".csv"}>Exportar</CSVLink>
          </div>:null
        }                 


    </div>  
    </Wrapper>
    <CabTitulo style={{marginLeft:'10px'}}>Información Edad Agentes Año en Curso</CabTitulo>

  {datosper?<div>
    
    <table className='table  table-striped bordered hover size="sm' >
          <thead>
            <tr>
          
            <th>Legajo</th>
            <th>Nombre</th>
            <th>Fech.Nacimiento</th>
            <th>Edad</th>
            
          </tr>
        </thead>
        <tbody>
        {datosper.map((ele, ind) =>
          
          <tr key={ind}>
              <td>{ele.legajo} </td>
              <td>{ele.apellido}</td>
              <td>{ele.fechaNac}</td>
              <td>{ele.edad}</td>
          </tr>
        )}
        </tbody>
      </table>  
    </div>
  :null
  }
    
    </>
  )
}

export default FormEdadAgentesPage