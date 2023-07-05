import * as Yup from 'yup';

import { ErrorMessage, Field, Form, Formik } from 'formik';

import React from 'react';
import axios from 'axios'

import { Label } from '../styles-components/formularios/FormAgente';

const SignupForm1 = ({ dato, funcion }) => {



  //verificar datos
  const verificardatos = (he, hs) => {

    let valoresAceptados = /^[0-9]+$/

    let hhe = he.substring(0, 2)
    let hhs = hs.substring(0, 2)
    let mhe = he.substring(3, 5)
    let mhs = hs.substring(3, 5)
    let dpe = he.substring(2, 3)
    let dps = hs.substring(2, 3)
    if (dpe !== ':') { dpe = ':' }
    if (dps !== ':') { dps = ':' }

    if (hhe.match(valoresAceptados) && hhs.match(valoresAceptados) && mhe.match(valoresAceptados) && mhs.match(valoresAceptados)) {
      if (parseInt(hhe) > 23 || parseInt(hhs) > 23 || parseInt(hhe) < 0 || parseInt(hhs) < 0) {
        alert('Error, El rango de la hora es de 0 a 23')
        return "1"
      } else if (parseInt(mhe) > 59 || parseInt(mhs) > 59 || parseInt(mhe) < 0 || parseInt(mhs) < 0) {
        alert('Error, El rango de los minutos es de 0 a 59')
        return "1"

      } else {
        if (parseInt(hhs + mhs) - parseInt(hhe + mhe) > 5) {
          let horaes = hhe + dpe + mhe + "/" + hhs + dps + mhs
          return horaes
        } else {
          alert("Error Salida debe ser mayor en 5 minutos a Entrada ")
          return "1"
        }
      }
    } else {

      alert('Hay Caracteres no aceptado para el horario')
      return "1"
    }
  }


  //grabar modificaciones de horario

  const grabarModificaciones = async (uri) => {
    //console.log(uri)

    try {

      const { resu } = await axios.get(`http://${uri}`)
      funcion()
    } catch (error) {
      console.log(error)
    }

  }

  const cerrar = () => {

    //setValores()
    funcion()
  }

  return (
    <Formik
      initialValues={{ hentrada: '00:00', hsalida: '00:00' }}

      validationSchema={Yup.object({
        hentrada: Yup.string()
          .min(5, 'deben ser 5 caracteres').max(5, 'deben ser 5 caracteres')
          .required('Required'),
        hsalida: Yup.string()
          .min(5, 'deben ser 5 caracteres').max(5, 'deben ser 5 caracteres')
          .required('Required'),

      })}
      onSubmit={(values, { setSubmitting }) => {

        let uri = `200.12.136.74:4000/biometrico/asistenciaUpdate/${dato.legajo}/${dato.nroregistro}`
        let valido = verificardatos(values.hentrada, values.hsalida)
        if (valido !== "1") {

          setTimeout(() => {
            //console.log(`${uri}/${valido}`)

            grabarModificaciones(`${uri}/${valido}`)

            setSubmitting(false);
          }, 400);
        }



      }



      }
    >



      <Form>
        <div className="container">

          <div className="row">

            <div className='col-md-6'>
              <h3>Modificacion Horario Colaborador</h3>
            </div>
            <div className='col-md-3'></div>

            <div className='col-md-1'>
              <button onClick={cerrar} className='btn btn-info'>
                Cerrar
              </button>
            </div>

          </div>
          <br />
          <div className="row">

            <div className="col-md-4">

              <div className="form-group">
                <h4>DATOS REGISTRO</h4>

              </div>
              <div className="form-group">
                <Label>LEGAJO: {dato ? dato.legajo : null}</Label>

              </div>

              <div className="form-group">
                <Label>NOMBRE: {dato ? dato.apellido : null}</Label>


              </div>

              <div className="form-group">
                <Label>FECHA ASISTENCIA: {dato ? dato.fecha : null}</Label>

              </div>

              <div className="form-group">
                <Label>HORARIO INGRESO: {dato ? dato.Hentrada : null}</Label>

              </div>

              <div className="form-group">
                <Label>HORARIO SALIDA: {dato ? dato.Hsalida : null}</Label>

              </div>
            </div>

            <div className='col-md-1'>

            </div>

            <div className="col-md-4">

              <div className='form-group'>
                <h4>INGRESE NUEVO HORARIO</h4>

              </div>

              <div className="form-group">
                <Label htmlFor="hentrada">Horario de Ingreso</Label>
                <Field className="form-control" name="hentrada" type="text" />
                <ErrorMessage name="hentrada" />
              </div>


              <div className="form-group">
                <Label htmlFor="hsalida">Horario de Salida</Label>
                <Field className="form-control" name="hsalida" type="text" />
                <ErrorMessage name="hsalida" />
              </div>
              <br />
              <div className="form-group">

                <button className="btn btn-primary" type="submit">Modificar</button>

              </div>

            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
};
export default SignupForm1