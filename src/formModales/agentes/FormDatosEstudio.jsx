import React, { useEffect, useState } from 'react'
import { Boton, CabTitulo, ContenedorBoton, FormularioV, LabelF, SelectorV } from '../../styles-components/formularios/FormAgente'
import InputC from '../../elementos/InputComponent'
import Swal from 'sweetalert2'
import {traerDatosTitulosApi, traerDatosEstablecimientosApi, traerDatosInstitucionesApi, agregarDatosEstudio, modificarDatosEstudio } from '../../services/f_axiospersonas'

const FormDatosEstudio = ({legajo,modifica,funcion,tipo,datos}) => {
  const expresiones={
    nombre: /^[,a-zA-ZÀ-ÿ\s]{1,90}$/,
    fechanac:/^\d{4}([-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
    nrodoc: /^\d{7,9}$/,
  }


  const [titulo, setTitulo]=useState('1')
  const [institucion, setInstitucion]=useState('1')
  const [establecimiento, setEstablecimiento]=useState('1')
  const [tipotitulo, setTipotitulo] =useState('3')
  const [estado, setEstado]=useState('1')
  const [adicional,setAdicional]=useState('1')

  const [titulos, setTitulos]=useState([])
  const [instituciones, setInstituciones]=useState([])
  const [establecimientos, setEstablecimientos] = useState([])

  
  


  useEffect(() => {
    

    const getTraerDatos =async ()=>{
      setTitulos( await  traerDatosTitulosApi())
      setInstituciones( await traerDatosInstitucionesApi())
      setEstablecimientos( await traerDatosEstablecimientosApi('1'))
     

    }
    setTitulo('3')
    setInstitucion('1')
    setEstablecimiento('1')
    setTipotitulo('3')
    setAdicional('1')
    setEstado('1')

    getTraerDatos()
  }, [])
  
  //console.log(datos)
  useEffect(() => {
    
    if(datos){
    
      setTitulo(datos.ti)
      setInstitucion(datos.ititu)
      setEstablecimiento(datos.esb)
      setTipotitulo(datos.tipotitulo)
      setAdicional(datos.adicional)
      setEstado(datos.estado)
      document.getElementById('titulo').value=datos.ti
      document.getElementById('adicional').value=datos.adicional
      document.getElementById('estado').value=datos.estado
      document.getElementById('institucion').value=datos.ititu
      document.getElementById('establecimiento').value=datos.esb
      document.getElementById('tipotitulo').value=datos.tipotitulo

         
    }
  
    if(tipo==='A'){
      setTitulo('3')
      setInstitucion('1')
      setEstablecimiento('1')
      setTipotitulo('3')
      setAdicional('1')
      setEstado('1')
    }
    
  }, [datos,tipo])

  useEffect(() => {
    const setvalores =()=>{
      
      document.getElementById('titulo').value=titulo
    }
  
    setvalores()
  }, [titulos,establecimientos,instituciones])
  
   const grabarDatosEstudio =async ()=>{

    const datosEstudio={
      tipotitulo:tipotitulo,
      estado:estado,
      titulo:titulo,
      institucion:institucion,
      establecimiento:establecimiento,
      adicional:adicional

    }
    //console.log(datosfamiliar)
    let resp=null
    if (tipo==='A'){
        datosEstudio.legajo=legajo
        resp = await agregarDatosEstudio (datosEstudio)
        console.log('vamos')
    }else{
        //console.log(datosperdomi)
        resp = await modificarDatosEstudio(datos.id_row,datosEstudio)
    }
   
    console.log(datosEstudio)
    //const resp=400
console.log(resp)
if (resp===200){
    Swal.fire({
        title: 'Datos Estudio',
        text: 'Datos Grabados',
        icon: 'info',
                        
    }).then(resultado => {
        if (resultado.value) {
            // Hicieron click en "Sí"
            funcion()
            modifica()              
            
        }});

    
}

  }

  
  const onHandleSubmit =(e)=>{
       e.preventDefault()
       //console.log(e.target.adicional.value)
       if(true){
        
        grabarDatosEstudio()

        } else{
            Swal.fire({
                title: 'Informacion Datos Estudio',
                text: 'Datos Basicos Incompletos',
                icon: 'info',
                
                
            });

            
            
        }
        
  }

  const onHandleChangeTipoT =()=>{
    setTipotitulo(document.getElementById('tipotitulo').value)
    
  }

  const onHandleChangeEstado =()=>{
    setEstado(document.getElementById('estado').value)
  }

  const onHandleChangeI =async ()=>{
    setInstitucion(document.getElementById('institucion').value)
    setEstablecimientos(await traerDatosEstablecimientosApi(document.getElementById('institucion').value))
  }
  const onHandleChangeE =()=>{
    setEstablecimiento(document.getElementById('establecimiento').value)
  }
  const onHandleChangeA =()=>{
    setAdicional(document.getElementById('adicional').value)
  }
  const onHandleChangeTitulo =()=>{
    setTitulo(document.getElementById('titulo').value)
  }

  const cerrar=()=>{
    funcion()
    modifica()
   }


  return (
    <div className='container mt-2'>
      <div className="row">
                <div className="col-md-10">
                  {tipo==='A'
                    ?<CabTitulo>Ingreso Datos Estudio</CabTitulo>
                    :<CabTitulo>Modificar Datos Estudio</CabTitulo>
                    }
                </div>    
                    <div className="col-md-1"></div>
                <div className="col-md-1">
                    <button  onClick={cerrar} className='btn btn-info'>
                        X
                    </button>
                </div>    
            </div>
       
      <div className="main">
        <FormularioV onSubmit={onHandleSubmit}>
          
          
            <div>
            <LabelF htmlFor='titulo'>Titulo</LabelF>
            </div>
            <div></div>
            <div>
                <SelectorV name="titulo" id='titulo' value={titulo} onChange={onHandleChangeTitulo}>
                {titulos?titulos.map((ele,index)=>(

                <option value={ele.id_row} key={index}>{ele.nombre}</option>
                )):null}
                </SelectorV>  
            </div>
          
          <div></div>
          
          <div>
          <LabelF htmlFor='tipotitulo'>Tipo</LabelF>
          </div> 
          <div></div>
          <div> 
                <SelectorV name="tipotitulo" id='tipotitulo' value={tipotitulo} onChange={onHandleChangeTipoT}>
                    
                    <option value="1">Secundario</option>
                    <option value="2">Terciario</option>
                    <option value="3">Grado</option>
                    <option value="4">Especialista</option>
                    <option value="5">Magister</option>
                    <option value="6">Doctorado</option>
                    <option value="7">Diplomatura</option>
                    <option value="8">Cursos</option>
                    

                </SelectorV>  
          </div>
          <div></div>
          <div>

          <LabelF htmlFor='estado'>Estado</LabelF>
          </div>
          <div></div>
          <div>  
                <SelectorV name="estado" id='estado' value={estado} onChange={onHandleChangeEstado}>
                    <option value="1">Finalizado</option>
                    <option value="2">En Proceso</option>
                    
                </SelectorV>
          </div>  
          <div></div>
          <div>
          <LabelF htmlFor='institucion'>Institucion</LabelF>
          </div>
          <div></div>
          <div>
                <SelectorV name="institucion" id='institucion' value={institucion} onChange={onHandleChangeI}>
                    {instituciones?instituciones.map((ele,index)=>(

                      <option value={ele.id_row} key={index}>{ele.nombre}</option>
                    )):null}
                </SelectorV>
          </div>
          <div></div>
          <div>
          <LabelF htmlFor='establecimiento'>Establecimiento</LabelF>
          </div>
          <div></div>
          <div>
                <SelectorV name="establecimiento" id='establecimiento' value={establecimiento} onChange={onHandleChangeE}>
                {establecimientos?establecimientos.map((ele,index)=>(

                  <option value={ele.id_row} key={index}>{ele.nombre}</option>
                  )):null}
                    
                </SelectorV>
          </div>
          <div></div>
          <div>
          <LabelF htmlFor='adicional'>Adicional</LabelF>
          </div>
          <div></div>
          <div>
                <SelectorV name="adicional" id='adicional' value={adicional} onChange={onHandleChangeA}>
                    <option value="1">SI</option>
                    <option value="2">NO</option>
                    
                </SelectorV>
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div>
              <ContenedorBoton>
                {tipo ==='A'
                ?<Boton type='submit'>Grabar Datos</Boton>
                :<Boton type='submit'>Modificar Datos</Boton>
                }
              </ContenedorBoton>
          </div>
          <div></div>
        </FormularioV>
      </div>
    </div>
  )
}

export default FormDatosEstudio