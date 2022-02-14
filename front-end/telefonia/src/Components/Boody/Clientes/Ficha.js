import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";



const Ficha = () => {

    const navigate = useNavigate();
    const { idnombre } = useParams();

    const [cliente, setCliente] = useState([]);
    const [datoscliente, setDatosCliente] = useState([])

   

    
    const FechaNull=(date)=>{
       
        if(!date){
            return  <span className="link-success">Linea en uso</span>;
        }
        else{
            
            const fecha = new Date(date)
            return fecha.toLocaleDateString();
        }
    }  
    
    

    const EliminarCliente=(id)=>{

        axios.delete(`http://127.0.0.1:8000/clientes/${id}`).then(()=>{
    
        navigate('/clientes')
        alert("Cliente eliminado Correctamente")
    
        }).catch((er)=>{
    
          alert(er.response.data.detail)
        })
      }

    useEffect(() => { 
        
        const TraerDatos = () => {

            axios.get(`http://127.0.0.1:8000/clientes/nombre/${idnombre}`).then((response) => {
    
                setCliente(response.data)
                setDatosCliente(response.data[0].Clientes)
            }).catch((err) => {
    
                alert(err.response.data.detail)
            })
        }
        
        
        TraerDatos() }, [idnombre])


    return (
        <>
            <h1>Ficha</h1>

            <div className="row justify-content-center mb-5">
                <div className="col-10 bg-secondary">

                    <h1>{datoscliente.nombre}</h1>

                    <h4>Direccion: {datoscliente.direccion}</h4>
                    <h4>Fecha Nacimineto: {datoscliente.edad}</h4>
                    <h4>Sexo: {datoscliente.sexo}</h4>
                    <h4>Telefono: {datoscliente.telefonos}</h4>
                    <h4>Lineas asociadas: {cliente.length}</h4>

                    <div className="row justify-content-center">
                        <div className="col-4">
                            <button className="btn btn-primary me-4" onClick={() => { navigate(`/clientes/agregar/otra-linea/${datoscliente.nombre}`) }}>Asociar nueva linea</button>
                            <button className="btn btn-danger" onClick={() => { navigate('/clientes') }}>Volver</button>
                            <button className="btn btn-warning m-4" onClick={() => { navigate(`/clientes/agregar/${datoscliente.nombre}`) }}>Editar Cliente</button>
                        </div>
                    </div>
                    <hr />
                    <div  className="row justify-content-center">
                        {

                            cliente.map((datos,index) => {

                                return (
                                    
                                        <div key={index} className=" border border-3 m-5 col-5">

                                            <h3>Equipo</h3>
                                            <div className="bg-info">
                                                <h4>Equipo: {datos.Equipo.marca}  {datos.Equipo.modelo}</h4>
                                                <h4>Estado: <span className="link-success"> {datos.Equipo.estado} </span> </h4>
                                                <h4>Fecha de ingreso: {FechaNull(datos.Equipo.fecha_ingreso)}</h4>

                                            </div>
                                            <h3>Linea</h3>
                                            <div className="bg-primary">
                                                <h4>Linea: {datos.Linea.numero} </h4>
                                                <h4>Estado: <span className="link-success"> {datos.Linea.estado} </span> </h4>
                                            </div>

                                            <h3>Plan</h3>
                                            <div className="bg-info">
                                                <h4>Plan: {datos.Planes.nombre}</h4>
                                                <h4>Tipo: {datos.Planes.tipo}</h4>
                                                <h4>GBs: {datos.Planes.cant_gigas}</h4>
                                                <h4>Llamadas: {datos.Planes.cant_llamadas}</h4>
                                                <h4>SMS: {datos.Planes.cant_sms}</h4>
                                                <h4>Costo: ${datos.Planes.costo}-</h4>
                                            </div>

                                            <h3>Linea Asociada</h3>
                                            <div className="bg-primary">
                                                <h4>Fecha Inicio: {FechaNull(datos.LienaEquipoPlan.fecha_inicio)}</h4>
                                                {
                                                    <h4>Fecha Fin: {FechaNull(datos.LienaEquipoPlan.fecha_fin)}</h4>

                                                }
                                            </div>
                                                <button className="btn btn-danger m-4" onClick={()=>EliminarCliente(datos.LienaEquipoPlan.linea)}>Eliminar Linea</button>
                                              <button className="btn btn-warning m-4" onClick={() => { navigate(`/planes-equipos-lineas/agregar/${datos.LienaEquipoPlan.linea}`) }}>Editar</button>
                                        </div>
                                  
                                )

                            })


                        }
                    </div>
                    <div className="row justify-content-center mb-5">
                        <div className="col-1">
                            <button className="btn btn-danger" onClick={() => { navigate('/clientes') }}>Volver</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}
export default Ficha