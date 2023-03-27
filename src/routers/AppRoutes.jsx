import {BrowserRouter, Route, Routes} from 'react-router-dom'

import FichaAgentePage from '../pagesComponents/fichaAgente/FichaAgentePage'
import HomePage from '../pagesComponents/comunes/HomePage'
import NavBarComponent from '../components/NavBarComponent'
import NotFoundPage from '../pagesComponents/comunes/NotFoundPage'
import React from 'react'
import NewAgente from '../pagesComponents/nuevAgente/NewAgente'
import NewCargo from '../pagesComponents/cargos/NewCargo'
import FindAreaComponent from '../pagesComponents/horarios/FindAreaComponent'
import FindClaustroComponent from '../pagesComponents/horarios/FindClaustroComponent'
import FindPersonaComponent from '../pagesComponents/horarios/FindPersonaComponent'
import InasistenciaPage from '../pagesComponents/inasistencias/InasistenciaPage'
import CargosInterinos from '../components/cargos/CargosInterinos'
import LincenciaPage from '../pagesComponents/inasistencias/LincenciaPage'
import FormEdadAgentesPage from '../pagesComponents/reportsv/FormEdadAgentesPage'
import FormIngresoAgentePage from '../pagesComponents/reportsv/FormIngresoAgentePage'

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <NavBarComponent />
        <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route exact path='/fichaAgente' element={<FichaAgentePage/>} />
            <Route exact path='/nuevoAgente' element={<NewAgente/>} />
            <Route exact path='/nuevoCargo' element={<NewCargo/>} />
            <Route exact path='/interinosCargos' element={<CargosInterinos />} />

            <Route exact path='/horarioPersona' element={<FindPersonaComponent />} />
            <Route exact path='/horarioClaustro' element={<FindClaustroComponent />} />
            <Route exact path='/horarioArea' element={<FindAreaComponent />} />

            <Route exact path='/inasistencia' element={<InasistenciaPage/>} />
            <Route exact path='/licencia' element={<LincenciaPage />} />

            <Route exact path='/edadCumple' element={<FormEdadAgentesPage />} />
            <Route exact path='/LugarIngreso' element={<FormIngresoAgentePage />} />



            <Route path='*' element={<NotFoundPage />} />

        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes