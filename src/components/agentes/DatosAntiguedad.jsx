import React from 'react'
import { useAgenteInfoAntiguedad } from '../../hooks/useAgenteInfoAntiguedad'


import { CabSubTitulo} from '../../styles-components/formularios/FormAgente'

const DatosAntiguedad = () => {
  
  const {datosAntiguedadAgente,loading,error} = useAgenteInfoAntiguedad()

  if(loading) return <p>Cargando datos .....</p>
  if(error) return <p>Error de Carga</p>
  
  
    
    return (
    
        <div className='container-fluid'>
        {datosAntiguedadAgente?
        <>
        <div className='row'>
          <CabSubTitulo>Datos Antiguedad Reconocida</CabSubTitulo>
        </div>
        <div className='row' style={{margin:'10px'}}>
        <table className="table" >
            <thead>
                <tr>
                    <th>AñosA.Doc.</th>
                    <th>MesesA.Doc</th>
                    <th>DiasA.Doc</th>
                    <th>Fec.Recon.</th>
                    <th>Nro.Resol.</th>
                    <th>AñosA.NoDoc.</th>
                    <th>MesesA.NoDoc</th>
                    <th>DiasA.NoDoc</th>
                    <th>Fec.Recon.</th>
                    <th>Nro.Resol.</th>
                </tr>
            </thead>
            <tbody>
               
            
                
                    <tr>
                        
                        <td>{datosAntiguedadAgente.aad}</td>
                        <td>{datosAntiguedadAgente.mad}</td>
                        <td>{datosAntiguedadAgente.dad}</td>
                        <td>{datosAntiguedadAgente.fechardoc}</td>
                        <td>{datosAntiguedadAgente.nresd}</td>
                        <td>{datosAntiguedadAgente.aand}</td>
                        <td>{datosAntiguedadAgente.mand}</td>
                        <td>{datosAntiguedadAgente.dand}</td>
                        <td>{datosAntiguedadAgente.fecharndoc}</td>
                        <td>{datosAntiguedadAgente.nresnd}</td>
                    </tr>
                
            </tbody> 
        </table>    
        </div>
        </>
    :
    <div className='row'>
    <label>Sin Datos de Reconocimeinto de Antiguedad</label>
    <button className='button'>Agregar</button>
    </div>
    }          
    </div>
    
  )
}

export default DatosAntiguedad