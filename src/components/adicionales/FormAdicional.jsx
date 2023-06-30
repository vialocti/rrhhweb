import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useAgenteCargos } from '../../hooks/useAgenteCargos'

import axios from 'axios'

import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { CabTitulo } from '../../styles-components/formularios/FormAgente'
import { getAdicionalAgente, grabarAdicionalFC, modiCargo } from '../../services/f_axioscargos'
import AdicionalMuestra from './AdicionalMuestra'
//import { useFormik } from 'formik'//import es from 'date-fns/locale/es'
//import LicenciaMuestra from './LicenciaMuestra'
//import CabeceraFuncion from '../CabeceraFuncion'







const FormAdicional = ({agente}) => {
  //const uri = 'http://200.12.136.74:4000/'
  //const uri = 'http://localhost:4000/'
 

  //const [cargos,setCargos]=useState([])

 const [fechaini,setFechaini]=useState(new Date())
 const [fechafin,setFechafin]=useState(new Date())
 const [adicionalAg, setAdicionalAg] = useState([])
 //const [nroid, setNroid]= useState(0)
 



 const getAdicional = async ()=>{
   
    
  try {
      const resp = await getAdicionalAgente(agente)
      setAdicionalAg(resp)         
  } catch (error) {
  console.log(error)  
  }
} 


 useEffect(() => {

  
    //traer adicionales
     
     getAdicional()
     //document.getElementById('nroresu').value=''
     
     
 }, [agente]) 


 const values = {
  
  legajo: "",
  nc: "",
  fecha_inicio: "",
  fecha_fin: "",
  tipoA:"",
  nrores:"",
  observacion: "",
  vigente:""
 }

 //const nroregistroC=''
  const {loading,error,cargosAgente} = useAgenteCargos()
 
   if(loading) return <p>Cargando datos .....</p>
    if(error) return <p>Error de Carga</p>  
   


const modiFicaCargo =async (id,datosModi)=>{
  
  
  const resu = await modiCargo(id,datosModi,1)
  if (resu.status===200){
    console.log('oooooo')
    setAdicionalAg([])
    getAdicional()
  }
}

const grabarDatos = async(e)=>{
  e.preventDefault()

  if (fechafin-fechaini < 0){
    alert('La Fecha Final no puede ser menor a la Fecha Inicial')
  }else if (document.getElementById('nroresu').value.trim()===''){
    alert('El Nro de Resolución no puede ser vacio')
  }else{
  let nroscargo=document.getElementById('cargo').value.split('/')
  let id = nroscargo[1]
  values.fecha_inicio= formatearfecha(fechaini)
  values.fecha_fin= formatearfecha(fechafin)
  values.legajo = agente
  values.nc = nroscargo[0]
  values.tipoA= document.getElementById('motivo').value
  values.nrores=document.getElementById('nroresu').value.trim()
  values.observacion=document.getElementById('observa').value.trim()
  values.vigente="S"

  //console.log(values)
  const resu = await grabarAdicionalFC(values)
  
  if(resu.status===200){
    const datosModi={
      adic:document.getElementById('motivo').value
    }
   modiFicaCargo(id,datosModi)
  }
  
  }

}

 
const formatearfecha = (fecha)=>{

  var anio = fecha.getFullYear()
  var mes = fecha.getMonth()+1 
  var dia = fecha.getDate()

  if (dia < 10 ){
    dia = "0" + dia
  }
  if(mes < 10){
    mes = "0" + mes
  }
 // console.log(anio,mes,anio)
  return anio + '-' + mes + '-' + dia

}

const onChangeFi = (fecha)=>{
  setFechaini(fecha) 
  setFechafin(fecha)
}

const onChangeFf = (fecha)=>{
 
 setFechafin(fecha)
 
 
}

  return (
    <>
    
       <div className='container'>
        
         <form>
          
             
            <div className="row">
                <div className="col-md-4">
                      <label className='h5'> Cargo </label>
                      <select id="cargo" className='form-control'>
                        {cargosAgente.map((ele,index)=>(
                      <option key={index} value={ele.nc + '/' + ele.row_id}>NC:{ele.nc} - CA:{ele.ca} - PPAL:{ele.ppal} - NV:{ele.nv} - IdMAT:{ele.pl}{ele.mat}</option>
                        ))}
          
                      </select>
                     <br/>
                      <label className='h5'> Adicional </label>
                      <select id="motivo" className='form-control'>
                        <option value="1">Función Crítica Docente</option>
                        <option value="2">Función Crítica No Docente</option>
                        <option value="3">Función Crítica Gestión</option>
                      </select>  
                      
                     <br/>
                      <label className='h5'>Observaciones</label>
                      <input
                        className='form-control'
                        type="text" 
                        id="observa"
                        name="observa"
                        placeholder='Ingrese Observacion'
                        
                      />

                </div>
                <div className="col-md-1"></div>
                <div className="col-md-4">

                <label className='h5'>Nro. Resolución</label>
                      <input
                        className='form-control'
                        type="text" 
                        id="nroresu"
                        name="nroresu"
                        placeholder='Ingrese Nro. Resolución'
                        
                      />
           

                <div style={{marginTop:'25px'}}>
                <label className='h5'> Fecha Inicio </label>
                <ReactDatePicker 
                  id='fechaini' 
                  selected={fechaini}
                  onChange={onChangeFi}
                  locale="es" className='pickers' dateFormat='dd-MM-yyyy'
                          
                />
                </div>
              
              
                <div style={{marginTop:'30px'}}>
                <label className='h5'> Fecha Finalizacion </label>
                <ReactDatePicker
                  id='fechafin' 
                  selected={fechafin}
                  onChange={onChangeFf}
                  locale="es" className='pickers' dateFormat='dd-MM-yyyy'
                />
                </div>
             
              </div>
              <div className="col-md-3">
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />  
                <div style={{marginTop:'15px',marginLeft:'15px'}}>
                  <button  type='buttom'  className='btn btn-primary' style={{marginTop:20}} onClick={grabarDatos}>
                      Grabar Adicional
                  </button>    
                </div>
              </div>

            </div> 

            
                     
              

        
    </form>           
    </div>

  <br/>
  <CabTitulo style={{marginLeft:'10px'}}>Adicionales Registrados</CabTitulo>

 <div className="row">
    
      {adicionalAg.length > 0  ? <AdicionalMuestra adicionalAg={adicionalAg}/>: null} 
  
  </div>
</>
  )
}

export default FormAdicional