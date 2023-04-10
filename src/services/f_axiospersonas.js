import axios from 'axios'

const uri = 'http://200.12.136.74:4000/biometrico/'
const uric = 'http://200.12.136.74:4000/cargos/'
//const uri = 'hhtp://localhost:4000/biometrico/'
//const uric = 'http://localhost:4000/cargos/'

//datos primarios persona
export async function datosAgente(legajo) {

    let rutaag = `${uri}agente_leg/${legajo}`

    if (legajo.length > 0) {
        try {

            const response = await axios.get(rutaag)
            return response.data



        } catch (error) {
            console.log(error)
        }

    }


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





export async function grabarPersona(persona) {
    // console.log(persona)
    try {

        const resu = await axios.post(`${uric}addAgente`, persona)
        return resu

        console.warn(resu)
    } catch (error) {
        console.log(error)
    }
}


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


