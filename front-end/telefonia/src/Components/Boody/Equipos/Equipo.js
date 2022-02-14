import React from "react";
import { useNavigate } from "react-router-dom";


const Equipo =(props)=>{

const navigate = useNavigate()

const Fecha=(date)=>{
        const fecha = new Date(date)
        return fecha.toLocaleDateString();  
} 


return(
    <>
        
<tr>
      <th scope="row">{props.equipo.marca}</th>
      <td>{props.equipo.modelo}</td>
      <td>{Fecha(props.equipo.fecha_ingreso)}</td>
      <td>{props.equipo.estado}</td>
     
      <td><button className="btn btn-danger" onClick={()=>{props.EliminarEquipo(props.equipo.codigo)}}>Eliminar</button></td>
      <td><button className="btn btn-warning" onClick={()=>{navigate(`/equipos/agregar/${props.equipo.codigo}`)}} >Editar</button></td> 
      
    </tr>   
    </>
)

}
export default Equipo