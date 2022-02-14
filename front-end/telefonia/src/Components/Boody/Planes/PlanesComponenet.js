import React from "react";
import Plan from "./Plan";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Buscador from "../Busqueda/Buscador";


const PlanesComponent = () => {

  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('')
  const [planes, setPlanes] = useState([]);

  const TraerPlanes = () => {

    axios.get('http://127.0.0.1:8000/planes/').then((response) => {

      setPlanes(response.data)

    }).catch((er) => {

      alert(er.response.data.detail)
    })

  }

  const EliminarPlan=(id)=>{

    axios.delete(`http://127.0.0.1:8000/planes/${id}`).then(()=>{
      TraerPlanes()
      alert('Plan eliminado correctamente')
    }).catch((er)=>{

      alert(er.response.data.detail)
    })

  }

  const ListarBusqueda=()=>{

     if(busqueda){ 
    axios.get(`http://127.0.0.1:8000/planes/${busqueda}`).then((response)=>{
    
    setPlanes(response.data)
    }).catch((er)=>{

      alert(er.response.data.detail)
    })
  }else{

    TraerPlanes();
  }

  }

  useEffect(() => { TraerPlanes() }, [])
  




  return (<>
  <h1>Planes</h1>
    
<button onClick={()=>{navigate('/planes/agregar')}} className="btn btn-primary">Agregar Plan</button>

<Buscador tipo='text' mensaje ="Buscar por nombre" busqueda ={busqueda} setBusqueda ={setBusqueda} listar={ListarBusqueda}/>
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Tipo</th>
          <th scope="col">Llamadas</th>
          <th scope="col">SMS</th>
          <th scope="col">GB</th>
          <th scope="col">Costo</th>
        </tr>
      </thead>
      <tbody>

        {planes.map((plan) => {

          return <Plan key={plan.nombre} plan={plan} EliminarPlan={EliminarPlan} />
        })
        }


      </tbody>
    </table>

  </>)
}
export default PlanesComponent