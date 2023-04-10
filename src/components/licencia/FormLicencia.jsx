import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useAgenteCargos } from '../../hooks/useAgenteCargos'

import axios from 'axios'

import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { CabTitulo } from '../../styles-components/formularios/FormAgente'
import { useFormik } from 'formik'//import es from 'date-fns/locale/es'
import LicenciaMuestra from './LicenciaMuestra'
import CabeceraFuncion from '../CabeceraFuncion'







const FormLicencia = ({agente,motivos}) => {
  const uri = 'http://200.12.136.74:4000/'
  //const uri = 'http://localhost:4000/'
 

  const [cargos,setCargos]=useState([])

 const [fechaini,setFechaini]=useState(new Date())
 const [fechafin,setFechafin]=useState(new Date())
 const [licencias, setLicencias] = useState([])

 


 useEffect(() => {

  const getLicencias = async ()=>{
    let strqry = `${uri}cargos/licenciasagente/${agente}`
    try {
        const res = await axios.get(strqry)
        setLicencias(res.data)         
    } catch (error) {
      
    }
  } 

    //traer licencias
     
     getLicencias()
     //document.getElementById('nroresu').value=''
     
     
 }, [agente]) 


 const values = {
  
  legajo: "",
  ncargo: "",
  ncgen:"",
  motivo: "",
  nr: "",
  fechaini: "",
  fechafin: "",
  nrores: ""
 }
  const {loading,error,cargosAgente} = useAgenteCargos()
 
   if(loading) return <p>Cargando datos .....</p>
     if(error) return <p>Error de Carga</p>  
  //console.log(motivos)
  //console.log(cargosAgente)
     
  

  const getLicencias = async ()=>{
    let strqry = `${uri}cargos/licenciasagente/${agente}`
    try {
        const res = await axios.get(strqry)
        setLicencias(res.data)         
    } catch (error) {
      
    }
  } 
   



 //
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

  let nroscargo=document.getElementById('cargo').value.split('/')
  values.fechaini= formatearfecha(fechaini)
  values.fechafin= formatearfecha(fechafin)
  values.legajo = agente
  values.motivo = mot
  values.ncargo = nroscargo[0]
  values.ncgen = nroscargo[1]
  values.nr=document.getElementById('habersn').value==='1'?'CG':'SG'
  values.nrores=document.getElementById('nroresu').value.trim()
  //console.log(values)
  let urlpost=`${uri}cargos/cargarlicencia`
  axios.post(urlpost,values)
  
  .then((response)=>{
    Swal.fire({
      title: "Registro Licencia",
      icon: "success",
      
    });
      setLicencias([])
      getLicencias()
  })
  .catch((error)=>{
    Swal.fire({
      title: "Registro Licencia",
      text:error,
      icon: "error",
      
    });
  })
  
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

                <div className='col-md-4'>
                  <label className='h5'> Cargo </label>
                  <select id="cargo" className='form-control'>
                    {cargosAgente.map((ele,index)=>(
                  <option key={index} value={ele.nc + '/' + ele.ncg}>NC:{ele.nc} - CA:{ele.ca} - PPAL:{ele.ppal} - NV:{ele.nv} - IdMAT:{ele.pl}{ele.mat}</option>
                    ))}
      
                  </select>  
                
                  <br/>
                    <label className='h5'> Motivo </label>
                    <select id="motivo" className='form-control'>
                    {motivos.map((ele,index)=>(
                    <option key={index} value={ele.codina}>{ele.codina} - {ele.Motivo}</option>
                    ))}
                   </select>  
                
                <br/>
                   <label className='h5'> Afectación de Haberes </label>
                    <select id="habersn" className='form-control'>
                    <option value='1'>Sin Afectación de Haberes</option>
                    <option value='2'>Con Afectación de Haberes</option>
                    </select>

                </div> 

                     

                <div className='col-md-2'></div>
           
            

              <div className='col-md-3'>      
                 <label className='h5'>Nro.Resolu</label>
                 <input
                  className='form-control'
                  type="text" 
                  id="nroresu"
                  name="nroresu"
                  placeholder='Ingrese Resolucion'
                  
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
              
              <div className='col-md-2'>
                <div style={{marginTop:'15px',marginLeft:'15px'}}>
                <button  type='buttom'  className='btn btn-primary' style={{marginTop:20}} onClick={grabarDatos}>
                    Grabar Licencia
                </button>    
                </div>
              </div>       
          </div>    

        
    </form>           
    </div>

  <br/>
  <CabTitulo style={{marginLeft:'10px'}}>Licencias Registradas</CabTitulo>
<div className="row" id="licencialist">
    
    
    
      {licencias.length > 0  ? <LicenciaMuestra licenciasag={licencias}/>: null} 
  
  </div>
</>
  )
}

export default FormLicencia