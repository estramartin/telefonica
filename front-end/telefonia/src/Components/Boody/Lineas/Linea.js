import React from "react";
import { useNavigate } from "react-router-dom";



const Linea =(props)=>{

const navigate = useNavigate();
        

        
return(
<>

<tr>
      <th scope="row">{props.linea.numero}</th>
      <td>{props.linea.estado}</td>
     
      <td><button className="btn btn-danger" onClick={()=>{props.EliminarLinea(props.linea.numero)}}>Eliminar</button></td>
      <td><button className="btn btn-warning" onClick={()=>{navigate(`/lineas/agregar/${props.linea.numero}`)}} >Editar</button></td> 
      
    </tr>   


    


</>
)
}
export default Linea