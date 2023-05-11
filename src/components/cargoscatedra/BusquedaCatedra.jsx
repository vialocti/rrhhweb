import React,{useState,useEffect} from 'react'
import { getCatedrasDoc, getMaterias } from '../../services/f_axiosconsulta'
import MostrarDatosCatedra from './MostrarDatosCatedra'





const BusquedaCatedra = () => {

    const [materias, setMaterias]= useState([])
    const [docentescat, setDocentescat]= useState([])
    const [sede, setSede]=useState(1)
    const [carrera, setCarrera]=useState(2)


    useEffect(()=>{
        //console.log(materias)
    },[materias,docentescat])

    const mostrarPage = async ()=>{
        setSede(document.getElementById('sede').value)
        let carrer = document.getElementById('carrera').value
        setCarrera(carrer)
        //let idmat=document.getElementById('mat').value
        let plan =document.getElementById('plan').value
        setMaterias(await getMaterias(carrer,plan))
        //console.log(carrera,plan)
    }

    const verCatedra = async ()=>{
        let idmat=document.getElementById('mat').value
        setDocentescat(await getCatedrasDoc (sede, carrera, idmat, 'C'))
    }


    return (
    <div className='container'>
    
    <div className="row">
        <br/>
        <div className="col-md-2 col-xs-12">
            <label htmlFor="sede">Sede</label>
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
                    <option value="2">Contador Público Nacional</option>
                    <option value="3">Licenciatura en Administración</option>
                    <option value="4">Licenciatura en Economía</option>
                    <option value="6">LNRG</option>
                    <option value="7">Licenciatura en Logistica</option>
                    <option value="8">Contador Público</option>
                
            </select>
        </div>

        <div className="col-md-2 col-xs-12">
            <label htmlFor="plan"> Plan</label>
            <select className="form-select" name="plan" id="plan" onChange={mostrarPage}>
                    <option value="1">Plan 1 LLO-LNRG</option>
                    <option value="3">Plan 98</option>
                    <option value="4">Plan 19</option>
            </select>
        </div>

            
        <div className="col-md-4 col-xs-12">
            <label htmlFor="mat">Actividad</label>
            <select className="form-select" name="mat" id="mat">
                       
                {
                        materias.length>0?materias.map((ele,ind)=>
                        <option key={ind} value={ele.id_materia}>{ele.id_materia} - {ele.materia}</option>
                 ):null}
            </select>
        </div>  
        
        <div className="col-md-1 col-xs-12">
                
                {materias.length > 0?<div>
                <button className="btn btn-primary" style={{marginTop:'20px'}} onClick={verCatedra} name="buscar">Buscar</button>        
                </div>:null}
        </div>

    <div>
     
</div>

 <div className="cuerpo">
    {docentescat.length>0?
        <MostrarDatosCatedra datoscatedra={docentescat} />
        :null

    }
</div>
</div>    
</div> 
  )
}

export default BusquedaCatedra