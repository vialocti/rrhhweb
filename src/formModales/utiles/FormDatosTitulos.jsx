import React, { useEffect, useState } from 'react'
import { Boton, CabTitulo, ContenedorBoton, FormularioI, LabelF, SelectorV } from '../../styles-components/formularios/FormAgente'
import InputC from '../../elementos/InputComponent'
import Swal from 'sweetalert2'
import { agregarDatosTitulo, modificarDatosTitulo } from '../../services/f_axiospersonas'

const FormDatosTitulos = ({modifica,funcion,tipo,datos}) => {
  const expresiones={
    nombre: /^[,a-zA-ZÀ-ÿ\s]{1,99}$/,
    
    
  }


  
  //const [institucion, setInstitucion]=useState('')
  const [nombre, setNombre]=useState({campo:'', valido:null})
  const [idt, setIdt]=useState(0)
  


  useEffect(() => {
    

    
    setNombre({campo:'',valido:null})
    

    //getTraerDatos()
  }, [])
  
  //console.log(datos)
  useEffect(() => {
    
    if(datos){
    
    
      setNombre({campo:datos.nombre, valido:'true'})
      setIdt(datos.id_row)
      
         
    }
  
    if(tipo==='A'){
      
      setNombre({campo:'',valido:null})
      

    }
    
  }, [datos,tipo])

    
   const grabarDatosTitulo =async ()=>{

    const datosTitulo={
      nombre:nombre.campo,
      }
    //console.log(datosfamiliar)
    let resp=null
    if (tipo==='A'){
        
        resp = await agregarDatosTitulo(datosTitulo)
        //console.log('vamos')
    }else{
        //console.log(datosperdomi)
        resp = await modificarDatosTitulo(idt,datosTitulo)
    }
   
    //console.log(datosEstudio)
    //const resp=400
//console.log(resp)
if (resp===200){
    Swal.fire({
        title: 'Datos Titulo',
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
        
        grabarDatosTitulo()

        } else{
            Swal.fire({
                title: 'Informacion Datos Titulo',
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
                    ?<CabTitulo>Ingreso Datos Titulo</CabTitulo>
                    :<CabTitulo>Modificar Datos Titulo </CabTitulo>
                    }
                </div>    
             
                <div className="col-md-1">
                    <button  onClick={cerrar} className='btn btn-info'>
                        X
                    </button>
                </div>    
      </div>
      
      <div className="main">
        <FormularioI onSubmit={onHandleSubmit} style={{marginTop:'30px'}}>
          
                
          <div>
           
          </div>
          <div>
          <InputC 
                tipo='text'
                name='titulo'
                infoplace='Titulo'
                estado={nombre}
                cambiarEstado={setNombre}
                label='Titulo'
                leyendaErr='nombre solo text no mayor a 150'
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

export default FormDatosTitulos