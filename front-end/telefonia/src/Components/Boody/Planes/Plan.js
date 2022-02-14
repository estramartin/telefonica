import React from "react";
import { useNavigate } from "react-router-dom";

const Plan = (props) => {

    const navigate = useNavigate();
    return (
        <>
            <tr>
                <th scope="row">{props.plan.nombre}</th>
                <td>{props.plan.tipo}</td>
                <td>{props.plan.cant_llamadas}</td>
                <td>{props.plan.cant_sms}</td>
                <td>{props.plan.cant_gigas}</td>
                <td>{props.plan.costo}</td>    
                <td><button className="btn btn-danger" onClick={() => { props.EliminarPlan(props.plan.nombre) }}>Eliminar</button></td>
                <td><button className="btn btn-warning" onClick={() => { navigate(`/planes/agregar/${props.plan.nombre}`) }} >Editar</button></td>

            </tr>

        </>
    )
}
export default Plan