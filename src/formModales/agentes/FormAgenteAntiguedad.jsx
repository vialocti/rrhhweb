import React,{useState,useEffect} from 'react'
import Swal from 'sweetalert2'
import { Boton, CabTitulo, ContenedorBoton, FormularioD } from '../../styles-components/formularios/FormAgente'
import InputC from '../../elementos/InputComponent'
import { grabarDatosAntiguedad, modificarDatosAntiguedad } from '../../services/f_axiospersonas'

const FormAgenteAntiguedad = ({legajo,modifica,funcion,tipo,datos}) => {

  const expresiones = {
    nroresord: /^[a-zA-Z0-9\_\ \-/]{4,20}$/, // Letras, numeros, guion y guion_bajo
    nroresornd: /^[a-zA-Z0-9\_\ \-/]{4,20}$/, // Letras, numeros, guion y guion_bajo

    // resolucionA: /^[,a-zA-ZÀ-ÿ\s]{1,50}$/, // Letras y espacios, pueden llevar acentos.
    fechard:/^\d{4}([-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
    fecharnd:/^\d{4}([-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
    aniord:/^[1-9]{1,2}$/,
    mesrd:/^[0-9]{1,2}$/,
    diard:/^[0-9]{1,2}$/,
    aniornd:/^[0-9]{1,2}$/,
    mesrnd:/^[0-9]{1,2}$/,
    diarnd:/^[1-9]{1,2}$/,
 
  }



  const [fechard, setFechard] = useState({campo:'', valido:'true'})
  const [fecharnd, setFecharnd] = useState({campo:'', valido:'true'})
  const [nroresord, setNroResord] = useState({campo:'', valido:'true'})
  const [nroresornd, setNroResornd] = useState({campo:'', valido:'true'})
  const [aniord, setAniord] = useState({campo:'', valido:'true'})
  const [aniornd, setAniornd] = useState({campo:'', valido:'true'})
  const [mesrd, setMesrd] = useState({campo:'', valido:'true'})
  const [mesrnd, setMesrnd] = useState({campo:'', valido:'true'})
  const [diard, setDiard] = useState({campo:'', valido:'true'})
  const [diarnd, setDiarnd] = useState({campo:'', valido:'true'})



 useEffect(() => {
    setFechard({campo:'',valido:'true'})
    setFecharnd({campo:'',valido:'true'})
    setNroResord({campo:'',valido:'true'})
    setNroResornd({campo:'',valido:'true'})
    setAniord({campo:'',valido:'true'})
    setAniornd({campo:'',valido:'true'})
    setMesrd({campo:'',valido:'true'})
    setMesrnd({campo:'',valido:'true'})
    setDiard({campo:'',valido:'true'})
    setDiarnd({campo:'',valido:'true'})
 }, [])
  
 useEffect(() => {
 
  if(datos){
    setFechard({campo:datos.fechardoc?convertirFecha(datos.fechardoc):'',valido:'true'})
    setFecharnd({campo:datos.fecharndoc?convertirFecha(datos.fecharndoc):'',valido:'true'})
    setNroResord({campo:datos.nresd,valido:'true'})
    setNroResornd({campo:datos.nresnd,valido:'true'})
    setAniord({campo:datos.aad,valido:'true'})
    setAniornd({campo:datos.aand,valido:'true'})
    setMesrd({campo:datos.mad,valido:'true'})
    setMesrnd({campo:datos.mand,valido:'true'})
    setDiard({campo:datos.dad,valido:'true'})
    setDiarnd({campo:datos.dand,valido:'true'})
  }

  if(tipo==='A'){
   setFechard({campo:'',valido:'true'})
    setFecharnd({campo:'',valido:'true'})
    setNroResord({campo:'',valido:'true'})
    setNroResornd({campo:'',valido:'true'})
    setAniord({campo:'',valido:'true'})
    setAniornd({campo:'',valido:'true'})
    setMesrd({campo:'',valido:'true'})
    setMesrnd({campo:'',valido:'true'})
    setDiard({campo:'',valido:'true'})
    setDiarnd({campo:'',valido:'true'})
  }
   
  
    
  }, [datos,tipo])
 
 const convertirFecha =(fe)=>{
    if(fe){
    return fe.substring(6,10) + "-" + fe.substring(3,5) + "-" + fe.substring(0,2)
    }else{return ''}    
  }

const grabarDatosAntiguedadx =async ()=>{
 
 
    const datosperant ={
        fechrecd:fechard.campo===''?null:fechard.campo,
        fechrecnd:fecharnd.campo===''?null:fecharnd.campo,
        nresd:nroresord.campo,
        nresnd:nroresornd.campo,
        aad:aniord.campo,
        aand:aniornd.campo,
        mad:mesrd.campo,
        mand:mesrnd.campo,
        dad:diard.campo,
        dand:diarnd.campo
    }

    let resp=null
    if (tipo==='A'){
        datosperant.legajo=legajo
        resp = await grabarDatosAntiguedad(datosperant)
    }else{
        
        resp = await modificarDatosAntiguedad(legajo,datosperant)
    }
   console.log(datosperant)
    
    //const resp=400
//console.log(resp)
if (resp===200){
    Swal.fire({
        title: 'Datos Reconoc. Antiguedad Grabados',
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

   const cerrar=()=>{
    funcion()
    modifica()
   }
  //pulsamos boton agregar o modificar
  const onHandleSubmit =(e)=>{
    
    e.preventDefault()
    grabarDatosAntiguedadx()
    /*
    
    if(
        fechard.valido==='true' && 
        fecharnd.valido === 'true' &&
        nroresord.valido==='true' && 
        nroresornd.valido === 'true' &&
        aniord.valido === 'true' &&
        aniornd.valido === 'true' &&
        mesrd.valido === 'true' &&
        mesrnd.valido === 'true' &&
        diard.valido === 'true' &&
        diarnd.valido === 'true' 
        
        )
    {
     //console.log('vamos')
    

    } else{
        Swal.fire({
            title: 'Informacion Datos Contacto',
            text: 'Datos Basicos Incompletos',
            icon: 'info',
            
            
        });

        
        
    }
   */
}




return (
    <div className='container mt-2'>

    <div className="row">
                <div className="col-md-10">
                {tipo==='A'
                    ?<CabTitulo>Ingreso Datos Reconocimiento Antiguedad</CabTitulo>
                    :<CabTitulo>Modificar Datos Reconocimiento Antiguedad</CabTitulo>
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

<div style={{display:'flex',width:'600px'}}>
            
        <div style={{width:'170px',marginRight:'5px'}}> 
           <InputC 
               tipo='text'
               name='aniord'
               infoplace='total años'
               estado={aniord}
               cambiarEstado={setAniord}
               label='Doc:Años'
               leyendaErr='2 caracter'
               expreg={expresiones.aniord}
           />       
           </div>

           <div style={{width:'170px',marginRight:'5px'}}> 
           <InputC 
               tipo='text'
               name='mesrd'
               infoplace='total meses'
               estado={mesrd}
               cambiarEstado={setMesrd}
               label='Doc:Meses'
               leyendaErr='2 caracter'
               expreg={expresiones.mesrd}
           />       
           </div>

           <div style={{width:'170px',marginRight:'5px'}}> 
           <InputC 
               tipo='text'
               name='diard'
               infoplace='total Dias'
               estado={diard}
               cambiarEstado={setDiard}
               label='D:Dias'
               leyendaErr='2 caracteres'
               expreg={expresiones.diard}
           />       
           </div>
           
      </div>
    
    <div style={{width:'180px'}}>
    <InputC 
        tipo='text'
        name='fechard'
        infoplace='Ingrese Fecha '
        estado={fechard}
        cambiarEstado={setFechard}
        label='Doc:Fecha Acredit.'
        leyendaErr='la fecha tiene que tener un formato como 2000-08-26'
        expreg={expresiones.fechard}
     
    />
    </div>

    <div style={{width:'180px'}}>
     <InputC 
        tipo='text'
        name='nroresord'
        infoplace='Ingrese Nro Resolución'
        estado={nroresord}
        cambiarEstado={setNroResord}
        label='Doc:Nro Resolución'
        leyendaErr=''
        expreg={expresiones.nroresord}
     
    />
    </div>

    <div style={{display:'flex',width:'600px'}}>
            
            <div style={{width:'170px',marginRight:'5px'}}> 
               <InputC 
                   tipo='text'
                   name='aniornd'
                   infoplace='total Años'
                   estado={aniornd}
                   cambiarEstado={setAniornd}
                   label='NDoc:Años'
                   leyendaErr='2 caracter'
                   expreg={expresiones.aniornd}
               />       
               </div>
    
               <div style={{width:'170px',marginRight:'10px'}}> 
               <InputC 
                   tipo='text'
                   name='mesrnd'
                   infoplace='total Meses'
                   estado={mesrnd}
                   cambiarEstado={setMesrnd}
                   label='NDoc:Meses'
                   leyendaErr='2 caracter'
                   expreg={expresiones.mesrnd}
               />       
               </div>
    
               <div style={{width:'170px'}}> 
               <InputC 
                   tipo='text'
                   name='diarnd'
                   infoplace='total Dias'
                   estado={diarnd}
                   cambiarEstado={setDiarnd}
                   label='NDoc:Dias'
                   leyendaErr='2 caracteres'
                   expreg={expresiones.diarnd}
               />       
               </div>
               
          </div>
        
        <div style={{width:'180px'}}>
        <InputC 
            tipo='text'
            name='fecharnd'
            infoplace='Ingrese Fecha '
            estado={fecharnd}
            cambiarEstado={setFecharnd}
            label='NDoc:Fecha Acredit.'
            leyendaErr='la fecha tiene que tener un formato como 2000-08-14'
            expreg={expresiones.fecharnd}
         
        />
        </div>
    
        <div style={{width:'180px'}}>
         <InputC 
            tipo='text'
            name='nroresornd'
            infoplace='Ingrese Nro Resolucion'
            estado={nroresornd}
            cambiarEstado={setNroResornd}
            label='NDoc:Nro Resolución'
            leyendaErr='El nro '
            expreg={expresiones.nroresornd}
         
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

export default FormAgenteAntiguedad