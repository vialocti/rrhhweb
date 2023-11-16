import axios from 'axios'

const uri = 'http://200.12.136.74:4000/biometrico/'
const uric = 'http://200.12.136.74:4000/cargos/'
//const uri = 'hhtp://localhost:5000/biometrico/'
//const uric = 'http://localhost:4000/cargos/'

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
    console.log(datosperant)

    try {
        console.log(`${uric}addADatosAnt`)
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
    console.log(datosAgente)
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

//###########################################################
//remplazo de los useHOok de datos
//traer datos agente para ficha
//datos principales
export async function traerAgenteApi(legajo) {
    //console.log(legajo)

    try {
        //console.log(`${urlbio}agente_leg/${legajo}`)
        const resu = await axios.get(`${uri}agente_leg/${legajo}`)
        //console.log(resu.data[0])
        return resu.data[0]


    } catch (err) {
        console.log(err)


    }


}

//datos agente 
export const traerDatosAgenteApi = async (legajo) => {
    //console.log('b')

    try {
        //
        const resu = await axios.get(`${uric}datosAgente/${legajo}`)
        //console.log(resu)
        return resu.data[0]
    } catch (err) {
        console.log(err)
    }

}


// datos contactos

export const traerDatosDomiContaAgenteApi = async (legajo) => {
    //const urlcargos='http://200.12.136.74:4000/cargos/'

    try {
        //console.log(`${urlbio}agente_leg/${legajo}`)
        const resu = await axios.get(`${uric}datosDomiContactoAgente/${legajo}`)
        //console.log(data)
        return resu.data[0]
    } catch (err) {
        console.log(err)
    }


}

//datos familia
export const traerDatosFamiliaAgenteApi = async (legajo) => {

    try {
        //console.log(`${urlbio}agente_leg/${legajo}`)
        const resu = await axios.get(`${uric}datosFamiliaAgente/${legajo}`)
        //
        return resu.data
    } catch (err) {
        console.log(err)
    }
}

//datos de estudios
export const traerDatosEstudiosAgenteApi = async (legajo) => {

    try {
        const resu = await axios.get(`${uric}estudios/${legajo}`)
        //console.log(resu.data)
        return resu.data
    } catch (error) {
        console.log(error)
    }
}

export const agregarDatosEstudio = async (values) => {
    //console.log(values)
    try {
        const resu = await axios.post(`${uric}addADatosEst`, values)
        return resu.status

    } catch (error) {
        console.log(error)
    }
}

export const modificarDatosEstudio = async (id, values) => {
    //console.log(values)
    //console.log(`${uric}modiADatosEst/${id}`)
    try {
        const resu = await axios.put(`${uric}modiADatosEst/${id}`, values)
        return resu.status
    } catch (error) {
        console.log(error)
    }
}

//utiles estudio
//titulos
export const traerDatosTitulosApi = async (legajo) => {

    try {
        const resu = await axios.get(`${uric}titulos`)
        console.log(resu.data)
        return resu.data
    } catch (error) {
        console.log(error)
    }
}


//agregar datos titulo
export const agregarDatosTitulo = async (values) => {

    try {
        const resu = await axios.post(`${uric}addTitulo`, values)
        return resu.status

    } catch (error) {
        console.log(error)
    }

}


//modificar datos titulo
export const modificarDatosTitulo = async (id, values) => {
    //console.log(values)
    //console.log(`${uric}modiADatosEst/${id}`)
    try {
        const resu = await axios.put(`${uric}modiTitulo/${id}`, values)
        return resu.status
    } catch (error) {
        console.log(error)
    }
}



//instituciones
//traerdatos
export const traerDatosInstitucionesApi = async () => {

    try {
        const resu = await axios.get(`${uric}instituciones`)
        //console.log(resu.data)
        return resu.data
    } catch (error) {
        console.log(error)
    }
}

//agregar datos instituciones
export const agregarDatosInstitucion = async (values) => {

    try {
        const resu = await axios.post(`${uric}addInstitucion`, values)
        return resu.status

    } catch (error) {
        console.log(error)
    }

}

//modificar datos institucion
export const modificarDatosInstitucion = async (id, values) => {
    //console.log(values)
    //console.log(`${uric}modiADatosEst/${id}`)
    try {
        const resu = await axios.put(`${uric}modiInstitucion/${id}`, values)
        return resu.status
    } catch (error) {
        console.log(error)
    }
}


//establecimientos
export const traerDatosEstablecimientosApi = async (insti) => {

    try {
        const resu = await axios.get(`${uric}establecimientos/${insti}`)
        console.log(resu.data)
        return resu.data
    } catch (error) {
        console.log(error)
    }
}

//agregar datos establecimiento
export const agregarDatosEstablecimiento = async (values) => {

    try {
        const resu = await axios.post(`${uric}addEstablecimiento`, values)
        return resu.status

    } catch (error) {
        console.log(error)
    }

}

//modificar datos institucion
export const modificarDatosEstablecimiento = async (id, values) => {
    //console.log(values)
    //console.log(`${uric}modiADatosEst/${id}`)
    try {
        const resu = await axios.put(`${uric}modiEstablecimiento/${id}`, values)
        return resu.status
    } catch (error) {
        console.log(error)
    }
}



//datos antiguedad

export const traerDatosAntiguedadAgenteApi = async (legajo) => {

    //const urlcargos = 'http://200.12.136.74:4000/cargos/'

    try {
        //console.log(`${urlbio}agente_leg/${legajo}`)
        const resu = await axios.get(`${uric}datosAntiguedadAgente/${legajo}`)
        //console.log(data)
        return resu.data[0]
    } catch (err) {
        console.log(err)
    }


}


