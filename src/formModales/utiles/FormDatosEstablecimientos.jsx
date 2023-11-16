import React, { useEffect, useState } from 'react'
import { Boton, CabTitulo, ContenedorBoton, FormularioI, LabelF, SelectorV } from '../../styles-components/formularios/FormAgente'
import InputC from '../../elementos/InputComponent'
import Swal from 'sweetalert2'
import {agregarDatosEstablecimiento, modificarDatosEstablecimiento } from '../../services/f_axiospersonas'

const FormDatosEstablecimientos = ({modifica,funcion,tipo,datos,nameI,idI}) => {
  const expresiones={
    nombre: /^[,a-zA-ZÀ-ÿ\s]{1,99}$/,
    
    
  }


  
  //const [institucion, setInstitucion]=useState('')
  const [establecimiento, setEstablecimiento]=useState({campo:'', valido:null})
  //const [idinst, setIdinst] = useState(0)
  const [idesta, setIdesta] = useState(0)
  
  


  useEffect(() => {
    

    
    setEstablecimiento({campo:'',valido:null})
    //setIdinst(idI)

    //getTraerDatos()
  }, [])
  
  //console.log(datos)
  useEffect(() => {
    
    if(datos){
    
    
      setEstablecimiento({campo:datos.nombre, valido:'true'})
      setIdesta(datos.id_row)
      //setIdinst(datos.institucion)
         
    }
  
    if(tipo==='A'){
      
      setEstablecimiento({campo:'',valido:null})
      //setIdinst(idI)

    }
    
  }, [datos,tipo])

  //console.log(idinst,idI)
  
   const grabarDatosEstablecimiento =async ()=>{

    const datosEstablecimiento={
      nombre:establecimiento.campo,
      institucion:idI
   }
    //console.log(datosEstablecimiento)
    let resp=null
    if (tipo==='A'){
        
        resp = await agregarDatosEstablecimiento(datosEstablecimiento)
        //console.log('vamos')
    }else{
        //console.log(datosperdomi)
        resp = await modificarDatosEstablecimiento(idesta,datosEstablecimiento)
    }
   
    //console.log(datosEstudio)
    //const resp=400
  if (resp===200){
    Swal.fire({
        title: 'Datos Institucion',
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
        
        grabarDatosEstablecimiento()

        } else{
            Swal.fire({
                title: 'Informacion Datos Establecimiento',
                text: 'Datos Basicos Incompletos',
                icon: 'info',
                
                
            });

            
            
        }
        
  }

  

 /* 
  const onHandleChangeIns =()=>{
    setEstablecimiento(document.getElementById('establecimiento').value)
  }
  */

  const cerrar=()=>{
    funcion()
    modifica()
   }


  return (
    <div className='container mt-2'>
      <div className="row">
         <div className="col-md-1"></div>
                <div className="col-md-10" style={{marginTop:'10px'}}>
                  {tipo==='A'
                    ?<CabTitulo>Ingreso Datos Establecimiento</CabTitulo>
                    :<CabTitulo>Modificar Datos Establecimiento </CabTitulo>
                    }
                </div>    
             
                <div className="col-md-1">
                    <button  onClick={cerrar} className='btn btn-info'>
                        X
                    </button>
                </div>    
      </div>
      <div className="row">
      <div className="col-md-1"></div>
      <div className="col-md-10">
      <CabTitulo> Institucion: {nameI}</CabTitulo>
      </div>
      <div className="col-md-1"></div>
      </div>
      <div className="main">
        <FormularioI onSubmit={onHandleSubmit} style={{marginTop:'30px'}}>
          
                
          <div>
           
          </div>
          <div>
          <InputC 
                tipo='text'
                name='establecimiento'
                infoplace='establecimiento Educativo'
                estado={establecimiento}
                cambiarEstado={setEstablecimiento}
                label='Establecimiento'
                leyendaErr='nombre solo text no mayor a 100'
                expreg={expresiones.nombre}
            />
                
          </div>
        
          <div>
              <ContenedorBoton>
                {tipo ==='A'
                ?<Boton type='submit'>Grabar Datos</Boton>
                :<Boton type='submit'>Modificar Datos</Boton>
                }
              </ContenedorBoton>
          </div>
       
        </FormularioI>
      </div>
    </div>
  )
}

export default FormDatosEstablecimientos