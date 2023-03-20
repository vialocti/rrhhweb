import React from 'react'
import {useAgenteInfoDomiConta} from '../../hooks/useAgenteInfoDomiConta'

import { CabSubTitulo, Label } from '../../styles-components/formularios/FormAgente'
const DatosDomiconta = () => {

    const {loading,error,datosDomiContaAgente} = useAgenteInfoDomiConta()
   
    if(loading) return <p>Cargando datos .....</p>
    if(error) return <p>Error de Carga</p> 
    console.log(datosDomiContaAgente)
  return (
    <div className='container-fluid'>
    
    {datosDomiContaAgente?
    <>
    <div className='row'>
          <CabSubTitulo>Datos de Contacto </CabSubTitulo>
    </div>

    <div className="row">
          <div className='col-md-4'>
            Domicilio<Label>{datosDomiContaAgente.domicilio}</Label>
          </div>

        <div className='col-md-4'>
          Localidad<Label> {datosDomiContaAgente.localidad}</Label>
        </div>

        <div className='col-md-2'>
        C.Postal.<Label> {datosDomiContaAgente.cp}</Label>
        </div>
        <div className='col-md-2'>
          Telefono<Label>{datosDomiContaAgente.telefonoFijo}</Label>
        </div>
       
        
       </div>
     
     <div className='row'>
     
     <div className='col-md-2'>
           Tel.Movil<Label>{datosDomiContaAgente.telefonoCelular}</Label>
        </div>
       
        <div className='col-md-2'>
           Tel.Contacto<Label>{datosDomiContaAgente.telefoncontacto}</Label>
        </div>
            
        <div className='col-md-4'>
        Email Personal<Label>{datosDomiContaAgente.emailpersonal}</Label>
        </div>
        <div className='col-md-4'>
        Email Institu.<Label>{datosDomiContaAgente.emailinstitucional}</Label>
        </div>
       

     </div>
     </>
     :
     <div className='row'>
     <label>Sin Datos Domicilio y Contacto</label>
     <button className='button'>Agregar</button>
  </div>
     }
</div>
  )
}

export default DatosDomiconta