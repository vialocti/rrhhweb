import React from "react";
import {Link} from 'react-router-dom'

const NavBarComponent = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark  bg-dark">
      <div className="container-fluid">
      <Link to="/">
          FCE RRHH
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/*
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/ficha">
                Inicio
              </a>
            </li>
        */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Cargos
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/nuevoCargo" className="dropdown-item" >
                    Cargo Agente
                  </Link>
                </li>
              
                <li>
                  <Link to="/interinosCargos" className="dropdown-item" >
                    Listado de Cargos Interinos
                  </Link>
                </li>
                
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Agente
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/fichaAgente" className="dropdown-item" >
                    Información Agente
                  </Link>
                </li>
                <li>
                <Link to="/nuevoAgente" className="dropdown-item" >
                    Alta
                  </Link>
                 
                </li>
               
                
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Inasistencias
              </a>
              <ul className="dropdown-menu">
              <li>
                  <Link to="/inasistencia" className="dropdown-item" >
                    Registrar Inasistencia
                  </Link>
                </li>
                <li>
                  <Link to="/licencia" className="dropdown-item" >
                    Registrar Licencia
                  </Link>
                </li>
                <li>
                  <Link to="/consuInasistencia" className="dropdown-item" >
                    Consulta Inasistencia
                  </Link>
                </li>
                <li>
                  <Link to="/consuLicencia" className="dropdown-item" >
                    Consulta Licencia
                  </Link>
                </li>
                        
                 </ul>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Consulta de Asistencia
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/horarioPersona" className="dropdown-item" >
                    Consulta por Agente
                  </Link>
                </li>
                <li>
                <Link to="/horarioClaustro" className="dropdown-item" >
                    Consulta por Claustro
                  </Link>
                </li>
                <li>
                  <Link to="/horarioArea" className="dropdown-item" >
                    Consulta por Área
                  </Link>
                </li>
                
              </ul>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/">
                Salir
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBarComponent;
