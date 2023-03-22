import React,{useState} from 'react'
import Swal from 'sweetalert2'
import InputC from '../elementos/InputComponent'

import { FormularioD, LabelF, SelectorV } from '../styles-components/formularios/FormAgente'
import { Boton, CabTitulo, ContenedorBoton } from '../styles-components/formularios/FormAgente'

const FormDomiContacto = ({legajo}) => {

    const expresiones = {
       domicilio: /^[,a-zA-ZA0-9\s]{1,60}$/, // Letras y espacios, pueden llevar acentos.
       emailp: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
       emaili: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
       telefono: /^\d{6,16}$/, // 7 a 16 numeros.
       telefonomovil: /^\d{6,16}$/, // 7 a 16 numeros
       telefonocontacto: /^\d{6,16}$/, // 7 a 16 numeros
       cpostal: /^\d{4,8}$/, // 4 a 8 numeros.
       
    }

    const [localidad, setLocalidad]= useState('')
    const [domicilio, setDomicilio] = useState({campo:'', valido:null})
    const [cpostal,setCpostal] = useState({campo:'', valido:null})
    const [telefono,setTelefono] = useState({campo:'', valido:null})
    const [telefonomovil,setTelefonomovil] = useState({campo:'', valido:null})
    const [telefonocontacto,setTelefonocontacto] = useState({campo:'', valido:null})
    const [emailp,setEmailp] = useState({campo:'', valido:null})
    const [emaili,setEmaili] = useState({campo:'', valido:null})   
    const grabarDatosContacto =()=>{
            const NewdatoContacto ={
                legajo:legajo,
                domicilio:domicilio.campo,
                cpostal:cpostal.campo,
                telefono:telefono.campo,
                telefonomovil:telefonomovil.campo,
                telefonocontacto:telefonocontacto.campo,
                emailp:emailp.campo,
                emaili:emaili.campo,
                loc:localidad
            }
    }

    
    const changeLocalidad =()=>{
        setLocalidad(document.getElementById('localidad').value)
    }


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
            localidad.length > 0 
            
            )
        {
         
        grabarDatosContacto()

        } else{
            Swal.fire({
                title: 'Informacion Datos Contacto',
                text: 'Datos Basicos Incompletos',
                icon: 'info',
                showCancelButton: true,
                
            });

            
            
        }
       
   }


  return (
    <div className='container mt-2'>

            <CabTitulo>Ingreso Datos Principales de Persona</CabTitulo>
    
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
                <LabelF htmlFor='localidad'>Tipo Documento</LabelF>
                <SelectorV name="localidad" id='localidad' onChange={changeLocalidad}>
                    <option value="1">ggg</option>
                    <option value="2">LE</option>
                    <option value="3">LC</option>
                </SelectorV>
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
                expreg={expresiones.telefono}
             
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
                expreg={expresiones.telefonocontacto}
             
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
                expreg={expresiones.emaili}
            />
           </div>
                

              
                
               
            
                <div>
                            
          
              
             <ContenedorBoton>
                <Boton type='submit'>Grabar Datos</Boton>
                
             </ContenedorBoton>
             </div>
             
        </FormularioD>
    </main>
  
  </div>
  )
}

export default FormDomiContacto