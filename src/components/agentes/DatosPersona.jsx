
import React from 'react'

//import { useSelector} from 'react-redux'
//import { AgenteConsulta } from '../../dominio/store/agente-thunx'
import { Label } from '../../styles-components/formularios/FormAgente'
import {useAgenteInfo} from '../../hooks/useAgenteInfo'

const DatosPersona = () => {
  //const legajo =useSelector(state=>state.agente.legajo)
  //const user =useSelector(state=>state.agente.user)
  //const dispatch = useDispatch()
  const {agente,error,loading} = useAgenteInfo() 


   if(loading) return <p>Cargando datos .....</p>
   if(error) return <p>Error de Carga</p>

return (
    <div className='container'>

        <div className="row">
             

            <div className='col-md-1'>
            T.Doc.<Label> {agente.tipodocumento==='1'?'DNI':agente.tipodocumento==='2'?'LE':'LC'}</Label>
            </div>

            <div className='col-md-2'>
              Nro.Doc.<Label>{agente.nrodocumento}</Label>
            </div>

            <div className='col-md-2'>
            Cuil<Label>{agente.nrocuil}</Label>
            </div>

            
                     
            
            <div className='col-md-2'>
            Claustro<Label>{agente.condicion==='1'?'Docente':'No Docente'}</Label>
            </div>

            

            <div className='col-md-4'>
              Area Trabajo<Label> {agente.area}</Label>
            </div>

           

         </div>


    </div>

  )
}

export default DatosPersona