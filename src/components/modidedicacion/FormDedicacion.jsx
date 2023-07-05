import React from 'react'

import { useAgenteCargos } from '../../hooks/useAgenteCargos'
import { faUpDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import CargosConsulta from './CargosConsulta'

const FormDedicacion = () => {
  
 
  const {loading,error,cargosAgente} = useAgenteCargos()
 
  if(loading) return <p>Cargando datos .....</p>
    if(error) return <p>Error de Carga</p> 
  //console.log(cargosAgente)


  const CargoModificarDedicacion=(ele)=>{
    alert(ele.row_id)
  }
  return (
    <>
    {cargosAgente.length > 0
    ?<div className='container'>
         <div  className='row'>
         
                    
         <table className='table  table-striped bordered hover size="sm' >
          <thead>
            <tr>
          
            <th>NC</th>
            <th>INST</th>
            <th>CA</th>
            <th>ES</th>
            <th>PPAL</th>
            <th>NV</th>
            <th>CAR</th>
            <th>PL</th>
            <th>MAT</th>
            <th>FECHA ALTA</th>
            <th>Nro.Res.A</th>
            <th>FECHA BAJA</th>
            <th>Sit.</th>
            <th></th>
            
          </tr>
        </thead>
        <tbody>
        {cargosAgente.map((ele, ind) =>
          
          <tr key={ind}>
              <td>{ele.nc} </td>
              <td>{ele.inst}</td>
              <td>{ele.ca}</td>
              <td>{ele.es}</td>
              <td>{ele.ppal}</td>
              <td>{ele.nv}</td>
              <td>{ele.car}</td>
              <td>{ele.pl}</td>
              <td> {ele.mat}</td>
            
              <td>{ele.fechaAlta}</td>
              <td>{ele.nresa}</td>
              <td>{ele.fechaBaja}</td>
              <td>{ele.st}</td>
              <td>
                <button
              onClick={()=>CargoModificarDedicacion(ele)}
            >
               <FontAwesomeIcon icon={faUpDown} />
              </button>
              </td>
              
                    
          </tr>

          
          )}
          </tbody>
      </table>
    </div>


    </div>
    :null
   }
    </>
    )
}




export default FormDedicacion