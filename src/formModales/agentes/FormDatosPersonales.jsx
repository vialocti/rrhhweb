import React,{useState, useEffect} from 'react'
import { Boton, CabTitulo, ContenedorBoton, FormularioD, LabelF, SelectorV } from '../../styles-components/formularios/FormAgente'
import { grabarDatosPer, modificarDatosPer, traerCodLugar } from '../../services/f_axiospersonas'
import InputC from '../../elementos/InputComponent'
import Swal from 'sweetalert2'

const FormDatosPersonales = ({legajo,modifica,funcion,tipo,datos}) => {
  
  
  const expresiones ={
    fechnac:/^\d{4}([-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
    fiapn:/^\d{4}([-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
    fiunc:/^\d{4}([-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
    fifce:/^\d{4}([-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
    
  }

  const [fechnac, setFechnac]= useState({campo:'', valido:null})
  const [lugarn,setLugarN]= useState('1')
  const [nacionalidad, setNacionalidad]= useState('1')
  const [sexo, setSexo]= useState('1')
  const [gs,setGs]= useState('A')
  const [rh, setRh]= useState('+')
  const [ecivil, setEcivil]= useState('1')
  const [fiapn,setFiapn]= useState({campo:'', valido:null})
  const [fiunc,setFiunc]= useState({campo:'', valido:null})
  const [fifce,setFifce]= useState({campo:'', valido:null})
  
  const [lugar, setLugar]=useState(null)
  

 

  

  const convertirFecha =(fe)=>{
    if(fe){
    return fe.substring(6,10) + "-" + fe.substring(3,5) + "-" + fe.substring(0,2)
    }else{return null}    
  }

  useEffect(() => {
      setFechnac({campo:'', valido:null})
      setFifce({campo:'', valido:null})
      setFiunc({campo:'', valido:null})
      setFiapn({campo:'', valido:null})
      setGs('A')
      setLugarN('1')
      setSexo('1')
      setNacionalidad('1')
      setRh('+')
      setEcivil('1')

   }, [])


  useEffect(() => {
    
   const limpiardatos =()=>{
      setFechnac({campo:'', valido:null})
      setFifce({campo:'', valido:null})
      setFiunc({campo:'', valido:null})
      setFiapn({campo:'', valido:null})
      setGs('A')
      setLugarN('1')
      setSexo('1')
      setNacionalidad('1')
      setRh('+')
      setEcivil('1')
   }


    if(datos){
      limpiardatos()
      setFechnac({campo:datos.fechanac?convertirFecha(datos.fechanac):'',valido:'true'})
      setFifce({campo:datos.fechaIFCE?convertirFecha(datos.fechaIFCE):'',valido:'true'})
      setFiunc({campo:datos.fechaIUNC?convertirFecha(datos.fechaIUNC):'',valido:'true'})
      setFiapn({campo:datos.fechaIAPN?convertirFecha(datos.fechaIAPN):'',valido:'true'})
      setGs(datos.gs.trim())
      setLugarN(datos.lugarn)
      setSexo(datos.sexo)
      setNacionalidad(datos.nacionalidad)
      setRh(datos.rh)
      setEcivil(datos.ecivil)
    }

    if(tipo==='A'){
      limpiardatos()

    }
    const getDatosU =async ()=>{
       
      setLugar(await traerCodLugar())
      
    }
  getDatosU()
  
    
  }, [datos,tipo])
  
 
  const grabarDatosAgentePerso =async ()=>{

    const datosper ={
     
      fechnac:fechnac.campo,
      fifce:fifce.campo,
      fiunc:fiunc.campo,
      fiapn:fiapn.campo,
      lugarn:lugarn,
      nacionalidad:nacionalidad,
      sexo:sexo,
      gs:gs,
      rh:rh,
      ecivil:ecivil

      }

      let resp=null
 
      if(tipo==='A'){
        datosper.legajo=legajo
        resp = await grabarDatosPer(datosper)
      }else{
        resp = await modificarDatosPer(legajo,datosper)
      }
     
      if (resp===200){
        Swal.fire({
            title: 'Datos Personales Grabados',
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
        fechnac.valido==='true' && 
        fiapn.valido === 'true' && 
        fifce.valido === 'true' &&
        fiunc.valido === 'true' 
        
        )
    
    {
     //console.log('vamos')
    grabarDatosAgentePerso()

    } else{
        Swal.fire({
            title: 'Informacion Personales Agente',
            text: 'Datos Basicos Incompletos',
            icon: 'info',
            
            
        });   
    }

  }

  const cerrar=()=>{
    funcion()
    modifica()
   }
  
  const onHandleChangeSX =()=>{
    
    setSexo(document.getElementById('sexo').value)
  }
  
  const onHandleChangeNC =()=>{
    setNacionalidad(document.getElementById('nacionalidad').value)

  }
  
  const onHandleChangeGS =()=>{
    
    setGs(document.getElementById('gs').value)
  }

  const onHandleChangeRH =()=>{
    
    setRh(document.getElementById('rh').value)
  }

  const onHandleChangeEC =()=>{
    setEcivil(document.getElementById('ecivil').value)

  }

  const onHandleChangeLN=()=>{
    setLugarN(document.getElementById('localidad').value)
  }
  
  return (
    <div className="container mt-2">
            <div className="row">
                <div className="col-md-10">
                {tipo==='A'
                    ?<CabTitulo>Ingreso Datos Personales</CabTitulo>
                    :<CabTitulo>Modificar Datos Personales</CabTitulo>
                  }
                </div>    
                    <div className="col-md-1"></div>
                <div className="col-md-1">
                    <button  onClick={cerrar} className='btn btn-info'>
                        X
                    </button>
                </div>    
            </div>
            
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
                leyendaErr='la fecha tiene que tener un formato como 2000-08-14'
                expreg={expresiones.fechnac}
            
              />
          </div>
          <div style={{width:'190px'}}>
                <LabelF htmlFor='sexo'>Sexo</LabelF>
                  <SelectorV name="sexo" id='sexo' value={sexo} onChange={onHandleChangeSX}>
                      <option value="1">Masculino</option>
                      <option value="2">Femenino</option>
                      <option value="3">No Binario</option>
                  </SelectorV>  
          </div>
          
          </div>  
          
          
          
          <div>
                <LabelF htmlFor='localidad'>Lugar Nacimiento</LabelF>
                <SelectorV name="localidad" id='localidad' 
                value={lugarn}
                onChange={onHandleChangeLN}>
                    {lugar?lugar.map((ele)=>
                        <option key={ele.cdln} value={ele.cdln}>{ele.lugar}</option>  
                    ):<option value='0'>Sin Opciones</option>}
                </SelectorV>
          </div>
           
          <div>
            <LabelF htmlFor='nacionalidad'>Nacionalidad</LabelF>
                  <SelectorV name="nacionalidad" id='nacionalidad'
                  value={nacionalidad}
                  onChange={onHandleChangeNC}>
                      <option value="1">Argentino Nativo</option>
                      <option value="2">Argentino Naturalizado</option>
                      <option value="3">Argentino por Opcion</option>
                      <option value="4">Extranjero</option>
                      <option value="5">Nativo Naturalizado Extranjero</option>                      
                  </SelectorV>
            
          
          </div>
            <div style={{display:'flex',width:'380px'}}>
            <div style={{width:'190px'}}>
            <LabelF htmlFor='gs'>Gr.Sanguineo</LabelF>
                  <SelectorV name="gs" id='gs' value={gs} onChange={onHandleChangeGS}>
                      <option value="A">Grupo A</option>
                      <option value="B">Grupo B</option>
                      <option value="AB">Grupo AB</option>
                      <option value="O">Grupo O</option>
                  </SelectorV>
            </div>
 
            <div style={{width:'190px',marginLeft:'10px'}}>
            <LabelF htmlFor='rh'>Factor RH</LabelF>
                  <SelectorV name="rh" id='rh' value={rh} onChange={onHandleChangeRH}>
                      <option value="+">RH Positivo</option>
                      <option value="-">RH Negativo</option>
                      
                  </SelectorV>
            </div>
            </div>

            <div>
            <LabelF htmlFor='ecivil'>Estado Civil</LabelF>
                  <SelectorV name="ecivil" id='ecivil' value={ecivil} onChange={onHandleChangeEC}>
                      <option value="1">Soltero</option>
                      <option value="2">Unido de Hecho</option>
                      <option value="3">Casado</option>
                      <option value="4">Separado Legalmente</option>
                      <option value="5">Separado de Hecho</option>
                      <option value="6">Viudo</option>
                      <option value="7">Separado de Hecho y Unido de Hecho</option>
                      <option value="8">Separado Legalmente y Unido de Hecho</option>
                      <option value="9">Viudo y Unido de Hecho</option>
                      <option value="10">Divorciado</option>
                  </SelectorV>
            </div>       
            
            <div>
            <InputC 
                tipo='text'
                name='fifce'
                infoplace='Ingrese Fecha '
                estado={fifce}
                cambiarEstado={setFifce}
                label='Fecha Ingreso FCE'
                leyendaErr='la fecha tiene que tener un formato como 2000-08-14'
                expreg={expresiones.fifce}
            
              />
            </div>

            <div>
            <InputC 
                tipo='text'
                name='fiunc'
                infoplace='Ingrese Fecha '
                estado={fiunc}
                cambiarEstado={setFiunc}
                label='Fecha Ingreso UNCuyo'
                leyendaErr='la fecha tiene que tener un formato como 2000-08-14'
                expreg={expresiones.fiunc}
            
              />
            </div>

            <div>
            <InputC 
                tipo='text'
                name='fiapn'
                infoplace='Ingrese Fecha '
                estado={fiapn}
                cambiarEstado={setFiapn}
                label='Fecha Ingreso APN'
                leyendaErr='la fecha tiene que tener un formato como 2000-08-14'
                expreg={expresiones.fiapn}
            
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
      </main>

    </div>
  )
}

export default FormDatosPersonales