import React,{useState,useEffect} from 'react'
import Swal from 'sweetalert2'
import { Boton, CabTitulo, ContenedorBoton, FormularioD } from '../../styles-components/formularios/FormAgente'
import InputC from '../../elementos/InputComponent'

const FormAgenteAntiguedad = ({legajo,funcion,tipo,datos}) => {

  const expresiones = {
    nroresord: /^[a-zA-Z0-9\_\ \-/]{4,20}$/, // Letras, numeros, guion y guion_bajo
    nroresornd: /^[a-zA-Z0-9\_\ \-/]{4,20}$/, // Letras, numeros, guion y guion_bajo

    // resolucionA: /^[,a-zA-ZÀ-ÿ\s]{1,50}$/, // Letras y espacios, pueden llevar acentos.
    fechard:/^\d{4}([-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
    fecharnd:/^\d{4}([-/.])(0?[1-9]|1[0-1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
    aniord:/^[1-9]{1,2}$/,
    mesrd:/^[0-9]{1,2}$/,
    diard:/^[1-9]{1,2}$/,
    aniornd:/^[1-9]{1,2}$/,
    mesrnd:/^[0-9]{1,2}$/,
    diarnd:/^[1-9]{1,2}$/,
 
  }



  const [fechard, setFechard] = useState({campo:'', valido:null})
  const [fecharnd, setFecharnd] = useState({campo:'', valido:null})
  const [nroresord, setNroResord] = useState({campo:'', valido:null})
  const [nroresornd, setNroResornd] = useState({campo:'', valido:null})
  const [aniord, setAniord] = useState({campo:'', valido:null})
  const [aniornd, setAniornd] = useState({campo:'', valido:null})
  const [mesrd, setMesrd] = useState({campo:'', valido:null})
  const [mesrnd, setMesrnd] = useState({campo:'', valido:null})
  const [diard, setDiard] = useState({campo:'', valido:null})
  const [diarnd, setDiarnd] = useState({campo:'', valido:null})


 useEffect(() => {
 
  if(datos){
    setFechard({campo:datos.fechardoc,valido:'true'})
    setFecharnd({campo:datos.fecharndoc,valido:'true'})
    setNroResord({campo:datos.nresd,valido:'true'})
    setNroResornd({campo:datos.nresnd,valido:'true'})
    setAniord({campo:datos.aad,valido:'true'})
    setAniornd({campo:datos.aand,valido:'true'})
    setMesrd({campo:datos.mad,valido:'true'})
    setMesrnd({campo:datos.mand,valido:'true'})
    setDiard({campo:datos.dad,valido:'true'})
    setDiarnd({campo:datos.dand,valido:'true'})
  }else{
    setFechard({campo:'',valido:null})
    setFecharnd({campo:'',valido:null})
    setNroResord({campo:'',valido:null})
    setNroResornd({campo:'',valido:null})
    setAniord({campo:'',valido:null})
    setAniornd({campo:'',valido:null})
    setMesrd({campo:'',valido:null})
    setMesrnd({campo:'',valido:null})
    setDiard({campo:'',valido:null})
    setDiarnd({campo:'',valido:null})
    
  }
   
    
   
 }, [datos])
 


   const grabarDatosAntiguedad =async ()=>{
    console.log(datos)
   }


  //pulsamos boton agregar o modificar
  const onHandleSubmit =(e)=>{
    e.preventDefault()
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
        diarnd.length > 0 
        
        )
    {
     //console.log('vamos')
    grabarDatosAntiguedad()

    } else{
        Swal.fire({
            title: 'Informacion Datos Contacto',
            text: 'Datos Basicos Incompletos',
            icon: 'info',
            
            
        });

        
        
    }
   
}




return (
    <div className='container mt-2'>
    {tipo==='A'
     ?<CabTitulo>Ingreso Datos Reconocimiento Antiguedad</CabTitulo>
     :<CabTitulo>Modificar Datos Reconocimiento Antiguedad</CabTitulo>
    }
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
    
    <div style={{width:'250px',marginRight:'5px'}}>
    <InputC 
        tipo='text'
        name='fechard'
        infoplace='Ingrese Fecha '
        estado={fechard}
        cambiarEstado={setFechard}
        label='Doc:Fecha Acreditación.'
        leyendaErr='El debe ser numerico sin puntos'
        expreg={expresiones.fechard}
     
    />
    </div>

    <div style={{width:'250px',marginRight:'5px'}}>
     <InputC 
        tipo='text'
        name='nroresord'
        infoplace='Ingrese Nro Resolución'
        estado={nroresord}
        cambiarEstado={setNroResord}
        label='Doc:Nro Resolución. '
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
    
               <div style={{width:'170px',marginRight:'5px'}}> 
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
    
               <div style={{width:'170px',marginRight:'5px'}}> 
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
        
        <div style={{width:'250px'}}>
        <InputC 
            tipo='text'
            name='fecharnd'
            infoplace='Ingrese Fecha '
            estado={fecharnd}
            cambiarEstado={setFecharnd}
            label='NDoc:Fecha Acreditacion'
            leyendaErr='El debe ser numerico sin puntos'
            expreg={expresiones.fecharnd}
         
        />
        </div>
    
        <div style={{width:'250px'}}>
         <InputC 
            tipo='text'
            name='nroresornd'
            infoplace='Ingrese Nro Resolucion'
            estado={nroresornd}
            cambiarEstado={setNroResornd}
            label='NDoc:Nro Resolución.'
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