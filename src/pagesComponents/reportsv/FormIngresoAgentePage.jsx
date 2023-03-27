import React,{useState,useEffect} from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'
import { CSVLink } from 'react-csv'
import { getAniosIngreso } from '../../services/f_axioscargos'
import { CabTitulo } from '../../styles-components/formularios/FormAgente'
import { Wrapper } from '../../styles-components/vistas/Personas'

const FormIngresoAgentePage = () => {
  
  const [anioref, setAnioref]=useState('1945')
  const [perInfo, setPerInfo]=useState(null)
  const [lugarI,setLugarI]=useState('1')
  const [buscar,setBuscar]=useState('0')


  const onHandleChange=()=>{
    setAnioref(document.getElementById('anioref').value)
  }

  const handleChangelG =()=>{
    setLugarI(document.getElementById('lgingreso').value)
  }
  const buscarInfo=()=>{
    if(anioref>1944)
        setBuscar('1')
  }

 useEffect(() => {
    const getInfoAnioIngreso =async()=>{
        const response =await getAniosIngreso(anioref,lugarI)
        .then(response =>{
            setPerInfo(response.data)
            //console.log(response.data)
            setBuscar('0')
  
        }) 
        .catch (error=> {
            console.log(error)  
        }) 
  
    }
    if(anioref>1942 && buscar==='1'){
        getInfoAnioIngreso()  
    }
 }, [buscar])
 

  return (
    <>
    <Wrapper>
    <div className='container ml-4'>

        <div className='row'>
          <div className='col-md-3'>
            <Form.Label htmlFor="busqueda">Seleccionar Año  </Form.Label>
            <FormControl 
              type="text"
              id="anioref"
              onChange={onHandleChange}
              value={anioref}
            
            />
          </div>
            
          <div className='col-md-3'>
          <Form.Label htmlFor="lgingreso">Referencia Ingreso </Form.Label>
            <Form.Select id="lgingreso" onChange={handleChangelG}>
                <option value="1">Ingreso FCE</option>
                <option value="2">Ingreso UNCU</option>
                <option value="3">Ingreso APN</option>
            </Form.Select>

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

          {perInfo?
          <div className='col-md-2'>
         <br/>
          <CSVLink data={perInfo} filename={"ingresoaniolugar" + "_" + Date.now() + ".csv"}>Exportar</CSVLink>
          </div>:null
        }           


    </div>  
    </Wrapper>
    <CabTitulo style={{marginLeft:'10px'}}>Información Ingreso Año Lugar Agente</CabTitulo>

    {perInfo?<div>
        <table className='table  table-striped bordered hover size="sm' >
          <thead>
            <tr>
          
            <th>Legajo</th>
            <th>Nombre</th>
            <th>Fecha Ingre.FCE</th>
            <th>Fecha Ingre.UNCU</th>
            <th>Fecha Ingre.APN</th>
            
          </tr>
        </thead>
        <tbody>
        {perInfo.map((ele, ind) =>
          
          <tr key={ind}>
              <td>{ele.legajo} </td>
              <td>{ele.apellido}</td>
              <td>{ele.fechaIFCE}</td>
              <td>{ele.fechaIUNC}</td>
              <td>{ele.fechaIAPN}</td>
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

export default FormIngresoAgentePage