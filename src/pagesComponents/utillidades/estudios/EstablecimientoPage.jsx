import React,{useState, useEffect} from 'react'
import { traerDatosEstablecimientosApi, traerDatosInstitucionesApi } from '../../../services/f_axiospersonas'
import { CabSubTitulo, LabelF, SelectorV } from '../../../styles-components/formularios/FormAgente'

const EstablecimientoPage = () => {
   
  const [establecimientos, setEstablecimientos] = useState([])
  const [instituciones, setInstituciones] = useState([]) 
  const [establecimiento, setEstablecimiento] = useState('1')
  const [institucion, setInstitucion] = useState('1') 
  
  
  useEffect(() => {
    const traerDatos =async ()=>{
        setEstablecimientos(await traerDatosEstablecimientosApi(1))
        setInstituciones(await traerDatosInstitucionesApi())
    }
  
    traerDatos()
  }, [])
  
  const onHandleChangeI =async ()=>{
    setInstitucion(document.getElementById('institucion').value)
    setEstablecimientos(await traerDatosEstablecimientosApi(document.getElementById('institucion').value))
  }
  const onHandleChangeE =()=>{
    setEstablecimiento(document.getElementById('establecimiento').value)
  }


  return (
    <div className="container-fluid" style={{marginTop:'15px', padding:'10px'}}>
        <div className="card">
            <div className="card-header">
            <div className="row">
               <div className="col-md-10">
               <CabSubTitulo>Instituciones y Establecimientos</CabSubTitulo>
               </div>
            </div>

            </div>

            <div className="card-body">
                <div className="row">
                    <div className="col-md-5">
                
                        <LabelF htmlFor='institucion'>Institucion</LabelF>
                    
                         <SelectorV name="institucion" id='institucion' value={institucion} onChange={onHandleChangeI}>
                                  {instituciones?instituciones.map((ele,index)=>(

                                    <option value={ele.id_row} key={index}>{ele.nombre}</option>
                            )):null}
                        </SelectorV>
                    </div>
                    <div className="col-md-2">

                    </div>
                    <div className="col-md-5">
                      <LabelF htmlFor='establecimiento'>Establecimiento</LabelF>
          
                      <SelectorV name="establecimiento" id='establecimiento' value={establecimiento} onChange={onHandleChangeE}>
                        {establecimientos?establecimientos.map((ele,index)=>(

                        <option value={ele.id_row} key={index}>{ele.nombre}</option>
                     )):null}
                    
                      </SelectorV>
                    </div>               
               
                </div>
               
            

            </div>

            <div className="card-footer">
                <div className="row">
                    <div className="col-md-3">
                            <button className='btn btn-primary'>
                                Agregar Institucion
                            </button>
                    </div>
                    <div className="col-md-6">
                        
                    </div>
                    <div className="col-md-3">
                            <button className='btn btn-primary'>
                                Agregar establecimiento
                            </button>

                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default EstablecimientoPage