import React from "react";
import { useNavigate } from "react-router-dom";

const Cliente = (props) => {

    const FunctionEdad=()=>{
      
       const fecha = new Date(props.cliente.edad);
       const hoy = new Date()
       var edad = hoy.getFullYear() - fecha.getFullYear()
       var meses = hoy.getMonth() - fecha.getMonth();

       if (meses < 0 || (meses === 0 && hoy.getDate() < fecha.getDate())) {
           edad--;
       }
        
       return edad
    }


    const navigate = useNavigate()
    return (
        <>
            <tr>
                <th scope="row">{props.cliente.nombre}</th>
                <td>{props.cliente.telefonos}</td>
                <td>{props.cliente.direccion}</td>
                <td>{props.cliente.sexo}</td>
                <td>{FunctionEdad()}</td>

                <td><button className="btn btn-primary" onClick={() => { navigate(`/clientes/ficha/${props.cliente.nombre}`) }} >Información</button></td>
                
                
            </tr>


        </>
    )
}
export default Cliente