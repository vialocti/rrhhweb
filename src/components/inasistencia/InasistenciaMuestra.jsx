import React,{useEffect,useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash} from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import axios from 'axios'



const InasistenciaMuestra = ({inasistenciasag, agente}) => {

  const [inasistencias, setInasistencias]=useState([])
  
  
  
  
  const uri ='http://200.12.136.74:4000/'
  //const uri ='http://localhost:5000/'
  useEffect(()=>{
    
    setInasistencias(inasistenciasag)
    
  },[inasistenciasag])

  
  /*const getInasistencias = async (legajo)=>{
    
    let strqry = `${uri}cargos/inasistenciasagente/${legajo}`
    try {
        const res = await axios.get(strqry)
        setInasistencias(res.data)      

    } catch (error) {
      
    }
    console.log(inasistencias)
  }*/ 
  
  const VerInasistenciaRZ = async (tipo,motivo)=>{

    let strqry = `${uri}cargos/inasistenciasagente/${agente}/${tipo}/'${motivo}'`
  try {
      const res = await axios.get(strqry)
      setInasistencias(res.data)         
  } catch (error) {
    console.log(error)
  }
    
    
    
  }

  const eliminarRegistro=async(id,legajo)=>{
    try {
      const strqdel = `${uri}cargos/delinasistencia/${id}/${legajo}`
      const resu = await axios.delete(strqdel)
      console.log(resu.statusText)
      if (resu.statusText==='OK'){
        const newinasistencias =inasistencias.filter(inas=>inas.id_ina !== id)
        
        setInasistencias(newinasistencias)
        //const resuC= await `${uri}cargos`
        console.log('uuuu')
        
        
      }
      
      

    } catch (error) {
      console.log(error)
    }
  }


  const eliminarInasistencia =(id, legajo)=>{
    
    
    Swal
    .fire({
        title: `Registro Inasistencia Agente:${legajo}`,
        text: `¿Eliminar registro Nro: ${id}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    })
    .then(resultado => {
        if (resultado.value) {
            // Hicieron click en "Sí"
            eliminarRegistro(id,legajo)
            
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
           <th>Motivo</th>
           <th>Fecha Inicio</th>
           <th>Fecha Fin</th>
           <th>Nro Res.</th>
           <th>Afecta Haberes</th>
           <th>
            <button
              onClick={()=>VerInasistenciaRZ(2,'02')}
            >
               02
              </button>
              <button
              onClick={()=>VerInasistenciaRZ(2,'04')}
            >
               04
              </button>
              <button
              onClick={()=>VerInasistenciaRZ(2,'32')}
            >
               32
              </button>
              <button
              onClick={()=>VerInasistenciaRZ(1,'00')}
            >
               T
              </button>
            </th>
         
         </tr>
       </thead>
       <tbody>
       {inasistencias.map((ele,ind) =>
       
       <tr key={ind}>
           <td>{ele.id_ina}</td>
           <td>{ele.nleg} </td>
           <td>{ele.mot}</td>
           <td>{ele.fechai}</td>
           <td>{ele.fechaf}</td>
           <td>{ele.nres}</td>
           {ele.r==='CG'?
           <td>NO</td>
           :
           <td>SI</td>
           }
           <td>
            <button
              onClick={()=>eliminarInasistencia(ele.id_ina, ele.nleg)}
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

export default InasistenciaMuestra