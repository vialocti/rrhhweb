import axios from 'axios'


const uri = 'http://200.12.136.74:4000/cargos/'
//const uril = 'http://localhost:5000/cargos/'

export async function getLastNroCargo(legajo) {



    try {
        //console.log(`${uri}${legajo}`)
        const { data } = await axios.get(`${uri}lastnrocargos/${legajo}`)
        return data
    } catch (error) {
        console.log(error)
    }
}


export async function grabarCargo(cargoNew) {

    //console.log(cargoNew)
    try {
        //console.log(`${uri}addCargo`)
        const resu = await axios.post(`${uri}addCargo`, cargoNew)
        console.log(resu)
    } catch (error) {
        console.log(error)
    }
}

export async function grabarCargoHistorico(cargoHist, nroreg, legajo) {
    //console.log(cargoHist)
    try {
        const resu = await axios.post(`${uri}addcargoH`, cargoHist)
        if (resu.statusText === 'OK') {
            console.log('Mayonesa')
            darBajaCargo(nroreg, legajo)
        }
    } catch (error) {
        console.log(error)
    }
}


//darbajacargo
export async function darBajaCargo(nroreg, legajo) {
    //console.log(nroreg, legajo)

    try {
        const resu = await axios.put(`${uri}bajacargo/${nroreg}/${legajo}`)
        console.log(resu)
    } catch (error) {
        console.log(error)
    }
}

//modificar datos cargos
//
export async function modiCargo(nroreg, datos, archi) {
    //console.log(nroreg, datos)
    try {
        if (archi === 1) {
            const resu = await axios.put(`${uri}modiCargo/${nroreg}`, datos)
            console.log(resu)
        } else {
            const resu = await axios.put(`${uri}modiCargoH/${nroreg}`, datos)
            console.log(resu)
        }
    } catch (error) {
        console.log(error)
    }
}


//varios consulta
export async function getEdadAnio(edad) {


    try {
        //console.log(`${uri}${legajo}`)
        const data = await axios.get(`${uri}cumpleEdad/${edad}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function getAniosIngreso(anioI, tipoI) {


    try {
        //console.log(`${uri}${legajo}`)
        const data = await axios.get(`${uri}ingreanioagentes/${anioI}/${tipoI}`)
        return data
    } catch (error) {
        console.log(error)
    }
}
