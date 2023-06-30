import React,{useState,useEffect} from 'react'
import InputC from '../elementos/InputComponent'
//import { useNavigate } from 'react-router-dom';


import { Formulario, LabelF, SelectorV } from '../styles-components/formularios/FormAgente'
//import { useGetMaterias } from '../hooks/useGetMaterias';
import Swal from 'sweetalert2';
import { EliminarCargoH, modiCargo} from '../services/f_axioscargos';
import { useSelector } from 'react-redux';


const FormModificarDatosCargoH = ({dato,funcion, idmat, materias}) => {
  console.log(dato)
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

        //fechaBN:/^\d{4}([-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
    }

    const [fechaA, setFechaA] = useState({campo:'', valido:null})
    const [fechaB, setFechaB] = useState({campo:'', valido:null})
    //const [fechaBN, setFechaBN] = useState({campo:'', valido:null})
    const [resoA, setResoA]=useState({campo:'', valido:null})
    //const [resoB, setResoB]=useState({campo:'', valido:null})
    const [nroReg, setnroReg] = useState(0)
    const [legajo, setlegajo] = useState('')
    //const [matecod, setMatecod]=useState('')
    const [planI, setPlan]=useState({campo:'', valido:null})
    const [matI, setMat]=useState({campo:'', valido:null})
    const [actividades, setActividades] = useState([])
    const [matname, setMatname] = useState('')
    const [propuesta, setPropuesta]=useState('')
    const [situacion, setSituacion]= useState('')
    const [adicional, setAdicional]= useState('0')
    const [car, setCar]=useState('')
    const [titular, setTitular] = useState('0') 
    const [carreraI, setCarrera]=useState({campo:'', valido:null})

    
    const buscarMat=(idm)=>{
      let [materia] =materias.filter(materia => materia.id_materia == idm)
      if(materia){
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


    useEffect(() => {

      if (dato) {
        setnroReg(dato.row_id)
        setlegajo(dato.legajo)
        setPropuesta(dato.car.toString()+dato.pl.toString())        
        setCarrera({campo:dato.car,valido:'true'})
        setMat({campo:dato.mat,valido:'true'})
        setPlan({campo:dato.pl,valido:'true'})

        setFechaB({campo:convertirFecha(dato.fechaBaja),valido:'true'})
        setResoA({campo:dato.nresa ,valido:'true'})
        setFechaA({campo:convertirFecha(dato.fechaAlta),valido:'true'})
        setTitular(dato.titular)
        document.getElementById('titular').value=dato.titular
        document.getElementById('adicional').value=dato.adic
        setSituacion(dato.adic)
      }
      
      if (materias) {
        setActividades(materias.filter(materia => materia.pl == 4))
        if(idmat){
          buscarMat(idmat)
        }else{
          setMatname('')
        }
      }
      
     
      
    }, [dato])
    

    //anular cargo

    const convertirFecha =(fe)=>{
      return fe.substring(6,10) + "-" + fe.substring(3,5) + "-" + fe.substring(0,2)
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


    //titularidad de catedra
    const changeTitular =()=>{
       
      setTitular(document.getElementById('titular').value)
     
  }
   //cambiar adicional
  const changeAdicional=()=>{
    Swal.fire({
      title: 'Cambio Adicional Cargo',
      text: 'Recuerde No cambiar la Adicional, si No ha eliminado el Adicional o se termino el mismo',
      icon: 'warning',
      showCancelButton: true,})
  
    setAdicional(document.getElementById('adicional').value)
   
  }
  
  
    //console.log(materias)
    //grabar cargo renovacion
    const updateCargo =async ()=>{
      
      let datosModi={

        fechalt:fechaA.campo,
        nresa:resoA.campo,
        fechbaj: fechaB.campo,
        pl:planI.campo,
        car:carreraI.campo,
        mat:matI.campo,
        titular:document.getElementById('titular').value,
        adic:adicional,
        st:dato.st!=='MR'?document.getElementById('situacion').value:'MR'
        
      }
console.log(datosModi)

        Swal
        .fire({
            title: `Agente Legajo:${legajo}`,
            text: `Grabar Modificación de Cargo Historico`,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: "Sí, Grabar",
            cancelButtonText: "Cancelar",
        })
        .then(resultado => {
            if (resultado.value) {
               modiCargo(nroReg,datosModi,2)
               funcion()
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
      
  const changePropuesta = ()=>{
    let prop= document.getElementById('propuesta').value.substring(0,1)
    let plan = document.getElementById('propuesta').value.substring(1,2)
    setActividades(materias.filter(materia=>materia.pl==plan && materia.car==prop))
    
    //console.log(prop)
    //setCarrera(prop)
    
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
               //navigate('/fichaAgente')
                  
                
            } else {
                // Dijeron que no
                
                
            }
        });
}
   
    /*
    const changeMat = () => {
      
      let materia = (document.getElementById('matecod').value).toString()
      
      setPlan(materia.substring(0,1))
      setMat(materia.substring(1,4))
      console.log(materia)
      //buscarMat(materia)
      
    }
    */
   
    

  return (
    <div className='container'>
          
          <div className='row'>

            <h2 style={{background:'grey'}}>Modificacion Datos Cargo Historico</h2>
              <div className="col-md-7">
                <div>
                  <h5>Colaborador: {nombre}</h5>
                </div>
              </div>
              <div className="col-md-2"></div>
              <div className="col-md-3">
                <div style={{width:'200px',marginRight:'5px'}}>
              
                    <button className='btn btn-danger' onClick={onHandleEliminar}>
                      Eliminar Cargo
                    </button>
                </div>   
                </div>
            </div>
          
          <div className="row">  
          
             <div className="col-md-12">
                <div style={{display:'flex'}}>
                    {propuesta.length > 5?<h6>Carrera: {propuesta}</h6>:null} - {matname.length > 5?<h6>Actividad: {matname} </h6>:null
                }
                </div>
                </div>
                  
          </div>
          
          <br/>
          <div className='row'>

            <div className='col-md-3'>

              <table className='table table-striped bordered'>
                <tbody>
                  <tr>
                    <td>Legajo</td> <td>{dato ? dato.legajo : "s/d"}</td>
                  </tr>

                  <tr>
                    <td>N°Cargo</td><td>{dato ? dato.nc : "s/d"}</td>
                  </tr>

                  <tr>
                    <td>Cargo</td> <td>{dato ? dato.ca : "s/d"}</td>
                  </tr>

                </tbody>
              </table>
            </div>

            <div className='col-md-3'>

              <table className='table table-striped bordered'>
                <tbody>


                  <tr>
                    <td>Claustro</td><td>{dato ? dato.es : "s/d"}</td>
                  </tr>

                  <tr>
                    <td>PPAL</td><td>{dato ? dato.ppal : "s/d"}</td>
                  </tr>

                  <tr>
                    <td>Nivel</td><td>{dato ? dato.nv : "s/d"}</td>
                  </tr>

                </tbody>
              </table>
            </div>



            <div className='col-md-3'>

              <table className='table table-striped bordered'>
                <tbody>

                  <tr>
                    <td>Carrera</td> <td>{dato ? dato.car : "s/d"}</td>
                  </tr>

                  <tr>
                    <td>Plan</td> <td>{dato ? dato.pl : "s/d"}</td>
                  </tr>

                  <tr>
                    <td>CodMat</td><td>{dato ? dato.mat : "s/d"}</td>
                  </tr>

                  <tr>
                    <td>Titular</td> <td>{dato ? dato.titular : "s/d"}</td>
                  </tr>


                  
                </tbody>
              </table>
            </div>

            <div className='col-md-3'>


              <table className='table table-striped bordered'>
                <tbody>

                  <tr>
                    <td>Fecha Alta</td> <td>{dato ? dato.fechaAlta : "s/d"}</td>
                  </tr>

                  <tr>
                    <td>N.Res.Alta</td> <td>{dato ? dato.nresa : "s/d"}</td>
                  </tr>
                  <tr>
                    <td>Fecha Baja</td> <td>{dato ? dato.fechaBaja : "s/d"}</td>
                  </tr>
                  <tr>
                    <td>Motivo Baja</td> <td>{dato ? dato.mb : "s/d"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

          <Formulario onSubmit={handleSubmit}>
                
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
                    name='fechaB'
                    infoplace='aaaa-mm-dd'
                    estado={fechaB}
                    cambiarEstado={setFechaB}
                    label='Fecha Baja '
                    leyendaErr='la fecha tiene que tener un formato como 2000-08-14'
                    expreg={expresiones.fechaB}
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
            
            
            
          <div style={{width:'200px',marginRight:'5px'}}>
              <br />
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

export default FormModificarDatosCargoH