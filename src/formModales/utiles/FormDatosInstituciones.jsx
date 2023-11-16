import React, { useEffect, useState } from 'react'
import { Boton, CabTitulo, ContenedorBoton, FormularioI, LabelF, SelectorV } from '../../styles-components/formularios/FormAgente'
import InputC from '../../elementos/InputComponent'
import Swal from 'sweetalert2'
import {agregarDatosInstitucion, modificarDatosInstitucion } from '../../services/f_axiospersonas'

const FormDatosInstituciones = ({modifica,funcion,tipo,datos}) => {
  const expresiones={
    nombre: /^[,a-zA-ZÀ-ÿ\s]{1,99}$/,
    nombrecod:/^[,a-zA-ZÀ-ÿ\s]{1,10}$/,
    
  }

  //console.log(datos) 
  
  const [institucion, setInstitucion]=useState({campo:'', valido:null})
  const [codigoI, setCodigoI]=useState({campo:'', valido:null})
  const [idinst, setIdinst] = useState(0)
  
  


  useEffect(() => {
    

    
    setInstitucion('')
    setCodigoI('')

    //getTraerDatos()
  }, [])
  
  //console.log(datos)
  useEffect(() => {
    
    if(datos){
    
    
      setInstitucion({campo:datos.nombre, valido:'true'})
      setCodigoI({campo:datos.codigoI, valido:'true'})
      setIdinst(datos.id_row)
         
    }
  
    if(tipo==='A'){
      
      setInstitucion('')
      setCodigoI('')

    }
    
  }, [datos,tipo])

    
   const grabarDatosInstitucion =async ()=>{

    const datosInstitucion={
      nombre:institucion.campo,
      codigoI:codigoI.campo
      

    }
    //console.log(datosfamiliar)
    let resp=null
    if (tipo==='A'){
        
        resp = await agregarDatosInstitucion (datosInstitucion)
        //console.log('vamos')
    }else{
        //console.log(datosperdomi)
        resp = await modificarDatosInstitucion(idinst,datosInstitucion)
    }
   
    //console.log(datosEstudio)
    //const resp=400
console.log(resp)
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
        
        grabarDatosInstitucion()

        } else{
            Swal.fire({
                title: 'Informacion Datos Estudio',
                text: 'Datos Basicos Incompletos',
                icon: 'info',
                
                
            });

            
            
        }
        
  }

  

  /*
  const onHandleChangeIns =()=>{
    setInstitucion(document.getElementById('institucion').value)
  }
  const onHandleChangeCod =()=>{
    setCodigoI(document.getElementById('codigoI').value)
  }
*/
  const cerrar=()=>{
    funcion()
    modifica()
   }


  return (
    <div className='container mt-2'>
      <div className="row">
                <div className="col-md-10" style={{marginTop:'10px'}}>
                  {tipo==='A'
                    ?<CabTitulo>Ingreso Datos Institucion</CabTitulo>
                    :<CabTitulo>Modificar Datos Institucion </CabTitulo>
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
        <FormularioI onSubmit={onHandleSubmit} style={{marginTop:'30px'}}>
          
                
          <div>
          <InputC 
                tipo='text'
                name='codigol'
                infoplace='Sigla Institucion Educativa'
                estado={codigoI}
                cambiarEstado={setCodigoI}
                label='Sigla Institucion'
                leyendaErr='nombre solo text no mayor a 10'
                expreg={expresiones.nombrecod}
            /> 
          </div>
          <div>
          <InputC 
                tipo='text'
                name='institucion'
                infoplace='Institucion Educativa'
                estado={institucion}
                cambiarEstado={setInstitucion}
                label='Institucion'
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

export default FormDatosInstituciones