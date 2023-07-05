import React,{useEffect,useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash} from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import axios from 'axios'



const LicenciaMuestra = ({licenciasag}) => {

  const [licencias, setLicencias]=useState([])
  
  const uri ='http://200.12.136.74:4000/'
  useEffect(()=>{
    
    setLicencias(licenciasag)
    
  },[licenciasag])

  
  /*const getInasistencias = async (legajo)=>{
    
    let strqry = `${uri}cargos/inasistenciasagente/${legajo}`
    try {
        const res = await axios.get(strqry)
        setInasistencias(res.data)      

    } catch (error) {
      
    }
    console.log(inasistencias)
  }*/ 

  const eliminarRegistroLic=async(id,legajo)=>{
    try {
      const strqdel = `${uri}cargos/dellicencia/${id}/${legajo}`
      const resu = await axios.delete(strqdel)
      console.log(resu.statusText)
      if (resu.statusText==='OK'){
        const newlicencias =licenciasag.filter(inas=>inas.row_id !== id)
        
        setLicencias(newlicencias)
        console.log('uuuu')
        
        
      }
      
      

    } catch (error) {
      console.log(error)
    }
  }


  const eliminarLicencia =(id, legajo)=>{
    
    
    Swal
    .fire({
        title: `Registro Licencia Agente:${legajo}`,
        text: `¿Eliminar registro Nro: ${id}?, Recuerde modificar Situacion en Cargo`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    })
    .then(resultado => {
        if (resultado.value) {
            // Hicieron click en "Sí"
            eliminarRegistroLic(id,legajo)
            
        } else {
            // Dijeron que no
            
        }
    });
  }

  return (
    
        <div className="table-wrapper-scroll-y my-custom-scrollbar">
       
       <table className="table table-bordered table-striped mb-0">
       
       <thead>
         <tr>
           
           <th>Legajo</th>
           <th>Nro.Cargo</th>
           <th>Ppal</th>
           <th>NIvel</th>         
           <th>Motivo</th>
           <th>Fecha Inicio</th>
           <th>Fecha Fin</th>
           <th>Nro Res.</th>
           <th>Afecta Haberes</th>
           <th>EstadoCarg.</th>
           <th></th>
         
         </tr>
       </thead>
       <tbody>
       {licencias.map((ele,ind) =>
       
       <tr key={ind}>
           
           <td>{ele.nleg} </td>
           <td>{ele.nc} </td>
           <td>{ele.ppal}</td>
           <td>{ele.nv}</td>
           <td>{ele.mot}</td>
           <td>{ele.fechai}</td>
           <td>{ele.fechaf}</td>
           <td>{ele.nres}</td>
           {ele.r==='CG'?
           <td>NO</td>
           :
           <td>SI</td>
           }  
           
            <td>{ele.ec}</td>
           <td>
            <button
              onClick={()=>eliminarLicencia(ele.row_id, ele.nleg)}
            >
               <FontAwesomeIcon icon={faTrash} />
              </button>
            </td>
           
       </tr>
       
       )}
       </tbody>
       </table>
       
      </div>  
  )
}

export default LicenciaMuestra