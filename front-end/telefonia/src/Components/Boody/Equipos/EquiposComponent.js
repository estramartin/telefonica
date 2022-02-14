import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Equipo from "./Equipo";
import Buscador from "../Busqueda/Buscador";


const EquiposComponent = () => {

  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('')
  const [equipos, setEequipos] = useState([])

  const TraerEquipos = () => {

    axios.get('http://127.0.0.1:8000/equipo/').then((response) => {

      setEequipos(response.data)
    }).catch((err) => {

      alert(err.response.data.detail)
    })
  }

  const EliminarEquipo=(id)=>{


    axios.delete(`http://127.0.0.1:8000/equipo/delete/${id}`).then(()=>{

      TraerEquipos()
      alert("Equipo eliminado correctamente")
    }).catch((er)=>{

      alert(er.response.data.detail)
    })

  }

  const ListarBusqueda =()=>{
   
   if(busqueda){
   
    axios.get(`http://127.0.0.1:8000/equipo/${busqueda}`).then((response)=>{
      const nuevo =response.data
      setEequipos(nuevo)
      
    }).catch((er)=>{

      alert(er.response.data.detail)
    })
  }else{

    TraerEquipos();
  }

  }

  
  useEffect(() => { TraerEquipos() }, [])
  useEffect(() => { ListarBusqueda()}, [])
  return (<>
    <div className="pt-5 pb-5">
      <h1>Lista de Equipos</h1>
      <button onClick={() => { navigate('/equipos/agregar') }} className="btn btn-primary">Agregar Equipo</button>

      <Buscador tipo={"text"} mensaje={"Buscar por marca"} busqueda ={busqueda} setBusqueda = {setBusqueda} listar ={ListarBusqueda} />

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Marca</th>
            <th scope="col">Modelo</th>
            <th scope="col">Fecha de Ingreso</th>
            <th scope="col">Estado</th>
          </tr>
        </thead>
        <tbody>
          {
            equipos.map(equipo =>{

              return <Equipo key={equipo.codigo} equipo ={equipo}  EliminarEquipo={EliminarEquipo} />

            })


          }


        </tbody>
      </table>

    </div>
  </>)
}
export default EquiposComponent