import React,{useEffect,useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash} from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import axios from 'axios'



const LicenciaMuestraReporte = ({datos}) => {

  //const [licencias, setLicencias]=useState([])
  
  //const uri ='http://200.12.136.74:4000/'
  useEffect(()=>{
    
  },[])

  
  

  return (
    
        <div className="table-wrapper-scroll-y my-custom-scrollbar">
       
       <table className="table table-bordered table-striped mb-0">
       
       <thead>
         <tr>
           
           <th>Legajo</th>
           <th>Nombre</th>
           <th>Nro.Cargo</th>
           <th>Nro.CargoG</th>
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
           <td>{ele.nc} </td>
           <td>{ele.ncg} </td>
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

export default LicenciaMuestraReporte