import React from "react";

const Buscador =(props)=>{


    
    return(
    <>
    <div >
                
            <div className="bloque mt-4">
                
                
                <input  type={props.tipo}  className="input form-control w-25 " 
                placeholder={props.mensaje}
                name ='busqueda'
                onKeyPress={(e)=>e.charCode ===13 && props.listar()}
                value= {props.busqueda}
                onChange={(e)=>props.setBusqueda(e.target.value)}
                required
                />
                  
                 
                
                 <button className="boton-buscar btn btn-primary mt-2" onClick={()=>props.listar()}> BUSCAR</button>    
                
    
            </div>     
            </div>         
    </>
    )
    }
    export default Buscador