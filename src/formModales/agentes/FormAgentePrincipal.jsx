import React,{useState,useEffect} from 'react'

import { Boton, CabTitulo, ContenedorBoton, FormularioD, LabelF, SelectorV } from '../../styles-components/formularios/FormAgente'
import InputC from '../../elementos/InputComponent'
import Swal from 'sweetalert2'
import { modificarPersona } from '../../services/f_axiospersonas'
//import { useNavigate } from 'react-router-dom'

const FormAgentePrincipal = ({modifica,funcion,datos}) => {
    //legajo,tipodocumento,nrodocumento,apellido,condicion,nrocuil,area,sede
  
    //console.log(datos)
    const expresiones = {
        //usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
        nombre: /^[,a-zA-ZÀ-ÿ\s]{1,50}$/, // Letras y espacios, pueden llevar acentos.
        //password: /^.{4,12}$/, // 4 a 12 digitos.
        //correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        //telefono: /^\d{7,14}$/, // 7 a 14 numeros.
        legajo: /^\d{4,8}$/,
        nrodoc: /^\d{7,9}$/,
        nrocuil: /^\d{10,11}$/,

        //fecha:/^\d{4}([-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
    }
    

  
   const [legajo, setLegajo] = useState({campo:'', valido:null}) 
   const [nrodoc, setNrodoc] = useState({campo:'', valido:null})
   const [nrocuil, setNrocuil] = useState({campo:'', valido:null})
   const [nombre, setNombre] = useState({campo:'', valido:null})
   const [area, setArea] = useState('Docentes')
   const [sede, setSede] = useState('1')
   const [tipod, setTipod] = useState('1')
   const [claustro, setClaustro] = useState('1')
   const [asistencia, setAsistencia]=useState('A')


   

   useEffect(() => {
 
    if(datos){
        
     
        limpiar()
        setLegajo({campo:datos.legajo, valido:'true'})
        setNombre({campo:datos.apellido, valido:'true'})
        setNrocuil({campo:datos.nrocuil, valido:'true'})
        setNrodoc({campo:datos.nrodocumento, valido:'true'})
        setArea(datos.area)
        setClaustro(datos.condicion)
        setSede(datos.sede)
        setTipod(datos.tipodocumento)
        setAsistencia(datos.asistencia==='P'?'A':datos.asistencia)
    }
   
     
   }, [datos])
   
   const limpiar=()=>{
        setLegajo({campo:'', valido:null})
        setNombre({campo:'', valido:null})
        setNrocuil({campo:'', valido:null})
        setNrodoc({campo:'', valido:null})
        setArea('Docentes')
        setClaustro('1')
        setSede('1')
        setTipod('1')
        setAsistencia('A')
   }

   const grabarDatosAgentePrincipal = async ()=>{

    const persona ={
                
        nrodocumento:nrodoc.campo,
        tipodocumento:tipod,
        nrocuil:nrocuil.campo,
        apellido:nombre.campo,
        condicion:claustro,
        sede:sede,
        area:area,
        asistencia:asistencia,
        
    }
    
    let resp = await modificarPersona(legajo.campo,persona)
    
 
    //const resp=400
//console.log(resp)
if (resp===200){
    Swal.fire({
        title: 'Datos Principales Grabados',
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


   const cerrar =()=>{
    limpiar()
    funcion()
   }
   const onHandleChangeTD =()=>{
        setTipod(document.getElementById('tipod').value)
   }

   const onHandleChangeSE =()=>{
        setSede(document.getElementById('sede').value)
   }

   const onHandleChangeAR =()=>{
    setArea(document.getElementById('area').value)
   }

   const onHandleChangeCL =()=>{
    setClaustro(document.getElementById('claustro').value)
   }

   const onHandleChangeAs =()=>{
    setAsistencia(document.getElementById('asistencia').value)
   }



   const onHandleSubmit =(e)=>{
           e.preventDefault()
       
    if(
        nrocuil.valido==='true' && 
        nrodoc.valido === 'true' && 
        nombre.valido === 'true' 
        
        )
     {
     
   grabarDatosAgentePrincipal()

    } else{
        Swal.fire({
            title: 'Informacion Datos Principales',
            text: 'Datos Basicos Incompletos',
            icon: 'info'
            
            
        });

            
    }


   }

   return (
    <div className="container mt-2">
            <div className="row">
                <div className="col-md-10">
                    <CabTitulo>Modificar Datos Principales </CabTitulo>
                </div>    
                    <div className="col-md-1"></div>
                <div className="col-md-1">
                    <button  onClick={cerrar} className='btn btn-info'>
                        X
                    </button>
                </div>    
            </div>

        <div className="main">
            <FormularioD onSubmit={onHandleSubmit}>
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
                
               
            />
            </div>
            <div>
                <LabelF htmlFor='tipod'>Tipo Documento</LabelF>
                <SelectorV name="tipod" id='tipod' value={tipod} onChange={onHandleChangeTD}>
                    <option value="1">DNI</option>
                    <option value="2">LC</option>
                    <option value="3">LE</option>
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
                    <SelectorV name="claustro" id='claustro' value={claustro} onChange={onHandleChangeCL}>
                        <option value="1">Docente</option>
                        <option value="2">No Docente</option>
                        
                    </SelectorV>
                </div>
               
                <div>
                <LabelF htmlFor='sede'>Sede Ingreso</LabelF>
                <SelectorV name="sede" id='sede' value={sede} onChange={onHandleChangeSE}>
                        <option value="1">Sede Mendoza</option>
                        <option value="2">Sede San Rafael</option>
                        <option value="3">Sede Gral.Alvear</option>
                        <option value="4">Sede Este</option>
                </SelectorV>
                </div>
              
                <div>
                <LabelF htmlFor='area'>Area Trabajo</LabelF>
                    <SelectorV name="area" id='area' value={area} onChange={onHandleChangeAR}>
                         <option value="">AREA TRABAJO</option>
                        <option value="Docentes">Docentes</option>
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
                <LabelF htmlFor='licencia'>Licencia</LabelF>
                    <SelectorV name="asistencia" id='asistencia' value={asistencia} onChange={onHandleChangeAs}>
                        <option value="L">SI</option>
                        <option value="A">NO</option>
                        
                    </SelectorV>
                </div>          
  
  
                <div>
                    
  
                    <ContenedorBoton>
                       
                       
                       <Boton type='submit'>Modificar Datos</Boton>
                       
                    </ContenedorBoton>
                    </div>
            </FormularioD>
        </div>
    </div>  
    )
}

export default FormAgentePrincipal