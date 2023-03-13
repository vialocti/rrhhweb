import axios from 'axios'


const uri = 'http://200.12.136.74:4000/cargos/'
//const uri = 'http://localhost:5000/cargos/'

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
        //console.log(resu)
    } catch (error) {
        console.log(error)
    }
}

//darbajacargo
export async function darBajaCargo(nroreg, legajo, motbj, nroresub, fechab) {
    console.log(nroreg, legajo, motbj, nroresub, fechab)

    try {
        const resu = await axios.put(`${uri}bajacargo/${nroreg}/${legajo}`, { motbj, nroresub, fechab })
        console.log(resu)
    } catch (error) {
        console.log(error)
    }
}


