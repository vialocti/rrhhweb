import axios from 'axios'

const uri = 'http://200.12.136.74:4000/biometrico/'
const uric = 'http://200.12.136.74:4000/cargos/'
//const uri = 'hhtp://localhost:5000/biometrico/'
//const uric = 'http://localhost:5000/cargos/'

//datos primarios persona
export async function datosAgente(legajo) {

    let rutaag = `${uri}agente_leg/${legajo}`


    //if (legajo.length > 0) {
    try {

        const response = await axios.get(rutaag)

        return response.data



    } catch (error) {
        console.log(error)
    }

    //}


}

//buscar agente por patron de nombre

export async function buscaragente_patron(patronb) {



    let rutaag = `${uri}agente_name/${patronb}`

    if (patronb.length > 0) {
        try {

            const response = await axios.get(rutaag)
            return response.data



        } catch (error) {
            console.log(error)
        }

    }
}

export async function traerAgentes() {
    let ruta = `${uri}activos`

    await axios.get(ruta)
        .then(response => {
            console.log(response)
            return response.data
        })
        .catch(error => {
            console.log(error)
        })


}


//datos persona principal
//agregar persona

export async function grabarPersona(persona) {
    //console.log(persona)
    try {

        const resu = await axios.post(`${uric}addAgente`, persona)
        //console.log(resu.status)
        return resu.status


    } catch (error) {
        console.log(error)
    }
}

//lugar cod
export async function traerCodLugar() {
    try {
        const rows = await axios.get(`${uric}traerLoc`)
        return rows.data
    } catch (error) {
        console.log(error)
    }
}
//modificar datos persona

export async function modificarPersona(legajo, persona) {
    //console.log(persona)
    try {

        const resu = await axios.put(`${uric}modiAgente/${legajo}`, persona)
        //console.log(resu.status)
        return resu.status


    } catch (error) {
        console.log(error)
    }
}



//datos personales
//agregar datos personales
export async function grabarDatosPer(datosper) {
    try {
        const resu = await axios.post(`${uric}addADatosPer`, datosper)
        return resu.status
    } catch (error) {
        console.log(error)
    }
}

//modificar datos personales

export async function modificarDatosPer(legajo, datosper) {
    try {
        const resu = await axios.put(`${uric}modiADatosPer/${legajo}`, datosper)
        return resu.status
    } catch (error) {
        console.log(error)
    }
}



//datos contactos
//agregar datos personales domi
export async function grabarDatosPerDomi(datosperdomi) {

    try {
        const resu = await axios.post(`${uric}addADatosCont`, datosperdomi)

        return resu.status
    } catch (error) {
        console.log(error)
    }
}

//modificar datos personales domi

export async function modificarDatosPerDomi(legajo, datosperdomi) {
    try {
        const resu = await axios.put(`${uric}modiADatosCont/${legajo}`, datosperdomi)
        return resu.status
    } catch (error) {
        console.log(error)
    }
}


//datos antiguedad
//agregar datos antiguedad
export async function grabarDatosAntiguedad(datosperant) {
    try {
        const resu = await axios.post(`${uric}addADatosAnt`, datosperant)
        return resu.status
    } catch (error) {
        console.log(error)
    }
}

//modificar datos antig

export async function modificarDatosAntiguedad(legajo, datosperant) {
    try {
        const resu = await axios.put(`${uric}modiADatosAnt/${legajo}`, datosperant)
        return resu.status
    } catch (error) {
        console.log(error)
    }
}


//datos familiares
//agregar datos familiares
export async function grabarDatosFamiliar(datosfam) {
    try {
        const resu = await axios.post(`${uric}addADatosFam`, datosfam)
        return resu.status
    } catch (error) {
        console.log(error)
    }
}

//modificar datos familiares

export async function modificarDatosFamiliar(id, datosfam) {
    try {
        const resu = await axios.put(`${uric}modiADatosFam/${id}`, datosfam)
        return resu.status
    } catch (error) {
        console.log(error)
    }
}

///=============================



//modificar asistencia persona
export async function asistenciaPersona(claustro, fechaini, fechafin, legajo) {
    var fecfin = ''
    try {
        if (fechafin === '0000-00-00' || fechafin === '') {
            fecfin = fechaini
        } else {
            fecfin = fechafin
        }

        const response = await axios({
            url: uri + `/asistencia_p/${claustro}/${fechaini}/${fecfin}/${legajo}`,
            method: "GET"
        })


        return response
    } catch (error) {
        console.log(error)

    }
}





