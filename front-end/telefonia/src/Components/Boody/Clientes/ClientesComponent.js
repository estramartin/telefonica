import React from "react";
import Cliente from "./Cliente";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Buscador from "../Busqueda/Buscador";


const ClientesComponent = () => {

  const navigate = useNavigate()
  const [busqueda, setBusqueda] = useState('')
  const [clientes, setClientes] = useState([])



  const TraerClientes = () => {

    axios.get('http://127.0.0.1:8000/clientes/datos-clientes/').then((response) => {

      setClientes(response.data)
    }).catch((err) => {
      alert(err.response.data.detail)
    })

  }


  const ListarBusqueda = () => {

    if (busqueda) {



      axios.get(`http://127.0.0.1:8000/clientes/fecha/${busqueda}`).then(response => {


        setClientes(response.data)

      }).catch(er => {

        alert(er.response.data.detail)
      })

    }
    else {
      TraerClientes();
    }
  }


  useEffect(() => { TraerClientes() }, [])


  return (<>
    <h1>Lista de Clientes</h1>
    <button className="btn btn-primary" onClick={() => { navigate("/clientes/agregar") }}>Agregar Cliente</button>
    <div className="row">
      <div className="col-3">
        <Buscador tipo="date" mensaje="Buscar por Fecha" busqueda={busqueda} setBusqueda={setBusqueda} listar={ListarBusqueda} />
      </div>
      <div className="col-2 mt-4">
        <button className="btn btn-primary" onClick={() => { TraerClientes() }}>Todos</button>
      </div>
    </div>

    <div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Telefono</th>
            <th scope="col">Direccion</th>
            <th scope="col">Sexo</th>
            <th scope="col">Edad</th>

          </tr>
        </thead>
        <tbody>

          {clientes.map((cliente, index) => {
            return (<Cliente key={index} cliente={cliente} />)
          })
          }


        </tbody>
      </table>

    </div>

  </>)
}
export default ClientesComponent