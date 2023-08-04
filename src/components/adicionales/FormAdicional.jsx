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
 const [historicos, setHistoricos] = useState(false)
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
  vigente:"",
  ncg:"",
  ppal:"",
  nv:"",
  row_id:""
 }

 //const nroregistroC=''
  const {loading,error,cargosAgente,cargoshAgente} = useAgenteCargos()
 
   if(loading) return <p>Cargando datos .....</p>
    if(error) return <p>Error de Carga</p>  
   


const modiFicaCargo =async (id,datosModi,archi)=>{
    //console.log(id,datosModi,archi)
    const resu = await modiCargo(id,datosModi,archi)
  
  if (resu.status===200){
    console.log('oooooo')
    setAdicionalAg([])
    getAdicional()
  }
}

const grabarDatos = async(e)=>{
  e.preventDefault()
  let ta=1
  if (fechafin-fechaini < 0){
    alert('La Fecha Final no puede ser menor a la Fecha Inicial')
  }else if (document.getElementById('nroresu').value.trim()===''){
    alert('El Nro de Resolución no puede ser vacio')
  }else{
  let nroscargo=document.getElementById('cargo').value.split('/')
  console.log(nroscargo)
  let id = nroscargo[2]
  values.row_id=nroscargo[2]
  values.ppal=nroscargo[3]
  values.nv=nroscargo[4]
  values.ncg = nroscargo[1]
  values.fecha_inicio= formatearfecha(fechaini)
  values.fecha_fin= formatearfecha(fechafin)
  values.legajo = agente
  values.nc = nroscargo[0]
  values.tipoA= document.getElementById('motivo').value
  values.nrores=document.getElementById('nroresu').value.trim()
  values.observacion=document.getElementById('observa').value.trim()
  values.vigente="S"

  console.log(values)
  const resu = await grabarAdicionalFC(values)
  
  if(resu.status===200){
    const datosModi={
      adic:document.getElementById('motivo').value
    }
  
   if(historicos) {
     ta=2
   }else{
     ta=1
    }
    modiFicaCargo(id,datosModi,ta)
  }else{
    console.log(resu.status)
  }
  
}

}

const onHandleChangeHis=()=>{
  let valueH=document.getElementById('cargosh').value==='2'?true:false
  
  setHistoricos(valueH) 
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
        
         <div className='card' style={{padding:3}}>
         <form >
          
             
            <div className="row">
                <div className="col-md-4">
                {!historicos
                   ?<> 
                  <label className='h5'> Cargos Vigentes </label>
                  <select id="cargo" className='form-control'>
                    {cargosAgente.map((ele,index)=>(
                  <option key={index} value={ele.nc + '/' + ele.ncg + '/' + ele.row_id + '/' + ele.ppal + '/' + ele.nv}>NC:{ele.nc} - CA:{ele.ca} - PPAL:{ele.ppal} - NV:{ele.nv} - IdMAT:{ele.pl}{ele.mat}</option>
                    ))}
      
                  </select>
                  </>  
                  :<>
                  <label className='h5'style={{'color':'red'}}> Cargos Historicos </label>
                  <select id="cargo" className='form-control'>
                    {cargoshAgente.map((ele,index)=>(
                  <option key={index} value={ele.nc + '/' + ele.ncg + '/'+ ele.row_id + '/'+ ele.ppal + '/' + ele.nv}>NC:{ele.nc} - CA:{ele.ca} - PPAL:{ele.ppal} - NV:{ele.nv} - IdMAT:{ele.pl}{ele.mat}</option>
                    ))}
      
                  </select>  
                  </>
                  }
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
              <label className='h5'> Cargos Historicos ? </label>
                    <select id="cargosh" className='form-control' onChange={onHandleChangeHis}>
                    <option value='1'>NO</option>
                    <option value='2'>SI</option>
                </select> 
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
    </div>

  <br/>
  <CabTitulo>Adicionales Registrados</CabTitulo>

 <div className="row">
    
      {adicionalAg.length > 0  ? <AdicionalMuestra adicionalAg={adicionalAg}/>: null} 
  
  </div>
</>
  )
}

export default FormAdicional