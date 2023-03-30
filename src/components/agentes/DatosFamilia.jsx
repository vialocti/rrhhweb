import React from 'react'
import {useAgenteInfoFamilia} from '../../hooks/useAgenteInfoFamilia'

import { CabSubTitulo, Label } from '../../styles-components/formularios/FormAgente'

const DatosFamilia = () => {
  
  const {datosFamiliaAgente,loading,error} = useAgenteInfoFamilia()

  if(loading) return <p>Cargando datos .....</p>
  if(error) return <p>Error de Carga</p>
  //console.log(datosFamiliaAgente)
  
  const convertir =(fn)=>{
    return fn.substring(0,10)
  }
    return (
    
        <div className='container-fluid'>
        {datosFamiliaAgente.length > 0?
        <>
        <div className='row'>
          <CabSubTitulo>Datos Familiares</CabSubTitulo>
        </div>
        <div className='row' style={{margin:'10px'}}>
        <table className="table" >
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Vínculo</th>
                    <th>TipoDoc</th>
                    <th>Nro.Documento</th>
                    <th>Fecha Nac.</th>
                    
                </tr>
            </thead>
            <tbody>
            
                {datosFamiliaAgente.map((ele, index)=>
                    <tr key={index}>
                        
                        <td>{ele.nombre}</td>
                        <td>{ele.vinculo?ele.vinculo:'Sin dato'}</td>
                        <td>{ele.tdoc?ele.tdoc:'Sin dato'}</td>
                        <td>{ele.nrodoc?ele.nrodoc:'Sin dato'}</td>
                        <td>{ele.fechanac?convertir(ele.fechanac):'Sin dato'}</td>
                       
                    </tr>
                )}
            </tbody> 
        </table>    
        </div>
        </>
    :
    <div className='row'>
    <label>Sin Datos Familiares del Colaborador</label>
    <button className='button'>Agregar</button>
    </div>
    }          
    </div>
    
  )
}

export default DatosFamilia