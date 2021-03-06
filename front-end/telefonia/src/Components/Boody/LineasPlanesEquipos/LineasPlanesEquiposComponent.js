import React from "react";
import { useNavigate } from "react-router-dom";
import LienaPlanEquipo from "./LineaPlanEquipo";
import { useEffect, useState } from "react";
import Buscador from "../Busqueda/Buscador";
import axios from "axios";

const LineasPlanesEquiposComponenet = () => {

  const navigate = useNavigate()

  const [lineaEquipoPlan, setLineaEquipoPlan] = useState([])

  const [busqueda, setBusqueda] = useState('')

  const TraerLineasEquiposPlanes = () => {

    axios.get('http://127.0.0.1:8000/linea-equipo-plan/').then((response) => {

      setLineaEquipoPlan(response.data)
    }).catch(err => {

      alert(err.response.data.detail)

    })
  }

  const ElimiarLineaEquipoPlan = (id) => {

    axios.delete(`http://127.0.0.1:8000/linea-equipo-plan/${id}`).then(() => {
      TraerLineasEquiposPlanes();
      alert("Eliminado correctamente")

    }).catch(err => {

      alert( `La Linea no se puede eliminar porque está asociada a un cliente ${err.response.data.detail}`)
    })
  }

  const ListarBusqueda = () => {
    if (busqueda) {

      axios.get(`http://127.0.0.1:8000/linea-equipo-plan/fecha/${busqueda}`).then((response) => {

        setLineaEquipoPlan(response.data);
        

      })
        .catch((error) => {

          console.log(error.response.data.detail);

        });
    }
    else {
      TraerLineasEquiposPlanes();
    }


  }


  useEffect(() => { TraerLineasEquiposPlanes() }, [])


  return (<>

    <h1>Lista de LineasPlanesEquipos</h1>

    <div>
      <button className="btn btn-primary" onClick={() => { navigate('/planes-equipos-lineas/agregar') }}>Agregar linea-equipo-plan</button>
      <div className="row">
      <div className="col-3">
        <Buscador tipo="date" mensaje="Buscar por Fecha" busqueda={busqueda} setBusqueda={setBusqueda} listar={ListarBusqueda} />
      </div>
      <div className="col-2 mt-4">
        <button className="btn btn-primary" onClick={() => { TraerLineasEquiposPlanes() }}>Todos</button>
      </div>
    </div>


      <div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Linea</th>
              <th scope="col">Plan</th>
              <th scope="col">Fecha Inicio</th>
              <th scope="col">Fecha Fin</th>
              <th scope="col">Estado linea</th>
              <th scope="col">Marca</th>
              <th scope="col">Modelo</th>
              <th scope="col">Estado equipo</th>
              <th scope="col">Costo</th>

            </tr>
          </thead>
          <tbody>

            {lineaEquipoPlan.map((lep) => {

               return (<LienaPlanEquipo key={lep.Linea.numero} lep={lep} ElimiarLineaEquipoPlan={ElimiarLineaEquipoPlan} />) 
            })
            }


          </tbody>
        </table>



      </div>
    </div>

  </>)
}
export default LineasPlanesEquiposComponenet