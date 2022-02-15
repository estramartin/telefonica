import React from "react";
import { useNavigate,useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const EquipoFormulario =()=>{

    const navigate = useNavigate()
    const {equipoid} = useParams()
    const [equipos, setEquipos]= useState({
        modelo:'',
        estado:'',
        fecha_ingreso:'',
        codigo: '',
        marca: ''
    })

    const {modelo, estado, fecha_ingreso, codigo, marca} = equipos;

    const NuevoEquipo =()=>{

        return({
            marca: marca,
            modelo: modelo,
            fecha_ingreso : fecha_ingreso,
            estado: estado,
            codigo: codigo
        })
    }


    const AgregarEquipo=()=>{

        const nuevo = NuevoEquipo();

        axios.post(`http://127.0.0.1:8000/equipo`,nuevo).then((response)=>{
        setEquipos(response.data);
        navigate('/equipos');
        alert('Equipo agregado correctamente')

        }).catch((err)=>{

            alert( `Error al agregar el Equipo: ${err.response.data.detail}`)
        })

    }

    const EditarEquipo=()=>{

        const nuevo = NuevoEquipo()

        axios.put(`http://127.0.0.1:8000/equipo/${equipoid}`,nuevo).then((response)=>{
            navigate('/equipos');
            setEquipos(response.data)
            alert('Equipo editado correctamente')
        }).catch((err)=>{

            alert( `Error al editar el Equipo: ${err.response.data.detail}`)
        })


    }


    useEffect(()=>{

        if(equipoid){
            axios.get(`http://127.0.0.1:8000/equipo/codigo/${equipoid}`).then((response)=>{

            setEquipos(response.data)

            })
        }
    },[equipoid])

    const CambioEnFormulario =(e)=>{

        setEquipos({...equipos,[e.name]: e.value})

    }

    return(
        <>
            <h1>Agregar Equipos</h1>
            <div className="ms-5">
                <label className="ms-3 mt-5"><h5>Marca</h5></label>
                <input type="text" onChange={(e)=>{CambioEnFormulario(e.target)}} name="marca" value={marca} className="form-control form-control-lg m-2 w-50" placeholder="Ej: Nokia"/>
                <label className="ms-3 mt-3"><h5>Modelo</h5></label>
                <input type="text" onChange={(e)=>{CambioEnFormulario(e.target)}} name="modelo" value={modelo} className="form-control form-control-lg m-2 w-50" placeholder="Ej: 1100"/>
                <label className="ms-3 mt-3"><h5>Fecha de ingreso</h5></label>
                <input type="date" onChange={(e)=>{CambioEnFormulario(e.target)}} name="fecha_ingreso" value={fecha_ingreso} className="form-control form-control-lg m-2 w-25" placeholder="Ej: 2022-02-21" />

                <label className="ms-3 mt-3"><h5>Estado</h5></label>
                <select  onChange={(e)=>{CambioEnFormulario(e.target)}}  name="estado" value={estado} className="form-select w-25 m-2" aria-label="Default select example">
                    <option hidden>Seleccione un tipo</option>
                    <option value="preventa">Preventa</option>  
                    <option value="en sucursal">En Sucursal</option>  
                    <option value="vendido">Vendido</option>  
                    <option value="descompuesto">Descompuesto</option>    
                    
                </select>    
               
                <button className="btn btn-primary m-3" onClick={()=>{equipoid ? EditarEquipo() : AgregarEquipo()}} >{equipoid ? 'Editar': 'Agregar'}</button>
                <button className="btn btn-danger m-3" onClick={()=>{navigate('/equipos')}}>Cancelar</button>
            </div>




        </>
    )
}
export default EquipoFormulario