import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const PlanesFormulario = () => {

    const navigate = useNavigate();
    const { nombreplan } = useParams();

    const [planes, setPlanes] = useState({
        tipo: '',
        cant_llamadas: 0,
        cant_sms: 0,
        cant_gigas: 0,
        nombre: '',
        costo: 0

    })

    const { tipo, cant_llamadas, cant_sms, cant_gigas, costo, nombre } = planes

    const NuevoPlan = () => {

        return ({
            tipo: tipo,
            cant_llamadas: cant_llamadas,
            cant_sms: cant_sms,
            cant_gigas: cant_gigas,
            nombre: nombre,
            costo: costo


        })
    }

    const AgregarPlan = () => {

        const nuevo = NuevoPlan()
        console.log(nuevo)
        axios.post(`http://127.0.0.1:8000/planes`, nuevo).then(() => {
            navigate('/planes')
            alert('Plan agregado correctamente')
        }).catch((err) => {

            alert( `Error al agregar el plan: ${err.response.data.detail}`)
        })
    }

    const EditarPlan = () => {
        const nuevo = NuevoPlan()
        axios.put(`http://127.0.0.1:8000/planes/${nombreplan}`, nuevo).then(() => {
            navigate('/planes')
            alert('Plan editado correctamente')
        }).catch((err) => {

            alert( `Error al editar el plan: ${err.response.data.detail}`)
        })

    }

    const CambioEnFormulario = (e) => {

        setPlanes({ ...planes, [e.name]: e.value })
    }


    useEffect(() => {
        if (nombreplan) {

            axios.get(`http://127.0.0.1:8000/planes/${nombreplan}`).then((response) => {
                setPlanes(response.data)
            }).catch((er) => {

                alert(er.response.data.detail)
            })
        }
    }, [nombreplan])

    return (
        <>
            <h1>Agregar Plan</h1>

            <div className="ms-5">
                <label className="ms-3 mt-5"><h5>Nombre</h5></label>
                <input onChange={(e) => { CambioEnFormulario(e.target) }} type="text" name="nombre" value={nombre} className="form-control form-control-lg m-2 w-50" placeholder="ej: Max" />
                <label className="ms-3 mt-3"><h5>Cantidad de llamadas</h5></label>
                <input onChange={(e) => { CambioEnFormulario(e.target) }} type="text" name="cant_llamadas" value={cant_llamadas} className="form-control form-control-lg m-2 w-25" placeholder="ej: 200" />
                <label className="ms-3 mt-3"><h5>Cantidad de SMS</h5></label>
                <input onChange={(e) => { CambioEnFormulario(e.target) }} type="text" name="cant_sms" value={cant_sms} className="form-control form-control-lg m-2 w-25" placeholder="ej: 5000" />
                <label className="ms-3 mt-3"><h5>Cantidad de GB</h5></label>
                <input onChange={(e) => { CambioEnFormulario(e.target) }} type="text" name="cant_gigas" value={cant_gigas} className="form-control form-control-lg m-2 w-25" placeholder="ej: 4" />
                <label className="ms-3 mt-3"><h5>Costo</h5></label>
                <input onChange={(e) => { CambioEnFormulario(e.target) }} type="text" name="costo" value={costo} className="form-control form-control-lg m-2 w-25" placeholder="ej: 700" />

                <select onChange={(e) => CambioEnFormulario(e.target)} className="form-select w-25 m-2 mt-3" name='tipo' value={tipo} aria-label="Default select example">
                    <option hidden defaultValue="prepago">Seleccione un tipo</option>
                    <option value="prepago">Prepago</option>
                    <option value="tarjeta">Tarjeta</option>


                </select>
                <button onClick={() => { nombreplan ? EditarPlan() : AgregarPlan() }} className="btn btn-primary m-3">{nombreplan ? 'Editar' : 'Agregar'}</button>
                <button onClick={() => { navigate('/planes') }} className="btn btn-danger m-3">Cancelar</button>



            </div>
        </>

    )


}
export default PlanesFormulario