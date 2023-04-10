import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'

import axios from 'axios'



export const useGetMaterias = () => {

    const { legajo } = useSelector(state => state.agente)


    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [materias, setMaterias] = useState(null)
    const [cargospl, setCargos] = useState(null)
    const [agentesActivos, setAgentesActivos] = useState(null)

    useEffect(() => {
        getMateriasApi()
        getCargosApi()
        getAgentesActivosApi()
    }, [legajo])



    const getMateriasApi = async () => {

        try {
            //console.log('http://200.12.136.74:4000/hcd/materias/1/1')
            const { data } = await axios.get('http://200.12.136.74:4000/hcd/materias/1/1')
            setMaterias(data)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)

        }

    }

    const getCargosApi = async () => {

        try {
            //console.log('http://200.12.136.74:4000/cargos/getcargosp/9/9')
            const { data } = await axios.get('http://200.12.136.74:4000/cargos/getcargosp/9/9')
            setCargos(data)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)

        }

    }

    const getAgentesActivosApi = async () => {

        try {
            const { data } = await axios.get('http://200.12.136.74:4000/biometrico/activos')
            setAgentesActivos(data)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }




    return { loading, error, materias, cargospl, agentesActivos }
}