import axios from 'axios'


const uri = 'http://200.12.136.74:4000/cargos/'
const urib = 'http://200.12.136.74:4000/biometrico/'
//const uri = 'http://localhost:5000/cargos/'
//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
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
        return resu
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
            await darBajaCargo(nroreg, legajo)
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
        //console.log(resu)
    } catch (error) {
        console.log(error)
    }
}

//modificar datos cargos
//
export async function modiCargo(nroreg, datos, archi) {
    console.log(nroreg, datos, archi)
    try {
        if (archi === 1) {
            const resu = await axios.put(`${uri}modiCargo/${nroreg}`, datos)
            return resu
        } else {
            const resu = await axios.put(`${uri}modiCargoH/${nroreg}`, datos)
            return resu
        }
    } catch (error) {
        console.log(error)
    }
}

//eleminar Cargo historico
export async function EliminarCargoH(legajo, nroreg) {
    //console.log(nroreg, datos,archi)
    try {

        const resu = await axios.get(`${uri}/bajacargohistorico/${legajo}/${nroreg}`)

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

export async function getLicenciasReporte(fecha_i, fecha_f) {


    try {
        //console.log(`${uri}${legajo}`)
        const data = await axios.get(`${urib}licencias/${fecha_i}/${fecha_f}`)

        return data.data
    } catch (error) {
        console.log(error)
    }
}

export async function getLicenciaM(legajo, nc, ncg) {

    console.log(legajo, nc, ncg)

    try {
        //console.log(`${uri}${legajo}`)
        const data = await axios.get(`${urib}licenciaMuestra/${legajo}/${nc}/${ncg}`)
        console.log(data.data)
        return data.data
    } catch (error) {
        console.log(error)
    }
}



export async function getInasistenciasReporte(fecha_i, fecha_f) {


    try {
        //console.log(`${uri}${legajo}`)
        const data = await axios.get(`${urib}inasistencias/${fecha_i}/${fecha_f}`)

        return data.data
    } catch (error) {
        console.log(error)
    }
}


export async function grabarAdicionalFC(values) {

    console.log(values)
    try {
        //console.log(`${uri}addCargo`)
        const resu = await axios.post(`${uri}addAdicionalFC`, values)
        console.log(resu)
        return resu
    } catch (error) {
        console.log(error)
    }
}

//traer datos adicional agente
export async function getAdicionalAgente(legajo) {


    try {
        //console.log(`${uri}${legajo}`)
        const data = await axios.get(`${uri}adicionalagente/${legajo}`)

        return data.data
    } catch (error) {
        console.log(error)
    }
}

//borrar un dato de adicional /deladicional/:id/:legajo
export async function deleteAdicionalAgente(id, legajo) {
    try {
        const resu = await axios.delete(`${uri}deladicional/${id}/${legajo}`)
        return resu
    } catch (error) {
        console.log(error)
    }
}

//baja adicional
export async function bajaAdicionalAgente(id) {
    let dato = {
        vigente: 'N',
    }
    try {
        const resu = await axios.put(`${uri}/bajaAdicional/${id}`, dato)
        return resu
    } catch (error) {
        console.log(error)
    }
}

//cargos contemporaneos
export const traerCargosAgenteApi = async (legajo) => {


    try {

        const resu = await axios.get(`${uri}cargosvigentes/${legajo}`)
        //console.log(data)
        return resu.data
    } catch (err) {
        console.log(err)

    }

}

//cargos History
export const traerCargosHAgenteApi = async (legajo) => {

    try {

        const resu = await axios.get(`${uri}cargoshistoricos/${legajo}`)

        return resu.data
    } catch (err) {
        console.log(err)
    }

}


//
//borrar un establecimiento /delEstablecimineto/:id
export async function deleteEstablecimiento(id) {
    console.log(id)
    try {
        const resu = await axios.delete(`${uri}delEstablecimiento/${id}`)
        console.log(resu)
        return resu

    } catch (error) {
        console.log(error)
    }
}

//borrar una institucion /delInstitucion/:id
export async function deleteInstitucion(id) {
    try {
        const resu = await axios.delete(`${uri}delInstitucion/${id}`)
        return resu
    } catch (error) {
        console.log(error)
    }
}

//borrar un titulo /delTitulo/:id/
export async function deleteTitulo(id) {
    try {
        const resu = await axios.delete(`${uri}delTitulo/${id}`)
        return resu
    } catch (error) {
        console.log(error)
    }
}


//borrar un dato estudio /delADatoEst/:id/:legajo
export async function deleteDatoEstudio(id, legajo) {
    try {
        const resu = await axios.delete(`${uri}delADatoEst/${id}/${legajo}`)
        return resu
    } catch (error) {
        console.log(error)
    }
}