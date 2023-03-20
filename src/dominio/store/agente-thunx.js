import axios from 'axios'

import { findAgente } from './agente-slice'
const urlbio = 'http://200.12.136.74:4000/biometrico/'

export const AgenteConsulta = (legajo = 0) => {
    const sqlstr = 'agente_leg/'
    return async (dispatch) => {
        const { data } = await axios.get(`${urlbio}${sqlstr}${legajo}`)
        //console.log(data[0].apellido)
        dispatch(findAgente(data[0].apellido))

    }
}
