import React,{useState,useEffect} from 'react'
import InputC from '../elementos/InputComponent'
import { useNavigate } from 'react-router-dom';


import { Formulario, LabelF, SelectorV } from '../styles-components/formularios/FormAgente'
//import { useGetMaterias } from '../hooks/useGetMaterias';
import Swal from 'sweetalert2';
import { darBajaCargo, grabarCargo, grabarCargoHistorico } from '../services/f_axioscargos';
import { useSelector } from 'react-redux';

const FormRenovacionCargo = ({dato, nrocargoG,funcion,materias,idmat}) => {

    const nombre = useSelector(state=>state.agente.nombre)
    const navigate = useNavigate()
    const expresiones = {
        resoA: /^[a-zA-Z0-9\_\ \-/]{4,20}$/, // Letras, numeros, guion y guion_bajo
        resoB: /^[a-zA-Z0-9\_\ \-/]{4,20}$/, // Letras, numeros, guion y guion_bajo

        // resolucionA: /^[,a-zA-ZÀ-ÿ\s]{1,50}$/, // Letras y espacios, pueden llevar acentos.
        fechaA:/^\d{4}([-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
        fechaB:/^\d{4}([-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
        fechaBN:/^\d{4}([-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
    }

    const [fechaA, setFechaA] = useState({campo:'', valido:null})
    const [fechaB, setFechaB] = useState({campo:'', valido:null})
    const [fechaBN, setFechaBN] = useState({campo:'', valido:null})
    const [resoA, setResoA]=useState({campo:'', valido:null})
    const [resoB, setResoB]=useState({campo:'', valido:null})
    const [nroReg, setnroReg] = useState(0)
    const [legajo, setlegajo] = useState('')
    
    const [plan, setPlan]=useState('')
    const [mat, setMat]=useState('')
    const [actividades, setActividades] = useState([])
    const [matname, setMatname] = useState('')
    const [propuesta, setPropuesta]=useState('')
    const [car, setCar]=useState('')
    

    const buscarMat=(idm)=>{
      let [materia] =materias.filter(materia => materia.id_materia == idm)
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
      // console.log(matname)
      //console.log(propuesta)
    }


    useEffect(() => {

      if (dato) {
        setnroReg(dato.row_id)
        setlegajo(dato.legajo)
        setFechaB({campo:convertirFecha(dato.fechaBaja),valido:'true'})
        setResoB({campo:dato.nresa ,valido:'true'})
      }
      if (materias) {
        setActividades(materias.filter(materia => materia.pl == 4))
        if(idmat){
          buscarMat(idmat)
        }else{
          setMatname('')
        }
      }
      
     
      
    }, [dato, materias,matname])
    

    //anular cargo

    const convertirFecha =(fe)=>{
      return fe.substring(6,10) + "-" + fe.substring(3,5) + "-" + fe.substring(0,2)
    }
   
    const darBajaC = async (tipoReno) => {
      let resu = await darBajaCargo(nroReg, legajo, tipoReno, resoB.campo,fechaB.campo)
      console.log(resu.statusText)
    }
  
    //console.log(materias)
    //grabar cargo renovacion
    const grabarNuevoCargo =async ()=>{
      let miCheckbox = document.getElementById('cp')
      let carrera=''
      let pl=''
      let matc=''
      let tprenovacion=''
      if(miCheckbox.checked){
        pl=plan
        matc=mat
        tprenovacion='14'
        carrera=car
      }else{
        pl=dato.pl
        matc=dato.mat
        tprenovacion='09'
        carrera=dato.car
      }
      //console.log(tprenovacion)
      let nrocg = nrocargoG[0].nroCg  
      let cargoNew ={
        legajo: dato.legajo,
        ncargo: dato.nc,
        sede: dato.inst,
        tcargo: dato.ca,
        claustro: dato.es,
        ppal: dato.ppal,
        nivel: dato.nv,
        adic: dato.adic,
        car:carrera,
        plan: pl,
        codmat: matc,
        fechaA: fechaA.campo,
        nroresA: resoA.campo,
        fechaB: fechaBN.campo,
        ncg: nrocg + 1,
        titu: dato.titular
        
      }
      let cargoHis={

        legajo: dato.legajo,
        ncargo: dato.nc,
        sede: dato.inst,
        tcargo: dato.ca,
        claustro: dato.es,
        ppal: dato.ppal,
        nivel: dato.nv,
        adic: dato.adic,
        car:dato.car,
        plan: dato.pl,
        codmat: matc,
        fechaA: convertirFecha(dato.fechaAlta),
        nroresA: dato.nresa,
        fechaB: fechaB.campo,
        nroresB:resoB.campo,
        ncg: nrocg,
        titu: dato.titular,
        sit:dato.st,
        motbj:tprenovacion
      }
        

        Swal
        .fire({
            title: `Agente Legajo:${cargoNew.legajo}`,
            text: `Grabar La Renovacion de Cargo`,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: "Sí, Grabar",
            cancelButtonText: "Cancelar",
        })
        .then(resultado => {
            if (resultado.value) {
                // Hicieron click en "Sí"
              //console.warn(cargoNew)
              //darBajaC(tprenovacion) 
              grabarCargo(cargoNew)
              grabarCargoHistorico(cargoHis,nroReg,legajo)
               // cerrarForm()
               funcion()
                  
                
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
        fechaBN.valido ==='true' &&
        resoB.valido === 'true'
        
        ) {
          
        grabarNuevoCargo()
      
     }else {
        Swal.fire({
            title: 'Informacion datos Cargo',
            text: 'Datos Incompletos o erroneos',
            icon: 'info',
            showCancelButton: true,})

    }

  }
      
      

  
   
    
    const changeMat = () => {
      let materia = (document.getElementById('materia').value).toString()
      setPlan(materia.substring(0,1))
      setMat(materia.substring(1,4))
      buscarMat(materia)
    }
   
    

  return (
    <div className='container'>
          <div className='row'>

            <h2> Renovacion de Cargo </h2>
            
          </div>

          <div>
            <h5>Colaborador: {nombre}</h5>
          </div>
          
          <div>
            {propuesta.length > 5?<h5>Carrera: {propuesta}</h5>:null}
          </div>
          <div>
            {matname.length > 5?<h5>Actividad: {matname} </h5>:null
            }
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
                    <td>Plan</td> <td>{dato ? dato.pl : "s/d"}</td>
                  </tr>

                  <tr>
                    <td>CodMat</td><td>{dato ? dato.mat : "s/d"}</td>
                  </tr>

                  <tr>
                    <td>Carrera</td> <td>{dato ? dato.car : "s/d"}</td>
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
                </tbody>
              </table>
            </div>

          </div>

          <Formulario onSubmit={handleSubmit}>
                
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

            <InputC 
                tipo='text'
                name='resoB'
                infoplace='Nro Resolucion de Baja'
                estado={resoB}
                cambiarEstado={setResoB}
                label='Nro.Resolición de Baja'
                leyendaErr='no menor de 4 y no mayor a 60 caracteres'
                expreg={expresiones.resoB}
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
                    name='fechaBN'
                    infoplace='aaaa-mm-dd'
                    estado={fechaBN}
                    cambiarEstado={setFechaBN}
                    label='Nueva Fecha Baja '
                    leyendaErr='la fecha tiene que tener unformato como 2000-08-14'
                    expreg={expresiones.fechaBN}
                />

              <div>
                <LabelF htmlFor='materia'>Actividad Academica</LabelF>
                <SelectorV name="materia" id='materia' onChange={changeMat}>
                  <option>Elegir Actividad</option>
                  {actividades ?
                    actividades.map((ele, index) => (
                      <option value={ele.id_materia} key={index}>({ele.id_materia}){ele.car}:{ele.materia}</option>
                    ))
                    : null}
                </SelectorV>

              </div>

              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="cp" />
                <label className="form-check-label">
                  Por Cambio Plan
                </label>
              </div>
              <div>
                <button type='submit' className='btn btn-primary'>
                  Grabar Renovacion
                </button>
              </div>

          </Formulario>

</div>
  )
}

export default FormRenovacionCargo