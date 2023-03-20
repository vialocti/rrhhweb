import React from 'react'
import {useAgenteInfoPersonal} from '../../hooks/useAgenteInfoPersonal'

import { CabSubTitulo, Label } from '../../styles-components/formularios/FormAgente'

const DatosPersonales = () => {
  
  const {datosAgente,loading,error} = useAgenteInfoPersonal()
  
  if(loading) return <p>Cargando datos .....</p>
  if(error) return <p>Error de Carga</p>
  
    
    return (
    <div className='container-fluid'>
        
        {datosAgente?
        <>
        <div className='row'>
          <CabSubTitulo>Datos Personales</CabSubTitulo>
        </div>
        <div className="row">
              <div className='col-md-2'>
                Fecha Nacimiento<Label>{datosAgente.fechanac}</Label>
              </div>

            <div className='col-md-1'>
                Nacionalidad<Label> {datosAgente.nacionalidad}</Label>
            </div>

            <div className='col-md-1'>
                Sexo<Label> {datosAgente.sexo==='1'?'M':datosAgente.sexo==='2'?'F':null}</Label>
            </div>

            <div className='col-md-2'>
              Ingreso FCE.<Label>{datosAgente.fechaIFCE}</Label>
            </div>

            <div className='col-md-2'>
            Ingreso Uncu<Label>{datosAgente.fechaIUNC}</Label>
            </div>

            
                     
            
            <div className='col-md-2'>
            Ingreso APN<Label>{datosAgente.fechaIAPN}</Label>
            </div>

           
            
         </div>
         </>:
         <div className='row'>
            <label>Sin Datos Personales</label>
            <button className='button'>Agregar</button>
         </div>
         
         }
    </div>
  )
}

export default DatosPersonales