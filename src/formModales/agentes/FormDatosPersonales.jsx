import React,{useState, useEffect} from 'react'
import { Boton, CabTitulo, ContenedorBoton, FormularioD, LabelF, SelectorV } from '../../styles-components/formularios/FormAgente'
import { traerCodLugar } from '../../services/f_axiospersonas'
import InputC from '../../elementos/InputComponent'

const FormDatosPersonales = ({legajo,funcion,tipo,datos}) => {
  const expresiones ={
    fechnac:/^\d{4}([-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
    fiapn:/^\d{4}([-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
    fiunc:/^\d{4}([-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
    fifce:/^\d{4}([-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
    
  }

  const [fechnac, setFechnac]= useState('')
  //const [lugarn,setLugarN]= useState('')
  const [nacionalidad, setNacionalidad]= useState('1')
  const [sexo, setSexo]= useState('')
  const [gs,setGs]= useState('')
  const [rh, setRh]= useState('')
  const [ecivil, setEcivil]= useState('')
  const [fiapn,setFiapn]= useState('')
  const [fiunc,setFiunc]= useState('')
  const [fifce,setFifce]= useState('')
  
  const [lugar, setLugar]=useState(null)
  /*
  const [tt, setEcivil]= useState('')
  const [e,setE]= useState('')
  const [smil,setSmil]= useState('')
  const [ap,setAp]= useState('')
  */


  useEffect(() => {
    if(datos){

    }
    const getDatosU =async ()=>{
       
      setLugar(await traerCodLugar())
      }
  getDatosU()
  
    
  }, [datos])
  
  const onHandleSubmit =(e)=>{

  }

  const onHandleChange =(e)=>{

  }
  
  return (
    <div className="container mt-2">

            {tipo==='A'
             ?<CabTitulo>Ingreso Datos Personales</CabTitulo>
             :<CabTitulo>Modificar Datos Personales</CabTitulo>
            }
      <main>
        <FormularioD onSubmit={onHandleSubmit}>
          
          
          <div style={{display:'flex', width:'400px'}}>
            
            <div style={{width:'190px',marginRight:'10px'}}>
      
              <InputC 
                tipo='text'
                name='fechnac'
                infoplace='Ingrese Fecha '
                estado={fechnac}
                cambiarEstado={setFechnac}
                label='Fecha Nacimiento'
                leyendaErr='fechas sola'
                expreg={expresiones.fechnac}
            
              />
          </div>
          <div style={{width:'190px'}}>
                <LabelF htmlFor='sexo'>Sexo</LabelF>
                  <SelectorV name="sexo" id='sexo' onChange={onHandleChange}>
                      <option value="1">Masculino</option>
                      <option value="2">Femenino</option>
                      <option value="3">No Binario</option>
                  </SelectorV>  
          </div>
          
          </div>  
          
          <div style={{display:'flex', width:'400px'}}>
          
          <div style={{width:'190px',marginRight:'10px'}}>
                <LabelF htmlFor='localidad'>Lugar Nacimiento</LabelF>
                <SelectorV name="localidad" id='localidad' onChange={onHandleChange}>
                    {lugar?lugar.map((ele)=>
                        <option key={ele.cdln} value={ele.lugar}>{ele.lugar}</option>  
                    ):<option value='0'>Sin Opciones</option>}
                </SelectorV>
          </div>
           
          <div style={{width:'190px'}}>
            <LabelF htmlFor='nacionalidad'>Nacionalidad</LabelF>
                  <SelectorV name="nacionalidad" id='nacionalidad' onChange={onHandleChange}>
                      <option value="1">Argentina</option>
                      <option value="2">Extranjera</option>
                      
                  </SelectorV>
            </div>
          
          </div>
            <div style={{display:'flex',width:'300px'}}>
            <div style={{width:'140px'}}>
            <LabelF htmlFor='gs'>Gr.Sanguineo</LabelF>
                  <SelectorV name="gs" id='gs' onChange={onHandleChange}>
                      <option value="A">Grupo A</option>
                      <option value="B">Grupo B</option>
                      <option value="AB">Grupo AB</option>
                      <option value="O">Grupo O</option>
                  </SelectorV>
            </div>
 
            <div style={{width:'140px',marginLeft:'10px'}}>
            <LabelF htmlFor='rh'>Factor RH</LabelF>
                  <SelectorV name="rh" id='rh' onChange={onHandleChange}>
                      <option value="+">RH Positivo</option>
                      <option value="-">RH Negativo</option>
                      
                  </SelectorV>
            </div>
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
      </main>

    </div>
  )
}

export default FormDatosPersonales