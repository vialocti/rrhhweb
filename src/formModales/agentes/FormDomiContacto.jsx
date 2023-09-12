import React,{useState,useEffect} from 'react'
import Swal from 'sweetalert2'
import InputC from '../../elementos/InputComponent'

import { FormularioD, LabelF, SelectorV } from '../../styles-components/formularios/FormAgente'
import { Boton, CabTitulo, ContenedorBoton } from '../../styles-components/formularios/FormAgente'
import { grabarDatosPerDomi, modificarDatosPerDomi, traerCodLugar } from '../../services/f_axiospersonas'
//import { useNavigate } from 'react-router-dom'

const FormDomiContacto = ({legajo,modifica,funcion,tipo,datos}) => {
    
    //console.log(tipo, datos)
    const expresiones = {
       domicilio: /^[,a-zA-ZA0-9_.:áéíóú-\s]{1,80}$/, // Letras y espacios, pueden llevar acentos.
       localidad:/^[,a-zA-ZA0-9_.:áéíóú\s-]{1,60}$/,
       emailp: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
       emaili: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
       telefono: /^\d{6,16}$/, // 7 a 16 numeros.
       telefonomovil: /^\d{6,16}$/, // 7 a 16 numeros
       telefonocontacto: /^\d{6,16}$/, // 7 a 16 numeros
       cpostal: /^\d{4,8}$/, // 4 a 8 numeros.
       
    }

    const [localidad, setLocalidad]= useState({campo:'', valido:null})
    const [domicilio, setDomicilio] = useState({campo:'', valido:null})
    const [cpostal,setCpostal] = useState({campo:'', valido:null})
    const [telefono,setTelefono] = useState({campo:'', valido:null})
    const [telefonomovil,setTelefonomovil] = useState({campo:'', valido:null})
    const [telefonocontacto,setTelefonocontacto] = useState({campo:'', valido:null})
    const [emailp,setEmailp] = useState({campo:'', valido:null})
    const [emaili,setEmaili] = useState({campo:'', valido:null})   
    
    
    useEffect(() => {
        const limpiardatos=()=>{
            setDomicilio({campo:'',valido:null})
            setCpostal({campo:'',valido:null})
            setTelefono({campo:'',valido:null})
            setTelefonocontacto({campo:'',valido:null})
            setTelefonomovil({campo:'',valido:null})
            setEmaili({campo:'',valido:null})
            setEmailp({campo:'',valido:null})
            
        }
         if(datos){
            limpiardatos()
            setDomicilio({campo:datos.domicilio,valido:'true'})
            setCpostal({campo:datos.cp,valido:'true'})
            setTelefono({campo:datos.telefonoFijo,valido:'true'})
            setTelefonocontacto({campo:datos.telefonocontacto,valido:'true'})
            setTelefonomovil({campo:datos.telefonoCelular,valido:'true'})
            setEmaili({campo:datos.emailinstitucional,valido:'true'})
            setEmailp({campo:datos.emailpersonal,valido:'true'})
            setLocalidad({campo:datos.localidad,valido:'true'})
        }
        if (tipo==='A'){
            limpiardatos()
        }
        
    }, [datos,tipo])
    


    const grabarDatosContacto =async ()=>{
           
        const datosperdomi ={
                
                domicilio:domicilio.campo,
                cp:cpostal.campo,
                localidad:localidad.campo,
                telefonoFijo:telefono.campo,
                telefonoCelular:telefonomovil.campo,
                emailinstitucional:emaili.campo,
                emailpersonal:emailp.campo,
                telefonocontacto:telefonocontacto.campo,
            }
            //console.log(datosperdomi)
            let resp=null
            if (tipo==='A'){
                datosperdomi.legajo=legajo
                resp = await grabarDatosPerDomi(datosperdomi)
            }else{
                //console.log(datosperdomi)
                resp = await modificarDatosPerDomi(legajo,datosperdomi)
            }

            
             let texto=''
             if(tipo==='A'){
                texto='Alta Datos Domicilio - Contacto'
              }else{
                texto='Modificar Datos Domicilio - Contacto'    
                }
            //const resp=400
        //console.log(resp)
        if (resp===200){
            Swal.fire({
               
                
                
                title: texto,
                
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

    
   // const changeLocalidad =()=>{
   //     setLocalidad(document.getElementById('localidad').value)
   // }


    const onHandleSubmit =(e)=>{
        e.preventDefault()
        
        if(
            domicilio.valido==='true' && 
            cpostal.valido === 'true' && 
            emailp.valido === 'true' &&
            emaili.valido === 'true' &&
            telefono.valido === 'true' &&
            telefonomovil.valido === 'true' &&
            telefonocontacto.valido === 'true' &&
            localidad.valido ==='true'
            
            )
        
        {
         //console.log('vamos')
        grabarDatosContacto()

        } else{
            Swal.fire({
                title: 'Informacion Datos Contacto',
                text: 'Datos Basicos Incompletos',
                icon: 'info',
                
                
            });

            
            
        }
       
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
                    ?<CabTitulo>Ingreso Datos Domicilio y Contacto</CabTitulo>
                    :<CabTitulo>Modificar Datos Domicilio y Contacto</CabTitulo>
                }
                </div>    
                    <div className="col-md-1"></div>
                <div className="col-md-1">
                    <button  onClick={cerrar} className='btn btn-info'>
                        X
                    </button>
                </div>    
            </div>
            
    <main>
        
        <FormularioD onSubmit={onHandleSubmit}>
           <div>
            <InputC
                tipo='text'
                name='domicilio'
                infoplace='Ingrese Domicilio'
                estado={domicilio}
                cambiarEstado={setDomicilio}
                label='Domicilio'
                leyendaErr='domicilio no mayor a 60 caracteres'
                expreg={expresiones.domicilio}
                
               
            />
            </div>
            <div>
            
            <InputC 
                tipo='text'
                name='localidad'
                infoplace='Ingrese Localidad'
                estado={localidad}
                cambiarEstado={setLocalidad}
                label='Localidad'
                leyendaErr='solo texto'
                expreg={expresiones.localidad}
             
            />
            </div>
            <div>
            <InputC 
                tipo='text'
                name='cpostal'
                infoplace='Ingrese Codigo Postal'
                estado={cpostal}
                cambiarEstado={setCpostal}
                label='Codigo Postal'
                leyendaErr='El debe ser numerico sin puntos'
                expreg={expresiones.cpostal}
             
            />
            </div>
            <div>
             <InputC 
                tipo='text'
                name='telefono'
                infoplace='Ingrese Telefono Fijo'
                estado={telefono}
                cambiarEstado={setTelefono}
                label='Nro.Telefono'
                leyendaErr='El nro de telefono debe ser numerico sin puntos'
                
             
            />
            </div>

            <div>
             <InputC 
                tipo='text'
                name='telefonomovil'
                infoplace='Ingrese Telefono Movil'
                estado={telefonomovil}
                cambiarEstado={setTelefonomovil}
                label='Nro.Telefono Movil'
                leyendaErr='El nro de telefono debe ser numerico sin puntos'
                expreg={expresiones.telefono}
             
            />
            </div>

            <div>
             <InputC 
                tipo='text'
                name='telefonocontacto'
                infoplace='Ingrese Telefono Fijo'
                estado={telefonocontacto}
                cambiarEstado={setTelefonocontacto}
                label='Nro.Telefono Contacto'
                leyendaErr='El nro de telefono debe ser numerico sin puntos'
              
             
            />
            </div>
            <div>
           
            <InputC 
                tipo='text'
                name='emailp'
                infoplace='ingreso email personal'
                estado={emailp}
                cambiarEstado={setEmailp}
                label='Email Personal'
                leyendaErr='incorrecto fromato de email'
                expreg={expresiones.emailp}
            />
           </div>

           <div>
           
            <InputC 
                tipo='text'
                name='emaili'
                infoplace='Ingreso email institucional'
                estado={emaili}
                cambiarEstado={setEmaili}
                label='Email Institucional'
                leyendaErr='incorrecto formato de email'
               
            />
           </div>
                

              
                
               
            
                <div>
                            
          
              
             <ContenedorBoton>
                {tipo ==='A'
                ?<Boton type='submit'>Grabar Nuevo</Boton>
                :<Boton type='submit'>Grabar Modificacion</Boton>
                }
            </ContenedorBoton>
             </div>
             
        </FormularioD>
    </main>
  
  </div>
  )
}

export default FormDomiContacto