import axios from 'axios'


const uri = 'http://200.12.136.74:4000/'

export async function getMaterias(carrera, plan) {


    try {
        //console.log(`${uri}${legajo}`)
        const { data } = await axios.get(`${uri}hcd/materias/${carrera}/${plan}`)
        //console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function getCatedrasDoc(sede, carrera, idmat, tipo) {

    try {

        const { data } = await axios.get(`${uri}hcd/compocatedra/${sede}/${carrera}/${idmat}/${tipo}`)
        //console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}