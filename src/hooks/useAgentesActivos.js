import { useEffect, useState } from 'react'

import axios from 'axios'


export const useAgenteActivos = () => {



    const [agentesActivos, setAgentesActivos] = useState([])

    const [loadingAa, setLoading] = useState(true)
    const [errorAa, setError] = useState('')


    useEffect(() => {

        traerAgenteActivosApi()



    }, [])




    const traerAgenteActivosApi = async () => {
        const urlactivos = 'http://200.12.136.74:4000/biometrico/'

        try {

            const { data } = await axios.get(`${urlactivos}activos`)
            //console.log(data)
            setAgentesActivos(data)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }


    }



    return { errorAa, loadingAa, agentesActivos }
}
