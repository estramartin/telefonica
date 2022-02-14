import React from 'react';
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Inicio from './Components/Boody/Inicio/Inicio';
import LineasComponent from './Components/Boody/Lineas/LineasComponent';
import LineasFormulario from './Components/Boody/Lineas/LineasFormulario';

import ClientesComponent from './Components/Boody/Clientes/ClientesComponent';
import ClienteFormulario from './Components/Boody/Clientes/ClienteFormulario';
import Ficha from './Components/Boody/Clientes/Ficha';
import OtraLinea from './Components/Boody/Clientes/OtraLinea';

import LineasPlanesEquiposComponenet from './Components/Boody/LineasPlanesEquipos/LineasPlanesEquiposComponent';
import LineasPlanesEquiposFormulario from './Components/Boody/LineasPlanesEquipos/LineasPlanesEquiposFormulario';

import PlanesComponent from './Components/Boody/Planes/PlanesComponenet';
import PlanesFormulario from './Components/Boody/Planes/PlanesFormulario';

import EquiposComponent from './Components/Boody/Equipos/EquiposComponent';
import EquipoFormulario from './Components/Boody/Equipos/EquiposFormulario';

const RouterContent = () => {
    return (
        <BrowserRouter>

            <Header />

            <nav className="bg bg-warning">
                <Link className="btn btn-primary m-3" to="inicio">Inicio</Link>
                <Link className="btn btn-primary m-3" to="lineas">Lineas</Link>
                <Link className="btn btn-primary m-3" to="planes">Planes</Link>
                <Link className="btn btn-primary m-3" to="equipos">Equipos</Link>
                <Link className="btn btn-primary m-3" to="planes-equipos-lineas" >Lineas-Planes-Equipos</Link>
                <Link className="btn btn-primary m-3" to="clientes" >Clientes</Link>
            </nav>


            <Routes>

                <Route path="/" element={<Inicio />} />
                <Route path="/inicio" element={<Inicio />} />

                <Route path="/lineas" element={<LineasComponent />} />
                <Route path="/lineas/agregar/:numerotel" exact element={<LineasFormulario />} />
                <Route path="/lineas/agregar" exact element={<LineasFormulario />} />

                <Route path="/clientes" element={<ClientesComponent />} />
                <Route path="/clientes/agregar/:idnombre" exact element={<ClienteFormulario />} />
                <Route path="/clientes/agregar/otra-linea/:idnombre" exact element={<OtraLinea />} />
                <Route path="/clientes/agregar" exact element={<ClienteFormulario />} />
                <Route path="/clientes/ficha/:idnombre" exact element={<Ficha/>} />

                
                <Route path="/planes-equipos-lineas" exact element={<LineasPlanesEquiposComponenet />} />
                <Route path="/planes-equipos-lineas/agregar" exact element={<LineasPlanesEquiposFormulario />} />
                <Route path="/planes-equipos-lineas/agregar/:pel" exact element={<LineasPlanesEquiposFormulario />} />

                <Route path="/planes" exact element={<PlanesComponent />} />
                <Route path="/planes/agregar" exact element={<PlanesFormulario />} />
                <Route path="/planes/agregar/:nombreplan" exact element={<PlanesFormulario />} />


                <Route path="/equipos" exact element={<EquiposComponent />} />
                <Route path="/equipos/agregar" exact element={<EquipoFormulario />} />
                <Route path="/equipos/agregar/:equipoid" exact element={<EquipoFormulario />} />
            </Routes>



            <Footer />

        </BrowserRouter>
    )
}
export default RouterContent