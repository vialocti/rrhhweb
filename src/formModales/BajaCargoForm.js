import * as Yup from 'yup';

import { ErrorMessage, Field, Form, Formik } from 'formik';
//import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { SelectorV } from '../styles-components/formularios/FormAgente';
import { darBajaCargo, grabarCargo } from '../services/f_axioscargos';
import Swal from 'sweetalert2';




const BajaCargoForm = ({ dato, nrocargoG, funcion }) => {



  const [nroReg, setnroReg] = useState(0)
  const [legajo, setlegajo] = useState('')
  //const navigate = useNavigate();

  const [motivoB, setMotivoB] = useState('01')


  //console.log(dato)
  //console.log(nrocargoG)
  const convFecha = (fecha) => {
    let fechaC = fecha.substring(6, 10) + "-" + fecha.substring(3, 5) + "-" + fecha.substring(0, 2)

    return fechaC
  }

  useEffect(() => {

    if (dato) {
      setnroReg(dato.row_id)
      setlegajo(dato.legajo)

    }


  }, [dato])

  const changemotivo = () => {
    setMotivoB(document.getElementById('motibaja').value)

  }
  /*
    const grabarNuevo = async (values) => {
      console.log(values)
      let cargoNew = {
        legajo: dato.legajo,
        ncargo: dato.nc,
        sede: dato.inst,
        tcargo: dato.ca,
        claustro: dato.es,
        ppal: dato.ppal,
        nivel: dato.nv,
        adic: dato.ad,
        plan: dato.pl,
        codmat: dato.mat,
        fechaA: values.fechaalta,
        nroresA: values.resualta,
        fechaB: values.newfechabaja,
        ncg: nrocargoG.nroCg + 1,
        titu: dato.titular
  
      }
      let resu = await grabarCargo(cargoNew)
      console.log(resu.statusText)
      funcion()
      //navigate('/fichaAgente')
  
    }
    */

  const darBaja = async (values) => {
    let resu = await darBajaCargo(nroReg, legajo, motivoB, values.resubaja, values.fechabaja)
    funcion()
  }
  const preparardatosnuevos = (values) => {


    Swal
      .fire({
        title: `Agente Legajo:${legajo}`,
        text: `Dar de Baja el Cargo`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: "Sí? ",
        cancelButtonText: "Cancelar",
      })
      .then(resultado => {
        if (resultado.value) {
          // Hicieron click en "Sí"
          darBaja(values)



        } else {
          // Dijeron que no


        }
      });

  }

  const valueinitial = { fechabaja: '', resubaja: '' }



  return (


    <Formik
      initialValues={valueinitial}

      validationSchema={Yup.object({
        fechabaja: Yup.string()
          .min(10, 'deben ser 10 caracteres').max(10, 'deben ser 10 caracters')
          .required('Required'),

        resubaja: Yup.string()
          .min(5, 'deben ser 5 al menos caracteres').max(20, 'no mas de 11 caracters')
          .required('Required'),



      })}
      onSubmit={(values, { setSubmitting }) => {


        setTimeout(() => {

          preparardatosnuevos(values);

          setSubmitting(false);
        }, 800);

      }

      }

    >
      <Form>

        <div className='container'>
          <div className='row'>

            <h2 className='h2'>Baja de Cargo </h2>

          </div>

          <div className='row'>

            <div className='col-md-3'>

              <div className="form-group">
                <h5>Datos Cargo</h5>
              </div>
              <br />
              <table className='table table-striped bordered'>
                <tbody>
                  <tr>
                    <td>Legajo</td> <td>{dato ? dato.legajo : null}</td>
                  </tr>

                  <tr>

                    <td>N°Cargo</td><td>{dato ? dato.nc : null}</td>
                  </tr>

                  <tr>
                    <td>Cargo</td> <td>{dato ? dato.ca : null}</td>
                  </tr>

                  <tr>
                    <td>Claustro</td><td>{dato ? dato.es : null}</td>
                  </tr>

                  <tr>
                    <td>PPAL</td><td>{dato ? dato.ppal : null}</td>
                  </tr>

                  <tr>
                    <td>Nivel</td><td>{dato ? dato.nv : null}</td>
                  </tr>
                  <tr>
                    <td>Plan</td> <td>{dato ? dato.pl : null}</td>
                  </tr>

                  <tr>
                    <td>CodMat</td><td>{dato ? dato.mat : null}</td>
                  </tr>

                  <tr>
                    <td>Adicional</td> <td>{dato ? dato.ad : null}</td>
                  </tr>

                  <tr>
                    <td>Fecha Alta</td> <td>{dato ? dato.fechaAlta : null}</td>
                  </tr>

                  <tr>
                    <td>N.Res.Alta</td> <td>{dato ? dato.nresa : null}</td>
                  </tr>
                  <tr>
                    <td>Fecha Baja</td> <td>{dato ? dato.fechaBaja : null}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className='col-md-1'>

            </div>


            <div className='col-md-3'>

              <div className="form-group">
                <h5>Datos a Ingresar</h5>
              </div>
              <br />
              <div className="form-group">
                <label>Fecha de Baja</label>
                <Field className="form-control" name="fechabaja" type="text" />
                <ErrorMessage name="fechabaja" />
              </div>
              <br />

              <div className="form-group">
                <label>Resolución Baja</label>
                <Field className="form-control" name="resubaja" type="text" />
                <ErrorMessage name="resubaja" />
              </div>
              <br />
              <label htmlFor='motibaja'>Motivo Baja</label>
              <div className="form-group">
                <SelectorV name="motibaja" id='motibaja' onChange={changemotivo}>
                  <option value="01">Término de Funciones</option>
                  <option value="02">Renuncia</option>
                  <option value="03">Cesantia</option>
                  <option value="04">Prescindibilidad</option>
                  <option value="05">Exoneración</option>
                  <option value="06">Jubilación</option>
                  <option value="07">Traslado</option>
                  <option value="08">Edad límite</option>
                  <option value="10">Fallecimiento</option>

                </SelectorV>
              </div>
              <br />
              <br />
              <div className="form-group">


                <button className="btn btn-primary" type="submit">Baja de Cargo</button>

              </div>





            </div>
            <div className='col-md-1'>

            </div>


            <div className='col-md-3'>
              <div className="form-group">
                <br />
              </div>
              <br />






            </div>



          </div>


        </div>




        {/* */}
      </Form>
    </Formik>
  );
};
export default BajaCargoForm