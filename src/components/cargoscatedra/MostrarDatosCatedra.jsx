import React, { useEffect } from 'react'

const MostrarDatosCatedra = ({datoscatedra}) => {
  
  useEffect(()=>{
    console.log(datoscatedra)
  },[])
  
  return (
    <div className='container'>
      <div className="row" style={{marginTop:'30px'}}>
        
        <h2>Informacion Datos Catedra</h2>
      </div>
      <div className="row">
        <table>
          <thead className='table table-striped bordered'>
            <tr>
              <th>Sede</th>
              <th>Legajo</th>
              <th>Docente</th>
              <th>Cargo</th>
              <th>PPal</th>
              <th>Nivel</th>
            </tr>
          </thead>
          <tbody>
            {datoscatedra.map((ele,index)=>

            <tr key={index}>
              <td>{ele.inst}</td>
              <td>{ele.legajo}</td>
              <td>{ele.apellido}</td>
              <td>{ele.cargo}</td>
              <td>{ele.ppal}</td>
              <td>{ele.nv}</td>
            </tr>
            )}
            </tbody>
        </table>
        </div>
    </div>
  )
}

export default MostrarDatosCatedra