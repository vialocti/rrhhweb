import React, { useEffect, useState } from 'react'
import { Boton, CabTitulo, ContenedorBoton, FormularioD, LabelF, SelectorV } from '../../styles-components/formularios/FormAgente'
import InputC from '../../elementos/InputComponent'
import Swal from 'sweetalert2'
import {modificarDatosFamiliar, grabarDatosFamiliar } from '../../services/f_axiospersonas'

const FormDatosFamilia = ({legajo,modifica,funcion,tipo,datos}) => {
  const expresiones={
    nombre: /^[,a-zA-ZÀ-ÿ\s]{1,90}$/,
    fechanac:/^\d{4}([-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
    nrodoc: /^\d{7,9}$/,
  }


  const [nombre, setNombre]=useState({campo:'', valido:null})
  const [fechanac, setFechanac]=useState({campo:'', valido:null})
  const [nrodoc, setNrodoc]=useState({campo:'', valido:null})
  const [tdoc, setTdoc]=useState('1')
  const [vinculo,setVinculo]=useState('1')
  //const [datosFamilia, setDatosFamilia]=useState(null)


  useEffect(() => {
    setNombre({campo:'',valido:null})
    setFechanac({campo:'',valido:null})
    setNrodoc({campo:'',valido:null})
    setTdoc('1')
    setVinculo('1')
  }, [])
  
  //console.log(datos)
  useEffect(() => {
    if(datos){
      setNombre({campo:datos.nombre,valido:'true'})
      setFechanac({campo:datos.fechanac?convertir(datos.fechanac):'2000-01-01',valido:'true'})
      setNrodoc({campo:datos.nrodoc,valido:'true'})
      setVinculo(datos.vinculo)
      setTdoc(datos.tdoc)
    }else{
      
      setNombre({campo:'',valido:null})
      setFechanac({campo:'',valido:null})
      setNrodoc({campo:'',valido:null})
      setTdoc('1')
      setVinculo('1')
    }
  
    if(tipo==='A'){
      setNombre({campo:'',valido:null})
      setFechanac({campo:'',valido:null})
      setNrodoc({campo:'',valido:null})
      setTdoc('1')
      setVinculo('1')
    }

  }, [datos,tipo])

  const convertir=(fecha)=>{
    return fecha.substring(0,10)
  }

  const grabarDatosFamiliarx =async ()=>{

    const datosfamiliar={
      tdoc:tdoc,
      vinculo:vinculo,
      nrodoc:nrodoc.campo,
      nombre:nombre.campo,
      fechanac:fechanac.campo

    }
    //console.log(datosfamiliar)
    let resp=null
    if (tipo==='A'){
        datosfamiliar.legajo=legajo
        resp = await grabarDatosFamiliar (datosfamiliar)
    }else{
        //console.log(datosperdomi)
        resp = await modificarDatosFamiliar(datos.id,datosfamiliar)
    }
   
    
    //const resp=400
//console.log(resp)
if (resp===200){
    Swal.fire({
        title: 'Datos Familiar Grabados',
        text: 'Datos Grabados',
        icon: 'info',
                        
    }).then(resultado => {
        if (resultado.value) {
            // Hicieron click en "Sí"
            funcion()
            modifica()              
            
        }});

    
}

  }

  
  const onHandleSubmit =(e)=>{
    
        e.preventDefault()
        if(
            nombre.valido==='true' && 
            nrodoc.valido === 'true' && 
            fechanac.valido === 'true'
                        
            )
        
        {
         //console.log('vamos')
        grabarDatosFamiliarx()

        } else{
            Swal.fire({
                title: 'Informacion Datos Familiar',
                text: 'Datos Basicos Incompletos',
                icon: 'info',
                
                
            });

            
            
        }
  }

  const onHandleChangeTD =()=>{
    setTdoc(document.getElementById('tdoc').value)
  }

  const onHandleChangePR =()=>{
    setVinculo(document.getElementById('vinculo').value)
  }
  const cerrar=()=>{
    funcion()
    modifica()
   }


  return (
    <div className='container mt-2'>
      <div className="row">
                <div className="col-md-10">
                  {tipo==='A'
                    ?<CabTitulo>Ingreso Datos Familiar</CabTitulo>
                    :<CabTitulo>Modificar Datos Familiar</CabTitulo>
                    }
                </div>    
                    <div className="col-md-1"></div>
                <div className="col-md-1">
                    <button  onClick={cerrar} className='btn btn-info'>
                        X
                    </button>
                </div>    
            </div>
       
      <div className="main">
        <FormularioD onSubmit={onHandleSubmit}>
          
          <div>
            <InputC
            tipo='text'
            name='nombre'
            infoplace='APELLIDO, Nombres'
            estado={nombre}
            cambiarEstado={setNombre}
            label='Nombre'
            leyendaErr='nombre solo text no mayor a 90'
            expreg={expresiones.nombre}

            
            />
          </div>
          
          <div>
          <LabelF htmlFor='tipodoc'>Tipo Documento</LabelF>
                <SelectorV name="tdoc" id='tdoc' value={tdoc} onChange={onHandleChangeTD}>
                    <option value="1">DNI</option>
                    <option value="2">LE</option>
                    <option value="3">LC</option>
                </SelectorV>  
          </div>

          <div>
          <LabelF htmlFor='vinculo'>Parentesco</LabelF>
                <SelectorV name="vinculo" id='vinculo' value={vinculo} onChange={onHandleChangePR}>
                    <option value="1">Esposo</option>
                    <option value="2">Esposa</option>
                    <option value="3">Hijo</option>
                    <option value="4">Hija</option>
                    <option value="5">Madre</option>
                    <option value="6">Padre</option>
                    <option value="7">Hermano/a</option>
                    <option value="8">Abuelo/a</option>
                </SelectorV>
          </div>  

          <div>
          <InputC 
                tipo='text'
                name='nrodni'
                infoplace='Ingrese Nro.Documento'
                estado={nrodoc}
                cambiarEstado={setNrodoc}
                label='Nro.Documento'
                leyendaErr='El nro.documento debe ser numerico sin puntos'
                expreg={expresiones.nrodoc}
             
            />
          </div>
          
          <div>
              <InputC 
                    tipo='text'
                    name='fechanac'
                    infoplace='aaaa-mm-dd'
                    estado={fechanac}
                    cambiarEstado={setFechanac}
                    label='Fecha Nacimiento'
                    leyendaErr='la fecha tiene que tener unformato como 2000-08-14'
                    expreg={expresiones.fechanac}
                />  
          </div>

          <div>
              <ContenedorBoton>
                {tipo ==='A'
                ?<Boton type='submit'>Grabar Datos</Boton>
                :<Boton type='submit'>Modificar Datos</Boton>
                }
              </ContenedorBoton>
          </div>

        </FormularioD>
      </div>
    </div>
  )
}

export default FormDatosFamilia