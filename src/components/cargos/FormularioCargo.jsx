import React,{useState,useEffect} from 'react'
import {SelectorV, LabelF, Boton, ContenedorBoton, Formulario, BotonC} from '../../styles-components/formularios/FormAgente'
import InputC from '../../elementos/InputComponent'
//import { useNavigate } from 'react-router-dom'
import { useGetMaterias } from '../../hooks/useGetMaterias'
import { useSelector } from 'react-redux'
import { getLastNroCargo, grabarCargo } from '../../services/f_axioscargos'
import Swal from 'sweetalert2'
import CargosConsulta from './CargosConsulta'
//import { traerAgentes } from '../../services/f_axiospersonas'



const FormularioCargo = () => {

    //const navigate = useNavigate()
    const {legajo}=useSelector(state=>state.agente)    
    
    const expresiones = {
        resoA: /^[a-zA-Z0-9\-/]{4,20}$/, // Letras, numeros, guion y guion_bajo
        // resolucionA: /^[,a-zA-ZÀ-ÿ\s]{1,50}$/, // Letras y espacios, pueden llevar acentos.
        fechaA:/^\d{4}([-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
        fechaB:/^\d{4}([-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
    }

    
    const [resoA, setResoA]=useState({campo:'', valido:null})
    const [claustro, setClaustro] = useState('1')
    const [nivel, setNivel] = useState('')
    const [cargos, setCargos]=useState([])
    const [sede, setSede] = useState('1')
    const [tcargo, setTCargo] =useState('1')
    const [fechaA, setFechaA] = useState({campo:'', valido:null})
    const [fechaB, setFechaB] = useState({campo:'', valido:null})
    const [plan, setPlan] =useState('')
    const [matcod,setMatcod] = useState('')
    const [adicional, setAdicional] =useState('0')
    const [titular, setTitular] =useState('0')
    const [ncargo, setNcargo] =useState('')
    const [ncargoGen, setNcargoGen] =useState('')
    const [nrocargos, setNrocargos] =useState('')
    const [cargoNew, setCargoNew]=useState(null)
    const [ppal, setPpal] = useState('10')
    const [actividades, setActividades]=useState(null)
    const [mostrarF, setMostrarF] = useState(false)
    const [carrera, setCarrera]=useState('')
    const [legajorem, setLegajorem]= useState('0')
    //const [agentesActivos,setAgentesActivos]=useState(null)

    
   


    useEffect(() => {
        setMostrarF(false)
               
        
        
      }, [])

      useEffect(() => {

        const cargardatos=async()=>{
            setNrocargos(await getLastNroCargo(legajo))
            
            }

/*
        const cargarAgentesAct = async() =>{
                const resu =await traerAgentes()
                setAgentesActivos(resu)
                console.log(resu)
                
            }
             
            cargarAgentesAct()   
  */      
           
            cargardatos()

      }, [materias,cargos,legajo])


     


      useEffect(()=>{
        if(nrocargos){
        if(nrocargos[0].nroC){
            setNcargo((nrocargos[0].nroC + 1).toString())    
         }else{
             setNcargo("1")
         }

         if(nrocargos[0].nroCg){
            setNcargoGen((nrocargos[0].nroCg + 1).toString())    
         }else{
             setNcargoGen("1")
         }
        }
      },[nrocargos])
    // eleccion 
    const changeClaustro =()=>{
        setClaustro(document.getElementById('claustro').value)
        if(document.getElementById('claustro').value ==='1'){
            setClaustro(1)
        }else if(document.getElementById('claustro').value ==='2'){
            setClaustro(2)
        }else if(document.getElementById('claustro').value ==='3'){
            setClaustro(1)
        }else if(document.getElementById('claustro').value ==='4'){
            setClaustro(1)
        }else{
            setClaustro(1)
        }
    }
//sede
    const changeSede = ()=>{
        setSede(document.getElementById('sede').value)
    }
  //tipo cargo
    const changeTcargo =()=>{
        setTCargo(document.getElementById('tcargo').value)
    }
    //set partida presu
    const changePpal =()=>{
            let cl = document.getElementById('ppal').value.substring(0,1)
            let pp = document.getElementById('ppal').value.substring(1,3)
            setPpal(pp)
            if(pp==='37'){
                setCargos(cargospl.filter(cargo=>cargo.ppal==pp && cargo.es==cl && cargo.nv < 21))
            }else{
                setCargos(cargospl.filter(cargo=>cargo.ppal==pp && cargo.es==cl))
            }
            
    }
    //setear nivel
    const changeNivel =()=>{
        
        setNivel(document.getElementById('nivel').value)
    }

    //titularidad de catedra
    const changeTitular =()=>{
       
        setTitular(document.getElementById('titular').value)
       
    }
    //comparar fechas
    const verificarfechas=(falta,fbaja)=>{
        if(falta >= fbaja){
          alert('La Fecha de baja no puede ser menor o igual a la fecha de Alta')
          return false
        }else{
          
          return true
        }
    }

    //buscar actividades segun propuesta
    const changePropuesta = ()=>{
            let prop= document.getElementById('propuesta').value.substring(0,1)
            let plan = document.getElementById('propuesta').value.substring(1,2)
            setActividades(materias.filter(materia=>materia.pl==plan && materia.car==prop))
           /* if(prop===2){
                setCarrera('1')
            }else if(prop===3){
                setCarrera('2')
            }else if (prop===4){
                setCarrera('3')
            }else{*/
                setCarrera(prop)
            
    }

    const changeMat=()=>{
        setPlan(document.getElementById('matecod').value.substring(0,1))
        setMatcod(document.getElementById('matecod').value.substring(1,4))
        console.log(document.getElementById('matecod').value)
        

    }
    
    //adicional
    const changeAdicional =()=>{
        setAdicional(document.getElementById('adicional').value)
    }
    
    
    const changeRemplazo =()=>{
        
        if(tcargo==='3'){
            setLegajorem(document.getElementById('remplazo').value)
        }
           

    }
    

    const grabarNuevoCargo =async ()=>{
        
       let cargoNew ={
            legajo:legajo,
            ncargo:ncargo,
            sede:sede,
            tcargo:tcargo,
            claustro:claustro,
            ppal:ppal,
            nivel:nivel.length===1?'0'+nivel:nivel,
            adic:adicional,
            plan:plan,
            codmat:matcod,
            fechaA:fechaA.campo,
            nroresA:resoA.campo,
            fechaB:fechaB.campo,
            ncg:ncargoGen,
            titu:titular,
            car:carrera,
            st:'',
            rempl:legajorem
 
         }
        //console.log(cargoNew)
         Swal
         .fire({
             title: `Agente Legajo:${cargoNew.legajo}`,
             text: `Grabar El Cargo`,
             icon: 'info',
             showCancelButton: true,
             confirmButtonText: "Sí, Grabar",
             cancelButtonText: "Cancelar",
         })
         .then(resultado => {
             if (resultado.value) {
                 // Hicieron click en "Sí"
                 //console.warn(cargoNew)
                 grabarCargo(cargoNew)
                 cerrarForm()
                   
                 
             } else {
                 // Dijeron que no
                 
                 
             }
         });
    }


    //funcion de datos cargo
    const datosfor =()=>{
        
        
        if(ppal === "10" || ppal==='37' || ppal==='48')    
        {
            
            if(claustro == '2'){
                alert('No corresponde PPAL con claustro NO Docente')
                return false
            }
        }

        if(ppal === "21" || ppal==='22' || ppal==='23' || ppal==='25' || ppal==='25')    
        {
            
            if(claustro == '1'){
                alert('No corresponde PPAL con claustro Docente')
                return false
            }
        }
        if(tcargo==='3' && legajorem==='0'){
            alert('Si tipo de cargo es Interino Remplazante, debe ingresar a quien remplaza')
            return false
        }
        if(nivel===""){
            alert('Sin Nivel Asignado')
            return false
      
        }else{
        return true
    }
}

    //disparar funcion de boton
    const onHandleSubmit =(e)=>{
        
        e.preventDefault()
        if(
            fechaA.valido==='true' && 
            fechaB.valido === 'true' && 
            resoA.valido === 'true' &&
            verificarfechas(fechaA.campo, fechaB.campo) &&
            datosfor()
            
            )
        {
               
        grabarNuevoCargo()
        }else{
            Swal.fire({
                title: 'Informacion Datos Cargo',
                text: 'Datos Incompletos o Erroneos',
                icon: 'info',
                showCancelButton: true,})

        }
    }


   const mostrar=()=>{
    setMostrarF(true)
   }
   
   const cerrarForm =()=>{
    
    setMostrarF(false)
   // navigate('/fichaAgente')
   }
   
   const{loading,error,materias, cargospl,agentesActivos}=useGetMaterias()
   if(loading) return <p>Cargando datos .....</p>
   if(error) return <p>Error de Carga</p>

   
   
        
  return (
    <>
    {mostrarF?
    <div className='container'>
            <h4>Ingresar Datos del Cargo </h4>
        <main>
            
            <Formulario onSubmit={onHandleSubmit}>

           

            <div>
                <LabelF htmlFor='sede'>Sede</LabelF>
                <SelectorV name="sede" id='sede' onChange={changeSede}>
                    <option value="1">Mendoza</option>
                    <option value="2">San Rafael</option>
                    <option value="3">Gral.Alvear</option>
                    <option value="4">Sede Este</option>
                </SelectorV>

            </div>
 
              <div>
                <LabelF htmlFor='claustro'>Claustro</LabelF>
                <SelectorV name="claustro" id='claustro' onChange={changeClaustro}>
                    <option value="1">Docente</option> 
                    <option value="2">No Docente</option>
                    
                </SelectorV>

            </div>
            <div>
                <LabelF htmlFor='tcargo'>Tipo Cargo</LabelF>
                <SelectorV name="tcargo" id='tcargo' onChange={changeTcargo}>
                    <option value="1">Efectivo</option>
                    <option value="2">Interino</option>
                    <option value="3">Interino Remplazante</option>
                    <option value="4">Contratado</option>
                    <option value="5">Mensualizado</option>
                    <option value="6">Jornalizado</option>
                    <option value="7">Suplente</option>
                    <option value="8">Asignacion</option>
                    <option value="9">Beca Nv JTP </option>
                    <option value="10">Cargo Función Crítica</option>
                    <option value="11">Interino Mayor Responsabilidad</option>
                    <option value="12">Interino Ordenanza 36</option>
                </SelectorV>

            </div>

            <div>
                <LabelF htmlFor='ppal'>PPAL</LabelF>
                <SelectorV name="ppal" id='ppal' onChange={changePpal}>
                    <option>PPAL</option>
                    <option value="110">10-Superior</option>
                    <option value="137">37-Docentes</option>
                    <option value="138">38-Cargos Gestión</option>
                    <option value="148">48-Docentes Sec</option>
                    <option value="221">21-Administrativos</option>
                    <option value="222">22-Tecnico</option>
                    <option value="223">23-Profesional</option>
                    <option value="225">25-Mantenimiento</option>
                    <option value="226">26-Servicios Generales</option>
                    
                </SelectorV>

            </div>
            
            <div>
            <LabelF htmlFor='nivel'>Nivel</LabelF>
            <SelectorV name="nivel" id='nivel' onChange={changeNivel}>
                    <option>Elegir Nivel</option>
                    {cargos.map((nv,index)=>(
                    <option value={nv.nv} key={index}>{nv.cargo} - {nv.nv} </option>
                    ))}
                </SelectorV>

            </div>


            <div>
                <LabelF htmlFor='adicional'>Adicional</LabelF>
                <SelectorV name="adicional" id='adicional' onChange={changeAdicional}>
                    <option value="0">Sin Adicional</option>
                    <option value="1">Función Crítica Docente</option>
                    <option value="2">Función Crítica No Docente</option>
                    <option value="3">Función Crítica Gestión</option>
                </SelectorV>

            </div>
            
            
            <div>
                <LabelF htmlFor='propuesta'>Propuesta Academica</LabelF>
                <SelectorV name="propuesta" id='propuesta' onChange={changePropuesta}>
                    <option>PROPUESTA</option>
                    <option value="23">CONTADOR PUBLICO NACIONAL(98)</option>
                    <option value="33">LICENCIATURA EN ADMINISTRACION(98)</option>
                    <option value="34">LICENCIATURA EN ADMINISTRACION(19)</option>
                    <option value="43">LICENCIATURA EN ECONOMIA(98)</option>
                    <option value="44">LICENCIATURA EN ECONOMIA(19)</option>
                    <option value="61">LGNR(12)</option>
                    <option value="71">LICENCIADO EN LOGISTICA(1)</option>
                    <option value="84">CONTADOR PUBLICO(19)</option>
                    <option value="03">PERSONAL APOYO (0)</option>
                </SelectorV>

            </div>
          {/*
            <div>
                <LabelF htmlFor='plan'>Plan</LabelF>
                <SelectorV name="plan" id='plan' onChange={changePlanCarrera}>
                    
                    <option value="3">Plan 98 - 3</option>
                    <option value="4">Plan 2019 - 4</option>
                   
                    
                </SelectorV>

            </div>
*/}
            <div>
                <LabelF htmlFor='matecod'>Actividad Academica</LabelF>
                <SelectorV name="matecod" id='matecod' onChange={changeMat}>
                <option>Elegir Actividad</option>
                
                    {actividades?
                    actividades.map((ele,index)=>(
                    <option value={ele.id_materia} key={index}>({ele.id_materia}){ele.materia}</option>
                    ))
                    :null}
                </SelectorV>

            </div>
            
            <div>
                <LabelF htmlFor='titular'>Titular</LabelF>
                <SelectorV name="titular" id='titular' onChange={changeTitular}>
                    <option value="0">NO</option>
                    <option value="1">SI</option>
                    <option value="2">A Cargo</option>
                    
                </SelectorV>

            </div>
            
                     
            
            <InputC 
                tipo='text'
                name='resoA'
                infoplace='Nro Resolucion de Alta'
                estado={resoA}
                cambiarEstado={setResoA}
                label='Nro.Resolición de Alta'
                leyendaErr='no menor de 4 y no mayor a 60 caracteres'
                expreg={expresiones.resoA}
            />

               

                <InputC 
                    tipo='text'
                    name='fechaA'
                    infoplace='aaaa-mm-dd'
                    estado={fechaA}
                    cambiarEstado={setFechaA}
                    label='Fecha Alta Resolucion'
                    leyendaErr='la fecha tiene que tener unformato como 2000-08-14'
                    expreg={expresiones.fechaA}
                />        
                <InputC 
                    tipo='text'
                    name='fechaB'
                    infoplace='aaaa-mm-dd'
                    estado={fechaB}
                    cambiarEstado={setFechaB}
                    label='Fecha Baja '
                    leyendaErr='la fecha tiene que tener unformato como 2000-08-14'
                    expreg={expresiones.fechaB}
                />        
            

            <div>
                <LabelF htmlFor='remplazo'>Remplaza a</LabelF>
                <SelectorV name="remplazo" id='remplazo' onChange={changeRemplazo}>
                <option value='0'>Elegir Agente</option>
                
                    {agentesActivos?
                    agentesActivos.map((ele,index)=>(
                    <option value={ele.legajo} key={index}>{ele.apellido}</option>
                    ))
                    :null}
            </SelectorV>            
            </div>

            <ContenedorBoton>
                <Boton type='submit'>Grabar Nuevo Cargo</Boton>
                
             </ContenedorBoton>

                 
            </Formulario>
            <ContenedorBoton>
                <BotonC onClick={()=>cerrarForm()}>Cerrar Formulario</BotonC>
                
             </ContenedorBoton>      
        </main>
        
    </div>
    :
    <div className='container-fluid '>
    <CargosConsulta tipoCargo={'V'} title={'Cargos Vigentes'} tipo={1}/>    
    <ContenedorBoton>
        <Boton onClick={mostrar}>Nuevo Cargo</Boton>
    </ContenedorBoton>
    </div>                    
    }
  </>
  )
}

export default FormularioCargo