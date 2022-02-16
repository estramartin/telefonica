import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const OtraLinea = () => {

    const { idnombre } = useParams();
    const navigate = useNavigate();
    const [lineasDisponibles, setLineasDisponibles]= useState([]);
    const [cliente, setCliente] = useState({
        direccion: '',
        edad: '',
        lista_l_e_p: 0,
        nombre: '',
        sexo: '',
        telefonos: 0
    })

    const { direccion, edad, lista_l_e_p, nombre, sexo, telefonos } = cliente

    const NuevoCliente = () => {
        return ({
            direccion: direccion,
            edad: edad,
            lista_l_e_p: lista_l_e_p,
            nombre: nombre,
            sexo: sexo,
            telefonos: telefonos
        })
    }

    const TraerLineasDisponibles=()=>{

        axios.get('http://127.0.0.1:8000/clientes/lineas-libres/').then((response)=>{

            setLineasDisponibles(response.data)
            
        }).catch(er=>{

            alert(er.response.data.detail)
        })



    }

    const AgregarCliente=()=>{

        const nuevo = NuevoCliente();

        axios.post('http://127.0.0.1:8000/clientes', nuevo).then(()=>{
        alert("Linena agregado satisfactoriamente")
        navigate('/clientes')

        }).catch((er)=>{
            alert(er.response.data.detail)
        })

    }



    useEffect(() => {
        TraerLineasDisponibles();
        
        axios.get(`http://127.0.0.1:8000/clientes/nombre/${idnombre}`).then((response) => {

            setCliente(response.data[0].Clientes)
        }).catch(err => {

            alert(err.response.data.detail)
        })


    }, [idnombre])

    const CambioEnFormulario=(e)=>{

        setCliente({...cliente,[e.name]: e.value})
    }

 
    return (
        <>
            <h1>Asociar otra Linea a {nombre}</h1>
            <div className="ms-5 mt-5">
                <label  className="ms-3"><h5>Asociar Linea</h5></label>
                    <select  onChange={(e) => CambioEnFormulario(e.target)} className="form-select w-50 m-2" name='lista_l_e_p' value={lista_l_e_p} aria-label="Default select example">
                    <option hidden>Lineas</option>
                    {lineasDisponibles.map((lineas) => { 
                    return <option key={lineas.LienaEquipoPlan.linea} value={lineas.LienaEquipoPlan.linea}>{lineas.Equipo.marca} {lineas.Equipo.modelo} --- Plan: {lineas.LienaEquipoPlan.plan}: ${lineas.Planes.costo} --- Numero: {lineas.LienaEquipoPlan.linea}  </option> 
                    })}                             
                </select>

                <button onClick={() => {AgregarCliente()}} className="btn btn-primary m-3">{'Agregar'}</button>
                <button onClick={() => { navigate('/clientes') }} className="btn btn-danger m-3">Cancelar</button>
            </div>

        </>
    )
}
export default OtraLinea