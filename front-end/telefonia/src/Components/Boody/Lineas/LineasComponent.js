import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Linea from "./Linea";
import Buscador from "../Busqueda/Buscador";

const LineasComponent=()=>{
    const [busqueda, setBusqueda] = useState('')
    const [lineas, setLineas]= useState([])
    const navigate = useNavigate();

    const TraerLineas=()=>{

    axios.get('http://127.0.0.1:8000/linea/').then((response)=>{

        setLineas(response.data)
    }).catch((er)=>{

        alert(er.response.data.detail)
    })
        
    }


    const ListarBusqueda = () => {

        if (busqueda) {
    
                axios.get(`http://127.0.0.1:8000/linea/${busqueda}`).then(response=>{
                const nuevo = Array(response.data)
                setLineas(nuevo)
    
          }).catch(err => {
    
            alert(`Numero no encotrado: ${err.response.data.detail}`)
          })
    
        }else{
            TraerLineas()
        }
    }
   
   

    const EliminarLinea=(numero)=>{

        axios.delete(`http://127.0.0.1:8000/linea/${numero}`).then(()=>{
        TraerLineas();
        alert('Linea Eliminada')

        }).catch(err=>{

            alert(`No se puede eliminar porque la linea esta asociada a un plan y un equipo:  ${err.response.data.detail}` )

        })

    }

    useEffect(()=>{TraerLineas()},[])
    
    

    return(<>
      <h1>Lineas</h1>

<button onClick={()=>{navigate('/lineas/agregar')}} className="btn btn-primary">Agregar Linea</button>

    
    <Buscador tipo="text" mensaje="Buscar por Numero" busqueda={busqueda} setBusqueda={setBusqueda} listar={ListarBusqueda} />



<table className="table table-striped">
    <thead>
        <tr>
            <th scope="col">Numero</th>
            <th scope="col">Estado</th>
           
        </tr>
    </thead>
    <tbody>

        {lineas.map((linea) => {
            
            return <Linea key={linea.numero} linea={linea} EliminarLinea={EliminarLinea}/>
        })
        }


    </tbody>
</table>


    </>)
}
export default LineasComponent