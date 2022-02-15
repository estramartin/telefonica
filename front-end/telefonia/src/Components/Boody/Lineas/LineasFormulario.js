import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const LineasFormulario = () => {

    const navigate = useNavigate()
    const { numerotel } = useParams()

    const [lineas, setLineas] = useState({
        numero: '',
        estado: ''
    })

    const { numero, estado } = lineas

    const NuevaLinea = () => {
        return {
            numero: numero,
            estado: estado
        }
    }

    const AgregarLinea = () => {

        const nueva = NuevaLinea();
        axios.post('http://localhost:8000/linea', nueva).then(() => {
            navigate('/lineas')
            alert('Linea agregada satisfactoriamente!')
        }).catch((err) => {

            alert(err.response.data.detail)
        })

    }

    const EditarLinea = () => {

        const editlinea = NuevaLinea()

        axios.put(`http://localhost:8000/linea/${numerotel}`, editlinea).then(() => {

            navigate('/lineas')
            alert('Linea Editada Correctamente')
        }).catch((er) => {

            alert(er.response.data.detail)
        })

    }

    const ModificacionEnForm = (e) => {

        setLineas({ ...lineas, [e.name]: e.value })
    }

    const Input1=()=>{

        if(numerotel){

           return <input disabled onChange={(e) => { ModificacionEnForm(e.target) }} name="numero" value={numero} className="form-control form-control-lg m-2 w-50" type="text" placeholder="ej: 5434312345678" />
        }else{

            return <input onChange={(e) => { ModificacionEnForm(e.target) }} name="numero" value={numero} className="form-control form-control-lg m-2 w-50" type="text" placeholder="ej: 5434312345678" />
        }


    }

    useEffect(() => {

        if (numerotel) {
            
            axios.get(`http://localhost:8000/linea/${numerotel}`).then(response => {
                setLineas(response.data)

            }).catch((er) => {

                alert(er.response.data.detail)
            })
        }

    }, [numerotel])



    return (
        <>
            <h1>Agregar Linea</h1>
           
           <div className="ms-5">
            <label className="ms-3 mt-5"><h5>Numero</h5></label>

            {Input1()}
          
          
            <label className="ms-3 mt-3"><h5>Estado</h5></label>

            <select  onChange={(e) => ModificacionEnForm(e.target)} className="form-select w-25 m-2" name='estado' value={estado} aria-label="Default select example">
                <option hidden>Seleccione un Estado</option>
                <option value="pendiente">Pendiente</option>
                <option value="activada">Activada</option>
                <option value="bloqueada">Bloqueada</option>
              

            </select>
           
            <button onClick={() => { numerotel ? EditarLinea() : AgregarLinea() }} className="btn btn-primary m-3"  >{numerotel ? 'Editar' : 'Agregar'} </button>
            <button onClick={() => { navigate('/lineas') }} className="btn btn-danger m-3">Cancelar</button>
            </div>

        </>
    )
}
export default LineasFormulario