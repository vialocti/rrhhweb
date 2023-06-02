import React,{useEffect,useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash} from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import axios from 'axios'



const InasistenciaMuestraReporte = ({datos}) => {

  //const [inasistencias, setInasistencias]=useState([])
  
  
  useEffect(()=>{
    
    
  },[])

  
  

  return (
    
        <div className="table-wrapper-scroll-y my-custom-scrollbar">
       
       <table className="table table-bordered table-striped mb-0">
       
       <thead>
         <tr>
           
           <th>Legajo</th>
           <th>Nombre</th>
           <th>Motivo</th>
           <th>Fecha Inicio</th>
           <th>Fecha Fin</th>
           <th>Nro Res.</th>
           <th>Afecta Haberes</th>
           
         
         </tr>
       </thead>
       <tbody>
       {datos.map((ele,ind) =>
       
       <tr key={ind}>
           
           <td>{ele.nleg} </td>
           <td>{ele.apellido}</td>
           <td>{ele.mot}</td>
           <td>{ele.fechai}</td>
           <td>{ele.fechaf}</td>
           <td>{ele.nres}</td>
           {ele.r==='CG'?
           <td>NO</td>
           :
           <td>SI</td>
           }
          </tr>
       
       )}
       </tbody>
       </table>
       
      </div>  
  )
}

export default InasistenciaMuestraReporte