import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ClienteFormulario = () => {

    const navigate = useNavigate();
    const { idnombre } = useParams();
    const [lineas, setLineas] = useState([]);
    const [lineasDisponibles, setLineasDisponibles] = useState([]);

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

    const TraerLineasDisponibles = () => {

        axios.get('http://127.0.0.1:8000/clientes/lineas-libres/').then((response) => {

            setLineasDisponibles(response.data)

        }).catch(er => {

            alert(`No se pudo cargar las lineas disponibles: ${er.response.data.detail}`)
        })



    }

    const AgregarCliente = () => {

        const nuevo = NuevoCliente();

        axios.post('http://127.0.0.1:8000/clientes/', nuevo).then(() => {
            alert("Cliente agregado satisfactoriamente")
            navigate('/clientes')

        }).catch((er) => {
            alert(`No se pudo agregar el cliente: ${er.response.data.detail}`)
        })

    }

    const EditarCliente = () => {
        const nuevo = NuevoCliente();
        lineas.forEach(linea => {
            axios.put(`http://127.0.0.1:8000/clientes/${linea.Clientes.lista_l_e_p}`, nuevo).then(() => {
               

            }).catch((er) => {
                alert(`No se pudo editar: ${er.response.data.detail}`)
            })
        })

        alert("Cliente editado satisfactoriamente")
        navigate('/clientes')
    }


    const Lep = (idnombre) => {

        if (!idnombre) {
            return (
                <div>
                    <label className="ms-3 mt-3"><h5>Asociar Linea</h5></label>
                    <select onChange={(e) => CambioEnFormulario(e.target)} className="form-select w-50 m-2" name='lista_l_e_p' value={lista_l_e_p} aria-label="Default select example">
                        <option hidden>Lineas</option>
                        {lineasDisponibles.map((lineas) => {
                            return <option key={lineas.LienaEquipoPlan.linea} value={lineas.LienaEquipoPlan.linea}>{lineas.Equipo.marca} {lineas.Equipo.modelo} --- Plan: {lineas.LienaEquipoPlan.plan}: ${lineas.Planes.costo} --- Numero: {lineas.LienaEquipoPlan.linea}  </option>
                        })}
                    </select>
                </div>
            )

        }


    }



    useEffect(() => {

        if (idnombre) {

            axios.get(`http://127.0.0.1:8000/clientes/nombre/${idnombre}`).then((response) => {
                setLineas(response.data)
                setCliente(response.data[0].Clientes)


            }).catch(err => {

                alert(err.response.data.detail)
            })

        }
        else {

            TraerLineasDisponibles();

        }

    }, [idnombre])

    const CambioEnFormulario = (e) => {

        setCliente({ ...cliente, [e.name]: e.value })
    }



    return (<>

        <h1>Formulario Cliente</h1>

        <div className="ms-5">
            <label className="ms-3 mt-5"><h5>Nombre</h5></label>
            <input onChange={(e) => { CambioEnFormulario(e.target) }} type="text" name="nombre" value={nombre} className="form-control form-control-lg m-2 w-50" placeholder="ej: Perez Luis Alberto" />
            <label className="ms-3 mt-3"><h5>Fehca Nacimiento</h5></label>
            <input onChange={(e) => { CambioEnFormulario(e.target) }} max={Date.now().toLocaleString()} type="date" name="edad" value={edad} className="form-control form-control-lg m-2 w-25" placeholder="ej: 21-10-2022" />
            <label className="ms-3 mt-3"><h5>Sexo</h5></label>
            <select onChange={(e) => CambioEnFormulario(e.target)} className="form-select w-25 m-2" name='sexo' value={sexo} aria-label="Default select example">
                <option hidden>Opciones</option>
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
                <option value={null}>Indefinido</option>
            </select>
            <label className="ms-3 mt-3"><h5>Direccion</h5></label>
            <input onChange={(e) => { CambioEnFormulario(e.target) }} type="text" name="direccion" value={direccion} className="form-control form-control-lg m-2 w-50" placeholder="ej: Corrientes 1200" />
            <label className="ms-3 mt-3"><h5>Telefono</h5></label>
            <input onChange={(e) => { CambioEnFormulario(e.target) }} type="text" name="telefonos" value={telefonos} className="form-control form-control-lg m-2 w-25" placeholder="ej: 3432342342" />


            {Lep(idnombre)}


            <button onClick={() => { idnombre ? EditarCliente() : AgregarCliente() }} className="btn btn-primary ms-2 mt-5 mb-5">{idnombre ? 'Editar' : 'Agregar'}</button>
            <button onClick={() => { navigate('/clientes') }} className="btn btn-danger ms-3  mt-5 mb-5">Cancelar</button>

        </div>



    </>)
}
export default ClienteFormulario