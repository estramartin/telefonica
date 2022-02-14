import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const LineasPlanesEquiposFormulario = () => {
    const navigate = useNavigate()
    const { pel } = useParams()
    

    const [equipos, setEquipos] = useState([])
    const [lineas, setLineas] = useState([])
    const [planes, setPlanes] = useState([])
    const [lineasEquiposPlanes, setLineasEquiposPlanes] = useState({
        linea: 0,
        plan: "",
        fecha_fin: null,
        equipo: 0,
        fecha_inicio: '',
        costo: 0
    })

    const { linea, plan, fecha_fin, equipo, fecha_inicio, costo } = lineasEquiposPlanes

    const TraerPlanes = async () => {

        
            await axios.get('http://127.0.0.1:8000/planes/').then((response) => {

                setPlanes(response.data)

            }).catch((er) => {

                alert(er.response.data.detail)
            })

    }

    const TraerLineas =async () => {

        await axios.get('http://127.0.0.1:8000/linea-equipo-plan/lieas-disponibles/').then((response) => {

            setLineas(response.data);
           
        }).catch((er) => {

            alert(er.response.data.detail)
        })

    }

    const TraerEquipos  =async () => {

        
        if(pel){
            await axios.get(`http://127.0.0.1:8000/linea-equipo-plan/equipos-disponibles/${pel}`).then((response) => {
    
          setEquipos(response.data)
         
        }).catch((err) => {
    
          alert(err.response.data.detail)
        })
        }
        else{

            await   axios.get(`http://127.0.0.1:8000/linea-equipo-plan/equipos-disponibles/${0}`).then((response) => {
    
                setEquipos(response.data)
               
              }).catch((err) => {
          
                alert(err.response.data.detail)
              })
        }
      }

   
    const NuevoPlanEquipoLinea = () => {
        return ({
            linea: linea,
            plan: plan,
            fecha_fin: fecha_fin,
            equipo: equipo,
            fecha_inicio: fecha_inicio,
            costo: costo
        })
    }

    

    const CargarPlanEquipoLinea = () => {

        const nuevo = NuevoPlanEquipoLinea()

        axios.post('http://127.0.0.1:8000/linea-equipo-plan/', nuevo).then((response) => {

            setLineasEquiposPlanes(response.data)
            navigate('/planes-equipos-lineas')
            alert("Agregado Correctamente")
        }).catch(er => {
            alert(er.response.data.detail)
        })
    }

    const EditarPlanEquipoLinea = () => {

        const nuevo = NuevoPlanEquipoLinea()

        axios.put(`http://127.0.0.1:8000/linea-equipo-plan/${pel}`, nuevo).then((response) => {

            setLineasEquiposPlanes(response.data)
            navigate('/planes-equipos-lineas')
            alert("Editado Correctamente")
        }).catch(er => {
            alert(er.response.data.detail)
        })
    }
   
    const Lep=(pel)=>{

        if(pel){

          return  <input  disabled onChange={(e) => { CambioEnFormulario(e.target) }} type="text" name="linea" value={linea} className="form-control form-control-lg m-2 w-25" placeholder="ej: Perez Luis Alberto" />

        }else{

            return(
                           
            <select onChange={(e) => CambioEnFormulario(e.target)} className="form-select w-50 m-2" name='linea' value={linea} aria-label="Default select example">
            <option hidden defaultValue="prepago">Seleccione una linea</option>
            {lineas.map((linea1, index) => { 
              return <option key={index} value={linea1.numero}>{linea1.numero}</option> 
            })}
            </select>
            )

        }


    }
    

    useEffect(() => {
            //NuevoPlanEquipoLinea();
        if (pel) {
             axios.get(`http://127.0.0.1:8000/linea-equipo-plan/${pel}`).then((response) => {

                setLineasEquiposPlanes(response.data[0].LienaEquipoPlan);
                TraerEquipos();
                TraerPlanes();
                
                
            }).catch((er) => {

                alert(er.response.data.detail)
            }

            )
        }else{        
            TraerLineas();
            TraerEquipos();
            TraerPlanes();          
        }   
        
      
    }, [pel])

    
    
    const CambioEnFormulario = (e) => {

        setLineasEquiposPlanes({ ...lineasEquiposPlanes, [e.name]: e.value })

    }   
    return (
        <>
            <h1>Formulario Lineas-Planes-Equipos</h1>

            {/* Linea */}
            <label className="ms-3">Linea</label>
            {Lep(pel)}           
         
            {/* Equipo */}
            <label className="ms-3">Equipo</label>
            <select onChange={(e) => CambioEnFormulario(e.target)} className="form-select w-50 m-2" name='equipo' value={equipo} aria-label="Default select example">
                <option hidden>Seleccione un equipo</option>
                {equipos.map(equipo1 => {
                                                      
                            { return <option key={equipo1.codigo} value={equipo1.codigo}>{equipo1.marca}  {equipo1.modelo}</option> }
                    
                    })}
            </select>

             {/* Plan */}        
            <label className="ms-3">Plan</label>
            <select onChange={(e) => CambioEnFormulario(e.target)} className="form-select w-50 m-2" name='plan' value={plan} aria-label="Default select example">
                <option hidden defaultValue="prepago">Seleccione un plan</option>
                {planes.map(plan => {
                        { return <option key={plan.nombre} value={plan.nombre}>{plan.nombre}</option> }
                    })}
            </select>
            
            {/* Fecha Inicio */}  
            <label className="ms-3">Fecha Inicio</label>
            <input onChange={(e) => { CambioEnFormulario(e.target) }} type="date" name="fecha_inicio" value={fecha_inicio} className="form-control form-control-lg m-2 w-25" placeholder="ej: 2022-02-23" />
                  
            {/* Fecha Fin */}  
            <label className="ms-3">Fecha Fin</label>
             <input onChange={(e) => { CambioEnFormulario(e.target) }} type="date" defaultValue={null} name="fecha_fin" min={fecha_inicio} value={fecha_fin} className="form-control form-control-lg m-2 w-25" placeholder="ej: 2022-12-24" />

           
            <button onClick={() => { pel ? EditarPlanEquipoLinea() : CargarPlanEquipoLinea() }} className="btn btn-primary m-3">{pel ? 'Editar' : 'Agregar'}</button>
            <button onClick={() => { navigate('/planes-equipos-lineas') }} className="btn btn-danger m-3">Cancelar</button>





        </>
    )
}
export default LineasPlanesEquiposFormulario 