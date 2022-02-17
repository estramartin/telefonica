import React from "react";
import { useNavigate } from "react-router-dom";

const LienaPlanEquipo =(props)=>{


    const FechaNull=(date)=>{
       
        if(!date){
            return  <span className="link-success">Linea en uso</span>;
        }
        else{
            
            const fecha = new Date(date)
            return fecha.toLocaleDateString();
        }
    }  
    const navigate = useNavigate()
    return(
        <>
         <tr>
                 <th scope="row">{props.lep.Linea.numero}</th>
                <td>{props.lep.Planes.nombre}</td>
                <td>{FechaNull(props.lep.LienaEquipoPlan.fecha_inicio)}</td>
                <td>{FechaNull(props.lep.LienaEquipoPlan.fecha_fin)}</td>
                <td>{props.lep.Linea.estado}</td>
                <td>{props.lep.Equipo.marca}</td>
                <td>{props.lep.Equipo.modelo}</td>
                <td>{props.lep.Equipo.estado}</td>
                <td>${props.lep.Planes.costo}-</td>     
                <td><button className="btn btn-danger" onClick={() => { props.ElimiarLineaEquipoPlan(props.lep.LienaEquipoPlan.linea) }}>Eliminar</button></td>
                <td><button className="btn btn-warning" onClick={() => { navigate(`/planes-equipos-lineas/agregar/${props.lep.LienaEquipoPlan.linea}`) }} >Editar</button></td> 

            </tr>
        
        </>
    )

}
export default LienaPlanEquipo