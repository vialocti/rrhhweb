import React, { useState,useEffect } from 'react'
import axios from 'axios'
import '../css/FindPage.css'






const FindPage = ({tppage}) => {
const uri = 'http://200.12.136.74:4000/hcd/'
//const uri = 'http://localhost:4000/hcd/'

//const [pagem, setPgem] = useState(0)
const [ruta, setRuta] = useState(`${uri}consultamv/1/003/4`)

//const [urlsec, setUrlsec] = useState('')
const [materiasvg, setMateriasvg] = useState([])
const [matdocentes, setMatdocentes] = useState([])
const [mat, setMat] = useState('')

useEffect(()=>{
    //setPgem(1) 
    //console.log(matdocentes.length)
    const getMaterias = async ()=>{
         try{
             const res = await axios.get(ruta)
             setMateriasvg(res.data)
             VerDocentes()
         }catch(error){
             console.log(error)
         }
    } 
    
 
    getMaterias()
 
 },[ruta])
 
 
 const actualizarhoraconsu = async (urlhd) =>{
     let urld = `${uri}consultam/${urlhd}`
     console.log(urld)
     try{
     const res = await axios.get(urld)
     setMatdocentes(res.data)
     //await setMat(materiasvg[0].materia)
     }catch(error){
         console.log(error)
     }
 
 } 
 
 const VerDocentes = ()=>{
     /*var control='A';
     if(!tppage){
     control = document.getElementById('pass').value
     }
     if (tppage || !tppage && control==='fceuncu'){
         */
     setMatdocentes([])
     let sede= document.getElementById('sede').value
     let carrera = document.getElementById('carrera').value
     let plan ='' //document.getElementById('plan').value
     if(carrera==='007' || carrera==='006'){
        plan ='1'
     }else{
        plan='4'
     }
     let mat = document.getElementById('mat')
     //if (mat.options[mat.selectedIndex].text){
     
     
    try{
       if(document.getElementById('mat').length){ 
        let materia =mat.options[mat.selectedIndex].text
       
        setMat(materia)
     
        let urlhd = sede +'/' +carrera + "/" + plan + "/" + document.getElementById('mat').value 
     //console.log(urlhd)
     
 
         actualizarhoraconsu(urlhd)
     
       }
     }catch(error){
         console.log(error)
     }
     
    //}
 }
 
 const mostrarPage = ()=>{
     //setPgem(0)
     setMatdocentes([])
     let sede= document.getElementById('sede').value
     let carrera = document.getElementById('carrera').value
     let plan ='' //document.getElementById('plan').value
     if(carrera==='007' || carrera==='006'){
        plan ='1'
     }else{
        plan='4'
     }
 
     let url = uri + 'consultamv/' + sede + '/' + carrera + '/' + plan
     console.log(url)
     //setUrlsec(sede + '/' + carrera + '/' + plan)
     setRuta(url)
    
 }
 
    return (

                 
        <div>
            <hr/>
            <div className="row">
                <div className="col-md-2 col-xs-12">
                    <label htmlFor="sede">SEDE</label>
                    <select className="form-select" name="sede" id="sede" onChange={mostrarPage}>
                            <option value="1"> Sede Mendoza</option>
                            <option value="2"> Sede San Rafael</option>
                            <option value="3"> Sede Gral Alvear</option>
                            <option value="4"> Sede Este</option>
                    
                    </select>
                </div>

                <div className="col-md-3 col-xs-12">
                    <label htmlFor="carrera">Carrera</label>
                    <select className="form-select" name="carrera" id="carrera" onChange={mostrarPage}>
                            <option value="003">Licenciatura en Administración</option>
                            <option value="004">Licenciatura en Economía</option>
                            <option value="006">LNRG</option>
                            <option value="007">Licenciatura en Logistica</option>
                            <option value="008">Contador Público</option>
                        
                    </select>
                </div>
        {/** 
                <div className="col-md-2 col-xs-12">
                    <label htmlFor="plan"> Plan</label>
                    <select className="form-select" name="plan" id="plan" onChange={mostrarPage}>
                            <option value="3">Plan 98</option>
                            <option value="4">Plan 19</option>
                    </select>
                </div>
      */}
                    
                <div className="col-md-4 col-xs-12">
                    <label htmlFor="mat">Actividad</label>
                    <select className="form-select" name="mat" id="mat" onChange={VerDocentes}>
                               
                        {
                                materiasvg.map((ele,ind)=>
                                <option key={ind} value={ele.id_mat}>{ele.id_mat} - {ele.materia}</option>
                         )}
                    </select>
                </div>  
                
                <div className="col-md-1 col-xs-12">
                        
                        {materiasvg.length > 0?<div>
                        <label htmlFor="buscar">{tppage?"Card":"Table"}</label>
                {/* <button className="btn btn-primary" onClick={VerDocentes} name="buscar">Buscar</button> */}       
                        </div>:null}
                </div>
    
            <div>
             
    </div>
    
         <div className="cuerpo">
        
        </div>
    </div>    
    </div> 

)
}      
export default FindPage

