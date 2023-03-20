import { useEffect, useState } from "react";


import axios from 'axios'



export const useMotivosInasistencia = () => {




    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [motivosLI, setMotivosLI] = useState(null)

    useEffect(() => {
        getMotivosApi()

    }, [])





    const getMotivosApi = async () => {

        try {
            //console.log('http://200.12.136.74:4000/hcd/materias/1/1')
            const { data } = await axios.get('http://200.12.136.74:4000/cargos/motina')
            setMotivosLI(data)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)

        }

    }





    return { loading, error, motivosLI }
}





