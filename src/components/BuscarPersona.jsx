import React,{useState, useEffect} from 'react'
import { addAgente } from '../dominio/store/agente-slice'
import { getMaterias } from '../dominio/store/datosfce-thunk'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import {Wrapper, Button} from '../styles-components/vistas/Personas'

import { AgenteConsulta } from '../dominio/store/agente-thunx'
import { Form, FormControl } from 'react-bootstrap'


const uri = 'http://200.12.136.74:4000/biometrico/'

const expresiones = {
    patronb: /^[a-zA-Z\,\ \-]{1,60}$/, // Letras guion y guion_bajo
    // resolucionA: /^[,a-zA-ZÀ-ÿ\s]{1,50}$/, // Letras y espacios, pueden llevar acentos.
    // fecha:/^\d{4}([-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
}

const BuscarPersona = () => {

    const dispatch =useDispatch()
    const [agentes, setAgentes] = useState([])
    const [rutap, setRutap] = useState(`${uri}agente_name/A`)
    const [patronb, setPatronb] = useState('') 

    
    useEffect(()=>{

        const traerPersonas =async()=>{

            await axios.get(rutap)
            .then(response =>{
                setAgentes(response.data)
                //console.log(agentes)

            }) 
            .catch (error=> {
                console.log(error)  
            }) 

        }

        traerPersonas()
      
        
    },[rutap])


    useEffect(()=>{
        
        dispatch(getMaterias(1,1))
    },[])
    useEffect(()=>{
        
        setRutap (`${uri}agente_name/${patronb}`)
       //  console.log(rutap)
        


    },[patronb])


    const buscarInfo =()=>{
       // console.log(document.getElementById('personas').value)
        dispatch(addAgente(document.getElementById('personas').value))
        dispatch(AgenteConsulta(document.getElementById('personas').value))
    }



    const onHandleChange =()=>{
        // 
        setPatronb(document.getElementById("busqueda").value)
        // buscarAgentes()
    
      }

  return (
    <Wrapper>
    <div className='container ml-4'>


            <div className='row'>
            <div className='col-md-4'>
            <Form.Label htmlFor="busqueda"> Buscar </Form.Label>
            <FormControl 
            type="text"
            id="busqueda"
            onChange={onHandleChange}
            value={patronb}
            
          />


            </div>
            <div  className='col-md-4'>

            <Form.Label htmlFor="personas"> Agentes </Form.Label>
            <Form.Select id="personas">
                { agentes.length>0 ? agentes.map((age,ind)=>
                <option key={ind} value={age.legajo.toString()}>{age.apellido}</option>
                ):null}
            </Form.Select>
            </div>


            <div className='col-md-2'>

            </div>

            <div className='col-md-2'>
                <br/>

                <Button
                onClick={buscarInfo}
                 >
                 Ver Info Agente

                </Button>
            </div>
          </div>                     


    </div>  
    </Wrapper>
  )

  }

export default BuscarPersona