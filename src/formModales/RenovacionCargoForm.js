import * as Yup from 'yup';

import { ErrorMessage, Field, Form, Formik } from 'formik';
//import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
//import { SelectorV } from '../styles-components/formularios/FormAgente';
import { darBajaCargo, grabarCargo } from '../services/f_axioscargos';
import { useGetMaterias } from '../hooks/useGetMaterias';
import { LabelF, SelectorV } from '../styles-components/formularios/FormAgente';




const RenovacionCargoForm = ({ dato, nrocargoG, funcion }) => {



  const [nroReg, setnroReg] = useState(0)
  const [legajo, setlegajo] = useState('')
  const [actividades, setActividades] = useState([])
  //const navigate = useNavigate();

  //const [fechaB, setfechaB] = useState('')


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
    if (materias) {
      setActividades(materias.filter(materia => materia.pl == 4))
    }

  }, [dato, materias])

  const changemotivo = () => {

  }

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
  const preparardatosnuevos = async (values) => {
    let resu = await darBajaCargo(nroReg, legajo, '09', values.resubaja, values.fechabaja)
    console.log(resu.statusText)
  }


  const changeMat = () => {

  }


  const valueinitial = { fechabaja: '', fechaalta: '', resubaja: '', resualta: '', newfechabaja: '' }

  const { loading, error, materias, cargospl } = useGetMaterias()
  if (loading) return <p>Cargando datos .....</p>
  if (error) return <p>Error de Carga</p>

  return (


    <Formik
      initialValues={valueinitial}


      validationSchema={Yup.object({

        fechabaja: Yup.date()
          .typeError('YYYY-MM-DD)')
          .required(('This field is required')),

        resualta: Yup.string()
          .min(5, 'deben ser 5 al menos caracteres').max(20, 'no mas de 11 caracters')
          .required('Required'),
        resubaja: Yup.string()
          .min(5, 'deben ser 5 al menos caracteres').max(20, 'no mas de 11 caracters')
          .required('Required'),
        fechaalta: Yup.date()

          .typeError(('The value must be a date (YYYY-MM-DD)'))
          .required(('This field is required')),
        newfechabaja: Yup.string()
          .typeError(('The value must be a date (YYYY-MM-DD)'))
          .required(('This field is required')),

      })



      }


      onSubmit={(values, { setSubmitting }) => {

        preparardatosnuevos(values);
        setTimeout(() => {

          grabarNuevo(values)

          setSubmitting(false);
        }, 800);

      }

      }

    >
      <Form>

        <div className='container'>
          <div className='row'>

            <h2 className='h2'>Renovacion de Cargo </h2>

          </div>

          <div className='row'>

            <div className='col-md-3'>

              <table className='table table-striped bordered'>
                <tbody>
                  <tr>
                    <td>Legajo</td> <td>{dato ? dato.legajo : "s/d"}</td>
                  </tr>

                  <tr>
                    <td>N°Cargo</td><td>{dato ? dato.nc : "s/d"}</td>
                  </tr>

                  <tr>
                    <td>Cargo</td> <td>{dato ? dato.ca : "s/d"}</td>
                  </tr>

                </tbody>
              </table>
            </div>

            <div className='col-md-3'>

              <table className='table table-striped bordered'>
                <tbody>


                  <tr>
                    <td>Claustro</td><td>{dato ? dato.es : "s/d"}</td>
                  </tr>

                  <tr>
                    <td>PPAL</td><td>{dato ? dato.ppal : "s/d"}</td>
                  </tr>

                  <tr>
                    <td>Nivel</td><td>{dato ? dato.nv : "s/d"}</td>
                  </tr>

                </tbody>
              </table>
            </div>



            <div className='col-md-3'>

              <table className='table table-striped bordered'>
                <tbody>

                  <tr>
                    <td>Plan</td> <td>{dato ? dato.pl : "s/d"}</td>
                  </tr>

                  <tr>
                    <td>CodMat</td><td>{dato ? dato.mat : "s/d"}</td>
                  </tr>

                  <tr>
                    <td>Adicional</td> <td>{dato ? dato.ad : "s/d"}</td>
                  </tr>

                </tbody>
              </table>
            </div>

            <div className='col-md-3'>


              <table className='table table-striped bordered'>
                <tbody>

                  <tr>
                    <td>Fecha Alta</td> <td>{dato ? dato.fechaAlta : "s/d"}</td>
                  </tr>

                  <tr>
                    <td>N.Res.Alta</td> <td>{dato ? dato.nresa : "s/d"}</td>
                  </tr>
                  <tr>
                    <td>Fecha Baja</td> <td>{dato ? dato.fechaBaja : "s/d"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

          <div className='row'>
            <div className="form-group">
              <h5>Datos a Ingresar</h5>
            </div>
            <div className='col-md-3'>

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
            </div>
            <div className='col-md-3'>

              <div className="form-group">
                <label>Nueva Fecha Alta</label>
                <Field className="form-control" name="fechaalta" type="text" />
                <ErrorMessage name="fechaalta" />
              </div>
              <br />

              <div className="form-group">
                <label>Resolución de Alta</label>
                <Field className="form-control" name="resualta" type="text" />
                <ErrorMessage name="resualta" />
              </div>
            </div>


            <div className='col-md-3'>

              <div className="form-group">
                <label>Nueva Fecha Baja</label>
                <Field className="form-control" name="newfechabaja" type="text" />
                <ErrorMessage name="newfechabaja" />
              </div>
              <br />
            </div>
            <div className='col-md-3'>
              <br />
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="s/d" id="chcp" />
                <label className="form-check-label">
                  Por Cambio Plan
                </label>
              </div>
              <div>
                <LabelF htmlFor='materia'>Actividad Academica</LabelF>
                <SelectorV name="materia" id='materia' onChange={changeMat}>
                  <option>Elegir Actividad</option>
                  {actividades ?
                    actividades.map((ele, index) => (
                      <option value={ele.id_materia} key={index}>({ele.id_materia}){ele.materia}</option>
                    ))
                    : null}
                </SelectorV>

              </div>



            </div>



          </div>
          <div className='row'>

            <div className='col-md-3'>

              <br />
              <div className="form-group">

                <button className="btn btn-primary" type="submit">Renovar Cargo</button>

              </div>
            </div>
          </div>
        </div>









        {/* */}
      </Form>
    </Formik >
  );
};
export default RenovacionCargoForm