import React,{useState,useEffect} from 'react'
import InputC from '../elementos/InputComponent'
//import { useNavigate } from 'react-router-dom';


import { Formulario, LabelF, SelectorV } from '../styles-components/formularios/FormAgente'
//import { useGetMaterias } from '../hooks/useGetMaterias';
import Swal from 'sweetalert2';
import { modiCargo,grabarCargo } from '../services/f_axioscargos';
import { useSelector } from 'react-redux';
//import { modiCargo } from '../services/f_axioscargos';


const FormCargoMayorResponzabilidad = ({dato,modifica, nrocargoG,funcion}) => {

    const nombre = useSelector(state=>state.agente.nombre)
    //const navigate = useNavigate()
    const expresiones = {
        resoA: /^[a-zA-Z0-9\_\ \-/]{4,20}$/, // Letras, numeros, guion y guion_bajo
        //resoB: /^[a-zA-Z0-9\_\ \-/]{4,20}$/, // Letras, numeros, guion y guion_bajo

        // resolucionA: /^[,a-zA-ZÀ-ÿ\s]{1,50}$/, // Letras y espacios, pueden llevar acentos.
        fechaA:/^\d{4}([-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
        //fechaB:/^\d{4}([-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
        fechaBN:/^\d{4}([-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
    }

    const [fechaA, setFechaA] = useState({campo:'', valido:null})
    //const [fechaB, setFechaB] = useState({campo:'', valido:null})
    const [fechaBN, setFechaBN] = useState({campo:'', valido:null})
    const [resoA, setResoA]=useState({campo:'', valido:null})
    //const [resoB, setResoB]=useState({campo:'', valido:null})
    const [nroReg, setnroReg] = useState(0)
    const [legajo, setlegajo] = useState('')
    const [nivel, setNivel]= useState('7')
    
    

    
    useEffect(() => {

      if (dato) {
        setnroReg(dato.row_id)
        setlegajo(dato.legajo)
        //setFechaB({campo:convertirFecha(dato.fechaBaja),valido:'true'})
        //setResoB({campo:dato.nresa ,valido:'true'})
      }
      
     
      
    }, [dato])
    

    //anular cargo

    

    const verificarfechas=(falta,fbajan)=>{
        if(falta >= fbajan){
          alert('La Fecha de baja no puede ser menor o igual a la fecha de Alta')
          return false
        }else{
          
          return true
        }
    }
   
    const updateCargo = async () => {
          const datos= {
            st:'SG'
          }
        
        await modiCargo(nroReg, datos, 1)
        modifica()
        funcion()
    }
  
    //console.log(materias)
    //grabar cargo renovacion

    const grabar= async (cargosNew)=>{
        const resu = await grabarCargo(cargosNew) 
        
    }
    const grabarNuevoCargo =()=>{
      //let miCheckbox = document.getElementById('cp')
      let carrera=''
      let pl=''
      let matc=''
      pl=dato.pl
      matc=dato.mat
      carrera=dato.car
      
      //console.log(tprenovacion)
      let nrocg = nrocargoG[0].nroCg  
      let cargoNew ={
        legajo: dato.legajo,
        ncargo: dato.nc,
        sede: dato.inst,
        tcargo: '11',
        claustro: dato.es,
        ppal: dato.ppal,
        nivel: nivel,
        adic: dato.adic,
        st:'',
        car:carrera,
        plan: pl,
        codmat: matc,
        fechaA: fechaA.campo,
        nroresA: resoA.campo,
        fechaB: fechaBN.campo,
        ncg: nrocg + 1,
        titu: dato.titular,
        rempl:dato.rempla
        
      }
      
        

        Swal
        .fire({
            title: `Agente Legajo:${cargoNew.legajo}`,
            text: `Grabar Cargo M.Responzabilidad`,
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
              grabar(cargoNew)
              //console.log(resu.statusText)
              
               updateCargo()
               // cerrarForm()
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
        
        resoA.valido ===  'true' &&
        fechaBN.valido ==='true' &&
        
        verificarfechas(fechaA.campo, fechaBN.campo)
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
      
      

  
   
    
    const changeNivel = () => {
      let nv = document.getElementById('nv').value
      setNivel(nv)
          }
   
          const cerrar =()=>{
    
            //setValores()
            funcion()
          }

  return (
    <div className='container'>
          <div className='row'>
             <div className="col-md-8">
             <h2> Alta Cargo Por Mayor Responzabilidad </h2>
             </div>
             <div className="col-md-3"></div>
             <div className="col-md-1">
             <button  onClick={cerrar} className='btn btn-info'>
                  Cerrar
              </button>
             </div>
            
            
          </div>
        <div className="row">
          <div>
            <h6>Colaborador: {nombre}, legajo: {legajo}</h6>
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
                    name='fechaA'
                    infoplace='aaaa-mm-dd'
                    estado={fechaA}
                    cambiarEstado={setFechaA}
                    label='Fecha Alta Resolucion'
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
                    name='fechaBN'
                    infoplace='aaaa-mm-dd'
                    estado={fechaBN}
                    cambiarEstado={setFechaBN}
                    label='Fecha Baja Resolución'
                    leyendaErr='la fecha tiene que tener unformato como 2000-08-14'
                    expreg={expresiones.fechaBN}
                />

              <div>
                <LabelF htmlFor='nv'>Nivel Cargo</LabelF>
                <SelectorV name="nv" id='nv' onChange={changeNivel}>
                  <option value="01">Cat.1</option>
                  <option value="02">Cat.2</option>
                  <option value="03">Cat.3</option>
                  <option value="04">Cat.4</option>
                  <option value="05">Cat.5</option>
                  <option value="06">Cat.6</option>
                  <option value="07">Cat.7</option>
                  
                </SelectorV>

              </div>

             
              <div >
                <br />
                <button type='submit' className='btn btn-primary'>
                  Grabar Cargo
                </button>
              </div>

          </Formulario>

</div>
  )
}

export default FormCargoMayorResponzabilidad