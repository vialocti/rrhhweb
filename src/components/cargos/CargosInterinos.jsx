import axios from 'axios'
import React,{useState, useEffect} from 'react'
import { Button, Row, Table } from 'react-bootstrap'
import { CSVLink } from 'react-csv'
import { CabTitulo } from '../../styles-components/formularios/FormAgente'

const uri = 'http://200.12.136.74:4000/'
const CargosInterinos = () => {

    const ruta = `${uri}cargos/cargosinterinos`  
    const [cargos, setCargos]= useState([])

    useEffect(()=>{
        const getCargosV = async  () => {
            try{
              const res = await axios.get(ruta)
              await setCargos(res.data)
              
              
          }catch(error){
              console.log(error)
          }
          }

        getCargosV()  
    },[ruta])
  
    return (
    <div className="table-wrapper-scroll-y my-custom-scrollbar m-4">
      <Row className='cargos'>
          <CabTitulo>Cargos Vigentes Interinos</CabTitulo>   
          <Button variant='outline'>
        <CSVLink data={cargos} filename={"cargosInterinos" + "_" + Date.now() + ".csv"}>Exportar</CSVLink>
        </Button>
      <Table striped bordered hover size='sm'>
  <thead>
    <tr>
      <th>Legajo</th>
      <th>Nombre</th>
      <th>NroC</th>
      <th>INST</th>
      <th>CA</th>
      <th>ES</th>
      <th>PPAL</th>
      <th>NV</th>
      <th>AD</th>
      <th>PL</th>
      <th>MAT</th>
      <th>FECHA ALTA</th>
      <th>Nro.Res.A</th>
    {/*
      <th>Baja</th>
      <th>Reno.</th>
    */}
    </tr>
  </thead>
  <tbody>
  {cargos.map((ele, ind) =>
  
  <tr key={ind}>
      <td>{ele.legajo}</td>
      <td>{ele.apellido}</td>
      <td>{ele.nc} </td>
      <td>{ele.inst}</td>
      <td>{ele.ca}</td>
      <td>{ele.es}</td>
      <td>{ele.ppal}</td>
      <td>{ele.nv}</td>
      <td>{ele.ad}</td>
      <td>{ele.pl}</td>
      <td>{ele.mat}</td>
      <td>{ele.fechaAlta}</td>
      <td>{ele.nresa}</td>
      {/*
      <td><input type={'checkbox'} /></td>
      <td><input type={'checkbox'} /></td>        
  */}
  </tr>
  
  )}
  </tbody>
  </Table>
        
    </Row>
</div>
  )
}

export default CargosInterinos