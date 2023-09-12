import React,{useState,useEffect} from 'react'
import InputC from '../elementos/InputComponent'
//import { useNavigate } from 'react-router-dom';


import { Formulario, LabelF, SelectorV } from '../styles-components/formularios/FormAgente'
//import { useGetMaterias } from '../hooks/useGetMaterias';
import Swal from 'sweetalert2';
import { EliminarCargoH, modiCargo} from '../services/f_axioscargos';
import { useSelector } from 'react-redux';
//import { useGetMaterias } from '../hooks/useGetMaterias';


const FormModificarDatosCargo = ({dato,modifica,funcion, idmat, materias, cargospl}) => {

    const nombre = useSelector(state=>state.agente.nombre)
    //const navigate = useNavigate()
    const expresiones = {
        resoA: /^[a-zA-Z0-9\_\ \-/]{4,20}$/, // Letras, numeros, guion y guion_bajo
        //resoB: /^[a-zA-Z0-9\_\ \-/]{4,20}$/, // Letras, numeros, guion y guion_bajo

        // resolucionA: /^[,a-zA-ZÀ-ÿ\s]{1,50}$/, // Letras y espacios, pueden llevar acentos.
        fechaA:/^\d{4}([-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
        fechaB:/^\d{4}([-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
        planI:/^[1-9]{1}$/,
        carreraI:/^[0-9]{1}$/,
        matI:/^[1-9]{3}$/,
        nrocargo:/^[0-9]{1,7}$/,
        remplazo:/^[0-9]{1,7}$/,

        //fechaBN:/^\d{4}([-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
    }

    const [fechaA, setFechaA] = useState({campo:'', valido:null})
    const [fechaB, setFechaB] = useState({campo:'', valido:null})
    const [remplazo, setRemplazo] = useState({campo:'', valido:null})
    const [resoA, setResoA]=useState({campo:'', valido:null})
    const [nrocargo, setNroCargo]=useState({campo:'', valido:null})
    const [nroReg, setnroReg] = useState(0)
    const [legajo, setlegajo] = useState('')
    
    const [planI, setPlan]=useState({campo:'', valido:null})
    const [matI, setMat]=useState({campo:'', valido:null})
    const [actividades, setActividades] = useState([])
    const [matname, setMatname] = useState('')
    const [propuesta, setPropuesta]=useState('')
    const [car, setCar]=useState('')
    const [titular, setTitular] = useState('0') 
    const [situacion, setSituacion]= useState('')
    const [adicional, setAdicional]= useState('0')
    const [carreraI, setCarrera]=useState({campo:'', valido:null})
    const [nivel, setNivel] = useState('1')
    const [cargos, setCargos]=useState([])
    const [ppal,setPpal]=useState('0')
    const [sede, setSede]=useState('1')
    const [claustro, setClaustro]=useState('1')
    const [tcargo, setTcargo]=useState('1')
    //const [finc, setFinc]=useState(true)
    //const [datosModi, setDatosModi]= useState(null)
    
    
    let datosModi={
        rempla:'',
        fechalt:'',
        nc:'',
        es:'',
        ca:'',
        inst:'',
        nresa:'',
        fechbaj: '',
        pl:'',
        car:'',
        mat:'',
        titular:'',
        st:'',
        adic:'',
        ppal:'',
        nv:'',  
      }
    

    const buscarMat=(idm)=>{
      
      let [materia] =materias.filter(materia => materia.id_materia == idm)
      if (materia){
      setMatname(materia.materia)
      if(materia.car ===2){
        setPropuesta('CONTADOR PUBLICO NACIONAL')
      }else if(materia.car === 3){
        setPropuesta('LICENCIATURA EN ADMINISTRACION')
        setCar('3')
      }else if(materia.car === 4){
        setPropuesta('LICENCIATURA EN ECONOMIA')
        setCar('4')
      }else if(materia.car === 6){
        setPropuesta('CICLO LIC.EN NEGOCIOS REGIONALES')
      }else if(materia.car === 7){
        setPropuesta('LICENCIATURA EN LOGISTICA')
        
      }else if(materia.car === 8){
        setPropuesta('CONTADOR PUBLICO')
        setCar('8')
      }
    }
      // console.log(matname)
      //console.log(propuesta)
    }
    


    

    const setValores =()=>{
      
        setCargos(cargospl.filter(cargo=>cargo.ppal==dato.ppal && cargo.es==dato.es))
        setnroReg(dato.row_id)
        setTcargo(dato.ca)
        setNroCargo({campo:dato.nc,valido:true})
        setRemplazo({campo:dato.rempla,valido:true})
        setlegajo(dato.legajo)
        setSede(dato.inst)
        setClaustro(dato.es)
        setPropuesta(dato.car.toString()+dato.pl.toString())        
        setCarrera({campo:dato.car,valido:'true'})
        setMat({campo:dato.mat,valido:'true'})
        setPlan({campo:dato.pl,valido:'true'})
        setNivel(dato.nv)
        setFechaB({campo:convertirFecha(dato.fechaBaja),valido:'true'})
        setResoA({campo:dato.nresa ,valido:'true'})
        setFechaA({campo:convertirFecha(dato.fechaAlta),valido:'true'})
        setTitular(dato.titular)
        document.getElementById('titular').value=dato.titular
        setSituacion(dato.st)
        document.getElementById('situacion').value=dato.st
        setAdicional(dato.adic)
        document.getElementById('adicional').value=dato.adic
        if(dato.ppal === '37'){
          document.getElementById('ppal').value='137'
          changePpal()
        }else if (dato.ppal==='21'){
          document.getElementById('ppal').value='221'  
          changePpal()
        }
  
        document.getElementById('sede').value=dato.inst
        document.getElementById('condicion').value=dato.es
        document.getElementById('tcargo').value=dato.ca
        
       
    }

    useEffect(() => {
      //console.log(dato)
      //setDatosModificacion()
      setValores()
      if (materias) {
        setActividades(materias.filter(materia => materia.pl == 4))
        if(idmat){
          buscarMat(idmat)
        }else{
          setMatname('')
        }
      }
      
       
      
    }, [dato])
  
    useEffect(()=>{
      const setNivelCombo=()=>{
      
         
          document.getElementById('nivel').value=nivel
              }

      setNivelCombo()
    },[nivel])

   

    

    //anular cargo

    const convertirFecha =(fe)=>{
      if(fe){
      return fe.substring(6,10) + "-" + fe.substring(3,5) + "-" + fe.substring(0,2)
      }else{return '2000-01-01'}    
    }

    const verificarfechas=(falta,fbajan)=>{
        if(falta >= fbajan){
          alert('La Fecha de baja no puede ser menor o igual a la fecha de Alta')
          return false
        }else{
          
          return true
        }
    }
   
   const validarcarrera = (pl,car,mat)=>{
     if(dato.ppal == 37){
        if(pl=='' || car=='' || mat==''){
            alert('falta seleccionar propuesta o actividad')
            return false
          }else{
          
            return true
          }
     }else{
      return true
     }
   }


  //set partida presu
  const changePpal =()=>{
    let cl = document.getElementById('ppal').value.substring(0,1)
    let pp = document.getElementById('ppal').value.substring(1,3)
    setPpal(pp)
    setCargos(cargospl.filter(cargo=>cargo.ppal==pp && cargo.es==cl))
 }
//setear nivel
const changeNivel =()=>{

setNivel(document.getElementById('nivel').value)


}


    //titularidad de catedra
  const changeTitular =()=>{
       
      setTitular(document.getElementById('titular').value)
     
  }

  //situacion del cargo
  const changeSituacion =()=>{
    Swal.fire({
      title: 'Cambio Situacion Cargo',
      text: 'Recuerde No cambiar la Situacion si No a eliminado la licencia o se levanto la misma',
      icon: 'warning',
      showCancelButton: true,})

    setSituacion(document.getElementById('situacion').value)
   
}

const changeAdicional=()=>{
  Swal.fire({
    title: 'Cambio Adicional Cargo',
    text: 'Recuerde No cambiar la Adicional, si No ha eliminado el Adicional o se termino el mismo',
    icon: 'warning',
    showCancelButton: true,})

  setAdicional(document.getElementById('adicional').value)
 
}
const grabarDatosModi =async ()=>{
  await modiCargo(nroReg,datosModi,2)
  cerrar()
}
  
    //console.log(materias)
    //grabar cargo renovacion
    const updateCargo =async ()=>{
      
      datosModi={
        rempla:remplazo.campo,
        fechalt:fechaA.campo,
        nc:nrocargo.campo,
        es:claustro,
        ca:tcargo,
        inst:sede,
        nresa:resoA.campo,
        fechbaj: fechaB.campo,
        pl:planI.campo,
        car:carreraI.campo,
        mat:matI.campo,
        titular:document.getElementById('titular').value,
        st:document.getElementById('situacion').value,
        adic:adicional,
        ppal:ppal==='0'?dato.ppal:ppal,
        nv:nivel==='0'?dato.nv:nivel.length===1?'0'+nivel:nivel,  
      }
        


        Swal
        .fire({
            title: `Agente Legajo:${legajo}`,
            text: `Grabar Modificación de Cargo`,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: "Sí, Grabar",
            cancelButtonText: "Cancelar",
        })
        .then(resultado => {
            if (resultado.value) {
              //console.log(datosModi)
              
               grabarDatosModi()
               //funcion()
               //navigate('/fichaAgente')
                  
                
            } else {
                // Dijeron que no
                
                
            }
        });
   }

    const handleSubmit =(e)=>{


      e.preventDefault()
      if(
        fechaA.valido === 'true' && 
        fechaB.valido === 'true' && 
        resoA.valido ===  'true' &&
        
        
      
        verificarfechas(fechaA.campo, fechaB.campo)&&
        validarcarrera(planI.campo,carreraI.campo,matI.campo)
        ) {
          
        updateCargo()
      
     }else {
        Swal.fire({
            title: 'Informacion datos Cargo',
            text: 'Datos Incompletos o erroneos',
            icon: 'info',
            showCancelButton: true,})

    }

  }

  const onHandleEliminar=async ()=>{

    Swal
          .fire({
              title: `Agente Legajo:${legajo}`,
              text: `Eliminar Cargo Historico`,
              icon: 'info',
              showCancelButton: true,
              confirmButtonText: "Sí, Eliminar",
              cancelButtonText: "Cancelar",
          })
          .then(async resultado => {
              if (resultado.value) {
                 const resu = await EliminarCargoH(legajo,nroReg)
  
                 funcion()
                 modifica()
                 //navigate('/fichaAgente')
                    
                  
              } else {
                  // Dijeron que no
                  
                  
              }
          });
  }
  
      
  const changePropuesta = ()=>{
    let prop= document.getElementById('propuesta').value.substring(0,1)
    let plan = document.getElementById('propuesta').value.substring(1,2)
    setActividades(materias.filter(materia=>materia.pl==plan && materia.car==prop))
    
    //console.log(prop)
    //setCarrera(prop)
    
} 

  const changeClaustro =()=>{

   setClaustro(document.getElementById('condicion').value)
   console.log(document.getElementById('condicion').value)
  }
  const changeTcargo =()=>{
    setTcargo(document.getElementById('tcargo').value)
    
  }
  const changeSede =()=>{
    setSede(document.getElementById('sede').value)
  }

  const cerrar =()=>{
    
    setValores()
    funcion()
    modifica()
  }
   
    
        
  return (
    < div className='container'>
          
          <div className='row'>
          
             <div className='col-md-6 col-xs-12' >
            <h2>Modificar Datos Cargo Historico </h2>
            </div>
            <div className='col-md-4'></div>
            
            < div className="col-md-1">
                
              
                    <button className='btn btn-danger' onClick={onHandleEliminar}>
                      Eliminar
                    </button>
                   
            </div>
            
            <div className='col-md-1'>
                <button  onClick={cerrar} className='btn btn-info'>
                      Cerrar
                </button>
            </div>
            </div>    
          

          <div className='row'>
            <h5>{nombre} - {dato.legajo}</h5>
          </div>
          
          <div className="row">
            {idmat
            ?<h6>Carrera:{propuesta} Materia:{propuesta}</h6>
            :null}          

                     
          </div>
        

          <Formulario id='form' onSubmit={handleSubmit}>
        
          <div style={{display:'flex'}}>
             <div style={{width:'120px',marginRight:'5px'}}>
                <InputC 
                      tipo='text'
                      name='nrocargo'
                      infoplace='Nro Cargo'
                      estado={nrocargo}
                      cambiarEstado={setNroCargo}
                      label='Nro.Cargo'
                      leyendaErr='numerico solo'
                      expreg={expresiones.nrocargo}
                  />
            </div>
          
          <div style={{marginTop:'5px'}}>
                <LabelF htmlFor='condicion'>Claustro</LabelF>
                <SelectorV name="condicion" id='condicion' onChange={changeClaustro}>
                    <option value="1">Docente</option> 
                    <option value="2">No Docente</option>
                    
                </SelectorV>

          </div>
         
          </div>
          <div style={{marginTop:'5px'}}>
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
                </SelectorV>
          </div>
          
            
            <div style={{display:'flex'}}>
            <div style={{width:'140px', marginRight:'5px', marginTop:'5px'}}>
                <LabelF htmlFor='sede'>Sede</LabelF>
                <SelectorV name="sede" id='sede' onChange={changeSede}>
                    <option value="1">Mendoza</option>
                    <option value="2">San Rafael</option>
                    <option value="3">Gral.Alvear</option>
                    <option value="4">Sede Este</option>
                </SelectorV>

            </div>
            <div style={{width:'100px'}}>                
                <InputC 
                tipo='text'
                name='remplazo'
                infoplace='remplaza a legajo'
                estado={remplazo}
                cambiarEstado={setRemplazo}
                label='Leg.Remplaza'
                leyendaErr='numerico solo'
                expreg={expresiones.remplazo}
            />
          </div>  

            </div>

          <div style={{display:'flex'}}>
            
            <div style={{marginRight:'5px'}}>
                <LabelF htmlFor='ppal'>PPAL</LabelF>
                <SelectorV name="ppal" id='ppal' onChange={changePpal}>
                    <option value='0'>PPAL</option>
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
                    <option value='0'>Elegir Nivel</option>
                    {cargos.map((nv,index)=>(
                    <option value={nv.nv<10?'0'+nv.nv:String(nv.nv)} key={index}>{nv.cargo} - {nv.nv} </option>
                    ))}
                </SelectorV>

            </div>

              
            </div> 
                
          
          <div style={{display:'flex'}}>
            <div style={{marginRight:'5px'}}>
                <InputC 
                    tipo='text'
                    name='fechaA'
                    infoplace='aaaa-mm-dd'
                    estado={fechaA}
                    cambiarEstado={setFechaA}
                    label='Fecha Alta '
                    leyendaErr='la fecha tiene que tener un formato como 2000-08-14'
                    expreg={expresiones.fechaA}
                />        
               </div>
               <div>
              <InputC 
                    tipo='text'
                    name='fechaB'
                    infoplace='aaaa-mm-dd'
                    estado={fechaB}
                    cambiarEstado={setFechaB}
                    label='Fecha Baja '
                    leyendaErr='la fecha tiene que tener un formato como 2000-08-14'
                    expreg={expresiones.fechaB}
                />
               </div>
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
                
               
             
                
               
            <div style={{display:'flex'}}>
               
               <div style={{width:'120px',marginRight:'5px'}}>
                <LabelF htmlFor='titular'>Titular</LabelF>
                <SelectorV name="titular" id='titular' onChange={changeTitular}>
                    <option value="0">NO</option>
                    <option value="1">SI</option>
                    <option value="2">A Cargo</option>
                    
                </SelectorV>

                </div>
                <div style={{width:'150px',marginRight:'5px'}}>
                <LabelF htmlFor='situacion'>Situacion</LabelF>
                <SelectorV name="situacion" id='situacion' onChange={changeSituacion}>
                    <option value="">En Funciones</option>
                    <option value="CG">Lic.C.Goce Haber</option>
                    <option value="SG">Lic.S.Goce Haber</option>
                    
                </SelectorV>

                </div>

                <div style={{width:'150px',marginRight:'5px'}}>
                <LabelF htmlFor='adicional'>Adicional</LabelF>
                <SelectorV name="adicional" id='adicional' onChange={changeAdicional}>
                    <option value="0">Sin Adicional</option>
                    <option value="1">F.C.Docentes</option>
                    <option value="2">F.C.NoDoc.</option>
                    <option value="3">F.C.Gestión</option>
                    
                </SelectorV>

                </div>
                </div>
           
            
                


            <div style={{display:'flex'}}>
            
             <div style={{width:'100px',marginRight:'5px'}}> 
            <InputC 
                tipo='text'
                name='planI'
                infoplace='Plan'
                estado={planI}
                cambiarEstado={setPlan}
                label='Plan'
                leyendaErr='1 caracter'
                expreg={expresiones.planI}
            />       
            </div>

            <div style={{width:'100px',marginRight:'5px'}}> 
            <InputC 
                tipo='text'
                name='carreraI'
                infoplace=''
                estado={carreraI}
                cambiarEstado={setCarrera}
                label='Carr'
                leyendaErr='1 caracter'
                expreg={expresiones.carreraI}
            />       
            </div>

            <div style={{width:'100px',marginRight:'5px'}}> 
            <InputC 
                tipo='text'
                name='matI'
                infoplace='materia'
                estado={matI}
                cambiarEstado={setMat}
                label='Mat'
                leyendaErr='3 caracteres'
                expreg={expresiones.matI}
            />       
            </div>
            
              


              
            </div>
              
              <div>
                <br/>
                <button type='submit' className='btn btn-primary'>
                  Grabar Modificacion
                </button>
                
              </div>
              
              
          </Formulario>

          <div style={{display:'flex',padding:'10px'}}>
          
                
                <SelectorV name="propuesta" id='propuesta' onChange={changePropuesta}>
                    <option>Popuesta</option>
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

            
            
                
                <SelectorV name="matecod" id='matecod'>
                <option>Actividad</option>
                
                    {actividades?
                    actividades.map((ele,index)=>(
                    <option value={ele.id_materia} key={index}>({ele.id_materia}){ele.materia}</option>
                    ))
                    :null}
                </SelectorV>

            </div>

         </div>
          

      
  )
}

export default FormModificarDatosCargo