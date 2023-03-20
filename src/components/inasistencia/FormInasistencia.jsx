import React,{useState, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'

import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
//import es from 'date-fns/locale/es'

import Swal from 'sweetalert2'
import InasistenciaMuestra from './InasistenciaMuestra'
import { CabTitulo } from '../../styles-components/formularios/FormAgente'

//esquema de validacion
const SchemaYup = yup.object({
  motivo:yup.number().positive().required(),
  fechaIni: yup.date().required(),
  fechaFin:yup.date(),
  nroresu:yup.string().required()
})

const FormInasistencia = ({agente, motivos}) => {
  const uri = 'http://200.12.136.74:4000/'
  //const uri = 'http://localhost:4000/'
  const {register,formState:{errors}} =useForm({
   resolver:yupResolver(SchemaYup)
 })

 // const [cargos, setCargos] = useState([])
 const [inasistencias, setInasistencias] = useState([])
 const [fechaini,setFechaini]=useState(new Date())
 const [fechafin,setFechafin]=useState(new Date())
 


 const values = {
  
  legajo: "",
  ncargo: "",
  motivo: "",
  nr: "1",
  fechaini: "",
  fechafin: "",
  nrores: ""
 }
 
   
 
 useEffect(() => {

  const getInasistencias = async ()=>{
    let strqry = `${uri}cargos/inasistenciasagente/${agente}`
    try {
        const res = await axios.get(strqry)
        setInasistencias(res.data)         
    } catch (error) {
      
    }
  } 

      
     /* traer cargos de agente
     const getCargos = async  () => {
      let str= `${uri}cargos/cargosvigentes/${agente}`
      try{
        const res = await axios.get(str)
        await setCargos(res.data)
        
        
    }catch(error){
        console.log(error)
    }
    }
    */
    //traer inasistencias
  



     // getCargos()
     getInasistencias()
     document.getElementById('nroresu').value=''
    
     
 }, [agente])
 

 
 const getInasistencias = async ()=>{
  let strqry = `${uri}cargos/inasistenciasagente/${agente}`
  try {
      const res = await axios.get(strqry)
      setInasistencias(res.data)         
  } catch (error) {
    
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

const grabarDatos=(e)=>{
  e.preventDefault()
  if (fechafin-fechaini < 0){
    alert('La fecha Final no puede ser menor a la fecha inicial')
  }else if (document.getElementById('nroresu').value.trim()===''){
    alert('el nro de resolucion no puede ser vacio')
  }else{
    //console.log(document.getElementById('motivo').value)
    let mot=''
    if(document.getElementById('motivo').value < 10 ){
      mot ='0' + document.getElementById('motivo').value  
    }else{
      mot = document.getElementById('motivo').value 
    }
  values.fechaini= formatearfecha(fechaini)
  values.fechafin= formatearfecha(fechafin)
  values.legajo=agente
  values.motivo= mot
  values.ncargo = 999
  values.nr=document.getElementById('habersn').value
  values.nrores=document.getElementById('nroresu').value.trim()
  //console.log(values)
  let urlpost=`${uri}cargos/cargarinasistencia`
  axios.post(urlpost,values)
  .then((response)=>{
    Swal.fire({
      title: "Registro Inasistencia",
      icon: "success",
      
    });
      setInasistencias([])
      getInasistencias()
  })
  .catch((error)=>{
    Swal.fire({
      title: "Registro Inasistencia",
      text:error,
      icon: "error",
      
    });
  })
  }
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
                <label className='h5'> Motivo </label>
                <select id="motivo" className='form-control'>
                  {motivos.map((ele,index)=>(
                      <option key={index} value={ele.codina}>{ele.Motivo}</option>
                    ))}
            

                </select>  
            
                <label className='h5'>Nro.Resolu</label>
                  <input
                      className='form-control'
                      type="text" 
                      id="nroresu"
                      name="nroresu"
                      placeholder='Ingrese Resolucion'
                      {...register("nroresu")}
                  />     
                          
              </div>
            
              <div className="col-md-3">
                <div style={{marginBottom:10}}>
                  <label className='h5'> Fecha Inicio </label>
                  <ReactDatePicker 
                    id='fechaini' 
                    selected={fechaini}
                    onChange={onChangeFi}
                    locale="es" className='pickers' dateFormat='dd-MM-yyyy'
                    style={{margin:'10px'}}        
                  />
                </div>
                <div>
                  <label className='h5'> Fecha Finalizacion </label>
                  <ReactDatePicker
                    id='fechafin' 
                    selected={fechafin}
                    onChange={onChangeFf}
                    locale="es" className='pickers' dateFormat='dd-MM-yyyy'
                  />
                 </div>
           
              </div>    

            <div className="col-md-5">       
            
              <label className='h5'> Afectación de Haberes </label>
                <select id="habersn" className='form-control'>
                              <option value='1'>Sin Afectación de Haberes</option>
                              <option value='2'>Con Afectación de Haberes</option>

                </select>  
                

                 
                  
                <button  type='buttom'  className='btn btn-primary' style={{marginTop:20}} onClick={grabarDatos}>
                    Grabar Inasistencia
                </button>    

            </div>     
          
          </div>
          
          </form>           
          </div>
 
        <br/>
        <CabTitulo style={{marginLeft:'10px'}}>Inasistencias Registradas</CabTitulo>
        <div className="row" id="inasistencialist">
          
          
          
            {inasistencias.length > 0  ? <InasistenciaMuestra inasistenciasag={inasistencias}/>: null} 
        </div>
    </>
  )
}

export default FormInasistencia