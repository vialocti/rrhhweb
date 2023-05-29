import React, { useEffect, useState } from 'react'
import { Boton, CabTitulo, ContenedorBoton, FormularioD, LabelF, SelectorV } from '../../styles-components/formularios/FormAgente'
import InputC from '../../elementos/InputComponent'

const FormDatosFamilia = ({legajo,funcion,tipo,datos}) => {
  const expresiones={
    nombre: /^[,a-zA-ZÀ-ÿ\s]{1,50}$/,
    fechanac:/^\d{4}([-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
    nrodoc: /^\d{7,9}$/,
  }


  const [nombre, setNombre]=useState({campo:'', valido:null})
  const [fechanac, setFechanac]=useState({campo:'', valido:null})
  const [nrodoc, setNrodoc]=useState({campo:'', valido:null})
  const [datosFamilia, setDatosFamilia]=useState(null)

  useEffect(() => {
    if(datos){
      
    }
  
    
  }, [datos])

  
  const onHandleSubmit =(e)=>{
    e.preventDefault()
  }


  const onHandleChange =(event)=>{

  }

  return (
    <div className='container mt-2'>
       {tipo==='A'
     ?<CabTitulo>Ingreso Datos Familiar</CabTitulo>
     :<CabTitulo>Modificar Datos Familiar</CabTitulo>
    }
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
            leyendaErr='nombre solo text no mayor a 60'
            expreg={expresiones.nombre}

            
            />
          </div>
          
          <div>
          <LabelF htmlFor='tipodoc'>Tipo Documento</LabelF>
                <SelectorV name="tipodoc" id='tipodoc' onChange={onHandleChange}>
                    <option value="1">DNI</option>
                    <option value="2">LE</option>
                    <option value="3">LC</option>
                </SelectorV>  
          </div>

          <div>
          <LabelF htmlFor='vinculo'>Parentesco</LabelF>
                <SelectorV name="vinculo" id='vinculo' onChange={onHandleChange}>
                    <option value="1">Conyuge</option>
                    <option value="2">Hijo</option>
                    <option value="3">Hija</option>
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