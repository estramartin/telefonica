import React from "react";
import { useNavigate } from "react-router-dom";
import LienaPlanEquipo from "./LineaPlanEquipo";
import { useEffect, useState } from "react";
import Buscador from "../Busqueda/Buscador";
import axios from "axios";

const LineasPlanesEquiposComponenet = () => {

  const navigate = useNavigate()

  const [lineaEquipoPlan, setLineaEquipoPlan] = useState([])

  const [busqueda, setBusqueda] =useState('')

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

      alert(err.response.date.detail)
    })
  }

  const ListarBusqueda=()=>{
    if(busqueda){
      
        axios.get(`http://127.0.0.1:8000/linea-equipo-plan/fecha/${busqueda}`).then((response) => {
                  
                  setLineaEquipoPlan(response.data);
                  console.log(response.data)

            })
            .catch((error) => {

                console.log(error.response.data.detail);

            });
        }
        else{
          TraerLineasEquiposPlanes();
        }


}


  useEffect(() => { TraerLineasEquiposPlanes() }, [])
  useEffect(()=>{ListarBusqueda()},[]);
  
  return (<>

    <h1>Lista de LineasPlanesEquipos</h1>

    <div>
      <button className="btn btn-primary" onClick={() => { navigate('/planes-equipos-lineas/agregar') }}>Agregar linea-equipo-plan</button>
      <div className="row">
        <div className="col-5">
          <Buscador mensaje="Buscar por Fecha" tipo="date" listar ={ListarBusqueda} setBusqueda ={setBusqueda} busqueda = {busqueda}/>
      {/* <input type="date"  className="form-control form-control-lg m-2 w-100" placeholder="ej: 2022-02-23" /> */}
      </div>
      {/* <div className="col-5 mt-2">
      <button className="btn btn-primary p-2" onClick={() => { navigate('/planes-equipos-lineas/agregar') }}>Buscar</button>
     
      </div> */}
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
               
               {return <LienaPlanEquipo key={lep.Linea.numero} lep={lep} ElimiarLineaEquipoPlan={ElimiarLineaEquipoPlan} />}
            })
            }


          </tbody>
        </table>



      </div>
    </div>

  </>)
}
export default LineasPlanesEquiposComponenet