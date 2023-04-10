import React,{useState} from 'react'
import { Boton, CabTitulo, ContenedorBoton, Formulario,LabelF,SelectorV} from '../../styles-components/formularios/FormAgente'
//import '../../css/estilosform.css'
import InputC from '../../elementos/InputComponent'
import axios from 'axios'
import { grabarPersona } from '../../services/f_axiospersonas'
//import { ModalComponente } from '../../components/ModalComponente'
//import { useModal } from '../../hooks/useModal'
//const uric = 'http://200.12.136.74:4000/cargos/'
import Swal from 'sweetalert2'

const NewAgente = () => {
    const uri = 'http://200.12.136.74:4000/biometrico/'
    const expresiones = {
        //usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
        nombre: /^[,a-zA-ZÀ-ÿ\s]{1,50}$/, // Letras y espacios, pueden llevar acentos.
        password: /^.{4,12}$/, // 4 a 12 digitos.
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{7,14}$/, // 7 a 14 numeros.
        legajo: /^\d{4,8}$/,
        nrodoc: /^\d{7,9}$/,
        nrocuil: /^\d{10,11}$/,

        fecha:/^\d{4}([-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
    }
    

  
   const [legajo, setLegajo] = useState({campo:'', valido:null}) 
   const [nrodoc, setNrodoc] = useState({campo:'', valido:null})
   const [nrocuil, setNrocuil] = useState({campo:'', valido:null})
   const [nombre, setNombre] = useState({campo:'', valido:null})
   const [area, setArea] = useState('Docente')
   const [sede, setSede] = useState('1')
   const [tipod, setTipod] = useState('1')
   const [claustro, setClaustro] = useState('1') 
   
   

  
  


    const existeLegajo =async ()=>{
        if(legajo.campo.length>0){
            const res = await axios.get(`${uri}agente_leg/${legajo.campo}`)
            if (res.data.length !== 0 ){
                    setLegajo((prevState)=>{
                    return {...prevState, valido:'false'}
                })
           
            }
        }
    }
  

    const changeTD=()=>{
        setTipod(document.getElementById('tipodoc').value)
    }

    const changeSede =()=>{
        setSede(document.getElementById('sede').value)
    }

    const changeArea =()=>{
        setArea(document.getElementById('area').value)
    }
  
    const changeClaustro =()=>{
        setClaustro(document.getElementById('claustro').value)
    }

   const grabarDatos =async ()=>{
        let persona={
            legajo:legajo.campo,
            tipodoc:tipod,
            nrodoc:nrodoc.campo,
            nombre:nombre.campo,
            sede:sede,
            claustro:claustro,
            nrocuil:nrocuil.campo,
            area:area
            
        }
       
        Swal
        .fire({
            title: `Nuevo Agente:${persona.legajo}`,
            text: `¿Grabar a ${persona.nombre}?`,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: "Sí, Grabar",
            cancelButtonText: "Cancelar",
        })
        .then(resultado => {
            if (resultado.value) {
                // Hicieron click en "Sí"
                //console.log(persona)
                grabarPersona(persona)   
                
            } else {
                // Dijeron que no
                
                
            }
        });
         
        
         
    }
    


   const onHandleSubmit =(e)=>{
        e.preventDefault()
        if(
            legajo.valido==='true' && 
            nombre.valido === 'true' && 
            nrodoc.valido === 'true' 
            
            )
        {
         
        grabarDatos()

        } else{
            Swal.fire({
                title: 'Informacion Grabar datos',
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
        
        <Formulario onSubmit={onHandleSubmit}>
           <div>
            <InputC 
                tipo='text'
                name='legajo'
                infoplace='Ingrese Legajo'
                estado={legajo}
                cambiarEstado={setLegajo}
                label='Legajo'
                leyendaErr='Existe Legajo Ó El legajo debe ser numerico'
                expreg={expresiones.legajo}
                funcion={existeLegajo}
               
            />
            </div>
            <div>
                <LabelF htmlFor='tipodoc'>Tipo Documento</LabelF>
                <SelectorV name="tipodoc" id='tipodoc' onChange={changeTD}>
                    <option value="1">DNI</option>
                    <option value="2">LE</option>
                    <option value="3">LC</option>
                </SelectorV>
            </div>
            <div>
            <InputC 
                tipo='text'
                name='nrodni'
                infoplace='Ingrese Nro.Documento'
                estado={nrodoc}
                cambiarEstado={setNrodoc}
                label='Nro.Documento'
                leyendaErr='El nro.documento debe ser numerico sin puntos'
                expreg={expresiones.nrodoc}
             
            />
            </div>
            <div>
             <InputC 
                tipo='text'
                name='nrocuil'
                infoplace='Ingrese Nro.Cuil'
                estado={nrocuil}
                cambiarEstado={setNrocuil}
                label='Nro.Cuil'
                leyendaErr='El nro de cuil debe ser numerico sin puntos'
                expreg={expresiones.nrocuil}
             
            />
            </div>
            <div>
            <InputC 
                tipo='text'
                name='nombre'
                infoplace='APELLIDO, Nombres'
                estado={nombre}
                cambiarEstado={setNombre}
                label='Nombre'
                leyendaErr='nombre solo text no mayor a 60'
                expreg={expresiones.nombre}
            />
           </div>
                

                <div>
                <LabelF htmlFor='claustro'>Claustro</LabelF>
                    <SelectorV name="claustro" id='claustro' onChange={changeClaustro}>
                        <option value="1">Docente</option>
                        <option value="2">No Docente</option>
                        <option value="3">Ambos</option>
                    </SelectorV>
                </div>
               
                <div>
                <LabelF htmlFor='sede'>Sede Ingreso</LabelF>
                <SelectorV name="sede" id='sede' onChange={changeSede}>
                        <option value="1">Sede Mendoza</option>
                        <option value="2">Sede San Rafael</option>
                        <option value="3">Sede Gral.Alvear</option>
                        <option value="4">Sede Este</option>
                </SelectorV>
                </div>
              
                <div>
                <LabelF htmlFor='area'>Area Trabajo</LabelF>
                    <SelectorV name="area" id='area' onChange={changeArea}>
                         <option value="">AREA TRABAJO</option>
                        <option value="Docentes">Docente</option>
                        <option value="Carrera_Licenciatura_en_Administracion">Carrera Licenciatura en  Administracion</option>
                        <option value="Carrera_Licenciatura_en_Economia">Carrera Licenciatura en Economia</option>
                        <option value="Carrera_Contador_Publico">Carrera Contador Público</option>
                        <option value="Carrera_Licenciatura_en_Logística">Carrera Licenciatura en Logística</option>            
                        <option value="Decanato">Decanato</option>
                        <option value="Departamento_Clases_y_Exámenes">Departamento Clases y Exámenes</option>
                        <option value="Departamento_Mesa_de_Entradas">Departamento Mesa de Entradas</option>
                        <option value="Dirección_de_Alumnos">Direccion de Alumnos</option>
                        <option value="Dirección_de_RRHH">Dirección de RRHH</option>   
                        <option value="Dirección_de_Servicios_Generales">Dirección de Servicios Generales</option>         
                        <option value="Dirección_de_Informática">Dirección de Informática</option>
                        <option value="Dirección_de_Biblioteca">Dirección de Biblioteca</option>
                        <option value="Dirección_de_Despacho">Dirección de Despacho</option>
                        <option value="Dirección_de_Publicaciones">Dirección de Publicaciones</option>
                        <option value="Dirección_General_de_Gestión_Administrativo_Financiera">Dirección General de Gestión Administrativo Financiera</option>
                        <option value="Dirección_General_de_Gestión_Académica">Dirección General de Gestión Académica</option>
                        <option value="ECONET">ECONET</option>
                        <option value="Secretaría_de_Administración_y_Finanzas">Secretaría de Administración y Finanzas</option>
                        <option value="Secretaria_de_Asustos_Estudiantiles">Secretaria de Asustos Estudiantiles</option>
                        <option value="Secretaría_de_Extensión_y_RRII">Secretaría de Extensión y RRII</option>
                        <option value="Secretaría_de_Posgrado_e_Investigación">Secretaría de Posgrado e Investigación</option>
                        <option value="Sede_Este">Sede Este</option>
                        <option value="Sede_San_Rafael">Sede San Rafael</option>
                        <option value="Sede_Gral_Alvear">Sede Gral.Alvear</option>
                                
                    </SelectorV>
                </div>

            
                <div>
                            
          
              
             <ContenedorBoton>
                <Boton type='submit'>Enviar</Boton>
                
             </ContenedorBoton>
             </div>
             
        </Formulario>
    </main>
  
  </div>
  )
}

export default NewAgente