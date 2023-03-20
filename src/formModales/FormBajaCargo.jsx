import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import InputC from '../elementos/InputComponent'
import { useGetMaterias } from '../hooks/useGetMaterias'
import { darBajaCargo } from '../services/f_axioscargos'
import { Formulario, Label, SelectorV } from '../styles-components/formularios/FormAgente'

const FormBajaCargo = ({dato,funcion,materias,idmat}) => {


    const nombre = useSelector(state=>state.agente.nombre)
    

    const navigate = useNavigate()
    const expresiones = {
        
        resoB: /^[a-zA-Z0-9\_\ \-/]{4,20}$/, // Letras, numeros, guion y guion_bajo
        // resolucionA: /^[,a-zA-ZÀ-ÿ\s]{1,50}$/, // Letras y espacios, pueden llevar acentos.
        fechaB:/^\d{4}([-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
        
    }


    const [fechaB, setFechaB] = useState({campo:'', valido:null})
    const [resoB, setResoB]=useState({campo:'', valido:null})
    const [nroReg, setnroReg] = useState(0)
    const [legajo, setlegajo] = useState('')
    const [matname,setMatname] = useState('')
    const [motivoB,setMotivoB] =useState('')
    const [propuesta, setPropuesta]=useState('')

    const buscarMat=(idm)=>{
        let [materia] =materias.filter(materia => materia.id_materia == idm)
        setMatname(materia.materia)
        if(materia.car ===2){
            setPropuesta('CONTADOR PUBLICO NACIONAL')
          }else if(materia.car === 3){
            setPropuesta('LICENCIATURA EN ADMINISTRACION')
          }else if(materia.car === 4){
            setPropuesta('LICENCIATURA EN ECONOMIA')
          }else if(materia.car === 6){
            setPropuesta('CICLO LIC.EN NEGOCIOS REGIONALES')
          }else if(materia.car === 7){
            setPropuesta('LICENCIATURA EN LOGISTICA')
          }else if(materia.car === 8){
            setPropuesta('CONTADOR PUBLICO')
          }
        
      }

      const changemotivo = () => {
        setMotivoB(document.getElementById('motibaja').value)
    
      }
      const convertirFecha =(fe)=>{
        return fe.substring(6,10) + "-" + fe.substring(3,5) + "-" + fe.substring(0,2)
      }

    useEffect(() => {
        if (dato) {
            setnroReg(dato.row_id)
            setlegajo(dato.legajo)
            setFechaB({campo:convertirFecha(dato.fechaBaja),valido:'true'})
            setResoB({campo:dato.nresa ,valido:'true'})
          }
          if (materias) {
            if(idmat){
              buscarMat(idmat)
            }else{
              setMatname('')
            }
          }
      
    }, [dato, materias,matname])
   
    
    
    
    const darBaja = async () => {
        let resu = await darBajaCargo(nroReg, legajo, motivoB, resoB.campo, fechaB.campo)
        funcion()
      }
    

      const preparardatosnuevos = () => {


        Swal
          .fire({
            title: `Agente Legajo:${legajo}`,
            text: `Dar de Baja el Cargo`,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: "Sí? ",
            cancelButtonText: "Cancelar",
          })
          .then(resultado => {
            if (resultado.value) {
              // Hicieron click en "Sí"
              darBaja()
    
    
    
            } else {
              // Dijeron que no
    
    
            }
          });
    
      } 

    const handleSubmit =(e)=>{


        e.preventDefault()
        if(
           
          fechaB.valido === 'true' && 
          resoB.valido === 'true' &&
          motivoB !== ''
          
          ) {
            
          preparardatosnuevos()
        
       }else {
          Swal.fire({
              title: 'Informacion datos Cargo',
              text: 'Datos Incompletos o erroneos',
              icon: 'info',
              showCancelButton: true,})
  
      }
  
    }


    
    


  return (

    <div className='container'>
    <div className='row'>

      <h2>Baja de Cargo </h2>
      
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
              <td>Adicional</td> <td>{dato ? dato.ad : "s/d"}</td>
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
        
        <div>
            
            <Label>Motivo Baja</Label>
              <div className="form-group">
                <SelectorV name="motibaja" id='motibaja' onChange={changemotivo}>
                  <option value="">Elija Opción</option>  
                  <option value="01">Término de Funciones</option>
                  <option value="02">Renuncia</option>
                  <option value="03">Cesantia</option>
                  <option value="04">Prescindibilidad</option>
                  <option value="05">Exoneración</option>
                  <option value="06">Jubilación</option>
                  <option value="07">Traslado</option>
                  <option value="08">Edad límite</option>
                  <option value="10">Fallecimiento</option>

                </SelectorV>
        </div>
        </div>
        
        <div>     
        <button type='submit' className='btn btn-primary'>
                Grabar Baja          
            </button>
        </div>

    </Formulario>

</div>
    
  )
}

export default FormBajaCargo