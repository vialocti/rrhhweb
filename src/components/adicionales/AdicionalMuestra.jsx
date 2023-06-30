import React,{useEffect,useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash} from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import axios from 'axios'
import { deleteAdicionalAgente } from '../../services/f_axioscargos'



const AdicionalMuestra = ({adicionalAg}) => {
  console.log(adicionalAg)
  const [adicionales, setAdicionales]=useState([])
  
  const uri ='http://200.12.136.74:4000/'
  useEffect(()=>{
    
    setAdicionales(adicionalAg)
    
  },[])

  useEffect(()=>{
    
    //setAdicionales(adicionalAg)
    
  },[adicionales])

  
  /*
  const eliminarAdicionalAg=(id)=>{
    try {
      //const strqdel = `${uri}cargos/deladicional/${id}/${legajo}`
      //const resu = await axios.delete(strqdel)
      //console.log(resu.statusText)
      //if (resu.statusText==='OK'){
        const newAdicionales =adicionales.filter(adic=>adic.id_row !== id)
        
        setAdicionales(newAdicionales)
        console.log('uuuu')
        
        
      //}
           

    //} catch (error) {
    //  console.log(error)
    //}
  }
*/

  const eliminarAdicional =async (id, legajo)=>{
    
    
    Swal
    .fire({
        title: `Registro Adicional Agente:${legajo}`,
        text: `¿Eliminar Adicional Nro: ${id}?, Recuerde Modificar Adicional en Cargo`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Sí, Eliminar",
        cancelButtonText: "Cancelar",
    })
    .then(async resultado => {
        if (resultado.value) {
            // Hicieron click en "Sí"
            const resu = await deleteAdicionalAgente(id,legajo)
            //console.log(resu)
            if (resu.status===200){
              const newAdicionales =adicionales.filter(adic=>adic.id_row !== id)
              setAdicionales(newAdicionales)
              
            }
            
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
           <th>ID</th>
           <th>Legajo</th>
           <th>Nro.Cargo</th>
           <th>Nro.Resol.</th>
           <th>Fecha Inicio</th>
           <th>Fecha Fin</th>
           <th>Observación</th>
           <th>Adicional</th>
           <th>Vigente</th>
           <th></th>
         
         </tr>
       </thead>
       <tbody>
       {adicionales.map((ele,ind) =>
       
       <tr key={ind}>
           <td>{ele.id_row}</td>
           <td>{ele.legajo} </td>
           <td>{ele.nc} </td>
           <td>{ele.nrores} </td>
           <td>{ele.fechai}</td>
           <td>{ele.fechaf}</td>
           <td>{ele.observacion}</td>
           {ele.tipoA==='1'?
           <td>FC-DC</td>
           :ele.tipoA==='2'?
           <td>FC-ND</td>
           :<td>FC-GS</td>
           }
           <td>{ele.vigente}</td>
           
           <td>
            <button
              onClick={()=>eliminarAdicional(ele.id_row, ele.legajo)}
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

export default AdicionalMuestra